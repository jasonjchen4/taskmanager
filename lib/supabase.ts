import { createClient, type SupabaseClient } from '@supabase/supabase-js';
let browser: SupabaseClient | undefined;
export function getBrowserClient() {
  if (!browser) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) throw new Error('Supabase is not configured. Add both environment variables in Vercel and redeploy.');
    browser = createClient(url, key);
  }
  return browser;
}
export async function taskFetch(url: string, init: RequestInit = {}) {
  const { data: { session }, error } = await getBrowserClient().auth.getSession();
  if (error) throw error;
  if (!session) throw new Error('Your session ended. Please sign in again.');
  return fetch(url, {...init, headers: {...init.headers, Authorization: `Bearer ${session.access_token}`}});
}
