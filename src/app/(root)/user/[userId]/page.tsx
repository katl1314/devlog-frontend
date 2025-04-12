import { createClientByBrowser } from '@/utils/supabase/client';
// import { createClientByServer } from '@/utils/supabase/server';

export async function generateStaticParams() {
	const supabase = createClientByBrowser();
	const { error, data } = await supabase.from('user').select();
	if (error) throw new Error(error.message);

	return data;
}

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
	const userId = (await params).userId;
	return <>{userId}</>;
}
