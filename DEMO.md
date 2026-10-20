# Recording outline: under 3 minutes

Before recording: configure Supabase, deploy on Vercel, register/confirm an account, create two realistic tasks, and test the app on your phone. Use your actual deployed URL.

0:00–0:15: Explain the problem: keeping classes, clubs, and personal tasks in one place.
0:15–1:00: Add a task with priority, category, notes, and a deadline. Edit it. Reload to show persistence. Mark it complete and open Completed.
1:00–1:25: Show search, Today/Upcoming, progress counts, and start/pause/reset the focus timer.
1:25–2:10: Explain in your own words: React is the frontend; Next.js API routes run on Vercel; requests carry a Supabase access token; the backend verifies the token and validates input; Supabase Postgres stores the tasks; row-level security protects each user's rows.
2:10–2:40: Show SPEC.md, AGENTS.md, tests, and the implementation pull request. Explain the migration from a first prototype hosted on ChatGPT Sites to a Next.js app on Vercel with email/password accounts.

Submit the live public URL, public GitHub repo, and your recording. Review the code and describe only behavior you have actually verified.
