# Taskmanager

Technify SWE Onboarding Project: a task planner for classes, clubs, projects, and everyday life.

## Features
- Create, edit, complete, reopen, and delete tasks.
- Custom categories, priorities, notes, and deadlines.
- All tasks, Today (including overdue), Upcoming, and Completed views.
- Search, category filtering, and date/priority sorting.
- Progress panel and a 25-minute focus timer with start, pause, resume, and reset.
- Email/password accounts with private database-backed task lists.

## How it works
React renders `app/planner.tsx`. The browser gets an access token from Supabase Auth and sends it with requests to `/api/tasks`. Next.js runs that API on Vercel. The API verifies the token with Supabase `getUser`, validates task input, and reads/writes Supabase Postgres. Row Level Security independently limits every operation to the signed-in owner. The app uses only a publishable key; no database password or service-role key is needed.

The progress counts come from saved tasks. The timer uses an absolute deadline so it handles background tabs, but it resets when the page reloads. This version does not send reminders or share task lists.

## Setup
1. Create a Supabase project.
2. Open its SQL Editor and run [`supabase/schema.sql`](supabase/schema.sql) once. This creates the tasks table, constraints, index, and four ownership policies in one transaction.
3. Copy `.env.example` to `.env.local`. Fill in the Project URL and publishable key from Supabase's Connect panel.
4. Install Node.js 22 or newer, then run:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Register an account. If email confirmation is enabled, confirm your email before signing in.

## Deploy to Vercel
1. Import this GitHub repository as a Next.js project. Root directory: repository root. Keep the default build and output settings.
2. Add both environment variables from `.env.example`, using your actual values, for the Production and Preview environments.
3. Deploy.
4. In Supabase > Authentication > URL Configuration, set Site URL to your deployed HTTPS URL. Add the deployed root URL to Redirect URLs. If using preview deployments, add only the preview URLs you trust. For local development, add `http://localhost:3000/`.
5. Create an account on the deployed site, confirm the email, add a task, then reload to verify persistence.
6. Use a second account to verify that it starts with an empty independent list.

If the app reports the tasks table is missing, run the schema SQL in the same Supabase project specified by your environment variables. Environment variable changes on Vercel require a redeployment.

## Checks
```sh
npm test
npm run typecheck
npm run build
```

The tests cover input validation, calendar dates, blocked client-supplied ownership, and partial updates. They do not replace live authentication/RLS checks against your Supabase project.

## Files to understand
- `app/planner.tsx`: task interface and focus timer.
- `app/login/page.tsx`: email/password signup and sign-in.
- `lib/supabase.ts`: browser session and authenticated API requests.
- `app/api/tasks/route.ts`: backend authentication, validation, and database operations.
- `lib/validation.mjs`: shared task validation.
- `supabase/schema.sql`: database structure and ownership rules.
- `SPEC.md`: product scope.
- `DEMO.md`: recording outline.

Built with a coding agent. The Vercel/Supabase version replaces the earlier ChatGPT Sites hosting and authentication integration. Existing data from the old deployment is not migrated.
