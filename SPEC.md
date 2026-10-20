# Taskmanager specification

A student can manage private tasks across devices with an email/password account.

Task fields: title (required, <=160 characters), notes (<=3000), category (required, <=40), priority (low/medium/high), optional due date, completion status. Dates use local calendar days. Today includes overdue tasks. Completed tasks can be reopened.

Users can search title, notes and category; filter by category; sort by due date or priority. The sidebar counts and progress panel are calculated from saved tasks. The focus timer supports start/pause/resume/reset and elapsed wall-clock time. It does not persist across reloads.

Stack: Next.js App Router, React, TypeScript, Supabase Auth/Postgres, Vercel. API accepts Bearer access tokens, verifies them with getUser, validates input with Zod, and scopes queries by authenticated owner. RLS enforces the same ownership rule in the database. No secret or service-role key in the app. Never trust user IDs from JSON.

UX: empty/loading/error states, accessible dialogs, responsive layouts. Signup handles email confirmation. Task changes remain visible only after a successful save. Account changes remount the planner to clear old account data.

Out of scope: shared lists, recurring tasks, reminders, AI, account recovery UI.

Acceptance: create/edit/complete/reopen/delete; reload retains saved task; invalid titles and dates rejected; account B cannot access account A tasks; no credentials or local environment files committed. Production auth/database checks require the configured schema and actual user accounts.
