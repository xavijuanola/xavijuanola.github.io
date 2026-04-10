# Personal Website Design — Xavier Juanola Molet
**Date:** 2026-04-10  
**Status:** Approved

---

## Overview

A professional personal website for Xavier Juanola Molet, PhD candidate at UPF (Audio-Visual Sound Source Localization). Target audience: academic peers AND industry hiring managers (ML engineer, research scientist roles). Built as pure static HTML/CSS/JS — no build step, deployable to GitHub Pages or Netlify.

---

## Visual Design System

**Aesthetic:** Clean minimalist with dark hero. Modern AI/ML lab feel (DeepMind, OpenAI).

**Colors:**
- Hero background: `#0f172a` (deep navy)
- Accent: `#6366f1` (indigo)
- Body background: `#ffffff`
- Text: `#1e293b`
- Muted text: `#64748b`

**Typography:**
- Headings + body: Inter (Google Fonts, 400/500/700/800)
- Code/tags: JetBrains Mono

**Animations:**
- Hero: typewriter effect cycling roles ("PhD Candidate", "Audio-Visual Researcher", "ML Engineer")
- Hero background: subtle floating audio waveform SVG
- Sections: scroll-triggered fade-in on enter
- Publication/project cards: lift + shadow on hover

**Layout:**
- Max-width 1100px, centered
- Sticky nav: transparent on hero, solid on scroll
- Mobile: hamburger menu, single-column stacks

---

## Site Structure

### Navigation (single-page smooth scroll)
```
Hero → About → Publications → Projects → Skills → Experience → Teaching → Blog → Contact
```

### Separate pages
- `/blog/index.html` — post listing
- `/blog/post-1.html` — individual posts
- `/blog/post-2.html`
- `/blog/post-3.html`

---

## Sections — Content Spec

### Hero
- Name: **Xavier Juanola Molet**
- Typewriter role cycling: "PhD Candidate · UPF" / "Audio-Visual Researcher" / "ML Engineer"
- CTA buttons: [View Publications] [Download CV] [Contact]
- Background: audio waveform SVG animation (subtle, low opacity)

### About
- Bio text (from existing site, improved):
  - BS Theoretical Physics, UB (2014–2019)
  - MS Intelligent Interactive Systems, UPF (2019–2020)
  - MS Astrophysics & Cosmology, UAB (2020–2021)
  - Data Scientist at DRIVING01 (2019–2021) and Schneider Electric (2021–2022)
  - Visiting Scholar at NYU MARL (2024), collaborating with Magdalena Fuentes
  - PhD candidate at UPF since Nov 2022, IMVA group, advisor: Gloria Haro, co-advisor: Magdalena Fuentes
  - Research focus: Audio-Visual Sound Source Localization using multimodal deep learning
  - FPI doctoral scholarship (Spanish Government)
- Profile photo: `assets/images/profile.png`
- Quick stats: 4 publications, 4 talks/presentations, 4 years teaching

### Publications
- Horizontal cards: thumbnail (left) + content (right)
- Fields per card: title (linked), authors (Xavier bold), venue badge, year, icon-links (arXiv, PDF, GitHub, Project, Proceedings)
- Sorted newest first
- Publications:
  1. "Learning from Silence and Noise for Visual Sound Source Localization Models" — BMVC 2025
     - Authors: Xavier Juanola, Giovana Morais, Magdalena Fuentes, Gloria Haro
     - arXiv: https://arxiv.org/abs/2508.21761 | GitHub: https://github.com/xavijuanola/SSL_SaN | Project: https://xavijuanola.github.io/SSL-SaN
     - Thumbnail: `assets/images/publications/SSL_SaN.png`
  2. "Visual Sound Source Localization: Assessing Performance with Both Positive and Negative Audio" — CVPR Workshop (Sight & Sound) 2025
     - Authors: Xavier Juanola, Giovana Morais, Magdalena Fuentes, Gloria Haro
     - PDF: https://sightsound.org/papers/2025/Xavier_Juanola_Visual_Sound_Source_Localization_Assessing_Performance_with_Both_Positive_and_Negative_Audio.pdf | Proceedings: https://sightsound.org/
  3. "A Critical Assessment of Visual Sound Source Localization Models Including Negative Audio" — ICASSP 2025
     - Authors: Xavier Juanola, Gloria Haro, Magdalena Fuentes
     - arXiv: https://arxiv.org/abs/2410.01020 | GitHub: https://github.com/xavijuanola/vssl_eval | Project: https://xavijuanola.github.io/vssleval | Proceedings: https://ieeexplore.ieee.org/document/10890384
     - Thumbnail: `assets/images/publications/vssl_eval.png`
  4. "A Brief Analysis of SLAVC method for Sound Source Localization" — IPOL MLBriefs 2024
     - Authors: Xavier Juanola, Gloria Haro
     - Paper: http://www.ipol.im/pub/art/2024/525/

### Projects
- Cards with: title, description, tags (tech stack), links (GitHub, demo, paper)
- Placeholder GitHub links — user will fill later
- Projects:
  1. **SSL-SaN** — Self-supervised model for sound source localization robust to negative audio (silence, noise, offscreen)
  2. **VSSL Eval** — Extended benchmark + metrics for visual sound source localization evaluation
  3. **SLAVC Analysis** — Interactive analysis & demo of SLAVC sound localization method (IPOL)

### Skills
Categories displayed as icon grid:

**Languages:** Python, MATLAB

**ML/DL:** PyTorch (torchvision, etc.), scikit-learn, HuggingFace, OpenCLIP, timm, NumPy, Pandas, einops, PyTorch Lightning, etc.

**Audio/Vision:** librosa, OpenCV, DINO, CLIP, etc.

**Tools:** Git, Docker, Singularity, HPC (SLURM), W&B, Jupyter, LaTeX, Power BI, etc.

### Experience (vertical timeline)
1. PhD Candidate — UPF (Nov 2022–present)
2. Visiting Scholar — NYU MARL (2024)
3. Data Scientist — Schneider Electric (2021–2022)
4. Data Scientist / BI — DRIVING01 (2021)
5. AI/NLP Engineer — DRIVING01 (2019–2021)

**Research project:** MuVAU (Spanish Government, PI: G. Haro)  
**Grant:** FPI doctoral scholarship

**Service:** LAMIR 2024 — Organizing Committee, Hackathon Organization, Reviewer

### Teaching
- Calculus II (23952), Labs & Seminars, UPF — Jan–March 2022, 2023, 2024, 2025 (4 years)
- Description of course content (multivariable calculus, optimization)

### Blog (3 initial posts)
1. **"What is Audio-Visual Sound Source Localization?"** — accessible intro to research area, what it means, why it matters, real-world applications
2. **"Why Silence Matters in Sound Localization Models"** — key insight from SSL-SaN: models should know when nothing sounds, most SOTA fail this test
3. **"From Physics to AI: My Unconventional PhD Path"** — personal narrative: Physics → Astrophysics → AI → industry → PhD, career advice for industry readers

### Contact
- Email: xavier.juanola@upf.edu
- Links: Google Scholar, GitHub (xavijuanola), LinkedIn (xavijuanola)
- CV download button → `/cv/Academic_CV_Xavier_Juanola.pdf`

---

## File Structure

```
/upf/personal_web/
├── index.html
├── blog/
│   ├── index.html
│   ├── post-1-vssl-intro.html
│   ├── post-2-silence-matters.html
│   └── post-3-physics-to-ai.html
├── cv/
│   └── Academic_CV_Xavier_Juanola.pdf
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── profile.png
│       ├── favicon.ico
│       └── publications/
│           ├── SSL_SaN.png
│           ├── vssl_eval.png
│           └── blank.png
└── docs/
    └── superpowers/specs/
        └── 2026-04-10-personal-website-design.md
```

---

## Technical Notes

- Zero dependencies beyond Google Fonts + Font Awesome (CDN)
- Intersection Observer API for scroll animations
- CSS custom properties for theming
- Fully responsive (mobile-first)
- Semantic HTML5 for accessibility and SEO
- Open Graph meta tags for social sharing
- No build step — open index.html or serve with `python -m http.server`
