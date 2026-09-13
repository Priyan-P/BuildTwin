# BuildTwin – VR-Based Digital Utility Twin Platform

> **"Design Your Building. Preserve What Is Hidden."**  
> *"See What Is Hidden. Build Smarter."*

BuildTwin is a production-grade Progressive Web App (PWA) and digital utility lifecycle management platform for smart houses and commercial buildings.

The platform bridges the gap between architectural blueprints and long-term utility preservation:
```
Architectural Blueprint → 3D Building Model → Hidden Utility Mapping → Digital Utility Twin → VR/Mobile Visualization → Long-Term Digital Storage
```

---

## 🌟 Key Features

1. **Public Platform**:
   - **Hero Section**: Modern 3D building visual with transparent X-Ray walls & utility legend.
   - **Why BuildTwin?**: Hidden utility visualization, safer maintenance, future renovation support, long-term digital storage.
   - **Workflow & Lifecycle**: 10-step vertical pipeline & complete building lifecycle tracking.
   - **Service Directory**: 10 enterprise service cards with filters and instant request triggers.
   - **Portfolio & Contact**: Case studies with category filter and persistent contact form.

2. **Core 3D Digital Utility Twin Engine**:
   - Built with **Three.js** & **React Three Fiber**.
   - **X-Ray Wall Rendering Mode**: Toggle between solid architectural walls and transparent X-Ray inspection view.
   - **Utility Layer Toggles**:
     - 🔴 **Electrical Wiring** (Red `#ef4444`)
     - 🔵 **Water & Plumbing** (Blue `#3b82f6`)
     - 🟡 **Gas Lines** (Yellow `#f59e0b`)
     - 🟢 **Cable / Telecom / Internet** (Green `#10b981`)
     - 🟣 **Appliance Circuits** (Purple `#8b5cf6`)
   - **3D Spatial Inspector**: Click any 3D utility route or node pin to view route specifications, source/destination points, status, and room details.
   - **Floor-by-Floor View**: Switch between All Floors, Ground Floor, First Floor, and Roof.
   - **VR Presentation Mode**: Immersive walkthrough capability.

3. **Multi-Role Workspace Dashboards**:
   - 👤 **Client Dashboard**: Track project progress, status pipeline, messages, download blueprints, book consultations, and view project version histories.
   - 🎨 **Designer Dashboard**: View assigned projects queue, download CAD blueprints, update status pipeline, upload 3D models/docs, send messages, and create new versions (v1.1, v2.0).
   - 🛡️ **Admin Dashboard**: System metrics, **Recharts visual analytics** (Projects by status, building type, monthly requests), project assignment controls, user management, and contact message center.

4. **Project Booking System (`/book-project`)**:
   - Intake form for project details, services checklists, location, and blueprint uploads (PDF, DWG, DXF, images).
   - Auto-generates unique Project ID (e.g. `BT-2026-0001`).

5. **PWA & Mobile Support**:
   - Web App Manifest and Service Worker support via `vite-plugin-pwa`.
   - Install prompt banner for desktop and mobile.
   - Mobile bottom navigation bar for touch devices.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, Three.js (`@react-three/fiber`), Recharts, Axios, `vite-plugin-pwa`.
- **Backend**: Node.js, Express.js, REST API, JWT Authentication, Multer (file handling).
- **Database**: MongoDB & Mongoose ORM (with intelligent zero-config fallback store for offline evaluation).

---

## 🔑 Demo Account Credentials

For instant evaluation, the login page (`/login`) includes **1-Click Quick Demo Login** buttons:

| Role | Email | Password |
|---|---|---|
| **Client** | `client@buildtwin.demo` | `client123` |
| **Designer** | `designer@buildtwin.demo` | `designer123` |
| **Admin** | `admin@buildtwin.demo` | `admin123` |

---

## 🚀 Quick Start & Installation

### 1. Install Dependencies
Run from the project root:
```bash
npm run install:all
```

### 2. Configure Environment Variables
- Server configuration: `server/.env`
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/buildtwin
JWT_SECRET=buildtwin_super_secret_jwt_key_2026_vr_utility_twin
```

### 3. Seed Database (Optional for MongoDB)
```bash
npm run seed
```

### 4. Run Development Servers
To run both backend and frontend concurrently:
```bash
npm run dev
```

- **Frontend App**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 📱 PWA Verification

- Open Chrome DevTools -> **Application** tab -> **Manifest** and **Service Workers** to verify offline installation readiness.
