// ── Prio 3D Logo Scene ─────────────────────────────────────────
// Three.js scene with GSAP ScrollTrigger for scroll-driven 3D logo animations.
// Uses a single continuous timeline for smooth, predictable motion that doesn't jump.

(function initScene() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  // Open the home page at the very top so the hero logo is centred on the
  // first frame (otherwise the browser can restore a scrolled position and the
  // model reflects that offset until you scroll back up).
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  // ── Skip the heavy WebGL scene on mobile ───────────────────
  // The 3D canvas is hidden on phones (CSS) and a static logo stands in for it,
  // so booting Three.js there only burned battery and caused jank. The home
  // hero keeps its floating logo; Features/Download simply have no model.
  if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) return;

  // ── Wait for libs ──────────────────────────────────────────
  if (typeof THREE === 'undefined' || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('Three.js or GSAP not loaded yet');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── Renderer ───────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  // r128 color management
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;

  // ── Scene ──────────────────────────────────────────────────
  const scene = new THREE.Scene();

  // ── Camera ─────────────────────────────────────────────────
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 6);

  // ── Lighting (bright, clean for light mode) ────────────────
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
  directionalLight.position.set(3, 5, 4);
  scene.add(directionalLight);

  const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.8);
  fillLight.position.set(-3, -2, 2);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0x60a5fa, 0.5);
  rimLight.position.set(0, 3, -3);
  scene.add(rimLight);

  // Subtle warm backlight for depth
  const backLight = new THREE.DirectionalLight(0xfbbf24, 0.3);
  backLight.position.set(-2, -1, -4);
  scene.add(backLight);

  // ── Model State ────────────────────────────────────────────
  let model = null;
  let mixer = null;
  const clock = new THREE.Clock();

  // Animation state object — GSAP will tween these values
  // Hero: model is centred behind the giant "PRIO" word.
  const modelState = {
    posX: 0,      // centre of the hero
    posY: 0,
    posZ: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    scale: 0.92,
    opacity: 1.0, // Used to fade out later
  };

  // Idle floating animation
  const idleState = {
    floatY: 0,
    floatRot: 0,
    time: 0,
  };

  // Continuous slow auto-spin (the logo turns gently the whole time)
  let autoSpin = 0;
  const SPIN_SPEED = 0.32; // radians / second

  // ── Load GLB Model (from Base64 Data URI) ──────────────────
  if (typeof THREE.GLTFLoader === 'undefined') {
    console.error('THREE.GLTFLoader not loaded. Ensure the GLTFLoader script is included.');
    return;
  }
  const loader = new THREE.GLTFLoader();
  
  if (!window.PRIO_LOGO_B64) {
    console.error("Base64 model data not found. Ensure encode_model.js was run and model_data.js is loaded.");
    return;
  }

  loader.load(
    window.PRIO_LOGO_B64,
    (gltf) => {
      model = gltf.scene;

      // Center the model
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      // Scale to fit nicely (Increased target size for better visibility)
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetSize = 4.0;
      const scaleFactor = targetSize / maxDim;
      model.scale.setScalar(scaleFactor);

      // Wrap in a group for easier transforms
      const group = new THREE.Group();
      group.add(model);
      scene.add(group);
      model = group;

      // Apply initial position
      model.position.set(modelState.posX, modelState.posY, modelState.posZ);

      // Enable transparency so the fade-out animation works; leave all other material properties untouched
      model.traverse((child) => {
        if (child.isMesh) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach(m => { if (m) { m.transparent = true; m.needsUpdate = true; } });
        }
      });

      // Handle animations if any
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play();
        });
      }

      // Fade in the model
      canvas.style.transition = 'opacity 0.8s ease';
      canvas.style.opacity = '1';

      // Setup scroll animations after model loads
      setupScrollAnimations();
    },
    (progress) => {
      if (progress.total > 0) {
        const pct = (progress.loaded / progress.total * 100).toFixed(0);
        console.log(`Loading 3D model: ${pct}%`);
      }
    },
    (error) => {
      console.error('Error loading 3D model:', error);
    }
  );

  // Initially hide canvas until model loads
  canvas.style.opacity = '0';

  // ── Scroll Animations with GSAP ────────────────────────────
  // Phase-based: the model travels centre → left (on the podium) →
  // right (features) → up & out (demo). Each transition is its own
  // ScrollTrigger so it lines up exactly with the pinned story section.
  function setupScrollAnimations() {
    if (!model) return;

    const story    = document.querySelector('#story');
    const features = document.querySelector('#features');
    const demo     = document.querySelector('#demo');

    // Instead of competing GSAP tweens on the shared state (which all render
    // their "from" value at progress 0 and fight over the property — that's
    // what snapped the hero logo to the right on load), we drive the model
    // DIRECTLY from each phase's scroll progress. At scroll 0 no phase is
    // active, so the model simply keeps its initial centred values.

    // Keyframes
    const HERO  = { posX: 0,    posY: 0,   scale: 0.92, opacity: 1 };
    const LEFT  = { posX: -2.7, posY: 0,   scale: 0.82, opacity: 1 };
    const RIGHT = { posX: 2.6,  posY: 0,   scale: 0.8,  opacity: 1 };
    const OUT   = { posX: 2.6,  posY: 4.5, scale: 0.62, opacity: 0 };

    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    function applyPhase(from, to, t) {
      const e = ease(Math.max(0, Math.min(1, t)));
      modelState.posX    = from.posX    + (to.posX    - from.posX)    * e;
      modelState.posY    = from.posY    + (to.posY    - from.posY)    * e;
      modelState.scale   = from.scale   + (to.scale   - from.scale)   * e;
      modelState.opacity = from.opacity + (to.opacity - from.opacity) * e;
    }

    // Phase 1 — Hero (centre) → Story (left)
    if (story) {
      ScrollTrigger.create({
        trigger: story, start: 'top bottom', end: 'top top',
        invalidateOnRefresh: true,
        onUpdate: (self) => applyPhase(HERO, LEFT, self.progress),
        onLeaveBack: () => applyPhase(HERO, LEFT, 0),  // snap to hero above
        onLeave:     () => applyPhase(HERO, LEFT, 1),  // snap to left below
      });
    }

    // Phase 2 — Story (left) → Features (right), crossing as the story fades
    if (features) {
      ScrollTrigger.create({
        trigger: features, start: 'top 45%', end: 'top top',
        invalidateOnRefresh: true,
        onUpdate: (self) => applyPhase(LEFT, RIGHT, self.progress),
        onLeaveBack: () => applyPhase(LEFT, RIGHT, 0),
        onLeave:     () => applyPhase(LEFT, RIGHT, 1),
      });
    }

    // Phase 3 — Features (right) → Demo (lift up and fade out)
    if (demo) {
      ScrollTrigger.create({
        trigger: demo, start: 'top bottom', end: 'top center',
        invalidateOnRefresh: true,
        onUpdate: (self) => applyPhase(RIGHT, OUT, self.progress),
        onLeaveBack: () => applyPhase(RIGHT, OUT, 0),
        onLeave:     () => applyPhase(RIGHT, OUT, 1),
      });
    }

    // The model triggers are created after the model loads (async). Re-measure
    // now AND again once the web font / all resources are ready — the font
    // shifts the layout slightly, which otherwise left the hero logo off-centre
    // until the first scroll forced a recalculation.
    ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    if (document.readyState !== 'complete') {
      window.addEventListener('load', () => ScrollTrigger.refresh());
    }
  }

  // ── Animation Loop ─────────────────────────────────────────
  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    idleState.time += delta;

    // Update mixer for any built-in GLB animations
    if (mixer) mixer.update(delta);

    // Apply GSAP-driven state + idle floating to the model
    if (model) {
      // Idle floating oscillation (gentle bob + subtle rotation)
      idleState.floatY = Math.sin(idleState.time * 1.2) * 0.08;
      idleState.floatRot = Math.sin(idleState.time * 0.8) * 0.03;

      // Continuous slow auto-spin
      autoSpin += SPIN_SPEED * delta;

      model.position.set(
        modelState.posX,
        modelState.posY + idleState.floatY,
        modelState.posZ
      );

      model.rotation.set(
        modelState.rotX + idleState.floatRot,
        modelState.rotY + idleState.floatRot * 0.5 + autoSpin,
        modelState.rotZ
      );

      const s = modelState.scale;
      model.scale.set(s, s, s);

      // Apply opacity (handle single or multi-material meshes)
      model.traverse((child) => {
        if (child.isMesh) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach(m => { if (m) m.opacity = modelState.opacity; });
        }
      });
    }

    renderer.render(scene, camera);
  }
  animate();

  // ── Resize ─────────────────────────────────────────────────
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }, 100);
  });

})();
