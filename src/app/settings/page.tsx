import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';
import SettingsForm, {
	EMPTY_SOCIALS,
	SocialLinks
} from './components/settings-form';
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
	let initialCommentNotification = true;
	let initialUpdateNotification = true;
	try {
		const settings = await userService.getSettings(user.id, session.accessToken);
		initialTheme = (settings?.theme?.toLowerCase() as Themes) ?? 'system';
		initialCommentNotification = settings?.comment_notification ?? true;
		initialUpdateNotification = settings?.update_notification ?? true;
	} catch {
		// 설정 조회 실패 시 기본값 유지
	}

	let initialSocials: SocialLinks = EMPTY_SOCIALS;
	try {
		const profile = await userService.findUserById(user.id);
		initialSocials = { ...EMPTY_SOCIALS, ...(profile?.socials ?? {}) };
	} catch {
		// 프로필 조회 실패 시 빈 값 유지
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
					initialSocials={initialSocials}
					initialCommentNotification={initialCommentNotification}
					initialUpdateNotification={initialUpdateNotification}
				/>
			</div>
		</div>
	);
}

export const metadata: Metadata = { title: '환경설정 — Dev.Log' };
