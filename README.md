# Indigio Prototype

A production-ready prototype for Indigio — a tokenized real-estate investing platform. This repo contains a Next.js + TypeScript + Tailwind scaffold with demo login, KYC flow, deals listing, dynamic deal pages, gated investor pack, Sanity CMS schema examples, and a mock investor dashboard.

Replace the placeholder content and assets with your brand, legal, and production integrations before going live.

Status
- Branch to be added: feature/indigio-full (scaffold ready)
- Repo: homlander2cool/indigio-prototype
- This file is intended as the initial commit README — edit the sections below to reflect your project details.

Quickstart (developer)
1. Clone the repo:
   git clone git@github.com:<your-org-or-username>/indigio-prototype.git
2. Install dependencies:
   npm install
3. Copy environment example and update values:
   cp .env.example .env.local
   (Edit `.env.local` with real values or the demo values below)
4. Run dev server:
   npm run dev
5. Open http://localhost:3000

Recommended initial commit message
- git add README.md
- git commit -m "chore: initial commit (README)"
- git push -u origin main

What’s included
- Next.js (App Router) + TypeScript + Tailwind CSS scaffold
- Pages:
  - / (landing)
  - /deals (listing)
  - /deals/[slug] (dynamic deal page)
  - /login (demo credentials via NextAuth Credentials provider)
  - /kyc (KYC onboarding prototype)
  - /dashboard (protected investor dashboard with mocked token balances)
- API routes:
  - /api/deals, /api/deals/[slug]
  - /api/kyc/submit (prototype; saves demo data server-side)
  - /api/investor-pack (gated investor pack endpoint)
  - /api/dashboard/balances (mock balances)
- Sanity CMS schema example in /sanity (deal schema)
- CI workflow: .github/workflows/ci.yml (build + Lighthouse run)
- Figma-ready assets will be provided as a downloadable ZIP (hi-fi landing, login, KYC screens)

Environment variables
Fill these in your local .env or your deployment provider (Vercel) environment settings.

Required (development)
- NEXTAUTH_URL=http://localhost:3000
- NEXTAUTH_SECRET=change-me-to-a-secure-random-value
- NEXT_PUBLIC_DEMO_EMAIL=demo@indigio.test
- DEMO_PASSWORD=password123

Recommended / for production
- SANITY_PROJECT_ID=your_sanity_project_id
- SANITY_DATASET=production
- SANITY_READ_TOKEN=... (read-only token for server usage)
- SANITY_WRITE_TOKEN=... (only if you want CI or me to seed content remotely)
- SENDGRID_API_KEY=... (for emailing gated investor packs)
- ONFIDO_API_TOKEN=... or JUMIO credentials for KYC integrations

Sanity (CMS) — quick guide
1. Create a Sanity project: https://www.sanity.io/
2. In the Sanity project, create a dataset (e.g., production).
3. Add the SANITY_PROJECT_ID and dataset to your .env / Vercel secrets.
4. If you want remote automatic seeding (CI-run), add SANITY_WRITE_TOKEN as a repo secret — otherwise, run seeding locally:
   - npm i -g @sanity/cli
   - cd sanity
   - sanity init (or sanity start if Studio is included)
   - sanity dataset import seed.json production

Investor pack (gating)
- Prototype behavior: /api/investor-pack returns a demo PDF path from /public/assets/.
- Production recommendation: store investor pack PDFs in S3 or a secure file store and provide time-limited presigned URLs, or email unique download links with SendGrid.

Security & privacy (important)
- Never commit secrets or PII into the repository.
- Do NOT store base64 images or raw PII on disk in production. Use signed uploads to S3 or direct upload to your KYC provider (Onfido/Jumio).
- Use a proper database (Postgres, Supabase) to store user profiles, KYC results, and investor commitments.
- Ensure KYC/AML, legal agreements, and tokenization comply with local regulations before accepting funds or minting tokens.

Deployment (Vercel)
1. Connect your GitHub repo to Vercel.
2. Set environment variables in the Vercel Project Settings (Production and Preview).
3. Trigger a deploy (Vercel will build and deploy automatically).
4. Add any service secrets (SANITY tokens, SENDGRID API KEY, ONFIDO credentials) as environment variables via Vercel’s UI (do not paste them here).

Seeding (choose one)
- Remote (CI-driven): Add SANITY_WRITE_TOKEN to repo secrets. After push, run the seeding job (CI action or script) to publish demo deals to Sanity.
- Local: I included example Sanity schema files and a seed JSON — run the Sanity CLI locally to seed demo content.

Contributing
- Branching: create topic branches from main (e.g., feature/your-change)
- PRs: open PRs against main; CI will run build & Lighthouse checks
- Coding: follow the existing styles (Tailwind utility classes, React functional components)

Notes for maintainers / next steps
- Replace the demo Credentials auth with production-grade auth (Auth0, Supabase Auth, or custom).
- Replace the prototype KYC endpoint with Onfido or Jumio server-side integration. Use webhooks to track result status and persist to DB.
- Integrate a database for users, KYC status, deal commitments, and ledgering of token allocations.
- Integrate smart contract interactions (ethers.js + wagmi) once contracts & networks are chosen (recommend Polygon/L2).

Contact / ownership
- Project owner: <replace-with-your-name-or-org>
- Maintainer / dev contact: <replace-with-your-email-or-team>

License
- Add your license here (MIT / Proprietary / etc.)

— end of README —
