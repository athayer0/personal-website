'use strict';

// ── Sticky nav: add .scrolled class after user scrolls down ──
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load in case page is already scrolled

// ── Active nav link highlighting ─────────────────────────────
// Highlights the nav link whose section is currently in the viewport.
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const highlightNav = () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 80;
    if (window.scrollY >= top) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
};
window.addEventListener('scroll', highlightNav, { passive: true });

// ── Mobile hamburger menu ────────────────────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);

  // Animate the three bars into an X when menu is open
  const [top, mid, bot] = burger.querySelectorAll('span');
  if (isOpen) {
    top.style.transform = 'translateY(7px) rotate(45deg)';
    mid.style.opacity   = '0';
    bot.style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    top.style.transform = '';
    mid.style.opacity   = '';
    bot.style.transform = '';
  }
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    const [top, mid, bot] = burger.querySelectorAll('span');
    top.style.transform = '';
    mid.style.opacity   = '';
    bot.style.transform = '';
  });
});

// ── Scroll-reveal via Intersection Observer ──────────────────
// Elements with class .reveal fade up when they enter the viewport.
// Elements with class .reveal-stagger trigger the CSS nth-child delays.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once revealed, stop observing to avoid re-triggering
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,   // trigger when 12% of element is visible
    rootMargin: '0px 0px -40px 0px' // slight bottom offset
  }
);

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
  revealObserver.observe(el);
});
