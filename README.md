# Abinesh — MERN Portfolio

A production-ready personal portfolio website built with the MERN stack (MongoDB, Express, React, Node.js), featuring a dark, animated developer/cybersecurity-themed UI, a REST API backed by MongoDB, and a small protected admin dashboard for managing projects, certificates and contact messages.

## Features

- Cinematic hero with a typewriter role line, gradient text, mouse-following glow, magnetic CTA buttons and floating tech chips
- Sticky glass navbar that changes on scroll, with active-section underline and a light/dark theme toggle
- Subtle custom cursor (dot + trailing ring, hover states) — automatically disabled on touch devices and when `prefers-reduced-motion` is set
- Light/dark theme switcher backed by CSS variables, remembered across visits
- About, Skills (7 categories incl. Cybersecurity and Design & AI, honest "Learning / Comfortable / Intermediate" labels), Education, Experience, Cybersecurity, Toolbox, GitHub, and Contact sections
- Project cards with a subtle 3D tilt, category filtering, and a "View Details" modal (overview/problem/solution/features/screenshots) — GitHub/Live Demo buttons are hidden automatically when a link isn't set, never faked
- Certificate gallery with a click-to-zoom lightbox; drop your images into `client/public/certificates/`
- Dedicated Cybersecurity section with an illustrative terminal visual, honest skill level, topics and tools — educational/authorized-testing framing only
- GitHub Repositories section that fetches your public repos live from GitHub's API (no token needed), with a manual fallback list
- Scroll progress bar and a "back to top" button
- Contact form saved to MongoDB with validation and loading/success/error states
- All personal info, contact details and social links live in one config file (`client/src/data/profile.js`) — nothing is duplicated across components
- Protected admin dashboard (JWT auth) to add/edit/delete projects (incl. detail-modal fields) and certificates, and view contact messages
- Fully responsive (320px → 1920px+), keyboard-accessible, respects `prefers-reduced-motion`
- SEO basics: meta description, Open Graph tags, semantic HTML, favicon

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Router, Lucide React, Axios
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, dotenv, cors

## Folder Structure

```
portfolio/
├── client/                 React (Vite) frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/     Navbar, Footer, shared UI pieces
│   │   ├── sections/       Hero, About, Skills, Projects, Certificates, Education, Contact
│   │   ├── pages/          Home, AdminLogin, AdminDashboard, NotFound
│   │   ├── hooks/          useScrollSpy
│   │   ├── services/       api.js (Axios client)
│   │   ├── data/           profile.js, skills.js — EDIT THESE to personalize
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                 Express backend
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/             Project, Certificate, Message, Admin
│   ├── routes/
│   ├── server.js
│   ├── seed.js             optional: seeds placeholder projects/certificates
│   └── package.json
│
└── README.md
```

## Personalizing your content

- **Name, intro, email, phone, GitHub/LinkedIn, resume link, education:** edit `client/src/data/profile.js` — every component reads from here, so it's the only place you need to change contact info. Leave a value (e.g. `phone`) as `""` to automatically hide its button.
- **Skills:** edit `client/src/data/skills.js`
- **Experience/activities (internships, hackathons, papers, workshops):** edit `client/src/data/experience.js` — add only real entries
- **Toolbox:** edit `client/src/data/tools.js`
- **Cybersecurity focus/topics/tools:** edit `client/src/data/cybersecurity.js`
- **GitHub Repositories section:** set `username` in `client/src/data/github.js` to fetch live, or fill in `fallbackRepos` manually
- **Projects & certificates:** managed in MongoDB. Either run `npm run seed` in `server/` for starter placeholder data, or log into `/admin/login` and add/edit them from the dashboard. Leave `githubLink`/`liveLink` blank to hide that button — never invent a URL.
- **Resume PDF:** drop your real file at `client/public/resume.pdf` (the Download Resume button already points here).
- **Certificate images:** drop files into `client/public/certificates/` (e.g. `certificate-1.jpg`), then set the certificate's `image` field to `/certificates/certificate-1.jpg` in the admin dashboard.
- **Project images:** paste an image URL in the admin form's `image` field (e.g. an image hosted on GitHub, Imgur, or Cloudinary).

## Setup — from zero (Windows-friendly commands)

### 1. Install required software

- [Node.js LTS](https://nodejs.org) (includes npm) — verify with `node -v` and `npm -v`
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (for local development) **or** a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (recommended, no local install needed)
- [Git](https://git-scm.com/)
- A code editor such as VS Code

### 2. Get the project onto your machine

If you downloaded this as a folder/zip, just open it. Otherwise:

```
git clone YOUR_GITHUB_REPOSITORY
cd portfolio
```

### 3. Set up the backend

```
cd server
npm install
copy .env.example .env
```
*(On macOS/Linux use `cp .env.example .env` instead of `copy`.)*

Open `server/.env` and fill in:
- `MONGO_URI` — your MongoDB connection string (local `mongodb://127.0.0.1:27017/portfolio` or an Atlas connection string)
- `JWT_SECRET` — any long random string, e.g. generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- `CLIENT_ORIGIN` — leave as `http://localhost:5173` for local development

Seed the database with placeholder projects/certificates (optional but recommended):

```
npm run seed
```

Start the backend:

```
npm run dev
```

You should see `Server running on port 5000` and `MongoDB connected: ...` in the terminal.

### 4. Set up the frontend

Open a **new terminal window**, then:

```
cd client
npm install
copy .env.example .env
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`). Your portfolio should load, and the Projects/Certificates sections should fetch data from your backend.

### 5. Create your admin account (one-time)

The register endpoint only works while no admin exists yet, so it's safe to leave in the app. Run this once (PowerShell):

```
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"choose-a-strong-password\"}"
```

Then go to `http://localhost:5173/admin/login` and log in with those credentials.

### 6. Test the contact form

Fill out the Contact section on the site and submit it. Check your MongoDB database (`messages` collection) or the "Messages" tab in the admin dashboard to confirm it was saved.

### 7. Build for production

```
cd client
npm run build
```

This creates an optimized `client/dist` folder ready to deploy.

## API Reference

| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/api/projects` | Public | List all projects |
| GET | `/api/projects/:id` | Public | Get one project |
| POST | `/api/projects` | Admin | Create a project |
| PUT | `/api/projects/:id` | Admin | Update a project |
| DELETE | `/api/projects/:id` | Admin | Delete a project |
| GET | `/api/certificates` | Public | List all certificates |
| POST | `/api/certificates` | Admin | Create a certificate |
| PUT | `/api/certificates/:id` | Admin | Update a certificate |
| DELETE | `/api/certificates/:id` | Admin | Delete a certificate |
| POST | `/api/contact` | Public | Submit the contact form |
| GET | `/api/contact` | Admin | List contact messages |
| PUT | `/api/contact/:id/read` | Admin | Mark a message as read |
| DELETE | `/api/contact/:id` | Admin | Delete a message |
| POST | `/api/auth/register` | Public (once) | Create the admin account |
| POST | `/api/auth/login` | Public | Log in, returns a JWT |

Admin routes require an `Authorization: Bearer <token>` header, using the token returned by `/api/auth/login`.

## Deployment (beginner-friendly)

**1. Database — MongoDB Atlas**
Create a free cluster at mongodb.com/cloud/atlas, add a database user, allow network access from anywhere (or your host's IPs), and copy the connection string into your backend's production environment variables.

**2. Backend — Render (or Railway/any Node host)**
- Push your code to GitHub.
- Create a new "Web Service" on Render, point it at the `server` folder.
- Build command: `npm install`. Start command: `npm start`.
- Add environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_ORIGIN` (set this to your deployed frontend URL once you have it), `PORT` (Render sets this automatically).
- Deploy, and note the resulting backend URL (e.g. `https://your-app.onrender.com`).

**3. Frontend — Vercel or Netlify**
- Import the GitHub repo, set the project root to `client`.
- Build command: `npm run build`. Output directory: `dist`.
- Add environment variable `VITE_API_URL` = `https://your-app.onrender.com/api`.
- Deploy, and note your frontend URL.

**4. Connect them**
- Go back to your backend host's environment variables and set `CLIENT_ORIGIN` to your deployed frontend URL (this is what CORS uses to allow requests).
- Redeploy the backend so the new CORS setting takes effect.

## Git commands to publish this project

```
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY` with your actual repository URL.

## Screenshots

_Add screenshots of your deployed site here once it's live._

## Future improvements

- Image upload (Cloudinary/S3) instead of pasting image URLs
- Pagination for the messages inbox
- Dark/light theme toggle
- Automated tests (Jest/React Testing Library, Supertest)

## Common errors & fixes

| Problem | Fix |
|---|---|
| `MongoDB connection error` | Double check `MONGO_URI` in `server/.env`; if using Atlas, confirm your IP is allow-listed |
| Frontend shows "Couldn't load projects" | Make sure the backend is running on the port matching `VITE_API_URL` in `client/.env` |
| CORS error in browser console | Ensure `CLIENT_ORIGIN` in `server/.env` exactly matches the frontend URL, including protocol and port |
| Admin login fails | Confirm you registered the admin account first via `/api/auth/register` (works only once) |
| `Cannot find module` errors | Run `npm install` again inside the folder (`client` or `server`) where the error occurs |
