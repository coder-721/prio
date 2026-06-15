// ── Prio 3D Logo — Features Page ──────────────────────────────────────────────
// Distinct from home: starts on the RIGHT, uses Z-axis tilt as its signature
// move, slower total rotation (~1.5 spins vs home's 3), sine.inOut easing,
// and idle bob that sways on X+Z instead of X+Y.

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

  // ── Lighting (identical brand look) ────────────────────────────────────────
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
  // Starts on the RIGHT with a Z-tilt — opposite of home's left-start
  const modelState = {
    posX: 2.3, posY: 0.2, posZ: -0.5,
    rotX: -0.1, rotY: 0, rotZ: 0.15,
    scale: 1.0, opacity: 1.0,
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
      model.scale.setScalar(3.8 / maxDim); // slightly smaller than home's 4.0

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

    // scrub: 1.0 — tighter than home's 1.2; the Z-tilt snaps more crisply
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
        invalidateOnRefresh: true,
      }
    });

    // 1. Hero spacer → Feature 1: swing left, Z tilt corrects, Y spin starts
    tl.to(modelState, {
      posX: -1.8, posY: -0.3, posZ: 0,
      rotX: 0.08, rotY: Math.PI * 0.75, rotZ: -0.12,
      scale: 0.9,
      ease: 'sine.inOut',
    }, 0);

    // 2. Feature 2 → Feature 3: swing back right with slight forward push
    tl.to(modelState, {
      posX: 2.1, posY: 0.4, posZ: 0.3,
      rotX: 0, rotY: Math.PI * 1.5, rotZ: 0.18,
      scale: 1.0,
      ease: 'sine.inOut',
    });

    // 3. Feature 4 → Feature 5: sweep left with pronounced counter-tilt
    tl.to(modelState, {
      posX: -2.0, posY: -0.2, posZ: 0,
      rotX: -0.1, rotY: Math.PI * 2.2, rotZ: -0.22,
      scale: 0.85,
      ease: 'sine.inOut',
    });

    // 4. CTA: sweep toward center, rise, fade — 2.5 total spins (vs home's 3)
    tl.to(modelState, {
      posX: 0.4, posY: 4.5, posZ: 0,
      rotY: Math.PI * 3, rotZ: 0,
      scale: 0.45, opacity: 0,
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
      // Idle: X+Z sway (not X+Y like home) — feels like a tilting pendant
      idleState.floatY   = Math.sin(idleState.time * 0.9) * 0.07;
      idleState.floatRot = Math.sin(idleState.time * 1.4) * 0.025;

      model.position.set(modelState.posX, modelState.posY + idleState.floatY, modelState.posZ);
      model.rotation.set(
        modelState.rotX + idleState.floatRot,
        modelState.rotY,
        modelState.rotZ + idleState.floatRot * 0.6,
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
