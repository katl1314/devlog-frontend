import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';
import SettingsForm from './components/settings-form';
import { Metadata } from 'next';

export default async function SettingsPage() {
	const session = (await auth()) as Session & { accessToken: string };

	if (!session?.user) {
		redirect('/auth');
	}

	const user = session.user as any;

	return (
		<div className="min-h-screen bg-[#fafafa] dark:bg-background flex justify-center py-15 px-5">
			<div className="w-full max-w-150">
				<SettingsForm
					name={user.name ?? ''}
					email={user.email ?? ''}
					image={user.image ?? ''}
					userId={user.id ?? ''}
				/>
			</div>
		</div>
	);
}

export const metadata: Metadata = { title: '환경설정 — Dev.Log' };
