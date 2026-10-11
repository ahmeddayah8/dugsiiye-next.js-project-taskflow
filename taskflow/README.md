# TaskFlow — Full-Stack Task Management Application

TaskFlow is a modern, responsive full-stack task management application built with **Next.js, TypeScript, Tailwind CSS, MongoDB, and NextAuth.js**.

It helps users organize, manage, and track their daily tasks through a clean and user-friendly interface.

## 🚀 Live Demo

**[View Live Application](https://dugsiiye-next-js-project-taskflow-gfd39r4j5-dayah-s-projects.vercel.app)**

## ✨ Features

- User registration and secure authentication
- Email and password login
- Google and GitHub OAuth integration
- Create, view, update, and delete tasks (CRUD)
- Task status management
- User-specific tasks
- Protected dashboard and API routes
- Responsive design for mobile, tablet, and desktop
- Password hashing with bcrypt
- MongoDB database integration
- Real-time updates with Pusher (optional)

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js 15, React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| Database | MongoDB Atlas, Mongoose |
| Authentication | NextAuth.js (Auth.js), bcryptjs |
| Validation | Zod |
| Real-time | Pusher Channels |
| Deployment | Vercel |
| Version Control | Git & GitHub |

## 📁 Project Structure

```text
taskflow/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   └── tasks/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   └── page.tsx
├── components/
├── lib/
├── models/
├── public/
├── auth.ts
├── package.json
└── README.md
```

## ⚙️ Installation

**1. Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file in the root directory:

```env
MONGODB_URI_DEV=mongodb://127.0.0.1:27017/taskflow
MONGODB_URI_PRO=your_mongodb_atlas_connection_string

AUTH_SECRET=your_auth_secret

AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret

PUSHER_APP_ID=your_pusher_app_id
NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
NEXT_PUBLIC_PUSHER_CLUSTER=your_pusher_cluster
```

**4. Start the development server**

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 🔐 Authentication

TaskFlow supports secure authentication using NextAuth.js, including credentials-based login and optional Google and GitHub OAuth providers.

Passwords are hashed using bcryptjs, and protected routes ensure that users can access only authorized resources.

## 📋 Task Management

Users can:

- Create new tasks with titles and descriptions
- View their personal tasks
- Edit existing tasks
- Update task completion status
- Delete tasks they no longer need

Tasks are stored in MongoDB and associated with individual users.

## 🌐 Deployment

TaskFlow is deployed using Vercel, with MongoDB Atlas as the production database.

**Live Website:** https://dugsiiye-next-js-project-taskflow-gfd39r4j5-dayah-s-projects.vercel.app

## 👨‍💻 Developer

**Ahmed Dayah**

Full-Stack Developer | MERN Stack | Next.js

**GitHub:** https://github.com/ahmeddayah8

## 📄 License

This project is intended for educational and portfolio purposes.
