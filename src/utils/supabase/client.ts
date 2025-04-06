import { createBrowserClient } from '@supabase/ssr';

export function createClientByBrowser() {
	return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
