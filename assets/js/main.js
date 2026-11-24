// ============================================================
// THEME: follows the system unless the visitor picked one
// ============================================================
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function storedTheme() {
  try { return localStorage.getItem('theme'); } catch (e) { return null; }
}
function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  if (themeToggle) {
    const dark = theme === 'dark';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.innerHTML = dark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
}
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
applyTheme(storedTheme() || (systemDark.matches ? 'dark' : 'light'));
systemDark.addEventListener('change', (e) => {
  if (!storedTheme()) applyTheme(e.matches ? 'dark' : 'light');
});
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
  });
}

// ============================================================
// NAVBAR: scroll state + mobile menu
// ============================================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navbarAlwaysSolid = navbar && navbar.classList.contains('scrolled');

if (navbar && !navbarAlwaysSolid) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealEls = document.querySelectorAll('.reveal, .reveal-children > *');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// ============================================================
// TYPEWRITER
// ============================================================
const typeEl = document.getElementById('typewriterText');
if (typeEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const roles = [
    'PhD candidate at UPF',
    'Audio-visual researcher',
    'ML engineer',
    'Deep learning enthusiast',
  ];
  let roleIndex = 0, charIndex = roles[0].length, deleting = true;
  const tick = () => {
    const current = roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    typeEl.textContent = current.slice(0, charIndex);
    let delay = deleting ? 40 : 80;
    if (!deleting && charIndex === current.length) { delay = 2000; deleting = true; }
    else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 300; }
    setTimeout(tick, delay);
  };
  setTimeout(tick, 2000);
}

// ============================================================
// HERO DEMO: same image, different audio
// Maps and peak values are the SSL-SaN row of the qualitative
// figure in the BMVC 2025 paper (precomputed, not a live model).
// ============================================================
const demo = document.getElementById('demo');
if (demo) {
  const SCALE_MAX = 0.6;
  const states = {
    dinosaur:  { peak: 0.49, text: 'The audio is the dinosaur, and the map lands on the dinosaur.' },
    firetruck: { peak: 0.54, text: 'Same image, now with the fire truck audio. The map moves to the truck.' },
    silence:   { peak: 0.11, text: 'With silence there is nothing to localize, so the map stays dark.' },
    noise:     { peak: 0.09, text: 'Noise does not belong to any object in the image. The map stays dark.' },
    offscreen: { peak: 0.22, text: 'The sound comes from something that is not in the image. The map stays dark.' },
  };
  const buttons = demo.querySelectorAll('.demo__option');
  const images = demo.querySelectorAll('.demo__stage img');
  const caption = document.getElementById('demoCaption');
  const peak = document.getElementById('demoPeak');
  const mask = document.getElementById('demoMask');

  function show(key) {
    const state = states[key];
    if (!state) return;
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.audio === key)));
    images.forEach(img => img.classList.toggle('is-active', img.dataset.audio === key));
    caption.textContent = state.text;
    peak.textContent = state.peak.toFixed(2);
    mask.style.width = (100 - (state.peak / SCALE_MAX) * 100) + '%';
  }
  buttons.forEach(b => b.addEventListener('click', () => show(b.dataset.audio)));
  show('dinosaur');
}
