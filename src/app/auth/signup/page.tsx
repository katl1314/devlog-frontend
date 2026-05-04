import ProfileSetupForm from './components/profile-setup-form';
import { base64ToString } from '@/utils';
import { cookies } from 'next/headers';
import { Metadata } from 'next';
import { ProviderType } from '@/app/schema';
import Logo from '@/components/logo';
import Link from 'next/link';

export default async function page({
	searchParams
}: {
	searchParams: Promise<{ email?: string }>;
}) {
	const cookie = await cookies();
	const token = cookie.get('signup-token')?.value ?? '';
	const { email: emailParam = '' } = await searchParams;

	let data: {
		user: {
			email: string;
			name: string;
			userId: string;
			description: string;
			image: string;
			provider: ProviderType;
		};
		provider: ProviderType;
	} = {
		user: {
			email: emailParam,
			name: '',
			userId: '',
			description: '',
			image: '',
			provider: 'email'
		},
		provider: 'email'
	};

	if (token && !emailParam) {
		const encodeToken: string = base64ToString(token);
		data = JSON.parse(encodeToken);
	}

	return (
		<div className="min-h-screen flex">
			{/* 브랜드 패널 */}
			<div className="hidden md:flex md:w-105 lg:w-120 shrink-0 bg-zinc-950 flex-col justify-between p-10 lg:p-14">
				<Link href="/auth">
					<Logo size={40} variant="white" />
				</Link>

				<div className="space-y-4">
					<p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">
						개발자 블로그 플랫폼
					</p>
					<h2 className="text-white text-3xl lg:text-4xl font-bold leading-tight">
						거의 다 왔어요.
						<br />
						프로필만 완성하면 됩니다.
					</h2>
					<p className="text-zinc-500 text-sm leading-relaxed">
						이름과 사용자 ID를 설정하면
						<br />
						바로 글을 쓰고 공유할 수 있습니다.
					</p>
				</div>

				<p className="text-zinc-300 text-xs">© 2026 Dev.log Platform</p>
			</div>

			{/* 폼 패널 */}
			<div className="md:flex-1 md:flex md:flex-col md:items-center md:justify-center md:py-14 px-6 py-16 bg-background">
				<div className="md:hidden mb-10">
					<Logo size={40} variant="dark" />
				</div>

				<div className="w-full max-w-85">
					<div className="mb-7">
						<h1 className="text-xl font-semibold text-foreground mb-1.5">
							계정 만들기
						</h1>
						<p className="text-sm text-muted-foreground">
							이미 계정이 있으신가요?{' '}
							<Link
								href="/auth"
								className="text-foreground font-medium underline underline-offset-2"
							>
								로그인
							</Link>
						</p>
					</div>

					<ProfileSetupForm {...data} />
				</div>
			</div>
		</div>
	);
}

export const metadata: Metadata = { title: '회원가입 - devs.log' };
