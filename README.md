<div align="center">

<br />

```
 ███████╗ ██████╗██████╗ ██╗   ██╗████████╗██╗ ██████╗
 ██╔════╝██╔════╝██╔══██╗██║   ██║╚══██╔══╝██║██╔═══██╗
 ███████╗██║     ██████╔╝██║   ██║   ██║   ██║██║   ██║
 ╚════██║██║     ██╔══██╗██║   ██║   ██║   ██║██║▄▄ ██║
 ███████║╚██████╗██║  ██║╚██████╔╝   ██║   ██║╚██████╔╝
 ╚══════╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝ ╚══▀▀═╝
```

**An AI-powered platform for screening and ranking job applicants against your job specifications.**

[![TypeScript](https://img.shields.io/badge/TypeScript-98.9%25-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=flat-square&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](LICENSE)
[![Live](https://img.shields.io/badge/Live-scrutiq--v1.vercel.app-000000?style=flat-square&logo=vercel)](https://scrutiq-v1.vercel.app)

<br />

[Live Demo](https://scrutiq-v1.vercel.app) · [Report a Bug](https://github.com/achille010/scrutiq/issues) · [Request a Feature](https://github.com/achille010/scrutiq/issues)

<br />

</div>

---

## What is Scrutiq?

Scrutiq is a full-stack AI-assisted resume screening and applicant ranking platform. Recruiters define job specifications — required skills, experience, qualifications — and Scrutiq uses Google Gemini to analyze uploaded resumes, score each candidate against those criteria, and produce a ranked shortlist automatically.

Built as part of the **Umurava 2026** challenge.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Collaborators](#collaborators)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **AI Resume Screening** — Upload resumes and let Gemini extract skills, experience, and qualifications automatically.
- **Job Specification Matching** — Define exactly what you're looking for; the AI scores every applicant against your criteria.
- **Ranked Shortlists** — Candidates are ranked by match score so you can focus on the best fits first.
- **Email Notifications** — Automated emails notify applicants and recruiters at key stages.
- **Secure Auth** — JWT-based authentication for recruiter accounts.
- **Fully Responsive** — Works seamlessly on desktop, tablet, and mobile.

---

## Tech Stack

### Frontend — `client/`

| Technology | Purpose |
|---|---|
| **React 18** | UI library |
| **TypeScript** | Type safety across all components |
| **Vite** | Lightning-fast dev server and bundler |
| **Tailwind CSS** | Utility-first styling |
| **Lucide React** | Icon library |

### Backend — `server/`

| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express** | Web framework and REST API |
| **TypeScript** | Type safety on the server |
| **MongoDB** | Database |
| **Mongoose** | ODM for MongoDB |
| **Google Gemini API** | AI engine for resume analysis and scoring |
| **Nodemailer** | Email notifications |
| **JWT** | Authentication and session management |

### Tooling

| Tool | Purpose |
|---|---|
| **concurrently** | Runs frontend and backend simultaneously in dev |
| **Vercel** | Frontend deployment |

---

## Project Structure

```
scrutiq/
├── client/                   # React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page-level views
│   │   └── ...
│   ├── .env                  # Frontend environment variables
│   └── package.json
│
├── server/                   # Node.js/Express backend (TypeScript)
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── routes/           # API route definitions
│   │   ├── models/           # Mongoose data models
│   │   └── ...
│   ├── .env                  # Backend environment variables
│   └── package.json
│
├── package.json              # Root scripts (runs both client + server)
└── .gitignore
```

---

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A [MongoDB](https://www.mongodb.com/) instance (local or Atlas)
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/achille010/scrutiq.git
cd scrutiq
```

### 2. Install all dependencies

```bash
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
```

### 3. Set up environment variables

You need two `.env` files — one for the server and one for the client. See the [Environment Variables](#environment-variables) section below.

### 4. Start the development server

This starts both the frontend and backend together:

```bash
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000` (or your configured `PORT`)

---

## Environment Variables

### Server — `server/.env`

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your-mongodb-connection-string-here

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key-here

# CORS — URL of your frontend
CLIENT_URL=http://localhost:3000

# Email (Nodemailer)
EMAIL_USER=your-email-address-here
EMAIL_PASS=your-email-app-password-here

# Auth
JWT_SECRET=your-long-random-secret-here
```

### Client — `client/.env`

```env
# URL of your backend API
VITE_API_URL=http://localhost:5000
```

> **Never commit `.env` files.** Both are already listed in `.gitignore`.

---

## Available Scripts

Run these from the **root** of the project:

| Script | What it does |
|---|---|
| `npm run dev` | Starts both frontend and backend together |
| `npm run frontend` | Starts only the React dev server |
| `npm run backend` | Starts only the Express server |

---

## Collaborators

Built collaboratively as part of the **Umurava 2026** challenge.

| Name | GitHub | Role |
|---|---|---|
| **Achille** | [@achille010](https://github.com/achille010) | Frontend Developer |
| **Albert** | [@albert-ei-u](https://github.com/albert-ei-u) | Backend Developer |
| **Dan Christian** | [@danchristian2](https://github.com/danchristian2) | AI Engineer |
| **Alpha** | [@alpha-dev001](https://github.com/alpha-dev001) | Backend Developer |
| **Serge** | [@wise-coder](https://github.com/wise-coder) | Frontend Developer |

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

---

## Code of Conduct

This project follows a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold it.

---

## Security

If you discover a security vulnerability, please read [SECURITY.md](SECURITY.md) for responsible disclosure instructions. Do not open a public issue.

---

## License

Licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Built with focus by <a href="https://scrutiq-v1.vercel.app">Team Scrutiq</a>
</div>