// ── Scroll Reveal ──────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  requestAnimationFrame(drawMissionConnectors);
});

// ── Mission S-Grid SVG Connectors ─────────────────────────────
function drawMissionConnectors() {
  const grid = document.querySelector('.mission-s-grid');
  const svg  = document.querySelector('.mission-s-svg');
  if (!grid || !svg) return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) { svg.innerHTML = ''; return; }

  const gRect = grid.getBoundingClientRect();

  function cr(n) {
    const el = grid.querySelector('[data-beat="' + n + '"]');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const gl = gRect.left, gt = gRect.top;
    return {
      top:   r.top    - gt,  left:  r.left   - gl,
      right: r.right  - gl,  bottom:r.bottom  - gt,
      midX:  (r.left + r.right)  / 2 - gl,
      midY:  (r.top  + r.bottom) / 2 - gt,
    };
  }

  const r1=cr(1), r2=cr(2), r3=cr(3), r4=cr(4), r5=cr(5), r6=cr(6);
  if (!r1||!r2||!r3||!r4||!r5||!r6) return;

  // 5 connector segments:
  // row-1 horiz | vert right col | row-2 horiz | vert left col | row-3 horiz
  const segs = [
    [r1.right, r1.midY,   r2.left,  r2.midY  ],  // 1→2 horizontal
    [r2.midX,  r2.bottom, r3.midX,  r3.top   ],  // 2→3 vertical (right col)
    [r4.right, r4.midY,   r3.left,  r3.midY  ],  // 4→3 horizontal (row 2)
    [r4.midX,  r4.bottom, r5.midX,  r5.top   ],  // 4→5 vertical (left col)
    [r5.right, r5.midY,   r6.left,  r6.midY  ],  // 5→6 horizontal
  ];

  svg.setAttribute('viewBox', '0 0 ' + gRect.width.toFixed(1) + ' ' + gRect.height.toFixed(1));
  svg.innerHTML = '';

  segs.forEach(function([x1,y1,x2,y2]) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1.toFixed(1)); line.setAttribute('y1', y1.toFixed(1));
    line.setAttribute('x2', x2.toFixed(1)); line.setAttribute('y2', y2.toFixed(1));
    line.setAttribute('stroke', 'rgba(41,159,250,0.4)');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-linecap', 'round');
    svg.appendChild(line);
  });
}

// Redraw after beat reveal animations finish (beats animate translateY → 0)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.mission-s-beat').forEach(beat => {
    beat.addEventListener('transitionend', function handler() {
      if (beat.classList.contains('visible')) {
        drawMissionConnectors();
        beat.removeEventListener('transitionend', handler);
      }
    });
  });
});
window.addEventListener('resize', drawMissionConnectors, { passive: true });

// ── Mobile Navigation ──────────────────────────────────────────
const menuBtn    = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
    const icon = menuBtn.querySelector('i');
    if (icon) icon.className = open ? 'ti ti-x' : 'ti ti-menu-2';
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      const icon = menuBtn.querySelector('i');
      if (icon) icon.className = 'ti ti-menu-2';
    });
  });
}

// ── "Coming soon" toast ────────────────────────────────────────
(function comingSoon() {
  let toast, hideTimer;
  function ensure() {
    if (toast) return toast;
    toast = document.createElement('div');
    toast.className = 'coming-soon-toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML =
      '<i class="ti ti-rocket"></i>' +
      '<div><strong>Coming soon!</strong><br>Prio isn\'t available just yet. ' +
      'Follow <a href="https://instagram.com/theprioapp" target="_blank" rel="noopener">@theprioapp</a> for launch news.</div>';
    document.body.appendChild(toast);
    toast.addEventListener('click', (e) => { if (e.target.tagName !== 'A') hide(); });
    return toast;
  }
  function hide() { if (toast) toast.classList.remove('show'); }
  function show() {
    ensure().classList.add('show');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hide, 5000);
  }
  document.addEventListener('click', (e) => {
    if (e.target.closest('.js-coming-soon')) { e.preventDefault(); show(); }
  });
})();

// ── Light / Dark Theme Toggle ──────────────────────────────────
// Default is now LIGHT. Dark is opt-in.
(function themeToggle() {
  const root = document.documentElement;
  const btn  = document.getElementById('theme-toggle');

  const current = () => root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

  function syncIcon() {
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (icon) icon.className = current() === 'dark' ? 'ti ti-sun' : 'ti ti-moon';
  }

  syncIcon();

  if (btn) {
    btn.addEventListener('click', () => {
      const next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('prio-theme', next); } catch (e) {}
      syncIcon();
      if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === 'function') {
        window.ScrollTrigger.refresh();
      }
    });
  }
})();

// ── Sticky Nav Shadow ──────────────────────────────────────────
const nav = document.getElementById('navbar');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
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
  rotatingEl.style.transition = 'opacity 0.3s ease';
  setInterval(() => {
    rotatingEl.style.opacity = '0';
    setTimeout(() => {
      i = (i + 1) % prompts.length;
      rotatingEl.textContent = prompts[i];
      rotatingEl.style.opacity = '1';
    }, 300);
  }, 3000);
}

// ── FAQ Accordion ──────────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── Pointer-Reactive Background (spotlight + blob parallax) ───
(function pointerReactive() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  if (reduce || coarse) return;

  const root = document.documentElement;
  let tx = window.innerWidth / 2;
  let ty = window.innerHeight / 2;
  let rafId = null;

  function update() {
    root.style.setProperty('--cursor-x', tx + 'px');
    root.style.setProperty('--cursor-y', ty + 'px');
    const nx = tx / window.innerWidth  - 0.5;
    const ny = ty / window.innerHeight - 0.5;
    root.style.setProperty('--blob-1-x', (nx * -28) + 'px');
    root.style.setProperty('--blob-1-y', (ny * -28) + 'px');
    root.style.setProperty('--blob-2-x', (nx *  18) + 'px');
    root.style.setProperty('--blob-2-y', (ny *  18) + 'px');
    rafId = null;
  }

  window.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    if (!rafId) rafId = requestAnimationFrame(update);
  }, { passive: true });
})();

// ── Story slide reveal (replaces GSAP pin) ─────────────────────
(function storySlides() {
  const slides = document.querySelectorAll('.story-slide');
  if (!slides.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      e.target.classList.toggle('is-active', e.isIntersecting);
      // trigger calendar shimmer once on first view
      if (e.isIntersecting) {
        const cal = e.target.querySelector('.mini-calendar--busy');
        if (cal && !cal.dataset.shimmered) { cal.classList.add('shimmer'); cal.dataset.shimmered = '1'; }
      }
    });
  }, { threshold: 0.25 });
  slides.forEach(s => io.observe(s));
})();

// ── Interactive Card Tilt ──────────────────────────────────────
(function cardTilt() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  if (reduce || coarse) return;

  const cards = document.querySelectorAll(
    '.bento-card, .feature-card, .badge-btn, ' +
    '.story-slide, .mission-s-beat, .feature-section-grid, ' +
    '.faq-item, .download-hero .badge-btn'
  );

  cards.forEach((card) => {
    // Larger cards get a subtler tilt so it doesn't feel jarring
    const isLarge = card.classList.contains('feature-section-grid') ||
                    card.classList.contains('story-slide');
    const MAX = isLarge ? 2.5 : 6;

    card.style.transformStyle = 'preserve-3d';

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.08s ease-out, box-shadow 220ms, border-color 220ms';
    });
    card.addEventListener('mousemove', (e) => {
      const r  = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width  - 0.5;
      const py = (e.clientY - r.top)  / r.height - 0.5;
      const ry =  px * 2 * MAX;
      const rx = -py * 2 * MAX;
      card.style.transform =
        'perspective(1200px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-3px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 220ms, border-color 220ms';
      card.style.transform  = '';
    });
  });
})();
