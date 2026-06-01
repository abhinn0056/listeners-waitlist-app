# Listeners Waitlist App

## Supabase setup

This app stores form submissions in Supabase tables.

### Required tables

Use the following SQL to create them in Supabase:

- `waitlist`
- `listener_applications`

See `supabase-schema.sql` for the full schema.

### Required environment variables

Add these to Vercel for deployment, and to `.env.local` for local development:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
ADMIN_EMAIL=
```

- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anonymous public key
- `SUPABASE_SERVICE_ROLE_KEY` — your Supabase service role key (server-only)
- `RESEND_API_KEY` — optional Resend API key for confirmation emails
- `ADMIN_EMAIL` — optional admin email for listener application notifications

## Where data is stored

- `Join Waitlist` submissions are saved to the `waitlist` table
- `Become a listener` submissions are saved to the `listener_applications` table

View the data in the Supabase dashboard under **Table Editor**.

## Vercel deployment

1. Connect your GitHub repository to Vercel.
2. Add the environment variables to Your Project > Settings > Environment Variables.
3. Deploy the app.
4. Open your deployed Vercel URL.

If you want, I can also help you create the exact Supabase project and populate the table definitions step by step.
