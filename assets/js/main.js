// ============================================================
// NAVBAR — scroll state + mobile menu
// ============================================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================================
// TYPEWRITER
// ============================================================
const roles = [
  'PhD Candidate · UPF',
  'Audio-Visual Researcher',
  'ML Engineer',
  'Deep Learning Enthusiast',
];
let roleIndex = 0, charIndex = 0, deleting = false;
const typeEl = document.getElementById('typewriterText');

function typewriter() {
  if (!typeEl) return;
  const current = roles[roleIndex];
  if (deleting) {
    typeEl.textContent = current.slice(0, --charIndex);
  } else {
    typeEl.textContent = current.slice(0, ++charIndex);
  }
  let delay = deleting ? 40 : 80;
  if (!deleting && charIndex === current.length) { delay = 2000; deleting = true; }
  else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 300; }
  setTimeout(typewriter, delay);
}
typewriter();

// ============================================================
// WAVE CANVAS
// ============================================================
const canvas = document.getElementById('waveCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w, h, frame = 0;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function drawWave() {
    ctx.clearRect(0, 0, w, h);
    const waves = [
      { amp: 40, freq: 0.008, speed: 0.015, y: h * 0.35, color: 'rgba(99,102,241,0.5)' },
      { amp: 28, freq: 0.013, speed: 0.020, y: h * 0.50, color: 'rgba(129,140,248,0.35)' },
      { amp: 18, freq: 0.018, speed: 0.012, y: h * 0.65, color: 'rgba(165,180,252,0.25)' },
    ];
    waves.forEach(({ amp, freq, speed, y, color }) => {
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= w; x++) {
        ctx.lineTo(x, y + Math.sin(x * freq + frame * speed) * amp);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
    frame++;
    requestAnimationFrame(drawWave);
  }
  drawWave();
}
