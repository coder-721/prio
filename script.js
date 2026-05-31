// ── Scroll Reveal ──────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// ── Mobile Navigation ──────────────────────────────────────────
const menuBtn   = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
    const icon = menuBtn.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', open ? 'x' : 'menu');
      if (window.lucide) window.lucide.createIcons();
    }
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', 'menu');
        if (window.lucide) window.lucide.createIcons();
      }
    });
  });
}

// ── Sticky Nav Shadow ──────────────────────────────────────────
const nav = document.getElementById('navbar');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ── Rotating Placeholder Text ──────────────────────────────────
const prompts = [
  '"English essay due Friday, 2 hours."',
  '"Soccer practice every Monday 3–5pm."',
  '"Calc exam next Thursday, really hard."',
  '"I only have 1 hour to work today."',
  '"Move my history reading to tomorrow."',
];
const rotatingEl = document.getElementById('rotating-prompt');
if (rotatingEl) {
  let i = 0;
  setInterval(() => {
    rotatingEl.style.opacity = '0';
    setTimeout(() => {
      i = (i + 1) % prompts.length;
      rotatingEl.textContent = prompts[i];
      rotatingEl.style.opacity = '1';
    }, 300);
  }, 3000);
  rotatingEl.style.transition = 'opacity 0.3s ease';
}

// ── FAQ Accordion ──────────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── Pro Plan Notify Button ─────────────────────────────────────
const notifyBtn = document.getElementById('notify-btn');
if (notifyBtn) {
  notifyBtn.addEventListener('click', () => {
    notifyBtn.textContent = '✓ We\'ll let you know when Pro launches!';
    notifyBtn.disabled = true;
    notifyBtn.style.background = 'var(--primary-faint)';
    notifyBtn.style.color = 'var(--primary)';
    notifyBtn.style.border = '2px solid var(--primary)';
    notifyBtn.style.cursor = 'default';
    notifyBtn.style.transform = 'none';
    notifyBtn.style.boxShadow = 'none';
    const successMsg = document.createElement('div');
    successMsg.className = 'pricing-notify-msg';
    successMsg.innerHTML = '<i data-lucide="check-circle" style="width:16px;height:16px;"></i><span>Thanks! We\'ll let you know when Pro launches.</span>';
    notifyBtn.parentNode.insertBefore(successMsg, notifyBtn.nextSibling);
    if (window.lucide) window.lucide.createIcons();
  });
}

// ── Particle Field ─────────────────────────────────────────────
// Canvas-rendered, spring-physics particle field with cursor repulsion.
// No DOM elements created, targets 60fps via requestAnimationFrame.

(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // ── Config ──────────────────────────────────────────
  const SPACING        = 38;        // grid cell size (px)
  const DOT_RADIUS     = 1.4;       // base dot radius (px)
  const CURSOR_RADIUS  = 110;       // influence radius around cursor (px)
  const REPEL_STRENGTH = 55;        // max displacement at center (px)
  const SPRING_K       = 0.048;     // spring stiffness (0..1, lower = slower return)
  const DAMPING        = 0.72;      // velocity damping (0..1, lower = more drag)

  // Prio dark-blue palette — subtle, premium
  const PARTICLE_COLOR = 'rgba(41, 100, 180, 0.35)';

  // ── State ───────────────────────────────────────────
  let particles   = [];
  let mouseX      = -9999;
  let mouseY      = -9999;
  let W           = 0;
  let H           = 0;
  let rafId       = null;

  // ── Build particle grid ──────────────────────────────
  function buildGrid() {
    particles = [];
    // Slightly offset grid so dots are never right at the edge
    const offsetX = (W % SPACING) / 2 + SPACING / 2;
    const offsetY = (H % SPACING) / 2 + SPACING / 2;
    for (let gx = offsetX; gx < W; gx += SPACING) {
      for (let gy = offsetY; gy < H; gy += SPACING) {
        particles.push({
          ox: gx,  // home X
          oy: gy,  // home Y
          x:  gx,  // current X
          y:  gy,  // current Y
          vx: 0,   // velocity X
          vy: 0,   // velocity Y
        });
      }
    }
  }

  // ── Resize handler ────────────────────────────────────
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildGrid();
  }

  // ── Main animation loop ───────────────────────────────
  function tick() {
    ctx.clearRect(0, 0, W, H);

    const cr2 = CURSOR_RADIUS * CURSOR_RADIUS;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // ── Cursor repulsion ──
      const dx  = p.x - mouseX;
      const dy  = p.y - mouseY;
      const d2  = dx * dx + dy * dy;

      if (d2 < cr2 && d2 > 0.001) {
        const d    = Math.sqrt(d2);
        // Smooth falloff: strongest at d=0, zero at d=CURSOR_RADIUS
        const t    = 1 - d / CURSOR_RADIUS;
        const soft = t * t * (3 - 2 * t); // smoothstep
        const force = (REPEL_STRENGTH * soft) / d;
        p.vx += dx * force;
        p.vy += dy * force;
      }

      // ── Spring back to home ──
      p.vx += (p.ox - p.x) * SPRING_K;
      p.vy += (p.oy - p.y) * SPRING_K;

      // ── Damping ──
      p.vx *= DAMPING;
      p.vy *= DAMPING;

      // ── Integrate ──
      p.x += p.vx;
      p.y += p.vy;

      // ── Draw ──
      ctx.beginPath();
      ctx.arc(p.x, p.y, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = PARTICLE_COLOR;
      ctx.fill();
    }

    rafId = requestAnimationFrame(tick);
  }

  // ── Mouse tracking ────────────────────────────────────
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // When cursor leaves the window, particles settle
  window.addEventListener('mouseleave', () => {
    mouseX = -9999;
    mouseY = -9999;
  });

  // ── Resize ────────────────────────────────────────────
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (rafId) cancelAnimationFrame(rafId);
      resize();
      rafId = requestAnimationFrame(tick);
    }, 150);
  });

  // ── Init ──────────────────────────────────────────────
  resize();
  rafId = requestAnimationFrame(tick);
})();
