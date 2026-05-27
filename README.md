# ⚡ AI SprintOS

AI SprintOS is a production-grade, AI-powered project and sprint management platform. It uses a modern frontend framework paired with a secure, highly scalable backend API.



---

## 🚀 Live Links & Demo

Experience the platform live right now:
👉 **[Launch AI SprintOS App](https://vercel.app)**

### 🔑 Demo Accounts
* **Email:** `admin@aisprintos.dev`
* **Password:** `password`

---

## 📸 UI Showcase

*Place your application screenshots or project GIFs below to show off your user interface!*

### 📊 Main Workspace

<img width="1919" height="1199" alt="Screenshot 2026-05-23 192406" src="https://github.com/user-attachments/assets/23412e2f-e4bf-4774-bf18-0546bd4e8027" />
<img width="1919" height="1199" alt="Screenshot 2026-05-23 192446" src="https://github.com/user-attachments/assets/2ab6076d-217e-4342-b3bb-d4dc0b533cec" />



### 📋 Kanban Board & AI Core



<img width="1919" height="1199" alt="Screenshot 2026-05-23 192218" src="https://github.com/user-attachments/assets/1fd057c7-6b33-451e-a047-0e499228ec08" />
<img width="1918" height="1199" alt="Screenshot 2026-05-23 192258" src="https://github.com/user-attachments/assets/84b51e54-0de8-4bb1-b0dd-17e7c8c057ca" />


---

## ✨ Core Features

* **🤖 AI Task Generator:** Automates subtasks, story points, and sprint estimations.
* **🐛 AI Bug Triage:** Analyzes stack traces to suggest root causes and code fixes.
* **📋 Kanban Board:** Smooth drag-and-drop workflow with instant UI updates.
* **📈 Analytics Dashboard:** Tracks velocity, burndown charts, and team productivity.
* **🐙 GitHub Sync:** Two-way automation across issues, pull requests, and codebase commits.
* **🔐 Role-Based Access:** Protected dashboard routing for Admin, Manager, and Developer roles.
* **⌨️ Command Palette:** Fast, keyboard-driven navigation using `⌘K`.
* **🌙 Dark Mode:** Full system preference detection with live theme switching.

---

## 🛠️ System Architecture & Tech Stack

### 🖥️ Frontend
* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **State Management:** Zustand
* **Data Fetching:** TanStack Query (React Query)
* **Styling:** Tailwind CSS + shadcn/ui
* **Animations:** Framer Motion & dnd-kit

👉 **[Backend repo](https://github.com/Sauravdas007/Backend-SprintOS)**

### ⚙️ Backend & Database
* **Database Client:** Prisma ORM
* **Deployment Automation:** Docker & Docker Compose
* **CI/CD Workflows:** GitHub Actions
* **Configuration:** Secure environment management via Serverless blueprints

---

## 📁 Repository Structures

### Frontend Architecture
```text
apps/web/
├── app/                  # Next.js App Router pages and public layout paths
├── components/           # UI primitives, Kanban systems, and AI modules
├── hooks/                # Custom data-fetching hooks (TanStack Query)
├── lib/                  # Shared API clients and developer tools
├── providers/            # NextAuth, Theme, and global Context elements
├── store/                # Global state stores via Zustand
└── types/                # TypeScript interfaces and layout schemas
```

### Backend Architecture
```text
backend/
├── .github/workflows/    # CI/CD pipelines and deployment logic
├── prisma/               # Database schemas, migrations, and seed scripts
├── scripts/              # Automated orchestration tools
├── src/                  # Core API logic, routes, and controllers
├── Dockerfile            # Container configuration
└── docker-compose.yml    # Multi-container orchestration tool
```

---

## 💻 Getting Started & Installation

### 1. Clone the Repositories
```bash
# Clone Frontend
git clone https://github.com

# Clone Backend
git clone https://github.com
```

### 2. Setup and Run Backend
```bash
cd Backend-SprintOS

# Setup environment variables
cp .env.example .env

# Fire up infrastructure using Docker
docker-compose up --build
```

### 3. Setup and Run Frontend
```bash
cd ../Frontend-SprintOs

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run local server
npm run dev
```
Open **http://localhost:3000** in your browser to explore the full stack workspace.

---

## 🤝 Contributors

* **Saurav das** ([@Sauravdas007](https://github.com))
