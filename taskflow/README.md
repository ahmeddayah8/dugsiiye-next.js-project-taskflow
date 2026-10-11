# TaskFlow
Next.js 15 + MongoDB + NextAuth task manager.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and configure MongoDB and AUTH_SECRET (`npx auth secret`).
3. `npm run dev`
4. Open http://localhost:3000

## Features
- Email/password registration and login
- Optional Google/GitHub OAuth (requires credentials)
- Per-user task CRUD with protected server APIs
- Optional Pusher private-channel real-time synchronization (requires credentials)

OAuth callbacks: `/api/auth/callback/google` and `/api/auth/callback/github`.

Never commit `.env.local`. Pusher is optional; without it, changes still refresh after each local mutation.
