import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client (Phase 5 content backend).
 *
 * Uses the anon/publishable key — safe by design, since it can only do
 * what Row Level Security allows (see supabase/migrations/0001_init.sql):
 * public read on decades/categories/quizzes/questions, and public insert
 * on submissions. There is no client-side Supabase usage yet — every
 * read currently happens in a Server Component or Server Action, the
 * same pattern already established for answer validation (master brief
 * §44), so this is wrapped in `server-only` for consistency even though
 * the key itself isn't a secret.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY — check .env.local against .env.local.example.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});
