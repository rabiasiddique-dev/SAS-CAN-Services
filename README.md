# SAS-CAN Services | Applied HVAC Solutions & Engineering

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Ready-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Design-Mobile--First%20Responsive-00A2E8?style=for-the-badge)](https://github.com/rabiasiddique-dev/SAS-CAN-Services)
[![Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)](https://github.com/rabiasiddique-dev/SAS-CAN-Services)

> **Enterprise-grade applied commercial and industrial HVAC solutions platform.** Designed with precision thermodynamic engineering aesthetics, full-width interactive mega menus, 31-model quick navigation, and full mobile optimization.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Page Directory](#page-directory)
- [Design System & Architecture](#design-system--architecture)
- [Interactive Components](#interactive-components)
- [Directory Structure](#directory-structure)
- [Local Development](#local-development)
- [Deployment on Vercel](#deployment-on-vercel)
- [Engineering Standards](#engineering-standards)
- [Contributing & License](#contributing--license)

---

## 🌟 Overview

**SAS-CAN Services** is a comprehensive corporate web application built for commercial and industrial applied HVAC equipment, technical dispatch, decarbonization engineering, and OEM parts distribution. Inspired by industry benchmarks (such as Daikin Applied, Trane Commercial, and Carrier Applied), the platform provides engineers, architects, mechanical contractors, and facility directors with immediate access to technical specifications, equipment selection tools, and 24/7 service dispatch.

---

## ⚡ Key Features

- **🎯 Precision Mega Menus**: Seamless full-width navigation bars for *Products*, *Industry Solutions*, and *Engineering Resources* with hover debounce (120ms), outside-click dismiss, and keyboard accessibility (Esc-to-close).
- **🚀 Jump-to-Model Quick Selector**: Interactive live search and dropdown selector spanning **31 applied models** (Centrifugal, Magnetic Bearing, Pathfinder, Vision AHUs, Rebel Rooftops, etc.) with instant deep-linking.
- **📱 Responsive Mobile Drawer**: Off-canvas touch-friendly navigation drawer with collapsible accordions, emergency dispatch hotline shortcut, and branded header.
- **🛡️ Custom Brand Integration**: 3D metallic circular HVAC badge emblem integrated seamlessly across headers, footers, mobile menus, and site-wide favicons.
- **❄️ Comprehensive Product Suites**:
  - Magnetic Bearing Centrifugal Chillers (Magnitude®)
  - Air-Cooled & Water-Cooled Screw Chillers (Pathfinder®, Navigator®)
  - Custom Modular Air Handling Units (Vision®, PreciseLine®)
  - High-Efficiency Rooftop Packaged Heat Pumps (Rebel®, RoofPak®)
- **🌱 Decarbonization & ESG Hub**: Thermal electrification roadmaps, low-GWP refrigerants (R-32, R-454B), heat recovery chillers (Templifier®), and LEED v4.1 credits.
- **📍 Real-Time Rep Locator**: Interactive representative search engine supporting ZIP code, city, and state queries.
- **⚙️ OEM Parts Depot & 24/7 Field Service**: Direct booking workflows for preventative maintenance agreements (PMA), chiller overhauls, and factory certified emergency dispatch.

---

## 📁 Page Directory

The project includes **12 fully standalone, responsive HTML5 pages**:

| Page File | Page Title | Core Content & Functionality |
|---|---|---|
| [`index.html`](index.html) | **Homepage** | Hero slider carousel, quick category tiles, technology spotlight, product grid, IAQ banner, BMS controls overview, case studies, news feed, rep search bar, and accreditation badges. |
| [`products.html`](products.html) | **Products Portfolio** | Applied equipment family catalog, capacity matrices, filterable product categories, and brochure downloads. |
| [`chillers.html`](chillers.html) | **Chillers Family** | Magnetic levitation centrifugal, water-cooled screw, air-cooled scroll, and Templifier® heat recovery chillers. |
| [`air-handlers.html`](air-handlers.html) | **Air Handlers** | Vision® indoor custom AHUs, PreciseLine® compact units, energy recovery ventilators (ERV), and HEPA filtration. |
| [`rooftop-systems.html`](rooftop-systems.html) | **Rooftop Systems** | Rebel® inverter heat pumps, RoofPak® high-capacity commercial units (up to 150T), and economizer options. |
| [`industry-solutions.html`](industry-solutions.html) | **Industry Solutions** | Sector-specific engineering: Data Centers, Healthcare (ASHRAE 170), K-12 Education, High-Rise Commercial, Hospitality, and Sports Arenas. |
| [`services.html`](services.html) | **Factory Services** | 24/7/365 emergency field dispatch, turnkey preventative maintenance agreements (PMA), compressor overhauls, and booking form. |
| [`parts.html`](parts.html) | **OEM Parts Depot** | Genuine factory replacement parts catalog (compressor motors, impellers, coils, valves, gaskets, sensors), warranty registration, and expedited shipping. |
| [`decarbonization.html`](decarbonization.html) | **Decarbonization** | Electrification strategies, Net Zero 2050 roadmaps, low-GWP refrigerant transition, and lifecycle carbon analysis. |
| [`resources.html`](resources.html) | **Resources & Tools** | Engineering submittals, BIM / Revit® families, Psychrometric calculators, Whitepapers, Case Studies, and Software tools. |
| [`rep-locator.html`](rep-locator.html) | **Rep Locator** | Searchable directory of certified sales representatives and applied engineering application centers across North America. |
| [`about-us.html`](about-us.html) | **About SAS-CAN** | Corporate heritage, executive mission, ISO 9001 manufacturing facilities, test laboratories, and career opportunities. |

---

## 🎨 Design System & Architecture

The application is architected around **Vanilla CSS3** with a custom design token system:

```css
:root {
  /* Brand Core */
  --navy: #0A2540;          /* Deep Corporate Navy */
  --primary-navy: #0F172A;  /* Rich Contrast Slate */
  --blue: #0077B6;          /* Applied Engineering Blue */
  --cyan: #00A2E8;          /* Active Highlight & Flame Accent */
  --steel-blue: #4A6B82;    /* Subtle Secondary Accent */
  
  /* Backgrounds */
  --bg-white: #FFFFFF;
  --bg-light: #F8FAFC;
  --bg-dark: #0A192F;
  --bg-darker: #060F1E;

  /* Typography */
  --font-heading: 'Montserrat', 'Inter', -apple-system, sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Shadows & Radius */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.12);
  --shadow-lg: 0 12px 36px rgba(0,0,0,0.16);
  --r-sm: 4px;
  --r-md: 8px;
  --r-lg: 16px;
}
```

---

## 🎛️ Interactive Components

### 1. Mega Menu Engine
- Debounced hover activation (120ms delay) prevents erratic menu flickering.
- Positioned absolutely across `100%` viewport width inside a static-anchored header container.
- Full keyboard support: pressing `Escape` closes any active menu.
- Outside-click listener safely closes dropdowns when the user taps anywhere on the document.

### 2. Jump-to-Model Selector
- Instant search filter supporting model names (`WMC`, `Magnitude`, `AWS`, `Vision`, `Rebel`).
- Direct hash navigation (`chillers.html#magnitude`, `rooftop-systems.html#rebel`).

### 3. Hero Carousel Slider
- Dynamic automated slider with touch swiping and interactive navigation controls.
- Optimized hero imagery with accessible fallback typography.

---

## 📂 Directory Structure

```text
SAS-CAN Services/
├── assets/
│   ├── css/
│   │   └── style.css            # Master Design System & Component Styles
│   ├── images/
│   │   ├── hero-airhandlers.jpg # Hero High-Res Imagery
│   │   ├── hero-chiller.jpg     # Chiller Photography
│   │   ├── hero-rooftop.jpg     # Rooftop Equipment Photography
│   │   ├── hero-service.jpg     # Field Service Dispatch Photography
│   │   └── logo.png             # Official 3D Metallic Badge Brand Logo
│   └── js/
│       └── main.js              # Mega Menu, Sliders, Model Jump, & Drawer Logic
├── about-us.html                # About Us & Corporate Heritage
├── air-handlers.html            # Custom Air Handlers
├── chillers.html                # Chillers Family
├── decarbonization.html         # Decarbonization & Heat Pumps
├── index.html                   # Homepage
├── industry-solutions.html      # Vertical Industry Applications
├── parts.html                   # OEM Parts Depot
├── products.html                # Applied Products Catalog
├── rep-locator.html             # Local Representative Locator
├── resources.html               # Engineering Resources & BIM Downloads
├── rooftop-systems.html         # Packaged Rooftops
├── services.html                # 24/7 Field Service & Maintenance
├── serve.js                     # Lightweight Local Development Server (Node.js)
├── vercel.json                  # Vercel Deployment & Route Configuration
├── .gitignore                   # Git Ignore Specification
└── README.md                    # Project Documentation
```

---

## 💻 Local Development

### Option 1: Built-in Node.js Server
The project includes a zero-dependency local static server:
```bash
# Start the server
node serve.js
```
Visit `http://localhost:8080/` in your browser.

### Option 2: Using Any Static Server
```bash
# Using npx serve
npx serve .

# Using Python
python -m http.server 8080
```

---

## 🚀 Deployment on Vercel

The project is fully prepared for instant deployment on [Vercel](https://vercel.com):

### Direct Git Integration (Recommended):
1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete SAS-CAN Services platform with brand logo and mega menus"
   git push -u origin main
   ```
2. Log into [vercel.com](https://vercel.com).
3. Click **"Add New Project"** and import `rabiasiddique-dev/SAS-CAN-Services`.
4. Leave framework as **"Other"** (Root Directory `./`).
5. Click **"Deploy"**.

### Via Vercel CLI:
```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

---

## 🏛️ Engineering Standards & Certifications

The solutions and specifications referenced in this application comply with standard international HVAC & Mechanical engineering codes:
- **AHRI Certified**: Standard 550/590 (Chillers) & Standard 430 (Air Handlers)
- **ASHRAE 90.1**: Energy Standard for Buildings Except Low-Rise Residential
- **ASHRAE 170**: Ventilation of Healthcare Facilities
- **ISO 9001:2015**: Quality Management Systems
- **LEED v4.1**: Energy and Atmosphere (EA) & Indoor Environmental Quality (EQ)
- **BACnet® & Modbus®**: Native BTL-Certified Building Management Protocol Integration

---

## 📞 24/7 Dispatch & Support

- **Emergency Dispatch Hotline**: 1-800-SAS-HVAC (727-4822)
- **Engineering Inquiries**: [rep-locator.html](rep-locator.html)
- **Factory Direct Depot**: [parts.html](parts.html)

---

## 📄 License & Attribution

Developed for **SAS-CAN Services** © 2026. All rights reserved.
Built and maintained by [rabiasiddique-dev](https://github.com/rabiasiddique-dev).
