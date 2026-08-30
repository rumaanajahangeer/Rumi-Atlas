This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Production configuration

Set these variables in **Vercel → Project Settings → Environment Variables** for the Production environment before deploying:

```text
DATABASE_URL=libsql://<your-database>.turso.io
TURSO_AUTH_TOKEN=<Turso database auth token>
BLOB_READ_WRITE_TOKEN=<Vercel Blob read/write token>
NEXTAUTH_SECRET=<unique, high-entropy secret>
NEXTAUTH_URL=https://<your-production-domain>
```

The local `.env` and `dev.db` files are intentionally ignored by Git and are therefore not present in Vercel's clean build environment. The public pages and sitemap explicitly defer database access until request time, so the production build does not read local development data.

The application uses local `file:` SQLite URLs in development and Turso/libSQL (`libsql://`) in production. Turso is SQLite-compatible, so the existing Prisma schema remains valid, while database writes are durable outside Vercel's ephemeral filesystem. Create the remote database, apply the schema using Turso's migration workflow, then seed it with `DATABASE_URL` and `TURSO_AUTH_TOKEN` set to the production values. `TURSO_DATABASE_URL` is also supported as a compatibility alias. Do not use a local SQLite file for production writes.

Media is uploaded directly from the browser to Vercel Blob with authenticated, short-lived upload tokens, so uploads do not pass through the Vercel Function request body. The public Blob URL returned by the upload is saved in the post record when the journal is saved. Images and videos are accepted, and multipart uploading supports files up to Vercel Blob's 5 TB token limit.
