import { createClientByBrowser } from '@/utils/supabase/client';
// import { createClientByServer } from '@/utils/supabase/server';

export async function generateStaticParams() {
	const supabase = createClientByBrowser();
	const { error, data } = await supabase.from('profiles').select();
	if (error) throw new Error(error.message);

	return data;
}

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
	const username = (await params).username;
	// const supabase = await createClientByServer();
	// const { data, error } = await supabase.from('profiles').select().eq
	return <>{username}</>;
}
