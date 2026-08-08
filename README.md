# CodeClub KLE Tech

CodeClub KLE Tech is the student community hub for competitive programming at KLE Technological University. It brings club activity, a guided Codeforces practice path, contest resources, and member-written learning notes into one place—so students can spend less time searching and more time solving together.

## What it includes

- **Landing page** with the club’s mission, stats, team, and feature overview.
- **Google sign-in** for member access.
- **Codeforces connection and verification**: members submit a handle and verify ownership through a recent compilation-error submission.
- **Curated problem tracker**: level-based Codeforces problems with filters, pagination, and solved-status tracking from the Codeforces API.
- **Community blogs**: authenticated members can write rich-text posts, browse posts, and like/unlike them.
- **Events and editorials**: event highlights plus downloadable contest editorial PDFs.
- **Light/dark theming** and responsive UI components.

## Implementation

| Area | Details |
| --- | --- |
| Framework | Next.js 15 App Router, React 19, TypeScript |
| UI | Tailwind CSS v4, Radix UI, Lucide icons, Motion, Sonner notifications |
| Authentication | Auth.js / NextAuth v5 with Google OAuth, Prisma adapter, JWT sessions |
| Database | PostgreSQL with Prisma |
| Content | Tiptap rich-text editor for blogs; editorial PDFs and event/team media in `public/` |
| External data | Codeforces `user.status` API verifies handles and matches accepted submissions to the curated problem list in `data/questions.ts` |

Protected routes include `/explore`, `/problems`, `/blogs`, and `/events`. API handlers run on the Node.js runtime and enforce authentication before accessing member data. Prisma models cover users, OAuth accounts, blog posts, and per-user blog likes; a unique `(blogId, userId)` constraint prevents duplicate likes.

## Project structure

```text
app/                 Pages, layouts, middleware-protected routes, and API handlers
app/api/             Auth, Codeforces verification/progress, and blog endpoints
components/          Feature, navigation, editor, and reusable UI components
data/questions.ts    Curated Codeforces practice list
prisma/              PostgreSQL schema and migrations
public/              Images and downloadable contest editorials
```

## Run locally

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Google OAuth credentials

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` from the following values:

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/codeclub"
   AUTH_SECRET="replace-with-a-long-random-secret"
   AUTH_GOOGLE_ID="your-google-oauth-client-id"
   AUTH_GOOGLE_SECRET="your-google-oauth-client-secret"
   ```

3. Apply the committed database migrations:

   ```bash
   npx prisma migrate dev
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev    # Start local development
npm run build  # Generate Prisma Client and build for production
npm run start  # Run the production build
npm run lint   # Run the configured linter
```

## How progress tracking works

After connecting a verified Codeforces handle, the app requests that handle’s submissions from Codeforces. Accepted submissions are reduced to `contestId-problemIndex` keys and compared with each curated problem URL. The resulting list is returned with a `completed` flag, which powers the tracker UI. No Codeforces password or API key is collected.
