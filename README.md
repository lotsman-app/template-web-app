# Web app template

The starting point of a new Lotsman project: a small web app that builds, deploys and answers its
health check without any environment variable, so the first pull request of an agent has a green
pipeline to build on.

## Stack

- Next.js (App Router) and TypeScript, Node 22
- Supabase for the database (connected by the owner when the project needs one)
- Vercel for hosting; functions run in the `fra1` region (`vercel.json`)

## What is in it

- `app/` — the pages and the health route `app/api/health/route.ts`, which answers `GET /api/health`
  with `{"status":"ok"}`.
- `tests/` — the smoke test of the health route (`npm test`).
- `lotsman.yaml` — the project contract: the install and verify commands, the deploy provider and
  the health path.
- `lotsman.policy.json` — the policy of the project; it holds the migration rules: a destructive migration asks the owner, an additive one only notifies.
- `supabase/migrations/` — the database migrations, applied to production by
  `.github/workflows/supabase-migrations.yml`.
- `CLAUDE.md` — the rules for agents that work in the project.
- `.github/workflows/ci.yml` — install, typecheck, build and smoke test on every pull request.

`lotsman.yaml` and `lotsman.policy.json` point to the schemas that Lotsman publishes, so an editor
checks them as you type. No copy of a schema lives here.

## Checks that must not block a merge

Lotsman merges in batches and judges the batch commit on `lotsman/batch-**` by every check CI
reports there, unless `lotsman.yaml` lists the checks that count in `merge_train.checks`. A check that
must not block a merge, for example an advisory scan, is kept non-red in CI itself: do not run it on
`lotsman/batch-**`, or set `continue-on-error: true` on its step so a failure there leaves the job
green. A red check that is neither listed nor kept non-red blocks the batch.

## Database migrations

Migrations live in `supabase/migrations/`. A push to `main` that changes that folder runs the
`supabase-migrations.yml` workflow, which applies the pending ones with `supabase db push` against
the `SUPABASE_DB_URL` Actions secret. A migration whose leading comment lines carry
`-- lotsman: after-deploy` waits, with every migration after it, until the workflow is run by hand
with `after_deploy` set.

## Commands

```
npm ci
npm run dev        # local server
npm run typecheck
npm run build
npm test
```
