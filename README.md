# Gym PR Board

**Your personal records, in one place**

Your personal records, in one place.

A full-stack demo built with **Next.js 14 (App Router)**, **Tailwind CSS** and a
**Supabase (Postgres)** backend. Records are written from the browser straight to
Postgres through row-level security policies — no custom API layer to maintain.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14, App Router, TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase Postgres, RLS-secured |
| Hosting | GitHub Pages (static export via GitHub Actions) |

## Run it locally

```bash
npm install
cp .env.example .env.local   # add your Supabase URL + anon key
npm run dev
```

Open http://localhost:3000.

## Set up the database

Run `supabase/migrations/0001_init.sql` in the Supabase SQL editor. It is
idempotent — safe to run more than once. It creates the `gym_pr_board_lifts` table,
enables row-level security and adds read/insert policies for anonymous users.

## Data model

Table: `gym_pr_board_lifts`

| Column | Type |
| --- | --- |
| `exercise` | text |
| `weight_kg` | numeric |
| `reps` | integer |
| `set_type` | text |
| `lifted_on` | date |
| `created_at` | timestamptz |

Every row also has `id uuid` and `created_at timestamptz`.

## Deploy

Every push to `main` runs `.github/workflows/deploy-pages.yml`, which builds a
static export and publishes it to GitHub Pages. Add `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY` as repository Actions secrets first. The live site
is served from `https://<owner>.github.io/<repo>/`.

## What it does

- **Weight times reps** — The honest measure of a lift.
- **Progress over time** — Old records stay, new ones stack up.
- **Working sets vs maxes** — Keep test days separate from training days.

## License

MIT
