# CareerPath AI

### AI-Powered Career Guidance and Career Development Platform

CareerPath AI is a full-stack web application designed to help students and early-career professionals make better career decisions and prepare for their desired roles.

Instead of relying on generic career advice, the platform brings multiple career-support features together in one place — from resume analysis and skill discovery to AI-powered mentoring and job opportunities.

The goal of CareerPath AI is simple:

> **Understand where you are, identify where you want to go, and help you build a practical path to get there.**

---

## 🚀 Live Demo

🌐 **Live Application:**  
https://careerpath-ai-blush.vercel.app/

💻 **GitHub Repository:**  
https://github.com/arpitat09/career-path-navigator

---

## ✨ What CareerPath AI Does

CareerPath AI acts as a personal career-support platform for students and job seekers.

Users can:

- Create and manage an account
- Analyze their resume
- Understand their existing skills
- Identify areas for improvement
- Interact with an AI-powered career mentor
- Explore job opportunities
- Get career-oriented guidance
- Build a clearer understanding of their career direction

The application combines these features into a single platform rather than requiring users to depend on multiple tools.

---

## 🎯 Problem Statement

Choosing a career path can be difficult, especially for students and fresh graduates.

There are thousands of:

- Job roles
- Technologies
- Courses
- Certifications
- Learning resources
- Career paths

However, having access to information does not necessarily mean knowing **what to learn, when to learn it, or what to focus on next**.

Many students struggle with questions such as:

- What career is suitable for me?
- Are my current skills enough for the role I want?
- What skills am I missing?
- Is my resume strong enough?
- What should I learn next?
- Where can I find relevant job opportunities?
- How can I get guidance without depending completely on a human mentor?

CareerPath AI was developed to address these problems by bringing career analysis, AI guidance, resume understanding, and job discovery into one application.

---

# 🧠 Key Features

## 1. 📄 Resume Analysis

Users can upload their resume and use the platform to extract useful career-related information.

The resume module is designed to help users understand:

- Existing skills
- Technical experience
- Educational background
- Resume strengths
- Areas that can be improved
- Career-relevant information present in the resume

The backend includes dedicated resume routes and services for handling resume-related operations.

---

## 2. 🤖 AI Career Mentor

CareerPath AI includes an AI-powered mentor that allows users to interact with the system and receive career-oriented guidance.

The mentor can be used for topics such as:

- Career planning
- Skill development
- Learning direction
- Technical preparation
- Interview preparation
- Resume-related questions
- Career-related doubts

The AI mentor functionality is implemented through a dedicated backend API and uses Google's Generative AI technology.

---

## 3. 💼 Job Opportunities

The platform also provides a job discovery feature.

The backend integrates job opportunity data through the **Adzuna API**, allowing users to explore relevant job openings.

This helps connect career planning with the actual job market.

---

## 4. 🔐 Authentication

CareerPath AI includes user authentication functionality.

Users can:

- Register
- Log in
- Access protected career-related functionality
- Maintain a personalized experience

Authentication is implemented using:

- JWT
- bcrypt
- Express
- MongoDB

---

## 5. 🗺️ Career-Oriented Guidance

The application is designed around the idea of career progression rather than simply displaying information.

The overall workflow can be thought of as:

## text

User
  ↓
Create Account
  ↓
Provide Career / Resume Information
  ↓
Resume & Skill Analysis
  ↓
Identify Career Direction
  ↓
AI Career Guidance
  ↓
Improve Skills
  ↓
Explore Job Opportunities
  ↓
Prepare for Career

---

## 🏗️ System Architecture

CareerPath AI follows a full-stack architecture consisting of a frontend, backend, database, and external services.

                    ┌──────────────────────┐
                    │        User          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │   TypeScript + Vite  │
                    └──────────┬───────────┘
                               │
                         REST API Calls
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node.js Backend    │
                    │      Express.js      │
                    └──────────┬───────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
     ┌─────────────┐      ┌─────────────┐     ┌─────────────┐
     │  MongoDB    │      │ Gemini AI   │     │ Adzuna API  │
     │  Database   │      │ AI Mentor   │     │ Job Data    │
     └─────────────┘      └─────────────┘     └─────────────┘

---

## 🛠️ Technology Stack

-Frontend
-React
-TypeScript
-Vite
-Tailwind CSS
-React Router
-React Hook Form
-Zod
-Framer Motion
-Lucide React
-React Icons
-React Markdown

The frontend is organized into reusable components, pages, layouts, routes, contexts, hooks, services, utilities, and type definitions.

---

## Backend

-Node.js
-Express.js
-MongoDB
-Mongoose
-JWT
-bcrypt
-Multer
-PDF Parse
-Axios
-CORS
-dotenv

The backend follows a modular structure with separate routes, controllers, services, models, and data layers.

## AI
## Google Gemini

Google Generative AI is used to power the AI Mentor functionality.
The AI layer allows the application to provide interactive, career-oriented responses instead of relying only on static content.

## External APIs
## Adzuna API

Adzuna is used to retrieve job opportunity data.
This allows CareerPath AI to connect career guidance with real-world job opportunities.

---

## 📁 Project Structure

    career-path-navigator/
    │
    ├── frontend/
    │   ├── public/
    │   ├── src/
    │   │   ├── assets/
    │   │   ├── components/
    │   │   ├── context/
    │   │   ├── hooks/
    │   │   ├── layouts/
    │   │   ├── pages/
    │   │   ├── routes/
    │   │   ├── services/
    │   │   ├── styles/
    │   │   ├── types/
    │   │   ├── utils/
    │   │   ├── App.tsx
    │   │   ├── App.css
    │   │   ├── index.css
    │   │   └── main.tsx
    │   │
    │   ├── package.json
    │   ├── vite.config.ts
    │   └── tsconfig.json
    │
    ├── backend/
    │   ├── controllers/
    │   ├── data/
    │   ├── models/
    │   ├── routes/
    │   │   ├── auth.js
    │   │   ├── jobs.js
    │   │   ├── mentor.js
    │   │   └── resume.js
    │   │
    │   ├── services/
    │   ├── db.js
    │   ├── server.js
    │   └── package.json
    │
    ├── .gitignore
    └── README.md

The current repository follows this frontend/backend separation, with dedicated route modules for authentication, resumes, AI mentoring, and jobs.

---

## 🔄 How the Application Works
## Step 1 — User Registration
    The user creates an account through the authentication system.
    The backend validates the credentials and manages authentication using JWT-based authorization.

## Step 2 — Resume Upload
    The user can provide their resume to the platform.
    The backend processes uploaded files and extracts relevant information for analysis.

## Step 3 — Career Understanding
    The extracted information can be used to understand the user's existing technical background and career direction.

## Step 4 — AI Guidance
    The user can interact with the AI mentor to ask questions and receive personalized career-oriented guidance.

## Step 5 — Job Discovery
    Users can explore job opportunities through the integrated job-search functionality.

## Step 6 — Career Preparation
    The platform brings the information together so users can make more informed decisions about:

    -What to learn
    -What skills to improve
    -How to prepare
    -Which opportunities to explore

## ⚙️ Getting Started
## Prerequisites
Make sure the following are installed:

-Node.js
-npm
-MongoDB
-Git

You will also need API credentials for the external services used by the application.

---

## 📥 Installation
## 1. Clone the Repository
    git clone https://github.com/arpitat09/career-path-navigator.git
    cd career-path-navigator

## 2. Setup the Backend
    cd backend
    npm install
Create a .env file inside the backend directory.

## Example:

    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    GEMINI_API_KEY=your_gemini_api_key
    ADZUNA_APP_ID=your_adzuna_app_id
    ADZUNA_APP_KEY=your_adzuna_app_key

## 3. Start the Backend
## For development:
    npm run dev (npm start)

## The backend runs by default on:
    http://localhost:5000

## The backend currently exposes the following main API groups:
    /api/auth
    /api/resume
    /api/mentor
    /api/jobs

## 💻 Setup the Frontend
## Open a new terminal:
    cd frontend
    npm install
## Start the development server:
    npm run dev
The frontend will be available through the Vite development server.

---

## 🔑 Environment Variables
Never expose API keys or database credentials in the source code.

## The following values should be configured through environment variables:
| Variable         | Purpose                     |
| ---------------- | --------------------------- |
| `PORT`           | Backend server port         |
| `MONGODB_URI`    | MongoDB database connection |
| `JWT_SECRET`     | Authentication token secret |
| `GEMINI_API_KEY` | Google Gemini AI access     |
| `ADZUNA_APP_ID`  | Adzuna application ID       |
| `ADZUNA_APP_KEY` | Adzuna API key              |
The exact environment variable names should match the backend configuration before running the application.

---

## 🔌 API Overview
## Authentication
-POST /api/auth/register
-POST /api/auth/login
-GET  /api/auth/test

## Resume
-/api/resume
Used for resume-related operations and analysis.

## AI Mentor
-/api/mentor
Used for AI-powered career guidance.

## Jobs
-/api/jobs
Used for job opportunity searches.

## Health Check
-GET /
Returns a response confirming that the CareerPath AI backend is running.

---

## 🎨 Frontend Architecture
The frontend is built with React and TypeScript and follows a modular structure.
Components
    ↓
Pages
    ↓
Routes
    ↓
Services
    ↓
Backend APIs
Reusable UI elements are separated from application pages, while services handle communication with the backend.
This structure makes the application easier to maintain and extend as new career features are added.

---

## 🧩 Backend Architecture
The backend follows a modular Express architecture.
Request
   ↓
Route
   ↓
Controller
   ↓
Service
   ↓
Model / External API
   ↓
Response
This separation keeps business logic independent from routing and makes individual modules easier to modify and test.

---

## 🔒 Security Considerations

The application uses several mechanisms to protect user and application data:

-JWT-based authentication
-Password hashing with bcrypt
-Environment variables for secrets
-CORS configuration
-Server-side API handling
-MongoDB for persistent data storage
-File upload handling through Multer

Sensitive credentials should always remain in environment variables and should never be pushed to GitHub.

---

## 📈 Future Improvements

CareerPath AI can be extended with additional capabilities such as:

-Personalized career roadmaps
-Skill-gap scoring
-Career readiness score
-Interview simulation
-AI-generated learning plans
-Course recommendations
-Resume improvement suggestions
-Job-to-skill matching
-Application tracking
-Progress tracking
-Career analytics dashboard
-Personalized notifications
-More advanced labor-market insights

These improvements would help transform the application from a career guidance platform into a more complete personal career development system.

---

## 🌟 Why This Project?

CareerPath AI was built around a practical problem faced by many students and early-career developers:
    There is plenty of career information available, but finding the right information and turning it into an actionable plan is difficult.

This project attempts to solve that problem by combining:
## Resume Analysis + AI Mentoring + Career Guidance + Job Discovery
into a single platform.

---

## 📚 Learning Outcomes

Building CareerPath AI involved working with:

-Full-stack application architecture
-React and TypeScript
-REST API development
-Node.js and Express
-MongoDB and Mongoose
-Authentication and authorization
-JWT
-File uploads
-PDF processing
-AI API integration
-External API integration
-Frontend state management
-Form validation
-Responsive UI development
-API communication
-Environment configuration
-Deployment

---

## 👩‍💻 Author
Arpita Tiwari

Engineering Student | Full-Stack Developer | UI/UX Designer

GitHub:
https://github.com/arpitat09

LinkedIn:
https://www.linkedin.com/in/arpita-tiwari-240796284/

---

## 📄 License
This project is developed for educational and portfolio purposes.

---

## ⭐ Support
If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.
