🌐 **Language:** **English** | [Versión en Español](README.es.md)

# 🚀 Web Developer Portfolio — SPA

[![View Live Project](https://img.shields.io/badge/🚀_View_Live_Project-007ACC?style=for-the-badge&logo=vercel&logoColor=white)](https://federico-aguirre-portfolio-next-js.vercel.app)

[![Vercel Status](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://federico-aguirre-portfolio-next-js.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PageSpeed](https://img.shields.io/badge/PageSpeed-99%2F100_Desktop-brightgreen?style=for-the-badge&logo=googlechrome&logoColor=white)](https://pagespeed.web.dev/analysis/https-federico-aguirre-portfolio-next-js-vercel-app-en/rw1kyveopj?form_factor=desktop)
[![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)](LICENSE)

> An interactive, high-performance web portfolio built as a **Single Page Application (SPA)** using Next.js 14, focused on universal accessibility (**a11y**), 3D & vector animations, multi-language support (**i18n**), and secure data validation.

---

## ⚡ PageSpeed Benchmarks & Web Vitals Audit

This project was thoroughly audited and optimized at the main thread level, JavaScript bundle footprint, and semantic markup to meet the highest industry standards for modern web performance and accessibility:

| Metric                                    |   Score   |      Status       |
| :---------------------------------------- | :-------: | :---------------: |
| **Performance (Desktop)**                 |  **99%**  |  🟢 Outstanding   |
| **Accessibility (a11y)**                  | **100%**  |    🟢 Perfect     |
| **Best Practices**                        | **100%**  |    🟢 Perfect     |
| **SEO**                                   | **100%**  |    🟢 Perfect     |
| **Agentic Navigation (AI Compatibility)** | **2 / 2** | 🟢 WCAG Compliant |

> 🔗 **[View Official Live Audit & Report on Google PageSpeed Insights](https://pagespeed.web.dev/analysis/https-federico-aguirre-portfolio-next-js-vercel-app-en/rw1kyveopj?form_factor=desktop)**

### 📷 Audit Screenshot (PageSpeed)

[![PageSpeed Audit Score](./public/readMeImages/pagespeed-report-values.png)](https://pagespeed.web.dev/analysis/https-federico-aguirre-portfolio-next-js-vercel-app-en/rw1kyveopj?form_factor=desktop)

[![PageSpeed Audit Score](./public/readMeImages/pagespeed-report-metrics.png)](https://pagespeed.web.dev/analysis/https-federico-aguirre-portfolio-next-js-vercel-app-en/rw1kyveopj?form_factor=desktop)

---

## 🔒 Performance & Accessibility (a11y) Architecture

- 🏎️ **Animation Tree-Shaking with `LazyMotion`:**
  - Reduced **~70% of the initial animation bundle size** by implementing `LazyMotion` with the lightweight `domAnimation` feature set at the `RootLayout` level.
  - Migrated all heavy `<motion.*>` JSX tags to optimized `<m.*>` components to prevent loading the full Framer Motion engine during initial load.
- 🚀 **LCP (Largest Contentful Paint) Optimization:**
  - Eliminated invisible render-blocking states (`opacity: 0` initial state) and layout delay animations _Above the Fold_ in the Hero section, ensuring instant SSR paint.
- ♿ **Agentic Navigation & WCAG Standards:**
  - Strict tab component structure (`role="tablist"`, `role="tab"`, `role="tabpanel"`) and isolation of purely decorative elements using `role="presentation"` and `aria-hidden="true"`.
  - Proper descending semantic heading hierarchy (`h1` ➔ `h2` ➔ `h3`) without visual level skipping.
  - Active motion preference detection (`useReducedMotion`) to prevent motion sickness for users with vestibular sensitivities.
- ⚡ **Hardware Acceleration (GPU Compositing):**
  - Direct CSS composition hints (`will-change: transform, opacity`) ensuring smooth 60 FPS animations without triggering unnecessary Layout Shifts (CLS) or main-thread repaints.

---

## 🛠️ Tech Stack

### Core & Framework

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

### Styling & Animations

![Sass/SCSS](https://img.shields.io/badge/Sass_Modules-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion_LazyMotion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![tsParticles](https://img.shields.io/badge/tsParticles_3D-000000?style=for-the-badge&logo=tsnode&logoColor=white)
![OverlayScrollbars](https://img.shields.io/badge/OverlayScrollbars-007ACC?style=for-the-badge&logo=windowsterminal&logoColor=white)

### State & Forms

![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

### Internationalization & UI Utils

![next-intl](https://img.shields.io/badge/next--intl-000000?style=for-the-badge&logo=i18next&logoColor=white)
![Embla Carousel](https://img.shields.io/badge/Embla_Carousel-000000?style=for-the-badge&logo=target&logoColor=white)

---

## ✨ Key Features

- ⚡ **Seamless SPA Experience:** Continuous navigation across _Home, Projects, About Me_, and _Contact_ without page reloads.
- 🌍 **Internationalization (i18n):**
  - Multi-language support (English / Spanish) powered by `next-intl`.
  - Scroll position retention across locale switches managed through session storage and dynamic state sync.
- 🎡 **Project Carousel & Category Filter:**
  - Categorized showcase (Featured Projects & Lab/Experiments).
  - Responsive slider driven by **Embla Carousel**.
  - Dynamic `/projects/[slug]` routes for detailed project breakdowns, video demos, and live URLs.
- 🎨 **70+ Native TSX Animated Vector Icons (`About Me / Skills`):**
  - Custom interactive iconography built in pure TSX (`m.svg` & `m.path`) using **Framer Motion**.
  - Ultra-lightweight vector micro-interactions tailored to active theme palettes without third-party dependencies.
- 🌌 **3D Particles & Background Animations:**
  - Interactive 3D canvas using `@tsparticles` (implemented via Singleton architecture to prevent memory leaks).
- 🌓 **Dynamic Light / Dark Theme:**
  - Global state powered by **Zustand** with custom glowing drop shadows.
- 🛡️ **Secure Contact Form:**
  - Client and server-side validation enforced with **React Hook Form** and strict **Zod** schema inference.

---

## 💻 Local Installation & Setup

Follow these steps to run the project locally:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Federico-Aguirre/Federico_Aguirre_Portfolio_NextJs.git](https://github.com/Federico-Aguirre/Federico_Aguirre_Portfolio_NextJs.git)
   cd Federico_Aguirre_Portfolio_NextJs
   ```
