import { createClientByBrowser } from '@/utils/supabase/client';

export async function generateStaticParams() {
	const supabase = createClientByBrowser();
	const { error, data } = await supabase.from('profiles').select();
	if (error) throw new Error(error.message);

	return data;
}

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
	const userId = (await params).username;
	return <>{userId}</>;
}
