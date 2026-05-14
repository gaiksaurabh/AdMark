(() => {
  /* ── Custom cursor ── */
  const cursor = document.querySelector('.cursor');
  const dot    = document.querySelector('.cursor-dot');
  const ring   = document.querySelector('.cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  if (cursor && window.matchMedia('(hover:hover)').matches){
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dot)  dot.style.transform  = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      if (ring) ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();

    document.querySelectorAll('[data-cursor]').forEach(el => {
      const kind = el.getAttribute('data-cursor');
      el.addEventListener('mouseenter', () => cursor.classList.add('is-' + kind));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-' + kind));
    });
  }

  /* ── Topbar scroll state ── */
  const topbar = document.querySelector('.topbar');
  const onScroll = () => {
    topbar?.classList.toggle('is-scrolled', window.scrollY > 32);
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ── Mobile menu ── */
  const mm = document.querySelector('.mobile-menu');
  document.querySelector('.menu-toggle')?.addEventListener('click', () => mm?.classList.add('is-open'));
  document.querySelector('.menu-close')?.addEventListener('click', () => mm?.classList.remove('is-open'));
  mm?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mm.classList.remove('is-open')));

  /* ── Reveal on scroll ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.sec-head, .srv, .case, .step, .studio-text, .studio-card, .contact-inner, .foot-mega')
    .forEach(el => { el.classList.add('in-view-up'); io.observe(el); });

  /* ── Stagger service cards ── */
  document.querySelectorAll('.srv').forEach((el, i) => { el.style.transitionDelay = (i * 70) + 'ms'; });
  document.querySelectorAll('.step').forEach((el, i) => { el.style.transitionDelay = (i * 90) + 'ms'; });
  document.querySelectorAll('.case').forEach((el, i) => { el.style.transitionDelay = (i * 90) + 'ms'; });

  /* ── Magnetic CTA buttons ── */
  document.querySelectorAll('.btn-magnet, .submit-btn, .pill-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ── Number counter on view ── */
  const stats = document.querySelectorAll('.stat-num');
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.getAttribute('data-count'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const dur = 1600;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  stats.forEach(s => countIO.observe(s));

  /* ── Contact form (frontend demo) ── */
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const ok = form.querySelector('.form-success');
    if (ok) ok.hidden = false;
    form.querySelectorAll('input, textarea').forEach(i => i.value = '');
    setTimeout(() => { if (ok) ok.hidden = true; }, 6000);
  });

  /* ── Subtle parallax for hero blobs ── */
  const blobs = document.querySelectorAll('.blob');
  window.addEventListener('mousemove', e => {
    const cx = (e.clientX / window.innerWidth - 0.5);
    const cy = (e.clientY / window.innerHeight - 0.5);
    blobs.forEach((b, i) => {
      const f = (i + 1) * 14;
      b.style.transform = `translate(${cx * f}px, ${cy * f}px)`;
    });
  });
})();
