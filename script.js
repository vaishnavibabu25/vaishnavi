/* ============================================================
   PORTFOLIO — SCRIPT.JS
   ============================================================ */

'use strict';

/* ── Typing animation ── */
const typedEl   = document.getElementById('typed-text');
const phrases   = ['beautiful UIs ✨', 'scalable APIs 🚀', 'smart solutions 🧠', 'cool apps 🎯'];
let phraseIndex = 0, charIndex = 0, deleting = false, paused = false;

function type() {
  if (paused) return;
  const current = phrases[phraseIndex];

  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) { paused = true; setTimeout(() => { paused = false; deleting = true; }, 2000); }
    setTimeout(type, 70);
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; }
    setTimeout(type, 40);
  }
}
type();

/* ── Sticky navbar ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Hamburger / mobile menu ── */
const hamburger  = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu(open) {
  mobileMenu.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
  // Animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  if (open) {
    spans[0].style.cssText = 'transform:translateY(7px) rotate(45deg)';
    spans[1].style.cssText = 'opacity:0';
    spans[2].style.cssText = 'transform:translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => s.style.cssText = '');
  }
}

hamburger.addEventListener('click', () => toggleMenu(!mobileMenu.classList.contains('open')));
mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll(
  '.info-card, .skill-category, .project-card, .contact-item, .contact-form, .about-text, .about-cards, .hero-content, .hero-visual'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── Skill bar animation ── */
const barSection = document.getElementById('skill-bars-section');
const bars       = document.querySelectorAll('.bar-fill');
const pcts       = [document.getElementById('bar-pct-1'), document.getElementById('bar-pct-2'), document.getElementById('bar-pct-3'), document.getElementById('bar-pct-4')];
let barsAnimated = false;

const barObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !barsAnimated) {
    barsAnimated = true;
    bars.forEach((bar, i) => {
      const target = parseInt(bar.dataset.width, 10);
      bar.style.width = target + '%';
      // Count up percentage
      let count = 0;
      const step = target / 60;
      const interval = setInterval(() => {
        count = Math.min(count + step, target);
        if (pcts[i]) pcts[i].textContent = Math.round(count) + '%';
        if (count >= target) clearInterval(interval);
      }, 22);
    });
    barObserver.disconnect();
  }
}, { threshold: 0.3 });

if (barSection) barObserver.observe(barSection);

/* ── Smooth active nav highlight ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + id ? '#fff' : '';
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ── Contact form ── */
const form    = document.getElementById('contact-form');
const success = document.getElementById('form-success');
const submitBtn = document.getElementById('contact-submit-btn');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name  = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const msg   = document.getElementById('form-message').value.trim();

    if (!name || !email || !msg) {
      shakeForm();
      return;
    }

    // Simulate send
    const btnText    = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    btnText.hidden    = true;
    btnLoading.hidden = false;
    submitBtn.disabled = true;

    setTimeout(() => {
      btnText.hidden    = false;
      btnLoading.hidden = true;
      submitBtn.disabled = false;
      success.hidden    = false;
      form.reset();
      setTimeout(() => { success.hidden = true; }, 5000);
    }, 1800);
  });
}

function shakeForm() {
  form.style.animation = 'shake 0.4s ease';
  setTimeout(() => form.style.animation = '', 400);
}

/* Inject shake keyframe */
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-8px); }
    40%       { transform: translateX(8px); }
    60%       { transform: translateX(-6px); }
    80%       { transform: translateX(6px); }
  }
`;
document.head.appendChild(style);

/* ── Cursor glow effect ── */
const glow = document.createElement('div');
Object.assign(glow.style, {
  position: 'fixed', width: '300px', height: '300px', borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(124,106,255,0.07) 0%, transparent 70%)',
  pointerEvents: 'none', zIndex: '0',
  transform: 'translate(-50%, -50%)',
  transition: 'left 0.15s ease, top 0.15s ease',
  left: '-500px', top: '-500px',
});
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
}, { passive: true });

/* ── Tilt effect on project cards ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
    card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── Skill chips tooltip on hover ── */
document.querySelectorAll('.skill-chip').forEach(chip => {
  const level = chip.dataset.level;
  chip.title = `Proficiency: ${level}%`;
});
