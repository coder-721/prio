// ── Prio 3D Logo — Download Page ──────────────────────────────────────────────
// Distinct from home and features: starts upper-left with a depth offset (posZ),
// uses X-axis rotation mixed in for a coin-flip feel, only ~1.5 total spins,
// scrub: 1.4 for a heavier floaty response, and exits by DESCENDING rather
// than rising — the only page where the model sinks off the bottom.

(function initScene() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  // Remove the 3D model entirely on mobile — fixes the slowness on phones.
  if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) return;

  if (typeof THREE === 'undefined' || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('Three.js or GSAP not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── Renderer ───────────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;

  // ── Scene & Camera ─────────────────────────────────────────────────────────
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 6);

  // ── Lighting ───────────────────────────────────────────────────────────────
  scene.add(new THREE.AmbientLight(0xffffff, 1.0));
  const dl = new THREE.DirectionalLight(0xffffff, 2.0);
  dl.position.set(3, 5, 4); scene.add(dl);
  const fl = new THREE.DirectionalLight(0x93c5fd, 0.8);
  fl.position.set(-3, -2, 2); scene.add(fl);
  const rl = new THREE.DirectionalLight(0x60a5fa, 0.5);
  rl.position.set(0, 3, -3); scene.add(rl);
  const bl = new THREE.DirectionalLight(0xfbbf24, 0.3);
  bl.position.set(-2, -1, -4); scene.add(bl);

  // ── Model state ────────────────────────────────────────────────────────────
  // Unique start: upper-left, pulled slightly back in depth, smaller initial scale
  const modelState = {
    posX: -1.8, posY: 1.2, posZ: -1.0,
    rotX: 0.28, rotY: 0, rotZ: 0,        // coin-flip tilt on X
    scale: 0.72, opacity: 1.0,
  };
  const idleState = { floatY: 0, floatRot: 0, time: 0 };

  let model = null;
  let mixer = null;
  const clock = new THREE.Clock();

  // ── Load model ─────────────────────────────────────────────────────────────
  if (typeof THREE.GLTFLoader === 'undefined') {
    console.error('THREE.GLTFLoader not loaded');
    return;
  }
  if (!window.PRIO_LOGO_B64) {
    console.error('Base64 model data not found');
    return;
  }

  new THREE.GLTFLoader().load(
    window.PRIO_LOGO_B64,
    (gltf) => {
      model = gltf.scene;

      const box    = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      const size   = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      model.scale.setScalar(3.5 / maxDim); // smallest of all pages — more of an accent

      const group = new THREE.Group();
      group.add(model);
      scene.add(group);
      model = group;

      model.position.set(modelState.posX, modelState.posY, modelState.posZ);
      model.rotation.set(modelState.rotX, modelState.rotY, modelState.rotZ);

      model.traverse((child) => {
        if (child.isMesh) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach(m => { if (m) { m.transparent = true; m.needsUpdate = true; } });
        }
      });

      if (gltf.animations?.length) {
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach(clip => mixer.clipAction(clip).play());
      }

      canvas.style.transition = 'opacity 0.8s ease';
      canvas.style.opacity    = '1';
      setupScrollAnimations();
    },
    null,
    (err) => console.error('Error loading 3D model:', err)
  );

  canvas.style.opacity = '0';

  // ── Scroll animations ──────────────────────────────────────────────────────
  function setupScrollAnimations() {
    if (!model) return;

    // scrub: 1.4 — the laziest/heaviest of all three pages, floaty feel
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.4,
        invalidateOnRefresh: true,
      }
    });

    // 1. Hero: emerge from depth, X tilt levels, swing to the right
    //    power2.out so it decelerates as it "lands" — unique entrance
    tl.to(modelState, {
      posX: 1.9, posY: 0.1, posZ: 0,
      rotX: -0.12, rotY: Math.PI * 0.6, rotZ: 0.08,
      scale: 0.95,
      ease: 'power2.out',
    }, 0);

    // 2. Pricing: pendulum to the left, coin-flip X continues
    tl.to(modelState, {
      posX: -1.6, posY: -0.2, posZ: 0.2,
      rotX: 0.18, rotY: Math.PI * 1.1, rotZ: -0.08,
      scale: 0.85,
      ease: 'sine.inOut',
    });

    // 3. FAQ: swing right, X almost fully unwinds
    tl.to(modelState, {
      posX: 1.6, posY: 0.3, posZ: 0,
      rotX: 0, rotY: Math.PI * 1.6, rotZ: 0.05,
      scale: 0.9,
      ease: 'sine.inOut',
    });

    // 4. CTA: drift to center and DESCEND — sinks downward, opposite of home/features
    tl.to(modelState, {
      posX: 0, posY: -4.8, posZ: 0,
      rotY: Math.PI * 2.1,
      scale: 0.38, opacity: 0,
      ease: 'power2.in',
    });
  }

  // ── Render loop ────────────────────────────────────────────────────────────
  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    idleState.time += delta;
    if (mixer) mixer.update(delta);

    if (model) {
      // Idle: Y-axis rotation only — pendulum-like, very different from the others
      idleState.floatY   = Math.sin(idleState.time * 1.5) * 0.06;
      idleState.floatRot = Math.sin(idleState.time * 0.7) * 0.022;

      model.position.set(modelState.posX, modelState.posY + idleState.floatY, modelState.posZ);
      model.rotation.set(
        modelState.rotX,
        modelState.rotY + idleState.floatRot,
        modelState.rotZ,
      );

      const s = modelState.scale;
      model.scale.set(s, s, s);

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

  // ── Resize ─────────────────────────────────────────────────────────────────
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, 100);
  });
})();
