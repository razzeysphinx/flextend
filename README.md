# FlexTend Physical Therapy Clinic

Next.js website and Supabase-backed clinic administration portal for FlexTend Physical Therapy Clinic in Lipa City, Batangas.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and add the Supabase project URL and publishable key.

3. Start the development server:

   ```bash
   npm run dev
   ```

Open `http://localhost:3000`.

## Available checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Supabase

Database migrations live in `supabase/migrations`. The application uses the publishable Supabase key in browser clients, with authentication and RLS enforcing access to appointments, profiles, and clinic gallery storage.

Never commit Supabase secret keys, passwords, or production credentials. Use a separate development account and rotate credentials if they are exposed.

## Project structure

- `app/` — Next.js routes, authentication, and admin pages
- `components/` — public website and shared UI components
- `lib/supabase/` — browser/server clients and data access
- `supabase/migrations/` — database schema and RLS migrations
- `types/` — shared application types
