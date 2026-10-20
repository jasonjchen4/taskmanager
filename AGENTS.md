# Taskmanager
Next.js App Router + Supabase Auth/Postgres, deployed on Vercel.
Commands: npm run dev; npm run build; npm run typecheck; npm test.
Validate bearer tokens with Supabase getUser on every API request. Use only the publishable key; never bypass row-level security. Scope queries by authenticated owner. Keep .env.local out of Git. Show errors and empty states. Use local dates for deadlines.
