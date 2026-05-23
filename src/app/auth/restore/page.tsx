import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { base64ToString } from '@/utils';
import Link from 'next/link';
import Logo from '@/components/logo';
import RestoreActions from './components/restore-actions';

export default async function RestorePage() {
	const cookieStore = await cookies();
	const token = cookieStore.get('restore-token')?.value;

	if (!token) {
		redirect('/');
	}

	let email = '';
	let remainingDays: number | null = null;

	try {
		const decoded = JSON.parse(base64ToString(token)) as {
			email: string;
			deletedAt?: string;
		};
		email = decoded.email;

		if (decoded.deletedAt) {
			const elapsed = Date.now() - new Date(decoded.deletedAt).getTime();
			const remaining = Math.ceil(
				(7 * 24 * 60 * 60 * 1000 - elapsed) / (1000 * 60 * 60 * 24)
			);
			remainingDays = remaining > 0 ? remaining : 0;
		}
	} catch {
		redirect('/');
	}

	return (
		<div className="min-h-screen flex">
			{/* 브랜드 패널 */}
			<div className="hidden md:flex md:w-105 lg:w-120 shrink-0 bg-zinc-950 flex-col justify-between p-10 lg:p-14">
				<Link href="/">
					<Logo size={40} variant="white" />
				</Link>
				<div className="space-y-4">
					<p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">
						개발자 블로그 플랫폼
					</p>
					<h2 className="text-white text-3xl lg:text-4xl font-bold leading-tight">
						아직 늦지 않았어요.
						<br />
						지금 복구할 수 있습니다.
					</h2>
					<p className="text-zinc-500 text-sm leading-relaxed">
						탈퇴 유예 기간 내에 복구하면
						<br />
						모든 데이터가 그대로 유지됩니다.
					</p>
				</div>
				<p className="text-zinc-300 text-xs">© 2026 Dev.log Platform</p>
			</div>

			{/* 콘텐츠 패널 */}
			<div className="flex-1 flex flex-col items-center justify-center px-6 py-14 bg-background">
				<div className="md:hidden mb-10">
					<Logo size={40} variant="dark" />
				</div>

				<div className="w-full max-w-85 flex flex-col items-center text-center gap-6">
					<div className="space-y-2">
						<h1 className="text-xl font-semibold text-foreground">
							탈퇴 진행 중인 계정입니다
						</h1>
						<p className="text-sm text-muted-foreground leading-relaxed">
							이 계정(<span className="font-medium text-foreground">{email}</span>)은
							탈퇴 처리 중입니다.
						</p>
						{remainingDays !== null && (
							<p className="text-sm text-muted-foreground">
								데이터가 완전히 삭제되기까지{' '}
								<span className="font-semibold text-foreground">
									{remainingDays}일
								</span>{' '}
								남았습니다.
							</p>
						)}
					</div>

					<RestoreActions />
				</div>
			</div>
		</div>
	);
}
