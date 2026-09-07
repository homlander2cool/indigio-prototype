# Indigio

A tokenized real-estate investing platform built with Next.js, TypeScript, and Tailwind.

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
   (Edit `.env.local` with your environment values)
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
  - /login (server-authenticated investor access)
  - /kyc (KYC onboarding)
  - /dashboard (protected investor dashboard)
- API routes:
  - /api/deals, /api/deals/[slug]
  - /api/kyc (server-side KYC submission)
  - /api/investor-pack (gated investor pack endpoint)
  - /api/dashboard/balances (protected dashboard data)
- Sanity CMS schema example in /sanity (deal schema)
- CI workflow: .github/workflows/ci.yml (build + Lighthouse run)
- Figma-ready assets will be provided as a downloadable ZIP (hi-fi landing, login, KYC screens)

Environment variables
Fill these in your local .env or your deployment provider (Vercel) environment settings.

Required (development)
- NEXTAUTH_URL=http://localhost:3000
- NEXTAUTH_SECRET=change-me-to-a-secure-random-value
- AUTH_EMAIL=your-investor-email
- AUTH_PASSWORD=your-secure-password

Recommended / for production
- SANITY_PROJECT_ID=your_sanity_project_id
- SANITY_DATASET=production
- SANITY_READ_TOKEN=... (read-only token for server usage)
- SANITY_WRITE_TOKEN=... (only if you want CI or me to seed content remotely)
- SENDGRID_API_KEY=... (for emailing gated investor packs)
- ONFIDO_API_TOKEN=... or JUMIO credentials for KYC integrations

Supabase authentication and investor provisioning
1. Run `supabase/schema.sql` in the Supabase SQL editor.
2. Configure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`, and `ADMIN_EMAIL` in Vercel. Never expose the
   service-role key or an admin password to the browser or repository.
3. Set `ADMIN_INITIAL_PASSWORD` temporarily in a secure environment and run
   `npm run supabase:create-admin` once. Remove the temporary variable after
   the admin is created.
4. Sign in at `/login` and open `/admin/users` to provision KYC-approved
   investors. The generated password is shown once so it can be delivered
   securely and changed by the investor.

Supabase stores authentication and investor profiles, including each user's
editable `dashboard_asset_usd`. Existing deal, holding, KYC, and contact
records continue using the configured libSQL/Turso database until migrated.

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
- Investor pack: store documents in a secure file store and provide time-limited presigned URLs, or email unique download links with SendGrid.

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
- Remote (CI-driven): Add SANITY_WRITE_TOKEN to repo secrets and run the seeding job to publish deals.
- Local: Run the Sanity CLI locally to seed content.

Contributing
- Branching: create topic branches from main (e.g., feature/your-change)
- PRs: open PRs against main; CI will run build & Lighthouse checks
- Coding: follow the existing styles (Tailwind utility classes, React functional components)

Notes for maintainers / next steps
- Replace the single-account auth configuration with your production identity provider when multi-user accounts are enabled.
- Replace the prototype KYC endpoint with Onfido or Jumio server-side integration. Use webhooks to track result status and persist to DB.
- Integrate a database for users, KYC status, deal commitments, and ledgering of token allocations.
- Integrate smart contract interactions (ethers.js + wagmi) once contracts & networks are chosen (recommend Polygon/L2).

Contact / ownership
- Project owner: <replace-with-your-name-or-org>
- Maintainer / dev contact: <replace-with-your-email-or-team>

License
- Add your license here (MIT / Proprietary / etc.)

— end of README —
