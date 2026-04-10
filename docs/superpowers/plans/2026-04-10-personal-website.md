# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a clean, minimalist personal website for Xavier Juanola Molet — PhD candidate, audio-visual researcher, ML engineer — targeting both academic and industry audiences.

**Architecture:** Single-page HTML/CSS/JS site with smooth-scroll sections, plus separate blog pages. No build step. CSS custom properties for theming, Intersection Observer for scroll animations, vanilla JS for nav and typewriter.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox, grid), vanilla JS, Google Fonts (Inter + JetBrains Mono), Font Awesome 6 (CDN)

**Design spec:** `docs/superpowers/specs/2026-04-10-personal-website-design.md`

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html` | Main single-page site — all sections |
| `assets/css/style.css` | All styles — tokens, reset, components, sections, responsive |
| `assets/js/main.js` | Navbar scroll, typewriter, scroll-reveal, mobile menu |
| `blog/index.html` | Blog post listing page |
| `blog/post-1-vssl-intro.html` | Post: What is VSSL? |
| `blog/post-2-silence-matters.html` | Post: Why Silence Matters |
| `blog/post-3-physics-to-ai.html` | Post: Physics to AI path |
| `assets/images/profile.png` | Copied from existing site |
| `assets/images/publications/*.png` | Copied from existing site |

---

## Task 1: Setup — directory structure + copy assets

**Files:**
- Create: `assets/css/style.css`
- Create: `assets/js/main.js`
- Create: `assets/images/` (directory)
- Copy: profile photo and publication thumbnails

- [ ] **Step 1: Create directory tree**

```bash
mkdir -p /upf/personal_web/assets/css
mkdir -p /upf/personal_web/assets/js
mkdir -p /upf/personal_web/assets/images/publications
mkdir -p /upf/personal_web/blog
```

- [ ] **Step 2: Copy profile photo**

```bash
cp /upf/xavijuanola.github.io/images/profile.png /upf/personal_web/assets/images/profile.png
```

- [ ] **Step 3: Copy publication thumbnails**

```bash
cp /upf/xavijuanola.github.io/assets/images/publications/SSL_SaN.png /upf/personal_web/assets/images/publications/
cp /upf/xavijuanola.github.io/assets/images/publications/vssl_eval.png /upf/personal_web/assets/images/publications/
cp /upf/xavijuanola.github.io/assets/images/publications/blank.png /upf/personal_web/assets/images/publications/
```

- [ ] **Step 4: Create empty placeholder files**

```bash
touch /upf/personal_web/assets/css/style.css
touch /upf/personal_web/assets/js/main.js
touch /upf/personal_web/index.html
touch /upf/personal_web/blog/index.html
touch /upf/personal_web/blog/post-1-vssl-intro.html
touch /upf/personal_web/blog/post-2-silence-matters.html
touch /upf/personal_web/blog/post-3-physics-to-ai.html
```

- [ ] **Step 5: Verify structure**

```bash
find /upf/personal_web -type f | sort
```

Expected: all files listed above present.

---

## Task 2: CSS Foundation — tokens, reset, typography, layout

**Files:**
- Write: `assets/css/style.css` (foundation section)

- [ ] **Step 1: Write CSS custom properties and reset**

Write to `assets/css/style.css`:

```css
/* ============================================================
   TOKENS
   ============================================================ */
:root {
  --color-hero-bg: #0f172a;
  --color-accent: #6366f1;
  --color-accent-light: #818cf8;
  --color-accent-dark: #4f46e5;
  --color-bg: #ffffff;
  --color-surface: #f8fafc;
  --color-border: #e2e8f0;
  --color-text: #1e293b;
  --color-muted: #64748b;
  --color-hero-text: #f1f5f9;
  --color-hero-muted: #94a3b8;

  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;

  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06);
  --shadow-lg: 0 10px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08);

  --transition: 0.25s cubic-bezier(0.4,0,0.2,1);
  --max-width: 1100px;
}

/* ============================================================
   RESET
   ============================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: var(--font-sans);
  background: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; height: auto; display: block; }
a { color: var(--color-accent); text-decoration: none; transition: color var(--transition); }
a:hover { color: var(--color-accent-dark); }
ul { list-style: none; }

/* ============================================================
   LAYOUT UTILITIES
   ============================================================ */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

section {
  padding: 96px 0;
}

section:nth-child(even) {
  background: var(--color-surface);
}

.section-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 12px;
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 48px;
  line-height: 1.15;
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ============================================================
   BUTTONS
   ============================================================ */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.925rem;
  cursor: pointer;
  border: none;
  transition: all var(--transition);
}
.btn-primary {
  background: var(--color-accent);
  color: #fff;
}
.btn-primary:hover {
  background: var(--color-accent-dark);
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(99,102,241,0.4);
}
.btn-outline {
  background: transparent;
  color: var(--color-hero-text);
  border: 1.5px solid rgba(241,245,249,0.3);
}
.btn-outline:hover {
  background: rgba(255,255,255,0.08);
  color: var(--color-hero-text);
  border-color: rgba(241,245,249,0.6);
}
.btn-outline-dark {
  background: transparent;
  color: var(--color-text);
  border: 1.5px solid var(--color-border);
}
.btn-outline-dark:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* ============================================================
   TAGS / BADGES
   ============================================================ */
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  font-family: var(--font-mono);
  background: rgba(99,102,241,0.1);
  color: var(--color-accent);
  border: 1px solid rgba(99,102,241,0.2);
}
```

- [ ] **Step 2: Verify CSS file saved and parseable**

Open `assets/css/style.css` in any text editor or run:
```bash
wc -l /upf/personal_web/assets/css/style.css
```
Expected: >100 lines.

---

## Task 3: Navbar HTML + CSS + JS

**Files:**
- Write: `index.html` (shell + nav section)
- Append: `assets/css/style.css` (nav styles)
- Write: `assets/js/main.js` (nav scroll + mobile menu)

- [ ] **Step 1: Write index.html shell with navbar**

Write to `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Xavier Juanola Molet — PhD Candidate & ML Researcher</title>
  <meta name="description" content="Xavier Juanola Molet — PhD candidate at UPF, researching Audio-Visual Sound Source Localization. ML engineer with industry experience at Schneider Electric and NYU.">
  <meta property="og:title" content="Xavier Juanola Molet">
  <meta property="og:description" content="PhD candidate at UPF · Audio-Visual Researcher · ML Engineer">
  <meta property="og:url" content="https://xavijuanola.github.io">
  <meta property="og:type" content="website">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

  <!-- NAVBAR -->
  <nav class="navbar" id="navbar">
    <div class="container navbar__inner">
      <a href="#hero" class="navbar__logo">XJ<span class="accent">.</span></a>
      <ul class="navbar__links" id="navLinks">
        <li><a href="#about">About</a></li>
        <li><a href="#publications">Publications</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#teaching">Teaching</a></li>
        <li><a href="blog/index.html">Blog</a></li>
        <li><a href="#contact" class="btn btn-primary" style="padding:8px 18px;">Contact</a></li>
      </ul>
      <button class="navbar__hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <!-- SECTIONS WILL BE ADDED IN SUBSEQUENT TASKS -->

  <script src="assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Append navbar styles to style.css**

Append to `assets/css/style.css`:

```css
/* ============================================================
   NAVBAR
   ============================================================ */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 20px 0;
  transition: background var(--transition), box-shadow var(--transition), padding var(--transition);
}
.navbar.scrolled {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 var(--color-border);
  padding: 12px 0;
}
.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navbar__logo {
  font-size: 1.4rem;
  font-weight: 800;
  color: #fff;
  transition: color var(--transition);
}
.navbar.scrolled .navbar__logo { color: var(--color-text); }
.navbar__logo .accent { color: var(--color-accent); }
.navbar__links {
  display: flex;
  align-items: center;
  gap: 8px;
}
.navbar__links a {
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255,255,255,0.85);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  transition: all var(--transition);
}
.navbar__links a:hover {
  color: #fff;
  background: rgba(255,255,255,0.1);
}
.navbar.scrolled .navbar__links a { color: var(--color-muted); }
.navbar.scrolled .navbar__links a:hover { color: var(--color-text); background: var(--color-surface); }
.navbar__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.navbar__hamburger span {
  display: block;
  width: 24px; height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: all var(--transition);
}
.navbar.scrolled .navbar__hamburger span { background: var(--color-text); }

@media (max-width: 768px) {
  .navbar__hamburger { display: flex; }
  .navbar__links {
    display: none;
    position: absolute;
    top: 100%; left: 0; right: 0;
    flex-direction: column;
    background: rgba(15,23,42,0.98);
    backdrop-filter: blur(12px);
    padding: 16px 24px 24px;
    gap: 4px;
  }
  .navbar.scrolled .navbar__links { background: rgba(255,255,255,0.98); }
  .navbar__links.open { display: flex; }
  .navbar__links a { color: rgba(255,255,255,0.9); padding: 10px 12px; }
  .navbar.scrolled .navbar__links a { color: var(--color-text); }
}
```

- [ ] **Step 3: Write main.js with navbar logic**

Write to `assets/js/main.js`:

```js
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
```

- [ ] **Step 4: Verify in browser**

```bash
cd /upf/personal_web && python3 -m http.server 8080
```

Open `http://localhost:8080` — expect: navbar visible with logo "XJ." and links. Scrolling down makes navbar white. No JS errors in console.

---

## Task 4: Hero Section

**Files:**
- Modify: `index.html` (add hero section after navbar)
- Append: `assets/css/style.css`
- Append: `assets/js/main.js`

- [ ] **Step 1: Add hero HTML inside body, after navbar, before script tag**

```html
  <!-- HERO -->
  <section class="hero" id="hero">
    <canvas class="hero__canvas" id="waveCanvas"></canvas>
    <div class="container hero__content">
      <p class="hero__greeting reveal">Hi, I'm</p>
      <h1 class="hero__name reveal">Xavier Juanola<span class="accent">.</span></h1>
      <div class="hero__typewriter reveal">
        <span id="typewriterText"></span><span class="cursor">|</span>
      </div>
      <p class="hero__bio reveal">
        PhD candidate at <a href="https://www.upf.edu" target="_blank" rel="noopener">UPF</a> researching
        Audio-Visual Sound Source Localization. Bridging deep learning research and real-world ML engineering.
      </p>
      <div class="hero__cta reveal">
        <a href="#publications" class="btn btn-primary"><i class="fas fa-book-open"></i> Publications</a>
        <a href="cv/Academic_CV_Xavier_Juanola.pdf" target="_blank" class="btn btn-outline"><i class="fas fa-file-alt"></i> Download CV</a>
        <a href="#contact" class="btn btn-outline"><i class="fas fa-envelope"></i> Contact</a>
      </div>
      <div class="hero__stats reveal">
        <div class="stat"><span class="stat__num">4</span><span class="stat__label">Publications</span></div>
        <div class="stat"><span class="stat__num">4</span><span class="stat__label">Talks</span></div>
        <div class="stat"><span class="stat__num">4</span><span class="stat__label">Years Teaching</span></div>
      </div>
    </div>
    <div class="hero__scroll-hint">
      <span>Scroll</span>
      <i class="fas fa-arrow-down"></i>
    </div>
  </section>
```

- [ ] **Step 2: Append hero CSS to style.css**

```css
/* ============================================================
   HERO
   ============================================================ */
.hero {
  position: relative;
  min-height: 100vh;
  background: var(--color-hero-bg);
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 120px 0 80px;
}
.hero__canvas {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  opacity: 0.18;
  pointer-events: none;
}
.hero__content {
  position: relative;
  z-index: 1;
  max-width: 760px;
}
.hero__greeting {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--color-accent-light);
  margin-bottom: 12px;
}
.hero__name {
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 800;
  color: var(--color-hero-text);
  line-height: 1.05;
  margin-bottom: 20px;
}
.hero__name .accent { color: var(--color-accent); }
.hero__typewriter {
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  font-weight: 500;
  color: var(--color-hero-muted);
  margin-bottom: 24px;
  min-height: 2em;
  font-family: var(--font-mono);
}
.cursor {
  animation: blink 1s step-end infinite;
  color: var(--color-accent);
}
@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
.hero__bio {
  font-size: 1.05rem;
  color: var(--color-hero-muted);
  max-width: 560px;
  margin-bottom: 36px;
  line-height: 1.7;
}
.hero__bio a { color: var(--color-accent-light); }
.hero__bio a:hover { color: #fff; }
.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 60px;
}
.hero__stats {
  display: flex;
  gap: 48px;
  padding-top: 32px;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.stat__num {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-hero-text);
  line-height: 1;
}
.stat__label {
  font-size: 0.8rem;
  color: var(--color-hero-muted);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.hero__scroll-hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: var(--color-hero-muted);
  font-size: 0.75rem;
  font-family: var(--font-mono);
  animation: bounce 2s ease-in-out infinite;
}
@keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }

@media (max-width: 600px) {
  .hero__stats { gap: 24px; }
  .hero__cta { flex-direction: column; }
  .btn { width: 100%; justify-content: center; }
}
```

- [ ] **Step 3: Append typewriter + wave canvas JS to main.js**

```js
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
```

- [ ] **Step 4: Verify in browser**

Serve site and open `http://localhost:8080`. Expect:
- Full-height dark hero
- Name "Xavier Juanola." in large white text
- Typewriter cycling roles
- Three CTA buttons
- Stats row (4 / 4 / 4)
- Animated wave lines in background
- Scroll hint bouncing at bottom

---

## Task 5: About Section

**Files:**
- Modify: `index.html` (add about section)
- Append: `assets/css/style.css`

- [ ] **Step 1: Add about HTML after hero section**

```html
  <!-- ABOUT -->
  <section id="about">
    <div class="container about__grid">
      <div class="about__photo reveal">
        <img src="assets/images/profile.png" alt="Xavier Juanola Molet" class="about__img">
        <div class="about__social">
          <a href="https://scholar.google.com/citations?user=8RTQAbMAAAAJ&hl=en" target="_blank" rel="noopener" title="Google Scholar"><i class="fas fa-graduation-cap"></i></a>
          <a href="https://github.com/xavijuanola" target="_blank" rel="noopener" title="GitHub"><i class="fab fa-github"></i></a>
          <a href="https://linkedin.com/in/xavijuanola" target="_blank" rel="noopener" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a href="mailto:xavier.juanola@upf.edu" title="Email"><i class="fas fa-envelope"></i></a>
        </div>
      </div>
      <div class="about__text">
        <p class="section-label">About Me</p>
        <h2 class="section-title" style="margin-bottom:24px;">Physicist turned AI Researcher</h2>
        <p class="reveal">I'm Xavier, a PhD candidate at <a href="https://www.upf.edu" target="_blank" rel="noopener">Universitat Pompeu Fabra</a> (Barcelona), working on <strong>Audio-Visual Sound Source Localization</strong> within the <a href="https://www.upf.edu/en/web/universitat/-/grup-de-recerca-en-processament-d-imatges-i-visio-per-computador" target="_blank" rel="noopener">IMVA group</a> under <a href="https://www.upf.edu/web/gloria-haro" target="_blank" rel="noopener">Prof. Gloria Haro</a> and co-advised by <a href="https://steinhardt.nyu.edu/people/magdalena-fuentes" target="_blank" rel="noopener">Prof. Magdalena Fuentes</a> (NYU). My research asks: <em>can models learn to localize sound in video — even when the audio is silence, noise, or from offscreen?</em></p>
        <p class="reveal">My path has been unconventional. I started with a <strong>BS in Theoretical Physics</strong> (UB), followed by two master's degrees — <strong>Intelligent Interactive Systems</strong> (UPF) and <strong>Astrophysics &amp; Cosmology</strong> (UAB). Before the PhD, I spent 3+ years as a <strong>Data Scientist and AI Engineer</strong> in industry (DRIVING01, Schneider Electric), building NLP systems and predictive models. A visiting scholar stint at <strong>NYU MARL</strong> in 2024 deepened my research collaborations and led to an ICASSP 2025 publication.</p>
        <p class="reveal">I'm supported by an <strong>FPI doctoral fellowship</strong> from Spain's Ministry of Science and am part of the MuVAU research project. When not doing research, I teach <strong>Calculus II</strong> labs at UPF.</p>
        <div class="about__education reveal">
          <h3>Education</h3>
          <ul>
            <li><i class="fas fa-circle-dot"></i> <strong>PhD, Information &amp; Communication Technologies</strong> — UPF (2022–present)</li>
            <li><i class="fas fa-circle-dot"></i> <strong>MS, Astrophysics &amp; Cosmology</strong> — UAB (2020–2021)</li>
            <li><i class="fas fa-circle-dot"></i> <strong>MS, Intelligent Interactive Systems</strong> — UPF (2019–2020)</li>
            <li><i class="fas fa-circle-dot"></i> <strong>BS, Theoretical Physics</strong> — UB (2014–2019)</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Append about CSS**

```css
/* ============================================================
   ABOUT
   ============================================================ */
.about__grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 64px;
  align-items: start;
}
.about__img {
  width: 100%;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  aspect-ratio: 1;
  object-fit: cover;
}
.about__social {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}
.about__social a {
  width: 40px; height: 40px;
  border-radius: 50%;
  border: 1.5px solid var(--color-border);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-muted);
  font-size: 1rem;
  transition: all var(--transition);
}
.about__social a:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-2px);
}
.about__text p {
  color: var(--color-muted);
  margin-bottom: 16px;
  line-height: 1.75;
}
.about__text strong { color: var(--color-text); }
.about__text a { font-weight: 500; }
.about__education {
  margin-top: 28px;
  padding: 20px;
  background: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}
.about__education h3 {
  font-size: 0.85rem;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-bottom: 12px;
}
.about__education li {
  display: flex;
  gap: 10px;
  align-items: baseline;
  padding: 6px 0;
  font-size: 0.9rem;
  color: var(--color-text);
}
.about__education li i {
  color: var(--color-accent);
  font-size: 0.5rem;
  flex-shrink: 0;
  position: relative;
  top: -2px;
}

@media (max-width: 768px) {
  .about__grid { grid-template-columns: 1fr; }
  .about__photo { max-width: 220px; margin: 0 auto; }
}
```

- [ ] **Step 3: Verify in browser**

Expect: two-column layout (photo left, text right), profile photo, social icons, bio text, education list.

---

## Task 6: Publications Section

**Files:**
- Modify: `index.html`
- Append: `assets/css/style.css`

- [ ] **Step 1: Add publications HTML after about section**

```html
  <!-- PUBLICATIONS -->
  <section id="publications">
    <div class="container">
      <p class="section-label">Research</p>
      <h2 class="section-title">Publications</h2>
      <div class="pub-list">

        <!-- BMVC 2025 -->
        <article class="pub-card reveal">
          <div class="pub-card__thumb">
            <img src="assets/images/publications/SSL_SaN.png" alt="SSL-SaN paper thumbnail">
          </div>
          <div class="pub-card__body">
            <div class="pub-card__meta">
              <span class="badge">BMVC 2025</span>
              <span class="pub-card__year">2025</span>
            </div>
            <h3 class="pub-card__title">
              <a href="https://arxiv.org/abs/2508.21761" target="_blank" rel="noopener">
                Learning from Silence and Noise for Visual Sound Source Localization Models
              </a>
            </h3>
            <p class="pub-card__authors">
              <strong>Xavier Juanola</strong>,
              <a href="https://steinhardt.nyu.edu/people/giovana-morais" target="_blank" rel="noopener">Giovana Morais</a>,
              <a href="https://steinhardt.nyu.edu/people/magdalena-fuentes" target="_blank" rel="noopener">Magdalena Fuentes</a>,
              <a href="https://www.upf.edu/web/gloria-haro" target="_blank" rel="noopener">Gloria Haro</a>
            </p>
            <div class="pub-card__links">
              <a href="https://xavijuanola.github.io/SSL-SaN" target="_blank" rel="noopener" class="pub-link"><i class="fas fa-globe"></i> Project</a>
              <a href="https://arxiv.org/abs/2508.21761" target="_blank" rel="noopener" class="pub-link"><i class="fas fa-file-alt"></i> arXiv</a>
              <a href="https://arxiv.org/pdf/2508.21761" target="_blank" rel="noopener" class="pub-link"><i class="fas fa-file-pdf"></i> PDF</a>
              <a href="https://github.com/xavijuanola/SSL_SaN" target="_blank" rel="noopener" class="pub-link"><i class="fab fa-github"></i> Code</a>
            </div>
          </div>
        </article>

        <!-- CVPR Workshop 2025 -->
        <article class="pub-card reveal">
          <div class="pub-card__thumb">
            <img src="assets/images/publications/vssl_eval.png" alt="VSSL paper thumbnail">
          </div>
          <div class="pub-card__body">
            <div class="pub-card__meta">
              <span class="badge">CVPR Workshop 2025</span>
              <span class="pub-card__year">2025</span>
            </div>
            <h3 class="pub-card__title">
              <a href="https://sightsound.org/papers/2025/Xavier_Juanola_Visual_Sound_Source_Localization_Assessing_Performance_with_Both_Positive_and_Negative_Audio.pdf" target="_blank" rel="noopener">
                Visual Sound Source Localization: Assessing Performance with Both Positive and Negative Audio
              </a>
            </h3>
            <p class="pub-card__authors">
              <strong>Xavier Juanola</strong>,
              <a href="https://steinhardt.nyu.edu/people/giovana-morais" target="_blank" rel="noopener">Giovana Morais</a>,
              <a href="https://steinhardt.nyu.edu/people/magdalena-fuentes" target="_blank" rel="noopener">Magdalena Fuentes</a>,
              <a href="https://www.upf.edu/web/gloria-haro" target="_blank" rel="noopener">Gloria Haro</a>
            </p>
            <div class="pub-card__links">
              <a href="https://sightsound.org/" target="_blank" rel="noopener" class="pub-link"><i class="fas fa-book"></i> Proceedings</a>
              <a href="https://sightsound.org/papers/2025/Xavier_Juanola_Visual_Sound_Source_Localization_Assessing_Performance_with_Both_Positive_and_Negative_Audio.pdf" target="_blank" rel="noopener" class="pub-link"><i class="fas fa-file-pdf"></i> PDF</a>
            </div>
          </div>
        </article>

        <!-- ICASSP 2025 -->
        <article class="pub-card reveal">
          <div class="pub-card__thumb">
            <img src="assets/images/publications/vssl_eval.png" alt="ICASSP paper thumbnail">
          </div>
          <div class="pub-card__body">
            <div class="pub-card__meta">
              <span class="badge">ICASSP 2025</span>
              <span class="pub-card__year">2025</span>
            </div>
            <h3 class="pub-card__title">
              <a href="https://arxiv.org/abs/2410.01020" target="_blank" rel="noopener">
                A Critical Assessment of Visual Sound Source Localization Models Including Negative Audio
              </a>
            </h3>
            <p class="pub-card__authors">
              <strong>Xavier Juanola</strong>,
              <a href="https://www.upf.edu/web/gloria-haro" target="_blank" rel="noopener">Gloria Haro</a>,
              <a href="https://steinhardt.nyu.edu/people/magdalena-fuentes" target="_blank" rel="noopener">Magdalena Fuentes</a>
            </p>
            <div class="pub-card__links">
              <a href="https://xavijuanola.github.io/vssleval" target="_blank" rel="noopener" class="pub-link"><i class="fas fa-globe"></i> Project</a>
              <a href="https://arxiv.org/abs/2410.01020" target="_blank" rel="noopener" class="pub-link"><i class="fas fa-file-alt"></i> arXiv</a>
              <a href="https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10890384" target="_blank" rel="noopener" class="pub-link"><i class="fas fa-file-pdf"></i> PDF</a>
              <a href="https://ieeexplore.ieee.org/document/10890384" target="_blank" rel="noopener" class="pub-link"><i class="fas fa-book"></i> Proceedings</a>
              <a href="https://github.com/xavijuanola/vssl_eval" target="_blank" rel="noopener" class="pub-link"><i class="fab fa-github"></i> Code</a>
            </div>
          </div>
        </article>

        <!-- IPOL 2024 -->
        <article class="pub-card reveal">
          <div class="pub-card__thumb pub-card__thumb--blank">
            <img src="assets/images/publications/blank.png" alt="IPOL paper thumbnail">
          </div>
          <div class="pub-card__body">
            <div class="pub-card__meta">
              <span class="badge">IPOL MLBriefs 2024</span>
              <span class="pub-card__year">2024</span>
            </div>
            <h3 class="pub-card__title">
              <a href="http://www.ipol.im/pub/art/2024/525/" target="_blank" rel="noopener">
                A Brief Analysis of SLAVC method for Sound Source Localization
              </a>
            </h3>
            <p class="pub-card__authors">
              <strong>Xavier Juanola</strong>,
              <a href="https://www.upf.edu/web/gloria-haro" target="_blank" rel="noopener">Gloria Haro</a>
            </p>
            <div class="pub-card__links">
              <a href="http://www.ipol.im/pub/art/2024/525/" target="_blank" rel="noopener" class="pub-link"><i class="fas fa-globe"></i> Paper page</a>
              <a href="http://www.ipol.im/pub/art/2024/525/article.pdf" target="_blank" rel="noopener" class="pub-link"><i class="fas fa-file-pdf"></i> PDF</a>
            </div>
          </div>
        </article>

      </div>
    </div>
  </section>
```

- [ ] **Step 2: Append publications CSS**

```css
/* ============================================================
   PUBLICATIONS
   ============================================================ */
.pub-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.pub-card {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 24px;
  padding: 24px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: box-shadow var(--transition), transform var(--transition);
}
.pub-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
.pub-card__thumb {
  width: 120px;
  height: 90px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  flex-shrink: 0;
  background: var(--color-surface);
}
.pub-card__thumb img {
  width: 100%; height: 100%;
  object-fit: cover;
}
.pub-card__thumb--blank img { object-fit: contain; padding: 8px; }
.pub-card__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.pub-card__year {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--color-muted);
}
.pub-card__title {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 8px;
}
.pub-card__title a {
  color: var(--color-text);
}
.pub-card__title a:hover { color: var(--color-accent); }
.pub-card__authors {
  font-size: 0.85rem;
  color: var(--color-muted);
  margin-bottom: 12px;
}
.pub-card__authors a { color: var(--color-muted); }
.pub-card__authors a:hover { color: var(--color-accent); }
.pub-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.pub-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.78rem;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  color: var(--color-muted);
  background: var(--color-surface);
  transition: all var(--transition);
}
.pub-link:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: rgba(99,102,241,0.05);
}

@media (max-width: 600px) {
  .pub-card { grid-template-columns: 1fr; }
  .pub-card__thumb { width: 100%; height: 160px; }
}
```

- [ ] **Step 3: Verify in browser**

Expect: 4 publication cards with thumbnails, badges, author lists, and icon link buttons. Cards lift on hover.

---

## Task 7: Projects Section

**Files:**
- Modify: `index.html`
- Append: `assets/css/style.css`

- [ ] **Step 1: Add projects HTML after publications**

```html
  <!-- PROJECTS -->
  <section id="projects">
    <div class="container">
      <p class="section-label">Work</p>
      <h2 class="section-title">Projects</h2>
      <div class="projects-grid">

        <article class="project-card reveal">
          <div class="project-card__header">
            <i class="fas fa-volume-xmark project-card__icon"></i>
            <div class="project-card__links">
              <a href="https://github.com/xavijuanola/SSL_SaN" target="_blank" rel="noopener" title="GitHub"><i class="fab fa-github"></i></a>
              <a href="https://xavijuanola.github.io/SSL-SaN" target="_blank" rel="noopener" title="Project page"><i class="fas fa-external-link-alt"></i></a>
            </div>
          </div>
          <h3 class="project-card__title">SSL-SaN</h3>
          <p class="project-card__desc">Self-supervised model for visual sound source localization robust to negative audio — silence, noise, and offscreen sounds. Introduces new metrics and extended evaluation benchmark IS3+.</p>
          <div class="project-card__tags">
            <span class="badge">PyTorch</span>
            <span class="badge">Audio-Visual</span>
            <span class="badge">Self-supervised</span>
            <span class="badge">BMVC 2025</span>
          </div>
        </article>

        <article class="project-card reveal">
          <div class="project-card__header">
            <i class="fas fa-magnifying-glass-chart project-card__icon"></i>
            <div class="project-card__links">
              <a href="https://github.com/xavijuanola/vssl_eval" target="_blank" rel="noopener" title="GitHub"><i class="fab fa-github"></i></a>
              <a href="https://xavijuanola.github.io/vssleval" target="_blank" rel="noopener" title="Project page"><i class="fas fa-external-link-alt"></i></a>
            </div>
          </div>
          <h3 class="project-card__title">VSSL Eval</h3>
          <p class="project-card__desc">Extended benchmark and new metrics for rigorous evaluation of visual sound source localization models. Tests models in scenarios with negative audio (silence, noise, offscreen).</p>
          <div class="project-card__tags">
            <span class="badge">Evaluation</span>
            <span class="badge">Benchmarking</span>
            <span class="badge">ICASSP 2025</span>
          </div>
        </article>

        <article class="project-card reveal">
          <div class="project-card__header">
            <i class="fas fa-headphones project-card__icon"></i>
            <div class="project-card__links">
              <a href="http://www.ipol.im/pub/art/2024/525/" target="_blank" rel="noopener" title="Interactive demo"><i class="fas fa-external-link-alt"></i></a>
            </div>
          </div>
          <h3 class="project-card__title">SLAVC Analysis</h3>
          <p class="project-card__desc">Interactive analysis and online executable demo of the SLAVC self-supervised sound source localization method. Users can test the model on custom image-audio pairs.</p>
          <div class="project-card__tags">
            <span class="badge">Demo</span>
            <span class="badge">IPOL 2024</span>
            <span class="badge">Interactive</span>
          </div>
        </article>

      </div>
    </div>
  </section>
```

- [ ] **Step 2: Append projects CSS**

```css
/* ============================================================
   PROJECTS
   ============================================================ */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}
.project-card {
  padding: 28px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: box-shadow var(--transition), transform var(--transition), border-color var(--transition);
}
.project-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
  border-color: var(--color-accent);
}
.project-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.project-card__icon {
  font-size: 1.6rem;
  color: var(--color-accent);
}
.project-card__links {
  display: flex;
  gap: 12px;
}
.project-card__links a {
  color: var(--color-muted);
  font-size: 1.05rem;
  transition: color var(--transition);
}
.project-card__links a:hover { color: var(--color-accent); }
.project-card__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 10px;
}
.project-card__desc {
  font-size: 0.9rem;
  color: var(--color-muted);
  line-height: 1.65;
  margin-bottom: 16px;
}
.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
```

- [ ] **Step 3: Verify in browser**

Expect: 3 project cards in grid, icons, GitHub/external links, description, tag badges. Cards highlight on hover.

---

## Task 8: Skills Section

**Files:**
- Modify: `index.html`
- Append: `assets/css/style.css`

- [ ] **Step 1: Add skills HTML after projects**

```html
  <!-- SKILLS -->
  <section id="skills">
    <div class="container">
      <p class="section-label">Expertise</p>
      <h2 class="section-title">Skills</h2>
      <div class="skills-grid">

        <div class="skill-category reveal">
          <h3 class="skill-category__title"><i class="fas fa-code"></i> Languages</h3>
          <ul class="skill-list">
            <li class="skill-item"><i class="fab fa-python"></i> Python</li>
            <li class="skill-item"><span class="skill-icon-text">∫</span> MATLAB</li>
          </ul>
        </div>

        <div class="skill-category reveal">
          <h3 class="skill-category__title"><i class="fas fa-brain"></i> ML / Deep Learning</h3>
          <ul class="skill-list">
            <li class="skill-item"><i class="fas fa-fire"></i> PyTorch (torchvision, etc.)</li>
            <li class="skill-item"><i class="fas fa-robot"></i> HuggingFace</li>
            <li class="skill-item"><i class="fas fa-chart-line"></i> scikit-learn</li>
            <li class="skill-item"><i class="fas fa-eye"></i> OpenCLIP</li>
            <li class="skill-item"><i class="fas fa-layer-group"></i> timm</li>
            <li class="skill-item"><i class="fas fa-table"></i> NumPy · Pandas</li>
            <li class="skill-item"><i class="fas fa-bolt"></i> einops · Lightning</li>
            <li class="skill-item"><i class="fas fa-ellipsis"></i> etc.</li>
          </ul>
        </div>

        <div class="skill-category reveal">
          <h3 class="skill-category__title"><i class="fas fa-waveform-lines"></i> Audio / Vision</h3>
          <ul class="skill-list">
            <li class="skill-item"><i class="fas fa-music"></i> librosa</li>
            <li class="skill-item"><i class="fas fa-camera"></i> OpenCV</li>
            <li class="skill-item"><i class="fas fa-dinosaur"></i> DINO · CLIP</li>
            <li class="skill-item"><i class="fas fa-ellipsis"></i> etc.</li>
          </ul>
        </div>

        <div class="skill-category reveal">
          <h3 class="skill-category__title"><i class="fas fa-wrench"></i> Tools</h3>
          <ul class="skill-list">
            <li class="skill-item"><i class="fab fa-git-alt"></i> Git</li>
            <li class="skill-item"><i class="fab fa-docker"></i> Docker · Singularity</li>
            <li class="skill-item"><i class="fas fa-server"></i> HPC · SLURM</li>
            <li class="skill-item"><i class="fas fa-chart-bar"></i> W&amp;B</li>
            <li class="skill-item"><i class="fas fa-book-open"></i> Jupyter · LaTeX</li>
            <li class="skill-item"><i class="fas fa-chart-pie"></i> Power BI</li>
            <li class="skill-item"><i class="fas fa-ellipsis"></i> etc.</li>
          </ul>
        </div>

      </div>
    </div>
  </section>
```

- [ ] **Step 2: Append skills CSS**

```css
/* ============================================================
   SKILLS
   ============================================================ */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}
.skill-category {
  padding: 24px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}
.skill-category__title {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
}
.skill-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.skill-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: var(--color-text);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  transition: background var(--transition);
}
.skill-item:hover { background: var(--color-surface); }
.skill-item i {
  color: var(--color-accent);
  width: 16px;
  text-align: center;
  font-size: 0.9rem;
}
.skill-icon-text {
  color: var(--color-accent);
  width: 16px;
  text-align: center;
  font-weight: 700;
}
```

- [ ] **Step 3: Verify in browser**

Expect: 4 skill category cards in grid, each with icons and skill items. Items highlight on hover.

---

## Task 9: Experience + Teaching Sections

**Files:**
- Modify: `index.html`
- Append: `assets/css/style.css`

- [ ] **Step 1: Add experience HTML after skills**

```html
  <!-- EXPERIENCE -->
  <section id="experience">
    <div class="container">
      <p class="section-label">Background</p>
      <h2 class="section-title">Experience</h2>
      <div class="timeline">

        <div class="timeline-item reveal">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="timeline-card__header">
              <div>
                <h3 class="timeline-card__title">PhD Candidate</h3>
                <p class="timeline-card__org"><a href="https://www.upf.edu" target="_blank" rel="noopener">Universitat Pompeu Fabra</a> · Barcelona</p>
              </div>
              <span class="timeline-card__date">Nov 2022 – present</span>
            </div>
            <p class="timeline-card__desc">Researching audio-visual sound source localization in the IMVA group. Advisors: Gloria Haro (UPF) and Magdalena Fuentes (NYU). FPI doctoral scholarship. Part of the MuVAU project (Spanish Ministry of Science).</p>
            <div class="timeline-card__tags">
              <span class="badge">Deep Learning</span><span class="badge">Audio-Visual</span><span class="badge">Research</span>
            </div>
          </div>
        </div>

        <div class="timeline-item reveal">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="timeline-card__header">
              <div>
                <h3 class="timeline-card__title">Visiting Scholar</h3>
                <p class="timeline-card__org"><a href="https://steinhardt.nyu.edu/departments/music-and-performing-arts-professions/research/marl" target="_blank" rel="noopener">NYU MARL</a> · New York</p>
              </div>
              <span class="timeline-card__date">2024</span>
            </div>
            <p class="timeline-card__desc">Collaborated with Magdalena Fuentes on sound localization research. Culminated in ICASSP 2025 publication.</p>
            <div class="timeline-card__tags">
              <span class="badge">Research</span><span class="badge">Collaboration</span>
            </div>
          </div>
        </div>

        <div class="timeline-item reveal">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="timeline-card__header">
              <div>
                <h3 class="timeline-card__title">Data Scientist</h3>
                <p class="timeline-card__org">Schneider Electric · Barcelona</p>
              </div>
              <span class="timeline-card__date">2021 – 2022</span>
            </div>
            <p class="timeline-card__desc">Led predictive modeling using Salesforce data to assess offer acceptance probabilities. Contributed to AI conversational agent development. Served as global AI consultant.</p>
            <div class="timeline-card__tags">
              <span class="badge">ML</span><span class="badge">NLP</span><span class="badge">Consulting</span>
            </div>
          </div>
        </div>

        <div class="timeline-item reveal">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="timeline-card__header">
              <div>
                <h3 class="timeline-card__title">AI/NLP Engineer → Data Scientist</h3>
                <p class="timeline-card__org">DRIVING01 · Barcelona</p>
              </div>
              <span class="timeline-card__date">2019 – 2021</span>
            </div>
            <p class="timeline-card__desc">Built AI conversational agents for real estate and Liceu using NLP and neural networks. Later developed ML predictive models for Chupa Chups, COMSA Service, and real estate. Created Power BI dashboards.</p>
            <div class="timeline-card__tags">
              <span class="badge">NLP</span><span class="badge">ML</span><span class="badge">Power BI</span>
            </div>
          </div>
        </div>

      </div>

      <div class="service-block reveal">
        <h3 class="service-block__title">Service</h3>
        <ul class="service-list">
          <li><i class="fas fa-users"></i> <strong>Organizing Committee</strong> — <a href="https://lamir-workshop.github.io" target="_blank" rel="noopener">LAMIR 2024</a></li>
          <li><i class="fas fa-code-branch"></i> <strong>Hackathon Organization</strong> — <a href="https://lamir-workshop.github.io" target="_blank" rel="noopener">LAMIR 2024</a></li>
          <li><i class="fas fa-check-double"></i> <strong>Reviewer</strong> — <a href="https://lamir-workshop.github.io" target="_blank" rel="noopener">LAMIR 2024</a></li>
        </ul>
      </div>
    </div>
  </section>

  <!-- TEACHING -->
  <section id="teaching">
    <div class="container">
      <p class="section-label">Education</p>
      <h2 class="section-title">Teaching</h2>
      <div class="teaching-card reveal">
        <div class="teaching-card__icon"><i class="fas fa-chalkboard-user"></i></div>
        <div class="teaching-card__body">
          <h3>Calculus II (23952) — Labs &amp; Seminars</h3>
          <p class="teaching-card__org">Universitat Pompeu Fabra · Barcelona</p>
          <p class="teaching-card__period">Jan–March 2022 · 2023 · 2024 · 2025 <span class="badge">4 years</span></p>
          <p class="teaching-card__desc">Teaching assistant for laboratory sessions and seminars. Topics: multivariable functions, domain and image, curves and surfaces, partial derivatives, tangent subspaces, Taylor approximation, multiple integration, and gradient descent optimization.</p>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Append experience + teaching CSS**

```css
/* ============================================================
   EXPERIENCE TIMELINE
   ============================================================ */
.timeline {
  position: relative;
  padding-left: 32px;
  margin-bottom: 48px;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 8px; top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--color-accent), transparent);
}
.timeline-item {
  position: relative;
  margin-bottom: 32px;
}
.timeline-dot {
  position: absolute;
  left: -28px; top: 20px;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  border: 2px solid var(--color-bg);
  box-shadow: 0 0 0 2px var(--color-accent);
}
.timeline-card {
  padding: 24px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: box-shadow var(--transition);
}
.timeline-card:hover { box-shadow: var(--shadow-md); }
.timeline-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.timeline-card__title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
}
.timeline-card__org {
  font-size: 0.875rem;
  color: var(--color-muted);
  margin-top: 2px;
}
.timeline-card__org a { color: var(--color-muted); }
.timeline-card__org a:hover { color: var(--color-accent); }
.timeline-card__date {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--color-muted);
  white-space: nowrap;
  background: var(--color-surface);
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
}
.timeline-card__desc {
  font-size: 0.9rem;
  color: var(--color-muted);
  margin-bottom: 12px;
  line-height: 1.65;
}
.timeline-card__tags { display: flex; flex-wrap: wrap; gap: 6px; }

.service-block { margin-top: 8px; }
.service-block__title {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-muted);
  font-family: var(--font-mono);
  margin-bottom: 12px;
}
.service-list { display: flex; flex-direction: column; gap: 10px; }
.service-list li {
  display: flex; align-items: center; gap: 10px;
  font-size: 0.9rem; color: var(--color-text);
}
.service-list li i { color: var(--color-accent); width: 16px; }

/* ============================================================
   TEACHING
   ============================================================ */
.teaching-card {
  display: flex;
  gap: 24px;
  padding: 32px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  align-items: flex-start;
}
.teaching-card__icon {
  font-size: 2rem;
  color: var(--color-accent);
  flex-shrink: 0;
  width: 48px;
  text-align: center;
  padding-top: 4px;
}
.teaching-card__body h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 4px;
}
.teaching-card__org {
  font-size: 0.875rem;
  color: var(--color-muted);
  margin-bottom: 6px;
}
.teaching-card__period {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--color-muted);
  margin-bottom: 12px;
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
}
.teaching-card__desc {
  font-size: 0.9rem;
  color: var(--color-muted);
  line-height: 1.7;
}

@media (max-width: 600px) {
  .timeline { padding-left: 20px; }
  .teaching-card { flex-direction: column; }
}
```

- [ ] **Step 3: Verify in browser**

Expect: vertical timeline with 4 experience entries, accent dots, date badges. Service section. Teaching card with icon.

---

## Task 10: Contact Section + Footer

**Files:**
- Modify: `index.html`
- Append: `assets/css/style.css`

- [ ] **Step 1: Add contact + footer HTML**

```html
  <!-- CONTACT -->
  <section id="contact">
    <div class="container contact__inner">
      <p class="section-label">Get in Touch</p>
      <h2 class="section-title">Contact</h2>
      <p class="contact__sub reveal">Interested in collaboration, research, or just want to chat about audio-visual ML? Reach out.</p>
      <div class="contact__links reveal">
        <a href="mailto:xavier.juanola@upf.edu" class="contact-link">
          <i class="fas fa-envelope"></i>
          <span>xavier.juanola@upf.edu</span>
        </a>
        <a href="https://scholar.google.com/citations?user=8RTQAbMAAAAJ&hl=en" target="_blank" rel="noopener" class="contact-link">
          <i class="fas fa-graduation-cap"></i>
          <span>Google Scholar</span>
        </a>
        <a href="https://github.com/xavijuanola" target="_blank" rel="noopener" class="contact-link">
          <i class="fab fa-github"></i>
          <span>xavijuanola</span>
        </a>
        <a href="https://linkedin.com/in/xavijuanola" target="_blank" rel="noopener" class="contact-link">
          <i class="fab fa-linkedin-in"></i>
          <span>xavijuanola</span>
        </a>
      </div>
      <div class="reveal" style="margin-top:32px;">
        <a href="cv/Academic_CV_Xavier_Juanola.pdf" target="_blank" class="btn btn-primary btn-lg">
          <i class="fas fa-file-alt"></i> Download CV
        </a>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__name">Xavier Juanola Molet</p>
      <p class="footer__copy">PhD Candidate · UPF · Barcelona</p>
      <div class="footer__socials">
        <a href="https://scholar.google.com/citations?user=8RTQAbMAAAAJ&hl=en" target="_blank" rel="noopener"><i class="fas fa-graduation-cap"></i></a>
        <a href="https://github.com/xavijuanola" target="_blank" rel="noopener"><i class="fab fa-github"></i></a>
        <a href="https://linkedin.com/in/xavijuanola" target="_blank" rel="noopener"><i class="fab fa-linkedin-in"></i></a>
        <a href="mailto:xavier.juanola@upf.edu"><i class="fas fa-envelope"></i></a>
      </div>
    </div>
  </footer>
```

- [ ] **Step 2: Append contact + footer CSS**

```css
/* ============================================================
   CONTACT
   ============================================================ */
.contact__inner { text-align: center; }
.contact__sub {
  color: var(--color-muted);
  max-width: 480px;
  margin: 0 auto 36px;
}
.contact__links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
}
.contact-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-weight: 500;
  font-size: 0.9rem;
  transition: all var(--transition);
  background: var(--color-bg);
}
.contact-link i { color: var(--color-accent); font-size: 1.1rem; }
.contact-link:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}
.btn-lg { padding: 14px 32px; font-size: 1rem; }

/* ============================================================
   FOOTER
   ============================================================ */
.footer {
  background: var(--color-hero-bg);
  padding: 40px 0;
  text-align: center;
}
.footer__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.footer__name {
  font-weight: 700;
  color: var(--color-hero-text);
  font-size: 1rem;
}
.footer__copy {
  font-size: 0.8rem;
  color: var(--color-hero-muted);
  font-family: var(--font-mono);
}
.footer__socials {
  display: flex;
  gap: 16px;
  margin-top: 12px;
}
.footer__socials a {
  color: var(--color-hero-muted);
  font-size: 1.1rem;
  transition: color var(--transition);
}
.footer__socials a:hover { color: var(--color-accent-light); }
```

- [ ] **Step 3: Verify in browser**

Expect: contact section centered with 4 contact link buttons, CV download button, dark footer.

---

## Task 11: Blog Index Page

**Files:**
- Write: `blog/index.html`
- Append: `assets/css/style.css` (blog styles)

- [ ] **Step 1: Write blog/index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog — Xavier Juanola Molet</title>
  <meta name="description" content="Notes and thoughts on audio-visual ML, research, and career from Xavier Juanola Molet.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
  <nav class="navbar scrolled" id="navbar">
    <div class="container navbar__inner">
      <a href="../index.html" class="navbar__logo" style="color:var(--color-text);">XJ<span class="accent">.</span></a>
      <ul class="navbar__links" id="navLinks" style="display:flex;">
        <li><a href="../index.html#about" style="color:var(--color-muted);">About</a></li>
        <li><a href="../index.html#publications" style="color:var(--color-muted);">Publications</a></li>
        <li><a href="../index.html#projects" style="color:var(--color-muted);">Projects</a></li>
        <li><a href="index.html" style="color:var(--color-accent);font-weight:700;">Blog</a></li>
        <li><a href="../index.html#contact" class="btn btn-primary" style="padding:8px 18px;">Contact</a></li>
      </ul>
      <button class="navbar__hamburger" id="hamburger" aria-label="Toggle menu">
        <span style="background:var(--color-text);"></span>
        <span style="background:var(--color-text);"></span>
        <span style="background:var(--color-text);"></span>
      </button>
    </div>
  </nav>

  <main class="blog-main">
    <div class="container">
      <div class="blog-header">
        <p class="section-label">Writing</p>
        <h1 class="blog-header__title">Notes &amp; Blog</h1>
        <p class="blog-header__sub">Thoughts on audio-visual ML, research methods, and career paths in AI.</p>
      </div>

      <div class="blog-grid">

        <a href="post-1-vssl-intro.html" class="blog-card">
          <div class="blog-card__meta">
            <span class="badge">Research</span>
            <span class="blog-card__date">April 2026</span>
          </div>
          <h2 class="blog-card__title">What is Audio-Visual Sound Source Localization?</h2>
          <p class="blog-card__excerpt">An accessible introduction to the task of locating where sounds come from in a video — and why it's harder than it sounds.</p>
          <span class="blog-card__read">Read more <i class="fas fa-arrow-right"></i></span>
        </a>

        <a href="post-2-silence-matters.html" class="blog-card">
          <div class="blog-card__meta">
            <span class="badge">Research Insight</span>
            <span class="blog-card__date">April 2026</span>
          </div>
          <h2 class="blog-card__title">Why Silence Matters in Sound Localization Models</h2>
          <p class="blog-card__excerpt">Most state-of-the-art models fail when there's nothing to hear. Here's why that matters and what we can do about it.</p>
          <span class="blog-card__read">Read more <i class="fas fa-arrow-right"></i></span>
        </a>

        <a href="post-3-physics-to-ai.html" class="blog-card">
          <div class="blog-card__meta">
            <span class="badge">Career</span>
            <span class="blog-card__date">April 2026</span>
          </div>
          <h2 class="blog-card__title">From Physics to AI: My Unconventional PhD Path</h2>
          <p class="blog-card__excerpt">How a degree in Theoretical Physics, a stint in astrophysics, and 3 years in industry led me to a PhD in machine learning.</p>
          <span class="blog-card__read">Read more <i class="fas fa-arrow-right"></i></span>
        </a>

      </div>
    </div>
  </main>

  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__name">Xavier Juanola Molet</p>
      <p class="footer__copy">PhD Candidate · UPF · Barcelona</p>
      <div class="footer__socials">
        <a href="https://scholar.google.com/citations?user=8RTQAbMAAAAJ&hl=en" target="_blank" rel="noopener"><i class="fas fa-graduation-cap"></i></a>
        <a href="https://github.com/xavijuanola" target="_blank" rel="noopener"><i class="fab fa-github"></i></a>
        <a href="https://linkedin.com/in/xavijuanola" target="_blank" rel="noopener"><i class="fab fa-linkedin-in"></i></a>
        <a href="mailto:xavier.juanola@upf.edu"><i class="fas fa-envelope"></i></a>
      </div>
    </div>
  </footer>

  <script src="../assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Append blog CSS to style.css**

```css
/* ============================================================
   BLOG
   ============================================================ */
.blog-main {
  padding-top: 120px;
  min-height: 80vh;
}
.blog-header {
  margin-bottom: 48px;
}
.blog-header__title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 12px;
}
.blog-header__sub {
  color: var(--color-muted);
  font-size: 1.05rem;
  max-width: 560px;
}
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 80px;
}
.blog-card {
  display: flex;
  flex-direction: column;
  padding: 28px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  transition: all var(--transition);
}
.blog-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  color: var(--color-text);
}
.blog-card__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.blog-card__date {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-muted);
}
.blog-card__title {
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 10px;
  color: var(--color-text);
}
.blog-card__excerpt {
  font-size: 0.88rem;
  color: var(--color-muted);
  line-height: 1.65;
  flex: 1;
  margin-bottom: 16px;
}
.blog-card__read {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-accent);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
}

/* ============================================================
   BLOG POST PAGE
   ============================================================ */
.post-main {
  padding-top: 120px;
  min-height: 80vh;
}
.post-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px 80px;
}
.post-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--color-muted);
  margin-bottom: 32px;
  transition: color var(--transition);
}
.post-back:hover { color: var(--color-accent); }
.post-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.post-date {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-muted);
}
.post-title {
  font-size: clamp(1.75rem, 5vw, 2.75rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--color-text);
  margin-bottom: 24px;
}
.post-author {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 40px;
}
.post-author img {
  width: 40px; height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.post-author__name { font-weight: 600; font-size: 0.9rem; }
.post-author__role { font-size: 0.8rem; color: var(--color-muted); }
.post-content {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--color-text);
}
.post-content h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 40px 0 16px;
  color: var(--color-text);
}
.post-content h3 {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 28px 0 12px;
}
.post-content p { margin-bottom: 20px; color: var(--color-muted); }
.post-content strong { color: var(--color-text); }
.post-content a { color: var(--color-accent); font-weight: 500; }
.post-content ul, .post-content ol {
  margin: 0 0 20px 24px;
  color: var(--color-muted);
}
.post-content li { margin-bottom: 8px; line-height: 1.7; }
.post-content blockquote {
  margin: 24px 0;
  padding: 16px 20px;
  border-left: 3px solid var(--color-accent);
  background: rgba(99,102,241,0.05);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-style: italic;
  color: var(--color-text);
}
.post-content code {
  font-family: var(--font-mono);
  font-size: 0.88em;
  background: var(--color-surface);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--color-accent);
}
```

- [ ] **Step 3: Verify blog index in browser**

Open `http://localhost:8080/blog/index.html`. Expect: 3 blog card grid, sticky white navbar, footer.

---

## Task 12: Blog Post 1 — What is VSSL?

**Files:**
- Write: `blog/post-1-vssl-intro.html`

- [ ] **Step 1: Write post-1-vssl-intro.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>What is Audio-Visual Sound Source Localization? — Xavier Juanola Molet</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
  <nav class="navbar scrolled" id="navbar">
    <div class="container navbar__inner">
      <a href="../index.html" class="navbar__logo" style="color:var(--color-text);">XJ<span class="accent">.</span></a>
      <ul class="navbar__links" id="navLinks" style="display:flex;">
        <li><a href="../index.html#publications" style="color:var(--color-muted);">Publications</a></li>
        <li><a href="index.html" style="color:var(--color-accent);font-weight:700;">Blog</a></li>
        <li><a href="../index.html#contact" class="btn btn-primary" style="padding:8px 18px;">Contact</a></li>
      </ul>
    </div>
  </nav>

  <main class="post-main">
    <div class="post-container">
      <a href="index.html" class="post-back"><i class="fas fa-arrow-left"></i> Back to Blog</a>
      <div class="post-meta">
        <span class="badge">Research</span>
        <span class="post-date">April 2026</span>
      </div>
      <h1 class="post-title">What is Audio-Visual Sound Source Localization?</h1>
      <div class="post-author">
        <img src="../assets/images/profile.png" alt="Xavier Juanola Molet">
        <div>
          <p class="post-author__name">Xavier Juanola Molet</p>
          <p class="post-author__role">PhD Candidate · UPF</p>
        </div>
      </div>
      <div class="post-content">
        <p>Imagine you're watching a video of a busy street. A car honks, a dog barks, someone plays guitar in the background. Your brain instantly knows where each sound is coming from. You don't have to think about it — you just <em>see</em> it. This intuitive ability is what the field of <strong>Audio-Visual Sound Source Localization (VSSL)</strong> tries to teach computers.</p>

        <h2>The Problem</h2>
        <p>Given a video frame and its corresponding audio, the goal of VSSL is to produce a <strong>heatmap</strong> — a spatial map showing the probability that each pixel in the image is the source of the current sound. If a dog is barking, the heatmap should light up around the dog. If a guitar is playing, it should highlight the guitarist's hands.</p>
        <p>This sounds simple, but it's deceptively hard. The model needs to learn, without any human labels, that certain visual patterns tend to produce certain sounds — and that these correspondences are meaningful even across very different scenes and contexts.</p>

        <h2>Why Does It Matter?</h2>
        <p>VSSL has applications across a surprising range of domains:</p>
        <ul>
          <li><strong>Robotics</strong> — a robot that can identify where sounds come from can navigate and interact with its environment more naturally</li>
          <li><strong>Accessibility</strong> — sound localization can help create richer captions or spatial audio descriptions for people with hearing impairments</li>
          <li><strong>Video understanding</strong> — knowing what's making a sound helps a model understand the semantics of a scene at a deeper level</li>
          <li><strong>Audio-visual editing</strong> — you can't edit what you can't find</li>
        </ul>

        <h2>How Do Current Models Work?</h2>
        <p>Most state-of-the-art VSSL models are trained in a <strong>self-supervised</strong> way — they don't need labeled data. Instead, they rely on a simple assumption: in natural videos, what you see and what you hear are semantically related. A video of a piano being played will have audio that sounds like a piano.</p>
        <p>The key ingredient is <strong>contrastive learning</strong>. The model learns to map audio and visual representations into a shared embedding space, where matching audio-visual pairs are close together and mismatched pairs are far apart. At inference time, the model generates a similarity map between the audio embedding and each spatial location in the image — the brighter the location, the more likely it is the sound source.</p>

        <h2>What's Still Broken</h2>
        <p>Despite impressive results on standard benchmarks, current VSSL models have a critical blind spot: <strong>they don't handle negative audio well</strong>. What happens when there's silence? Or noise? Or a sound coming from off-screen?</p>
        <blockquote>Most models still "see" a sound source even when they hear nothing. They're pattern-matching visual content, not truly localizing audio.</blockquote>
        <p>This is exactly the problem my research addresses. In my work on <a href="../index.html#publications">SSL-SaN</a>, we introduce training strategies and evaluation metrics that explicitly account for negative audio — making models more robust and more honest about what they can and cannot localize.</p>

        <h2>Conclusion</h2>
        <p>Audio-Visual Sound Source Localization is a fascinating intersection of computer vision, audio processing, and self-supervised learning. It's a task that seems easy for humans but remains genuinely hard for machines — especially in the messy, ambiguous conditions of the real world. If you're curious to learn more, check out my <a href="../index.html#publications">publications</a> or <a href="post-2-silence-matters.html">read about why silence breaks most models</a>.</p>
      </div>
    </div>
  </main>

  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__name">Xavier Juanola Molet</p>
      <p class="footer__copy">PhD Candidate · UPF · Barcelona</p>
      <div class="footer__socials">
        <a href="https://scholar.google.com/citations?user=8RTQAbMAAAAJ&hl=en" target="_blank" rel="noopener"><i class="fas fa-graduation-cap"></i></a>
        <a href="https://github.com/xavijuanola" target="_blank" rel="noopener"><i class="fab fa-github"></i></a>
        <a href="https://linkedin.com/in/xavijuanola" target="_blank" rel="noopener"><i class="fab fa-linkedin-in"></i></a>
        <a href="mailto:xavier.juanola@upf.edu"><i class="fas fa-envelope"></i></a>
      </div>
    </div>
  </footer>
  <script src="../assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify**

Open `http://localhost:8080/blog/post-1-vssl-intro.html`. Expect: clean article layout, back button, author block, structured content with headings, blockquote, links.

---

## Task 13: Blog Post 2 — Why Silence Matters

**Files:**
- Write: `blog/post-2-silence-matters.html`

- [ ] **Step 1: Write post-2-silence-matters.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Why Silence Matters in Sound Localization Models — Xavier Juanola Molet</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
  <nav class="navbar scrolled" id="navbar">
    <div class="container navbar__inner">
      <a href="../index.html" class="navbar__logo" style="color:var(--color-text);">XJ<span class="accent">.</span></a>
      <ul class="navbar__links" id="navLinks" style="display:flex;">
        <li><a href="../index.html#publications" style="color:var(--color-muted);">Publications</a></li>
        <li><a href="index.html" style="color:var(--color-accent);font-weight:700;">Blog</a></li>
        <li><a href="../index.html#contact" class="btn btn-primary" style="padding:8px 18px;">Contact</a></li>
      </ul>
    </div>
  </nav>

  <main class="post-main">
    <div class="post-container">
      <a href="index.html" class="post-back"><i class="fas fa-arrow-left"></i> Back to Blog</a>
      <div class="post-meta">
        <span class="badge">Research Insight</span>
        <span class="post-date">April 2026</span>
      </div>
      <h1 class="post-title">Why Silence Matters in Sound Localization Models</h1>
      <div class="post-author">
        <img src="../assets/images/profile.png" alt="Xavier Juanola Molet">
        <div>
          <p class="post-author__name">Xavier Juanola Molet</p>
          <p class="post-author__role">PhD Candidate · UPF</p>
        </div>
      </div>
      <div class="post-content">
        <p>One of the first things you learn when building a machine learning system is that models fail in surprising ways at the boundaries of their training distribution. For <strong>Visual Sound Source Localization (VSSL)</strong> models, one of those surprising failure modes is deceptively simple: <em>what happens when there's nothing to hear?</em></p>

        <h2>The Assumption Buried in Every Benchmark</h2>
        <p>The standard VSSL evaluation protocol assumes that the audio always corresponds to something visible in the image — a dog barking at a dog, a piano playing next to a pianist. This is called a <strong>positive audio</strong> case. Models are trained and evaluated almost exclusively on these positive cases.</p>
        <p>But the real world isn't so clean. Audio can be:</p>
        <ul>
          <li><strong>Silence</strong> — nothing is making a sound</li>
          <li><strong>Noise</strong> — ambient sound with no meaningful source</li>
          <li><strong>Offscreen</strong> — the sound source exists but is outside the camera frame</li>
        </ul>
        <p>We call these <strong>negative audio</strong> cases. And when we tested state-of-the-art models on them, the results were revealing.</p>

        <h2>What We Found</h2>
        <p>In our work at UPF and NYU, we evaluated a wide range of SOTA VSSL models using negative audio inputs. The finding was consistent: <strong>most models confidently localize a "sound source" even when the audio is pure silence or random noise</strong>.</p>
        <blockquote>These models aren't localizing audio. They're localizing visually salient regions — and using audio as a justification after the fact.</blockquote>
        <p>This is a significant problem. It means that standard benchmarks overestimate real-world model performance. A model that scores well on positive-only evaluation might be completely useless when deployed in conditions where negative audio is possible — which is most real-world scenarios.</p>

        <h2>Why This Happens</h2>
        <p>The root cause is in the training signal. Self-supervised VSSL models learn to find correlations between audio and visual features. But because they're only ever trained on positive pairs, they learn to always produce a localization output — there's no mechanism to say "I don't hear anything relevant here."</p>
        <p>The model has never learned to <em>abstain</em>. It doesn't know what silence looks like — or rather, it doesn't know that silence should produce a flat, uninformative heatmap.</p>

        <h2>Our Solution: Learning from Silence and Noise</h2>
        <p>In <a href="../index.html#publications">SSL-SaN</a> (accepted to BMVC 2025), we propose a simple but effective training strategy: include silence and noise in the training set as <strong>negative examples</strong>. When the model sees silence, it should learn to produce a near-uniform heatmap — no confident localization.</p>
        <p>We also introduce new evaluation metrics that measure a model's performance on <em>both</em> positive and negative audio simultaneously. This gives a much more honest picture of what these models can actually do.</p>
        <p>The results are promising: SSL-SaN achieves state-of-the-art performance among self-supervised models on standard benchmarks, while being dramatically more robust to negative audio.</p>

        <h2>Why This Matters for Industry</h2>
        <p>If you're building a system that relies on audio-visual understanding — robot perception, smart surveillance, accessibility tools — you need models that know when to say "I don't know." A model that hallucinates sound sources under silence is not just inaccurate; it can be actively misleading.</p>
        <p>The lesson generalizes beyond VSSL: always test your model at the boundaries of its training distribution, and specifically with inputs that should produce null or negative outputs. The failures there are often the most informative.</p>
      </div>
    </div>
  </main>

  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__name">Xavier Juanola Molet</p>
      <p class="footer__copy">PhD Candidate · UPF · Barcelona</p>
      <div class="footer__socials">
        <a href="https://scholar.google.com/citations?user=8RTQAbMAAAAJ&hl=en" target="_blank" rel="noopener"><i class="fas fa-graduation-cap"></i></a>
        <a href="https://github.com/xavijuanola" target="_blank" rel="noopener"><i class="fab fa-github"></i></a>
        <a href="https://linkedin.com/in/xavijuanola" target="_blank" rel="noopener"><i class="fab fa-linkedin-in"></i></a>
        <a href="mailto:xavier.juanola@upf.edu"><i class="fas fa-envelope"></i></a>
      </div>
    </div>
  </footer>
  <script src="../assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify**

Open `http://localhost:8080/blog/post-2-silence-matters.html`. Expect: clean post layout, blockquote styled, links to publications work.

---

## Task 14: Blog Post 3 — Physics to AI

**Files:**
- Write: `blog/post-3-physics-to-ai.html`

- [ ] **Step 1: Write post-3-physics-to-ai.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>From Physics to AI: My Unconventional PhD Path — Xavier Juanola Molet</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
  <nav class="navbar scrolled" id="navbar">
    <div class="container navbar__inner">
      <a href="../index.html" class="navbar__logo" style="color:var(--color-text);">XJ<span class="accent">.</span></a>
      <ul class="navbar__links" id="navLinks" style="display:flex;">
        <li><a href="../index.html#publications" style="color:var(--color-muted);">Publications</a></li>
        <li><a href="index.html" style="color:var(--color-accent);font-weight:700;">Blog</a></li>
        <li><a href="../index.html#contact" class="btn btn-primary" style="padding:8px 18px;">Contact</a></li>
      </ul>
    </div>
  </nav>

  <main class="post-main">
    <div class="post-container">
      <a href="index.html" class="post-back"><i class="fas fa-arrow-left"></i> Back to Blog</a>
      <div class="post-meta">
        <span class="badge">Career</span>
        <span class="post-date">April 2026</span>
      </div>
      <h1 class="post-title">From Physics to AI: My Unconventional PhD Path</h1>
      <div class="post-author">
        <img src="../assets/images/profile.png" alt="Xavier Juanola Molet">
        <div>
          <p class="post-author__name">Xavier Juanola Molet</p>
          <p class="post-author__role">PhD Candidate · UPF</p>
        </div>
      </div>
      <div class="post-content">
        <p>People sometimes raise an eyebrow when they see my CV. A degree in Theoretical Physics. A master's in AI. Another master's in Astrophysics. Three years as a Data Scientist and AI Engineer in industry. And now a PhD in machine learning. It's not the straightest line.</p>
        <p>But when I look back at it, every step was necessary. Here's what I learned along the way — and what I'd tell anyone considering a similarly winding path into AI research.</p>

        <h2>Starting with Physics</h2>
        <p>I studied <strong>Theoretical Physics at Universitat de Barcelona</strong> from 2014 to 2019. People assume physics is a detour on the way to AI. I'd argue it's one of the best foundations you can have.</p>
        <p>Physics teaches you to think in terms of systems, constraints, and approximations. You learn to build minimal models that capture the essence of a phenomenon without overfitting to its details. You get comfortable with mathematics not as a tool, but as a language for describing the world. These habits of mind transfer directly to machine learning research.</p>

        <h2>Two Masters, Two Perspectives</h2>
        <p>After my physics degree, I pursued a <strong>Master's in Intelligent Interactive Systems at UPF</strong>. This was my formal entry into AI — neural networks, NLP, computer vision, the works. It gave me technical depth in the field I wanted to work in.</p>
        <p>I then did a second master's in <strong>Astrophysics and Cosmology at UAB</strong>. Some people thought this was a step backward. It wasn't. Working on cosmological data — huge, noisy, high-dimensional — forced me to think carefully about statistical rigor, model assumptions, and the difference between fitting data and understanding it. These are lessons that have made me a better ML researcher.</p>

        <h2>Three Years in Industry</h2>
        <p>Before starting my PhD, I spent three years working as an <strong>AI Engineer and Data Scientist</strong> — first at DRIVING01, building NLP conversational agents for companies like Liceu and real estate firms, then at Schneider Electric as a global AI consultant.</p>
        <blockquote>Industry taught me what research never quite can: what it feels like when your model fails at 2am on a production system with real users depending on it.</blockquote>
        <p>That experience changed how I think about robustness, reliability, and the gap between benchmark performance and real-world utility. It's directly relevant to my current research on model evaluation.</p>

        <h2>The PhD Decision</h2>
        <p>After industry, I missed the long-form thinking that research allows. I wanted to go deep on a problem instead of shipping quarterly. The opportunity to join UPF's IMVA group with Gloria Haro — working on something at the intersection of computer vision, audio, and self-supervised learning — felt like the right combination of intellectual depth and practical relevance.</p>
        <p>The PhD has been everything I hoped. A visiting stint at <strong>NYU's MARL lab</strong> in 2024, collaborating with Magdalena Fuentes, broadened my network and led to an ICASSP publication. The research questions are genuinely hard and the answers genuinely matter.</p>

        <h2>What the Unconventional Path Gave Me</h2>
        <p>If you're considering a winding path into AI research, here's what I'd say:</p>
        <ul>
          <li><strong>Depth in any rigorous field transfers.</strong> Physics, mathematics, statistics, engineering — they all teach you to think carefully. That skill is rare and valuable in ML.</li>
          <li><strong>Industry experience makes you a better researcher.</strong> You develop instincts for what matters and what doesn't. You know which benchmarks to distrust.</li>
          <li><strong>The "conventional" path is not the only path.</strong> Many of the most interesting researchers I've met came from unexpected places. The field rewards curiosity and rigor more than credentials.</li>
          <li><strong>It's never too late to start.</strong> I was 27 when I started my PhD. That's not late — that's experienced.</li>
        </ul>
        <p>If you're on a similar journey and want to talk about it, <a href="../index.html#contact">reach out</a>. I'm always happy to chat.</p>
      </div>
    </div>
  </main>

  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__name">Xavier Juanola Molet</p>
      <p class="footer__copy">PhD Candidate · UPF · Barcelona</p>
      <div class="footer__socials">
        <a href="https://scholar.google.com/citations?user=8RTQAbMAAAAJ&hl=en" target="_blank" rel="noopener"><i class="fas fa-graduation-cap"></i></a>
        <a href="https://github.com/xavijuanola" target="_blank" rel="noopener"><i class="fab fa-github"></i></a>
        <a href="https://linkedin.com/in/xavijuanola" target="_blank" rel="noopener"><i class="fab fa-linkedin-in"></i></a>
        <a href="mailto:xavier.juanola@upf.edu"><i class="fas fa-envelope"></i></a>
      </div>
    </div>
  </footer>
  <script src="../assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify**

Open `http://localhost:8080/blog/post-3-physics-to-ai.html`. Expect: personal narrative post, blockquote, bullet list, footer links.

---

## Task 15: Final Polish — Responsive + Scroll Reveal wiring

**Files:**
- Append: `assets/css/style.css` (responsive overrides)
- Verify: all `.reveal` classes present on key elements across `index.html`

- [ ] **Step 1: Append final responsive CSS**

```css
/* ============================================================
   RESPONSIVE — global overrides
   ============================================================ */
@media (max-width: 900px) {
  section { padding: 72px 0; }
  .section-title { margin-bottom: 32px; }
}

@media (max-width: 600px) {
  section { padding: 56px 0; }
  .container { padding: 0 16px; }
  .hero__stats { flex-wrap: wrap; gap: 20px; }
  .stat__num { font-size: 1.5rem; }
  .timeline-card__header { flex-direction: column; gap: 8px; }
  .blog-grid { grid-template-columns: 1fr; }
  .projects-grid { grid-template-columns: 1fr; }
  .skills-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 400px) {
  .skills-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Verify scroll reveal elements in index.html**

Check that the following elements have `class="... reveal"`:
- Hero greeting, name, typewriter, bio, cta, stats
- Each pub-card, project-card, skill-category
- Each timeline-item, service-block, teaching-card
- About photo and about text paragraphs
- Contact sub and contact links

If any are missing `reveal`, add the class.

- [ ] **Step 3: Full end-to-end browser test**

```bash
cd /upf/personal_web && python3 -m http.server 8080
```

Checklist:
- [ ] Hero: dark bg, wave animation, typewriter, 3 CTA buttons, 3 stats
- [ ] Navbar: transparent on hero → white on scroll → hamburger on mobile
- [ ] About: photo + bio + education block
- [ ] Publications: 4 cards with correct links, thumbnails
- [ ] Projects: 3 cards with icon links
- [ ] Skills: 4 category blocks
- [ ] Experience: 4 timeline entries + service section
- [ ] Teaching: 1 card
- [ ] Contact: 4 contact links + CV button
- [ ] Footer: dark, social links
- [ ] Blog index: 3 cards
- [ ] Blog posts: all 3 readable, back button works
- [ ] All external links open in new tab
- [ ] No console errors
- [ ] Scroll reveal animations fire on scroll
- [ ] Mobile (resize to 375px): single column, hamburger menu works

---

## Self-Review Against Spec

**Spec coverage check:**
- ✅ Single-page with smooth scroll nav
- ✅ Hero with typewriter, wave bg, stats, CTAs
- ✅ About with bio, education, social links, profile photo
- ✅ Publications: all 4, all links, thumbnails, author bold
- ✅ Projects: 3 with correct links
- ✅ Skills: all 4 categories with correct items and "etc."
- ✅ Experience timeline: all 4 entries
- ✅ Service section: LAMIR 2024
- ✅ Teaching: 4 years, correct dates
- ✅ Blog index + 3 posts written
- ✅ Contact: email + scholar + github + linkedin + CV download
- ✅ Footer: dark, consistent
- ✅ Pure HTML/CSS/JS, no build step
- ✅ Font Awesome + Inter + JetBrains Mono from CDN
- ✅ Mobile responsive
- ✅ CV at `cv/Academic_CV_Xavier_Juanola.pdf`
