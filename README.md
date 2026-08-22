# 🌍 GlobeTrotter — Personalized Multi-City Travel Planning Platform

<div align="center">

![GlobeTrotter Banner](https://img.shields.io/badge/GlobeTrotter-Trip%20Planner-006382?style=for-the-badge&logo=compass&logoColor=white)
![UI Design System](https://img.shields.io/badge/Design%20System-Glacier%20Glassmorphism-7bd1fa?style=for-the-badge&logo=material-design&logoColor=003041)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Status](https://img.shields.io/badge/Status-Prototype%20%2F%20UI%20Suite-success?style=for-the-badge)

<br/>

**A modern, intuitive travel companion designed to create, organize, visualize, budget, and share personalized multi-city journeys seamlessly.**

[Explore Screens](#-screen-gallery--modules) • [Key Features](#-key-features) • [Design System](#-glacier-design-system) • [Project Structure](#-project-structure) • [Getting Started](#-getting-started)

</div>

---

## 📖 Overview

**GlobeTrotter** reimagines trip planning by transforming overwhelming multi-destination logistics into an inspiring, streamlined visual workflow. Rather than bouncing across fragmented notes, spreadsheets, and booking tabs, GlobeTrotter gives travelers a single unified workspace to:

- 🗺️ **Architect Multi-City Itineraries:** Sequence cities, allocate stay durations, and map daily activities chronologically.
- 💸 **Control Budgets Real-Time:** Track categories (flights, stays, food, activities), anticipate daily spend rates, and prevent overspending.
- 🔍 **Discover & Curate Experiences:** Search curated destinations and localized activities tailored to pace and budget.
- 🤝 **Share & Remix Community Trips:** Publish beautiful itineraries or fork community favorites to customize them for your own adventure.

Built with the signature **Glacier Glassmorphism** design theme (*"Frozen Light"*), GlobeTrotter offers a tactile, luminous, and ultra-modern user experience.

---

## 📱 Screen Gallery & Modules

The repository contains high-fidelity prototype screens and styling for the entire GlobeTrotter product suite:

| Module / Screen | Description | Path | Preview |
| :--- | :--- | :--- | :---: |
| 🏠 **Dashboard** | Central travel hub with upcoming journeys, destination highlights, quick planner shortcuts, and budget summaries. | [`dashboard_globetrotter_glacier`](./dashboard_globetrotter_glacier/code.html) | [View](./dashboard_globetrotter_glacier/screen.png) |
| ✈️ **Plan a New Trip** | Interactive wizard to name trips, set dates, add cover photos, and define travel party parameters. | [`plan_a_new_trip_globetrotter_glacier`](./plan_a_new_trip_globetrotter_glacier/code.html) | [View](./plan_a_new_trip_globetrotter_glacier/screen.png) |
| 📍 **City Search** | Destination explorer featuring filters for region, climate, popularity, and budget tier. | [`city_search_globetrotter_glacier`](./city_search_globetrotter_glacier/code.html) | [View](./city_search_globetrotter_glacier/screen.png) |
| 🎯 **Activity Search** | Curated experience catalog with price tags, duration badges, user reviews, and instant itinerary add. | [`activity_search_globetrotter_glacier`](./activity_search_globetrotter_glacier/code.html) | [View](./activity_search_globetrotter_glacier/screen.png) |
| 🗓️ **Build Itinerary** | Day-by-day multi-city itinerary builder with activity time blocks and route organization. | [`build_itinerary_globetrotter_glacier`](./build_itinerary_globetrotter_glacier/code.html) | [View](./build_itinerary_globetrotter_glacier/screen.png) |
| 💰 **Budget & Expenses** | Financial planner with categorical breakdown (Stay, Transport, Dining, Events), remaining funds, and warnings. | [`budget_globetrotter_glacier`](./budget_globetrotter_glacier/code.html) | [View](./budget_globetrotter_glacier/screen.png) |
| 🧳 **My Trips** | Library of active, upcoming, completed, and draft travel itineraries. | [`my_trips_globetrotter_glacier`](./my_trips_globetrotter_glacier/code.html) | [View](./my_trips_globetrotter_glacier/screen.png) |
| 🌍 **Community Feed** | Public travel community to browse, like, bookmark, and clone shared itineraries from fellow globe trotters. | [`community_globetrotter_glacier`](./community_globetrotter_glacier/code.html) | [View](./community_globetrotter_glacier/screen.png) |
| 🔗 **Shared Itinerary** | Clean, shareable public web view of an itinerary with read-only timeline and clone button. | [`shared_itinerary_globetrotter_glacier`](./shared_itinerary_globetrotter_glacier/code.html) | [View](./shared_itinerary_globetrotter_glacier/screen.png) |
| 👤 **User Profile** | Traveler profile with personal travel stats, saved destinations, currency preferences, and settings. | [`user_profile_globetrotter_glacier`](./user_profile_globetrotter_glacier/code.html) | [View](./user_profile_globetrotter_glacier/screen.png) |
| 🔐 **Login** | Secure authentication portal with email/password and social login options. | [`login_globetrotter_glacier`](./login_globetrotter_glacier/code.html) | [View](./login_globetrotter_glacier/screen.png) |
| 📝 **Register** | Account onboarding flow with password validation and travel preference setup. | [`register_globetrotter_glacier`](./register_globetrotter_glacier/code.html) | [View](./register_globetrotter_glacier/screen.png) |

---

## ✨ Key Features

### 🔐 1. Authentication & Security
- User registration and login flows with clean validation states.
- Password protection and profile-linked sessions.
- Guest view vs. authenticated traveler access levels.

### 🏠 2. Comprehensive Dashboard
- **Personalized Welcome:** Real-time countdowns for upcoming departures.
- **Trip Status At-a-Glance:** Quick toggle between *Ongoing*, *Upcoming*, and *Past* trips.
- **Smart Recommendations:** Curated destinations based on season and preferences.
- **Budget Snapshot:** Quick visual gauge of current expenditures vs. limits.

### 🗺️ 3. Multi-City Trip Architect
- Add and order multiple destinations with custom stop durations.
- Day-wise activity scheduling with designated morning, afternoon, and evening time slots.
- Drag-and-drop flexibility to rebalance itinerary days on the fly.
- Destination cover photo customization.

### 🔍 4. Discovery & Activity Engine
- Deep search across cities and localized points of interest (POIs).
- Category filtering: Sightseeing, Culinary, Adventure, Culture, Relaxation, Nightlife.
- Duration and cost indicators for transparent decision-making.
- One-click insertion into specific itinerary days.

### 💳 5. Smart Budget & Expense Tracker
- Comprehensive budget ceiling with dynamic remaining balance calculations.
- Breakdown across major expense buckets:
  - 🏨 **Accommodation / Stays**
  - 🚆 **Transport & Flights**
  - 🍽️ **Dining & Food**
  - 🎟️ **Activities & Attractions**
- Daily burn-rate visualization and automated over-budget alerts.

### 🌐 6. Community & Social Collaboration
- Explore inspiring public trip plans created by community globetrotters.
- Filter itineraries by region, budget tier, and trip duration (e.g., "7 Days in Japan", "2 Weeks Euro-trip").
- **Fork & Remix:** Clone any public itinerary into your account with one click to customize it.
- Public read-only itinerary links for family and travel companions.

---

## 🎨 Glacier Design System

GlobeTrotter is styled using the **Glacier ("Frozen Light")** aesthetic — combining layered translucent surfaces, crisp borders, and subtle ice-blue glows to deliver an airy, high-end feel.

### Core Visual Tokens
- **Primary Color:** `#006382` / `#7bd1fa` (Ice Blue)
- **Secondary Color:** `#346176` / `#b1ddf7` (Soft Glacier Slate)
- **Tertiary Color:** `#6f4b94` / `#d6adff` (Soft Lavender Frost)
- **Background / Surface:** `#f5f6ff` (Luminous Frost)
- **Typography:** `Inter` (Clean geometric sans-serif)
- **Icons:** Google Material Symbols Outlined

### Glassmorphism Pattern
```css
/* Card & Panel Glass Effect */
background: rgba(255, 255, 255, 0.6);
backdrop-filter: blur(16px);
border: 1px solid rgba(125, 211, 252, 0.2);
box-shadow: 0 0 30px rgba(125, 211, 252, 0.1);
```

> 📄 *For the full design specifications and token documentation, see [`glacier/DESIGN.md`](./glacier/DESIGN.md).*

---

## 📁 Project Structure

```text
stitch_globetrotter_trip_planner/
├── README.md                                 # Project documentation & overview
├── glacier/
│   └── DESIGN.md                             # Glacier Glassmorphism design tokens & guide
├── dashboard_globetrotter_glacier/           # Dashboard module
│   ├── code.html
│   └── screen.png
├── plan_a_new_trip_globetrotter_glacier/     # Trip creation wizard
│   ├── code.html
│   └── screen.png
├── city_search_globetrotter_glacier/         # City & destination search
│   ├── code.html
│   └── screen.png
├── activity_search_globetrotter_glacier/     # Activity discovery
│   ├── code.html
│   └── screen.png
├── build_itinerary_globetrotter_glacier/     # Multi-city itinerary planner
│   ├── code.html
│   └── screen.png
├── budget_globetrotter_glacier/              # Budget & expense management
│   ├── code.html
│   └── screen.png
├── my_trips_globetrotter_glacier/            # Trip management list
│   ├── code.html
│   └── screen.png
├── community_globetrotter_glacier/           # Public community itineraries
│   ├── code.html
│   └── screen.png
├── shared_itinerary_globetrotter_glacier/    # Shared public view
│   ├── code.html
│   └── screen.png
├── user_profile_globetrotter_glacier/        # Profile & settings
│   ├── code.html
│   └── screen.png
├── login_globetrotter_glacier/               # User authentication
│   ├── code.html
│   └── screen.png
└── register_globetrotter_glacier/            # New user registration
    ├── code.html
    └── screen.png
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/preyas-patel26/globetrotter.git
cd globetrotter
```

### 2. Previewing the Screens
Since the screens are standalone HTML pages styled with Tailwind CSS via CDN, you can view them directly in any modern browser:

- **Option A: Live Server (VS Code Extension)**
  - Right-click any `code.html` file (e.g. `dashboard_globetrotter_glacier/code.html`) and select **"Open with Live Server"**.
- **Option B: Node `serve` / Python HTTP Server**
  ```bash
  # Using Python
  python -m http.server 3000
  
  # Or using npx serve
  npx serve .
  ```
  Open `http://localhost:3000` and navigate to any module folder.
- **Option C: Direct Browser Launch**
  - Double click on any `code.html` file to open it in Chrome, Edge, Safari, or Firefox.

---

## 🛠️ Technology Stack

- **Markup & Layout:** Semantic HTML5
- **Styling & Design:** Tailwind CSS (Custom extended Glacier palette & Container Queries)
- **Typography:** [Google Fonts — Inter](https://fonts.google.com/specimen/Inter)
- **Iconography:** [Google Material Symbols Outlined](https://fonts.google.com/icons)
- **Visual Design Paradigm:** Material 3-inspired Glassmorphism & Translucent Backdrop Filters

---

## 🔮 Roadmap

- [ ] **Interactive Maps Integration:** Embed interactive Mapbox/Leaflet routes for visualized travel paths.
- [ ] **Multi-Currency Support:** Real-time exchange rate calculation across destinations.
- [ ] **Collaborative Planning:** Real-time multi-user editing with co-travelers.
- [ ] **Weather Insights:** Forecast integration for destination date ranges.
- [ ] **Backend Integration:** Full REST API & database persistence for user data and trip state.

---

## 📄 License & Credits

Developed with ❤️ for travelers and explorers worldwide.

*All destination assets and icons are properties of their respective creators and used for design prototyping demonstration.*
