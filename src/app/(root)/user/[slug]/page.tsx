import UserLayout from '@/components/Layout/UserLayout';
import UserProfileBottom from '../components/UserProfileBottom';
import UserProfile from '../components/UserProfile';
import { Separator } from '@/components/ui/separator';
import { createClientByBrowser } from '@/utils/supabase/client';
import { createClientByServer } from '@/utils/supabase/server';

export async function generateStaticParams() {
	const supabase = createClientByBrowser();
	const { error, data } = await supabase.from('profiles').select();
	if (error) throw new Error(error.message);
	const params = data.map(({ userId }) => ({ slug: userId }));
	return params;
}

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const supabase = await createClientByServer();
	const userId = (await params).slug;
	const { error, data } = await supabase.from('profiles').select().eq('userId', userId).single();

	if (error) throw new Error(error.message);

	return (
		<main>
			<UserLayout>
				<UserProfile {...data} />
				<Separator className="my-[20px]" />
				<UserProfileBottom {...data} />
			</UserLayout>
		</main>
	);
}
