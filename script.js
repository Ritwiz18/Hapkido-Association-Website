// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 18; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 8 + 3;
  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random() * 100}%;
    animation-duration:${Math.random() * 15 + 10}s;
    animation-delay:${Math.random() * 10}s;
  `;
  particlesContainer.appendChild(p);
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ===== ANIMATED COUNTERS =====
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current) + (target >= 100 ? '+' : '');
      }, 16);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ===== TESTIMONIALS SLIDER =====
const track = document.getElementById('testimonialTrack');
const dotsContainer = document.getElementById('sliderDots');
const cards = track ? track.querySelectorAll('.testimonial-card') : [];
let currentSlide = 0;
let autoSlide;

function goToSlide(n) {
  currentSlide = (n + cards.length) % cards.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dotsContainer.querySelectorAll('.slider-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

if (cards.length) {
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => { goToSlide(i); resetAuto(); });
    dotsContainer.appendChild(dot);
  });

  function resetAuto() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => goToSlide(currentSlide + 1), 4500);
  }
  resetAuto();

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { goToSlide(currentSlide + (diff > 0 ? 1 : -1)); resetAuto(); }
  });
}

// ===== GALLERY LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lbImg.src = item.dataset.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ===== REGISTRATION TABS =====
document.querySelectorAll('.form-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.reg-form').forEach(f => f.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// ===== FORM SUBMISSION =====
function setButtonState(btn, loading) {
  btn.disabled = loading;
  btn.textContent = loading ? '⏳ Submitting...' : btn._original;
}

function showResult(btn, success, message) {
  btn.textContent = success ? '✅ ' + message : '❌ ' + message;
  btn.style.background = success ? '#16a34a' : '#dc2626';
  setTimeout(() => {
    btn.textContent = btn._original;
    btn.style.background = '';
    btn.disabled = false;
  }, 3500);
}

// Student registration form
const studentForm = document.getElementById('student');
if (studentForm) {
  studentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn._original = btn.textContent;
    setButtonState(btn, true);
    const data = {
      full_name:    studentForm.querySelector('input[placeholder="Enter full name"]').value,
      dob:          studentForm.querySelector('input[type="date"]').value,
      phone:        studentForm.querySelector('input[type="tel"]').value,
      email:        studentForm.querySelector('input[type="email"]').value,
      belt_level:   studentForm.querySelectorAll('select')[0].value,
      program:      studentForm.querySelectorAll('select')[1].value,
      address:      studentForm.querySelector('input[placeholder="Your address"]').value,
    };
    try {
      const res  = await fetch('/api/register/student', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await res.json();
      showResult(btn, json.success, json.message);
      if (json.success) studentForm.reset();
    } catch { showResult(btn, false, 'Network error. Try again.'); }
  });
}

// Club affiliation form
const clubForm = document.getElementById('club');
if (clubForm) {
  clubForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn._original = btn.textContent;
    setButtonState(btn, true);
    const inputs = clubForm.querySelectorAll('input');
    const data = {
      club_name:       inputs[0].value,
      city:            inputs[1].value,
      contact_person:  inputs[2].value,
      phone:           inputs[3].value,
      email:           inputs[4].value,
      member_count:    inputs[5].value,
      head_instructor: inputs[6].value,
    };
    try {
      const res  = await fetch('/api/register/club', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await res.json();
      showResult(btn, json.success, json.message);
      if (json.success) clubForm.reset();
    } catch { showResult(btn, false, 'Network error. Try again.'); }
  });
}

// Contact form
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn._original = btn.textContent;
    setButtonState(btn, true);
    const inputs = contactForm.querySelectorAll('input');
    const data = {
      name:    inputs[0].value,
      email:   inputs[1].value,
      subject: inputs[2].value,
      message: contactForm.querySelector('textarea').value,
    };
    try {
      const res  = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await res.json();
      showResult(btn, json.success, json.message);
      if (json.success) contactForm.reset();
    } catch { showResult(btn, false, 'Network error. Try again.'); }
  });
}

// ===== SMOOTH ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  navItems.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--red)' : '';
  });
}, { passive: true });
