// ─────────────────────────────────────────────
// AdMark Studio9 — Interactions
// Custom cursor · 3D tilt · count-up · marquee · form
// ─────────────────────────────────────────────

(() => {
  // ── Custom cursor ──
  const cursor = document.querySelector('.cursor');
  const ring = document.querySelector('.cursor-ring');
  const dot = document.querySelector('.cursor-dot');
  let mx = 0, my = 0, rx = 0, ry = 0;

  if (cursor && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    });
    (function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll('[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width = '60px'; ring.style.height = '60px';
        ring.style.background = 'rgba(59,166,237,0.15)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width = '36px'; ring.style.height = '36px';
        ring.style.background = 'transparent';
      });
    });
  }

  // ── 3D tilt on cards (mouseover) ──
  const tiltElements = document.querySelectorAll('[data-tilt]');
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;  // 0..1
      const y = (e.clientY - r.top) / r.height;  // 0..1
      const rotY = (x - 0.5) * 14;  // -7..+7 deg
      const rotX = -(y - 0.5) * 10; // -5..+5 deg
      el.style.transform = `perspective(1500px) rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(20px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1500px) rotateY(0) rotateX(0) translateZ(0)';
    });
  });

  // Studio card already has a baseline rotation — restore it
  const studioCard = document.querySelector('.studio-card');
  if (studioCard) {
    studioCard.addEventListener('mouseleave', () => {
      studioCard.style.transform = '';  // CSS default kicks in
    });
  }

  // ── Magnetic buttons ──
  document.querySelectorAll('.btn-magnet, .pill-btn, .submit-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ── Count-up stats ──
  const counters = document.querySelectorAll('.stat-num');
  // Pre-fill with target value as a safety net (visible even if observer never fires)
  counters.forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    el.textContent = target + suffix;
    el.dataset.pristine = '1';
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.dataset.pristine === '1') {
        const el = entry.target;
        el.dataset.pristine = '0';
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.floor(target * eased);
          el.textContent = value + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(c => observer.observe(c));

  // ── Mobile menu ──
  const menuToggle = document.querySelector('.menu-toggle');
  const menuClose = document.querySelector('.menu-close');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
    menuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ── Contact form ──
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      if (!name || !phone) {
        alert('Please enter your name and phone number.');
        return;
      }
      const msg = `Hi AdMark Studio9!%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(form.scope.value)}%0AMessage: ${encodeURIComponent(form.message.value)}`;
      window.open(`https://wa.me/919139375922?text=${msg}`, '_blank');
      const success = form.querySelector('.form-success');
      if (success) success.hidden = false;
      form.reset();
    });
  }

  // ── Smooth scroll for anchor links (uses window.scrollTo, not scrollIntoView) ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Gentle on-enter reveal — safe fallback (content visible by default) ──
  // We DO NOT pre-hide anything. We only add a subtle 'in' class when sections
  // enter the viewport, which can trigger CSS polish. If the observer never
  // fires (e.g. screenshot tools, prerender, no-JS), the page still looks right.
  try {
    const inObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          inObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('section, .case, .srv, .step').forEach(el => inObserver.observe(el));
  } catch(e) { /* no-op */ }
})();
