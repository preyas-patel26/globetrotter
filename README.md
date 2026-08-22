# 🌍 GlobeTrotter

### Empowering Personalized Travel Planning

GlobeTrotter is a full-stack travel planning platform built for the **Odoo Hackathon**. It helps users create, organize, visualize, budget, and share personalized **multi-city travel itineraries** through a single responsive application.

The platform combines destination discovery, activity planning, itinerary management, budget tracking, calendar visualization, and community-based trip sharing.

---

## 🚀 Overview

Planning a multi-city trip involves managing destinations, dates, activities, expenses, budgets, and schedules across different platforms.

**GlobeTrotter** brings these capabilities together into one centralized travel-planning experience.

Users can:

* Create customized multi-city trips
* Add and manage travel stops
* Assign arrival and departure dates
* Discover cities and destinations
* Search and add activities
* Build day-wise itineraries
* Manage estimated expenses
* Track trip budgets
* View trips through calendars and timelines
* Share itineraries publicly
* Discover trips shared by other users
* Copy existing trips and customize them
* Manage their profile and preferences

The platform also includes an administrative dashboard for monitoring users, trips, destinations, activities, and platform usage.

---

# 🎯 Problem Statement

GlobeTrotter addresses the challenge of simplifying personalized multi-city travel planning.

The application enables users to:

1. Create customized multi-city itineraries
2. Assign travel dates, activities, and budgets
3. Discover destinations and activities through search
4. Receive cost breakdowns and visual calendar views
5. Share travel plans publicly or with friends
6. Organize their complete journey efficiently
7. Maintain visibility over their travel plans and expenses

The system uses a **relational SQL database** to store and retrieve complex travel data including users, trips, stops, activities, and estimated expenses.

---

# ✨ Features

## 🔐 Authentication

* User registration
* User login
* Password authentication
* Basic form validation
* Protected application routes
* User profile management
* Role-based access
* Admin authentication

---

## 🏠 Dashboard / Home

The dashboard acts as the central hub of the application.

It provides:

* Welcome message
* Recent trips
* Ongoing trips
* Upcoming trips
* Recommended destinations
* Popular destinations
* Budget highlights
* Quick actions
* **Plan New Trip** functionality

---

## 🧳 Create & Manage Trips

Users can create personalized trips with:

* Trip name
* Start date
* End date
* Description
* Optional cover image
* Budget information

Users can also:

* View trips
* Edit trips
* Delete trips
* Track trip status
* Manage destinations
* Manage activities

Trips can be organized into:

* Ongoing
* Upcoming
* Completed

---

## 🗺️ Multi-City Itinerary Builder

The itinerary builder is the core functionality of GlobeTrotter.

Users can:

* Add multiple cities to a trip
* Select travel dates
* Set arrival and departure dates
* Add activities to each destination
* Reorder destinations
* Organize activities day-wise
* Assign activity times
* Add activity costs
* Edit itinerary items
* Remove itinerary items

Example:

```text
Trip
│
├── Ahmedabad
│   ├── Heritage Walk
│   ├── Riverfront
│   └── Food Tour
│
├── Mumbai
│   ├── Gateway of India
│   ├── Marine Drive
│   └── Museum
│
└── Goa
    ├── Beach Visit
    ├── Fort Tour
    └── Sunset Cruise
```

---

# 🔎 City & Destination Search

Users can discover destinations through search.

Search and filtering can be performed using:

* City
* Country
* Region
* Cost index
* Popularity

Destination information includes:

* City name
* Country
* Region
* Description
* Image
* Cost information
* Popularity

Users can directly **Add to Trip** from destination results.

---

# 🎯 Activity Search

Users can discover activities for their selected destinations.

Activities can be explored by:

* Category
* Cost
* Duration
* Popularity
* Destination

Activity categories include:

* Sightseeing
* Food
* Culture
* Adventure
* Nature
* Shopping
* Entertainment

Activity information includes:

* Activity name
* Description
* Category
* Duration
* Estimated cost
* Image

Users can add or remove activities from their itinerary.

---

# 📋 Itinerary View

Users can view their completed itinerary in a structured format.

The itinerary provides:

* Day-wise organization
* City headers
* Activity blocks
* Activity time
* Activity duration
* Activity cost
* Expense information

The itinerary can be viewed through different visual formats such as:

* List
* Timeline
* Calendar

---

# 💰 Trip Budget & Cost Breakdown

GlobeTrotter provides a financial overview of each trip.

Budget information includes:

* Total estimated cost
* Transport
* Accommodation / Stay
* Activities
* Meals
* Other expenses
* Average cost per day
* Budget utilization
* Remaining budget

Visualizations include:

* Pie / donut charts
* Bar charts
* Daily spending information

The system can also identify over-budget situations and provide budget alerts.

---

# 📅 Calendar & Timeline

The calendar provides a visual representation of the complete travel journey.

Users can view:

* Trip dates
* Destination dates
* Activities
* Activity times
* Day-wise plans
* City-wise itinerary

The timeline/calendar experience allows users to understand the flow of their trip at a glance.

---

# 👥 Community

The Community section allows users to discover public travel plans shared by other users.

Community content can include:

* User profile
* Trip title
* Destinations
* Trip duration
* Budget
* Trip image
* Itinerary summary

Users can:

* Search community trips
* Filter trips
* Sort trips
* View public itineraries
* Get travel inspiration
* Copy shared trips

---

# 🌐 Public / Shared Itineraries

Users can make their itineraries publicly accessible.

A shared itinerary contains:

* Trip title
* Cover image
* Creator information
* Destinations
* Trip duration
* Estimated budget
* Day-wise itinerary
* Activities

Public itineraries are **read-only**.

Visitors can:

* View the itinerary
* Share it
* Copy the trip

Copying a trip creates a separate trip that can be customized by the new user.

---

# 👤 User Profile & Settings

Users can manage their profile information.

Profile includes:

* Profile photo
* First name
* Last name
* Email
* Phone number
* City
* Country
* Additional information

Settings include:

* Language preference
* Saved destinations
* Personal preferences
* Privacy/account controls

---

# 📊 Admin / Analytics Dashboard

The application includes an administrative dashboard for platform monitoring.

Administrators can view:

* Total users
* Total trips
* Popular destinations
* Popular activities
* User engagement
* Trip statistics
* Platform usage

Analytics can be presented using:

* KPI cards
* Charts
* Graphs
* Tables

The Admin Dashboard is restricted to authorized administrators.

---

# 🧠 Intelligent Travel Planning

GlobeTrotter is designed around the concept of personalized and intelligent travel planning.

The platform can support intelligent features such as:

* Personalized destination suggestions
* Activity recommendations
* Budget-aware planning
* Itinerary suggestions
* Over-budget warnings
* Activity scheduling conflict detection
* Trip optimization

These features are designed to help users create practical and personalized travel plans.

---

# 🏗️ Architecture

GlobeTrotter follows an **MVC (Model–View–Controller) architecture**.

```text
                    ┌─────────────────────┐
                    │      React.js       │
                    │      Frontend       │
                    │                     │
                    │ Pages / Components  │
                    │ UI / Routing        │
                    └──────────┬──────────┘
                               │
                            REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Node.js + Express │
                    │      Backend        │
                    │                     │
                    │ Controllers         │
                    │ Routes              │
                    │ Models              │
                    │ Business Logic      │
                    └──────────┬──────────┘
                               │
                              SQL
                               │
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    │   Relational DB     │
                    │                     │
                    │ Users               │
                    │ Trips               │
                    │ Destinations       │
                    │ Activities          │
                    │ Expenses            │
                    │ Itineraries         │
                    └─────────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* **React.js**
* **Vite**
* **React Router**
* **Tailwind CSS**
* **JavaScript / TypeScript**
* **REST API integration**

## Backend

* **Node.js**
* **Express.js**
* **REST APIs**
* **MVC Architecture**

## Database

* **PostgreSQL**
* **SQL**

> MongoDB is not used. GlobeTrotter uses a relational SQL database as required by the project.

---

# 🗄️ Relational Database Structure

The major entities of the system are related through a relational database.

```text
USER
 │
 │ 1 : N
 ▼
TRIP
 │
 ├───────────────┐
 │               │
 │ 1 : N         │ 1 : 1
 ▼               ▼
TRIP STOP       BUDGET
 │
 │ N : 1
 ▼
CITY
 │
 │
 │ 1 : N
 ▼
TRIP ACTIVITY
 │
 │ N : 1
 ▼
ACTIVITY

TRIP
 │
 └── 1 : N ── EXPENSE

USER
 │
 └── N : M ── SAVED DESTINATIONS ── CITY
```

This relational structure allows GlobeTrotter to maintain connected travel information while keeping user-specific itineraries, activities, destinations, and expenses organized.

---

# 📁 Project Structure

The project follows a frontend/backend separation with MVC-oriented backend organization.

```text
globetrotter/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── assets/
│   └── ...
│
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── server.js
│
├── db/
│   └── schema.sql
│
├── public/
│
├── package.json
├── vite.config.*
├── tailwind.config.*
└── README.md
```

---

# 🔄 Main User Workflow

```text
Register / Login
       ↓
   Dashboard
       ↓
 Plan New Trip
       ↓
  Create Trip
       ↓
 Add Destinations
       ↓
 Assign Dates
       ↓
 Search Activities
       ↓
 Add Activities
       ↓
 Build Itinerary
       ↓
 Budget Calculation
       ↓
 Calendar / Timeline
       ↓
 Review Itinerary
       ↓
 Publish / Share
       ↓
 Public Itinerary
       ↓
    Copy Trip
```

---

# 🔌 API Architecture

The frontend communicates with the backend through REST APIs.

Major API areas include:

```text
/api/auth
/api/users
/api/trips
/api/destinations
/api/cities
/api/activities
/api/itinerary
/api/budget
/api/calendar
/api/community
/api/shared
/api/admin
```

The backend is responsible for:

* Authentication
* Authorization
* Validation
* CRUD operations
* Business logic
* Budget calculations
* Itinerary management
* Database communication

---

# 🔐 Security

The application follows standard web application security practices including:

* Secure password storage
* Authentication
* Authorization
* Protected routes
* Role-based access
* Input validation
* SQL injection prevention
* Environment variables for sensitive configuration
* Secure API communication

Sensitive credentials and secrets should not be committed to the repository.

---

# 📱 Responsive Design

GlobeTrotter is designed to provide a consistent experience across:

### Desktop

* Sidebar navigation
* Dashboard cards
* Detailed itinerary
* Calendar
* Analytics

### Tablet

* Adaptive layouts
* Collapsible navigation
* Responsive cards

### Mobile

* Mobile-friendly navigation
* Single-column layouts
* Touch-friendly controls
* Responsive itinerary
* Responsive calendar
* Mobile-friendly search and filters

---

# 🎨 UI / UX

The interface follows a clean, modern travel-product aesthetic.

Design principles:

* Minimal and clean layout
* Clear visual hierarchy
* Consistent spacing
* Responsive components
* Modern cards
* Travel imagery
* Subtle shadows
* Accessible controls
* Intuitive navigation

The UI is inspired by the provided GlobeTrotter system design while improving the low-fidelity wireframes into a polished application experience.

---

# 🧪 Validation & Error Handling

The application handles common user and system states including:

* Required field validation
* Invalid email
* Invalid dates
* Incorrect login credentials
* Empty search results
* Empty trip lists
* Loading states
* API errors
* Unauthorized access
* Missing resources
* Confirmation dialogs for destructive actions

---

# 🚀 Installation & Setup

## Prerequisites

Install:

* Node.js
* npm
* PostgreSQL
* Git

---

## 1. Clone Repository

```bash
git clone https://github.com/preyas-patel26/globetrotter.git
```

```bash
cd globetrotter
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure PostgreSQL

Create a PostgreSQL database:

```sql
CREATE DATABASE globetrotter;
```

Then configure the database connection according to the project's environment configuration.

---

## 4. Configure Environment Variables

Create a `.env` file according to the environment variables required by the application.

Example:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/globetrotter
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

Never commit actual secrets to GitHub.

---

## 5. Initialize Database

Run the PostgreSQL schema:

```bash
psql -U postgres -d globetrotter -f db/schema.sql
```

Alternatively, execute `db/schema.sql` through pgAdmin.

---

## 6. Start the Application

Start the frontend:

```bash
npm run dev
```

Start the backend:

```bash
npm run server
```

If the project provides a combined development command:

```bash
npm run dev:full
```

---

# 🌐 Repository

## GitHub

[GlobeTrotter Repository](https://github.com/preyas-patel26/globetrotter)

---

# 🏆 Odoo Hackathon

GlobeTrotter is developed as part of the **Odoo Hackathon**, with the goal of creating a complete, personalized and interactive travel-planning solution.

The project focuses on:

* Personalized travel planning
* Multi-city itinerary management
* Destination discovery
* Activity discovery
* Budget management
* Calendar visualization
* Public itinerary sharing
* Community travel inspiration
* Relational database management
* Responsive user experience

---

# 👥 Team

### GlobeTrotter

**Built for the Odoo Hackathon 🚀**

---

## 📌 Project Highlights

| Feature              | Status |
| -------------------- | ------ |
| User Authentication  | ✅      |
| Dashboard            | ✅      |
| Trip Creation        | ✅      |
| My Trips             | ✅      |
| Multi-City Itinerary | ✅      |
| City Search          | ✅      |
| Activity Search      | ✅      |
| Budget Management    | ✅      |
| Cost Breakdown       | ✅      |
| Calendar / Timeline  | ✅      |
| Community            | ✅      |
| Public Itinerary     | ✅      |
| Copy Trip            | ✅      |
| Profile / Settings   | ✅      |
| Admin Analytics      | ✅      |
| PostgreSQL           | ✅      |
| MVC Architecture     | ✅      |
| Responsive UI        | ✅      |

---

# 🌍 GlobeTrotter

### Plan smarter. Travel better. Explore more.

**GlobeTrotter — Empowering Personalized Travel Planning.**
