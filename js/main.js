/* ══════════════════════════════════════════════════
   Little Florets School — main.js
══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile Nav ────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const header = document.getElementById('header');

  // Build mobile nav
  const mobileNav = document.createElement('div');
  mobileNav.className = 'mobile-nav';
  mobileNav.id = 'mobileNav';
  mobileNav.innerHTML = `
    <div class="mobile-nav-section">
      <a href="#home">🏠 Home</a>
      <a href="#about">🏫 About Us</a>
    </div>
    <div class="mobile-nav-section">
      <h4>Preschool</h4>
      <a href="#playgroup">Play Group (2.5+)</a>
      <a href="#nursery">Nursery / Pre-KG (3+)</a>
      <a href="#lkg">PP I / LKG (4+)</a>
      <a href="#ukg">PP II / UKG (5+)</a>
    </div>
    <div class="mobile-nav-section">
      <h4>Primary School</h4>
      <a href="#grade1">Grade 1 (6+)</a>
      <a href="#grade2">Grade 2 (7+)</a>
      <a href="#grade3">Grade 3 (8+)</a>
    </div>
    <div class="mobile-nav-section">
      <h4>More</h4>
      <a href="#daycare">Day Care</a>
      <a href="#labs">Labs & Facilities</a>
      <a href="#gallery">📷 Gallery</a>
      <a href="#awards">🏆 Awards & News</a>
      <a href="#testimonials">💬 Parents Say</a>
      <a href="#admission">✏️ Apply Now</a>
      <a href="#branches">📍 Our Branches</a>
      <a href="#contact">📞 Contact</a>
    </div>
    <div style="padding-top:20px;display:flex;gap:10px;flex-wrap:wrap;">
      <a href="tel:+918125767309" class="btn btn-primary btn-sm">📞 Call Now</a>
      <a href="https://wa.me/918125767309" target="_blank" class="btn btn-whatsapp btn-sm">💬 WhatsApp</a>
    </div>
  `;

  const overlay = document.createElement('div');
  overlay.className = 'mobile-nav-overlay';
  overlay.id = 'mobileNavOverlay';

  document.body.appendChild(mobileNav);
  document.body.appendChild(overlay);

  let navOpen = false;
  function toggleNav() {
    navOpen = !navOpen;
    mobileNav.classList.toggle('open', navOpen);
    overlay.classList.toggle('open', navOpen);
    hamburger.classList.toggle('open', navOpen);
    document.body.style.overflow = navOpen ? 'hidden' : '';
  }

  hamburger && hamburger.addEventListener('click', toggleNav);
  overlay.addEventListener('click', toggleNav);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (navOpen) toggleNav();
  }));

  // ── Header Scroll ─────────────────────────────
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 60);
    backToTop.classList.toggle('visible', y > 400);
  });
  backToTop && backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── Active nav link on scroll ─────────────────
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => io.observe(s));

  // ── Hero Slider ───────────────────────────────
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const heroNext = document.getElementById('heroNext');
  const heroPrev = document.getElementById('heroPrev');
  let current = 0;
  let autoSlide;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    autoSlide = setInterval(() => goTo(current + 1), 5000);
  }
  function stopAuto() { clearInterval(autoSlide); }

  heroNext && heroNext.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
  heroPrev && heroPrev.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); }));
  startAuto();

  // ── Counter Animation ─────────────────────────
  function animateCounter(el, target) {
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { el.textContent = target; clearInterval(timer); return; }
      el.textContent = start;
    }, 16);
  }

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  // ── Scroll Reveal ─────────────────────────────
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // ── Why Tabs ──────────────────────────────────
  const tabs = document.querySelectorAll('.why-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.why-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById('tab-' + tab.dataset.tab);
      if (panel) {
        panel.classList.add('active');
        panel.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      }
    });
  });

  // ── Gallery Filter ────────────────────────────
  const gfBtns = document.querySelectorAll('.gf-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  gfBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gfBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.cat === filter;
        item.classList.toggle('hidden', !show);
      });
    });
  });

  // ── Lightbox ──────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let lightboxIdx = 0;
  let visibleImgs = [];

  function openLightbox(idx) {
    visibleImgs = [...document.querySelectorAll('.gallery-item:not(.hidden) img')];
    lightboxIdx = idx;
    lightboxImg.src = visibleImgs[lightboxIdx].src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function shiftLightbox(dir) {
    lightboxIdx = (lightboxIdx + dir + visibleImgs.length) % visibleImgs.length;
    lightboxImg.src = visibleImgs[lightboxIdx].src;
  }

  document.querySelectorAll('.gallery-item').forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });
  lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev && lightboxPrev.addEventListener('click', () => shiftLightbox(-1));
  lightboxNext && lightboxNext.addEventListener('click', () => shiftLightbox(1));
  lightbox && lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') shiftLightbox(-1);
    if (e.key === 'ArrowRight') shiftLightbox(1);
  });

  // ── Testimonials Slider ───────────────────────
  const track = document.getElementById('testimonialsTrack');
  const tDots = document.getElementById('tDots');
  const cards = document.querySelectorAll('.testimonial-card');
  let tCurrent = 0;
  let tPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;

  function buildTDots() {
    if (!tDots) return;
    tDots.innerHTML = '';
    const count = Math.ceil(cards.length / tPerView);
    for (let i = 0; i < count; i++) {
      const d = document.createElement('div');
      d.className = 't-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goToT(i));
      tDots.appendChild(d);
    }
  }

  function goToT(n) {
    const count = Math.ceil(cards.length / tPerView);
    tCurrent = Math.max(0, Math.min(n, count - 1));
    if (track) track.style.transform = `translateX(-${tCurrent * (100 / tPerView) * tPerView}%)`;
    // Actually move by full card widths:
    if (track) {
      const cardW = cards[0].getBoundingClientRect().width + 16;
      track.style.transform = `translateX(-${tCurrent * tPerView * cardW}px)`;
    }
    tDots.querySelectorAll('.t-dot').forEach((d, i) => d.classList.toggle('active', i === tCurrent));
  }

  function resizeTestimonials() {
    tPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    if (cards.length && track) {
      cards.forEach(c => { c.style.width = `calc(${100 / tPerView}% - ${(tPerView - 1) * 16 / tPerView}px)`; });
      track.style.gap = '16px';
    }
    buildTDots();
    goToT(0);
  }

  document.getElementById('tPrev') && document.getElementById('tPrev').addEventListener('click', () => goToT(tCurrent - 1));
  document.getElementById('tNext') && document.getElementById('tNext').addEventListener('click', () => goToT(tCurrent + 1));

  resizeTestimonials();
  window.addEventListener('resize', resizeTestimonials);

  // Auto-advance testimonials
  setInterval(() => {
    const count = Math.ceil(cards.length / tPerView);
    goToT((tCurrent + 1) % count);
  }, 5000);

  // ── Admission Form ────────────────────────────
  const admForm = document.getElementById('admForm');
  const formSuccess = document.getElementById('formSuccess');
  admForm && admForm.addEventListener('submit', e => {
    e.preventDefault();
    admForm.style.display = 'none';
    formSuccess.style.display = 'block';
  });

  // ── Contact Form ──────────────────────────────
  const contactForm = document.getElementById('contactForm');
  contactForm && contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '✅ Message Sent!';
    btn.style.background = '#10b981';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 4000);
  });

  // ── Smooth Scroll for all anchor links ────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = document.querySelector('.header').offsetHeight + 16;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  // ── Touch Swipe for Hero ──────────────────────
  let touchStartX = 0;
  const heroEl = document.querySelector('.hero');
  heroEl && heroEl.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  heroEl && heroEl.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { goTo(current + (diff > 0 ? 1 : -1)); }
  });

  // ── Touch Swipe for Testimonials ──────────────
  let tStartX = 0;
  const tSlider = document.getElementById('testimonialsSlider');
  tSlider && tSlider.addEventListener('touchstart', e => { tStartX = e.touches[0].clientX; }, { passive: true });
  tSlider && tSlider.addEventListener('touchend', e => {
    const diff = tStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      const count = Math.ceil(cards.length / tPerView);
      goToT((tCurrent + (diff > 0 ? 1 : -1) + count) % count);
    }
  });

});
