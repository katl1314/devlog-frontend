import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';
import SettingsForm from './components/settings-form';
import { Metadata } from 'next';
import { userService } from '@/services/user.service';
import { Themes } from '@/hooks/theme';

export default async function SettingsPage() {
	const session = (await auth()) as Session & { accessToken: string };

	if (!session?.user) {
		redirect('/auth');
	}

	const user = session.user as any;

	let initialTheme: Themes = 'system';
	try {
		const settings = await userService.getSettings(user.id, session.accessToken);
		initialTheme = (settings?.theme?.toLowerCase() as Themes) ?? 'system';
	} catch {
		// 설정 조회 실패 시 system 기본값 유지
	}

	return (
		<div className="min-h-screen flex justify-center py-12 px-5">
			<div className="w-full max-w-2xl">
				<SettingsForm
					name={user.name ?? ''}
					email={user.email ?? ''}
					image={user.image ?? ''}
					userId={user.id ?? ''}
					initialTheme={initialTheme}
				/>
			</div>
		</div>
	);
}

export const metadata: Metadata = { title: '환경설정 — Dev.Log' };
