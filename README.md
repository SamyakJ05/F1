<div align="center">

# 🏎️ APEX ATLAS

### *Know the Race Before Lights Out.*

An interactive, high-performance Formula 1 intelligence platform featuring authentic GPS circuit telemetry, dynamic pit strategy modeling, aerodynamic ground-effect simulations, live race weekend command centers, and multi-season championship analytics.

[![Live Deployment](https://img.shields.io/badge/Live%20Site-apexatlas.online-C7FF31?style=for-the-badge&logo=google-chrome&logoColor=black)](https://apexatlas.online)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 🌟 Overview

**Apex Atlas** is engineered for motorsport enthusiasts, sim racers, and telemetry analysts who want to understand Grand Prix racing at engineering depth. Built with cutting-edge **React 19** and **Next.js 16 (Turbopack)**, the platform delivers real-time session tracking, aerodynamic airflow visualization, and interactive tactical tools without relying on bloated external dependencies.

👉 **Live Demo:** [https://apexatlas.online](https://apexatlas.online)

---

## ⚡ Key Features

### 1. 🏁 Authentic GPS Circuit Atlas (All 23 Venues)
- **High-Precision Telemetry Curves**: Replaces stylized track scribbles with **50 to 150+ GPS node loops** per circuit derived from OpenStreetMap and real telemetry coordinates.
- **Catmull-Rom Bezier Smoothing**: Renders butter-smooth SVGs with DRS zones, speed traps, start/finish gantries, coordinate grids, and corner-by-corner analysis for tracks including **Monaco, Spa-Francorchamps, Silverstone, Suzuka, Zandvoort, MADRING (Madrid), and Las Vegas**.
- **Interactive Region Filtering**: Instant search and geographic classification (Europe, Americas, Asia-Pacific, Middle East).

### 2. ⏱️ Live Race Weekend Command Hub
- **Dynamic Timezone Converter**: Toggle seamlessly between local browser time and trackside local time with zero hydration discrepancies.
- **Live Session Countdown**: Real-time timer ticking down to Free Practice, Qualifying, Sprint, and the Grand Prix.
- **Tire Allocation & Weather Bar**: Track ambient/track temperatures, rain probabilities, wind speeds, and Pirelli tire compound selections (Soft/Medium/Hard).
- **Fan Prediction Poll**: Cast your vote for the race winner and view instant community voting distributions.

### 3. 📊 Interactive Strategy Studio
- **Dynamic Degradation Modeling**: Adjust track temperatures (20°C–55°C), safety car likelihood, and tire compound choices (Soft C4, Medium C3, Hard C2).
- **Optimal Pit Window Calculation**: Simulates lap time delta falloffs and calculates the theoretical fastest 1-stop vs 2-stop strategies.
- **In-Depth Tactical Playbooks**: Undercut vs Overcut advantages, Virtual Safety Car time deltas, and brake temperature management guides.

### 4. 🏎️ Car Lab 2.0 (Aerodynamics & Ground-Effect Tunnel)
- **Interactive Venturi Airflow Simulation**: HTML5 canvas aerodynamic particle wind tunnel demonstrating ground-effect suction, downforce distribution, and porpoising pitch oscillations.
- **Powertrain & DRS Mechanics**: Visual breakdown of the 1.6L V6 Turbo Hybrid, MGU-K / MGU-H energy recovery systems, and DRS drag reduction flap actuation.

### 5. ⚔️ Multi-Season Standings & Head-to-Head Telemetry Explorer
- **Interactive Season Switcher**: Toggle between the **2026 Active Championship (Live)** and the **2024 Official Season Standings Archive**.
- **Telemetry Battle Matrix**: Compare any two drivers on the grid with dynamic radar metrics across one-lap pace ratings, qualifying head-to-heads, career championships, and podium records.
- **Constructor Payouts**: Real-time constructor point tables and engine supplier allocations.

### 6. 🧠 Motorsport IQ Quiz Challenge
- **10-Question Knowledge Test**: Test your understanding of aerodynamic stall, trail braking, VSC time loss deltas, altitude engine behavior, and tire blistering mechanics.
- **Instant Explanations**: Deep technical rationales provided for every question with score tracking.

### 7. 💰 Monetization & AdSense Compliance Ready
- **Full Legal & Privacy Suite**: Comprehensive GDPR, CCPA, and Google DART cookie disclosures at `/privacy`, terms of service at `/terms`, editorial guidelines at `/about`, and contact information at `/contact`.
- **Integrated `ads.txt`**: Served directly from `/ads.txt` and `public/ads.txt`.
- **Fail-Safe Ad Units**: Responsive ad containers with automatic dimensions, fallback states, and ad-blocker error handling.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.2.6](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19.2.6](https://react.dev/) + React DOM 19
- **Language**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS (Tailored HSL Design System, Dark Mode Glassmorphism, Neon Accents)
- **Typography**: Geist Sans & Geist Mono
- **Testing**: Node.js Native Test Runner (`node:test`)
- **Deployment**: [Netlify](https://www.netlify.com/) (with `@netlify/plugin-nextjs`)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v22.13.0` or higher
- **npm**: `v10.0.0` or higher

### 1. Clone the Repository
```bash
git clone https://github.com/SamyakJ05/F1.git
cd F1
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables *(Optional)*
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT=ca-pub-1497786346597378
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🧪 Testing & Verification

Run the full automated test suite and build checks:

```bash
# Run ESLint
npm run lint

# Run Unit & SSR Render Tests
npm test

# Build Production Bundle
npm run build
```

---

## 📁 Project Structure

```
├── app/
│   ├── about/              # Editorial standards, mission & E-E-A-T credentials
│   ├── ads.txt/            # Dynamic ads.txt route handler
│   ├── api/race-weekend/   # Live session telemetry & weekend API
│   ├── car-lab/            # Ground-effect airflow & aerodynamic wind tunnel
│   ├── circuits/           # 23-track GPS atlas & individual circuit dossiers
│   │   └── [slug]/         # Detailed track map, DRS zones & braking points
│   ├── components/         # Reusable UI modules (AtlasShell, CircuitMap, DriverCompare, etc.)
│   ├── contact/            # Press, inquiries, and reader feedback form
│   ├── drivers/            # Multi-season standings & head-to-head comparison
│   ├── privacy/            # GDPR, CCPA, and Google DART cookie policies
│   ├── quiz/               # Motorsport IQ challenge widget
│   ├── stories/            # Editorial tactical guides & technical articles
│   ├── strategy/           # Dynamic tire degradation & pit window calculator
│   ├── terms/              # Terms of Service & trademark disclaimers
│   ├── circuit-map-data.ts # GPS coordinates and SVG paths for all 23 tracks
│   ├── globals.css         # Design system tokens, layouts, and animations
│   ├── layout.tsx          # Root layout with Google AdSense head tags
│   └── site-data.ts        # Driver rosters, calendar, teams & track metadata
├── public/                 # Static assets (ads.txt, robots.txt, OG images)
├── tests/                  # Automated HTML SSR & route rendering tests
├── netlify.toml            # Netlify Next.js runtime deployment configuration
└── package.json
```

---

## 🌐 Deploying to Netlify

1. Push your code to GitHub.
2. Link your repository in the **[Netlify Dashboard](https://app.netlify.com/)**.
3. Netlify automatically reads [`netlify.toml`](./netlify.toml) with settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next`
   - **Plugin**: `@netlify/plugin-nextjs`
4. Add your custom domain (e.g. `apexatlas.online`) under **Domain Management**.

---

## ⚖️ Legal & Trademark Notice

Apex Atlas is an independent editorial, technical analysis, and telemetry platform. 
*Formula 1, F1, FORMULA ONE, GRAND PRIX, and related marks are trade marks of Formula One Licensing B.V., a Formula 1 company. This site is unofficial and is not associated in any way with the Formula 1 companies.*

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

<div align="center">
  <sub>Engineered with precision for motorsport fans worldwide.</sub>
</div>
