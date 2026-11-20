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
- `lotsman.policy.json` — the policy of the project; it holds its version only.
- `CLAUDE.md` — the rules for agents that work in the project.
- `.github/workflows/ci.yml` — install, typecheck, build and smoke test on every pull request.

`lotsman.yaml` and `lotsman.policy.json` point to the schemas that Lotsman publishes, so an editor
checks them as you type. No copy of a schema lives here.

## Commands

```
npm ci
npm run dev        # local server
npm run typecheck
npm run build
npm test
```
