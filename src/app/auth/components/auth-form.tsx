'use client';

import React, { useState } from 'react';
import LogoIcon from '@/components/logo-icon';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { checkEmail } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const LoadingSpinner = () => (
	<svg
		className="animate-spin h-4 w-4"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
	>
		<circle
			className="opacity-25"
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
			strokeWidth="4"
		/>
		<path
			className="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
		/>
	</svg>
);

const GoogleIcon = () => (
	<svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
		<path
			d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
			fill="#4285F4"
		/>
		<path
			d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
			fill="#34A853"
		/>
		<path
			d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
			fill="#FBBC05"
		/>
		<path
			d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
			fill="#EA4335"
		/>
	</svg>
);

type Mode = 'social' | 'email' | 'password';

const inputCls =
	'w-full border border-border bg-transparent rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors';

const labelCls =
	'block text-xs font-medium text-foreground mb-1.5 tracking-wide';

export default function AuthForm({ callbackUrl }: { callbackUrl?: string }) {
	const redirectTo = callbackUrl ?? '/';
	const router = useRouter();
	const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
	const [mode, setMode] = useState<Mode>('social');
	const [email, setEmail] = useState('');
	const [loginError, setLoginError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleGoogleLogin = async () => {
		setLoadingProvider('google');
		await signIn('google', { redirect: true, redirectTo });
		setLoadingProvider(null);
	};

	const handleEmailSubmit = async (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		const exists = await checkEmail(email);
		setIsSubmitting(false);
		if (exists) {
			setMode('password');
		} else {
			router.push(`/auth/signup?email=${encodeURIComponent(email)}`);
		}
	};

	const handlePasswordSubmit = async (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		setLoginError(null);
		setIsSubmitting(true);
		const form = e.currentTarget;
		const password = (form.elements.namedItem('password') as HTMLInputElement)
			.value;
		const result = await signIn('credentials', {
			email,
			password,
			redirect: false
		});
		setIsSubmitting(false);
		if (result?.error) {
			setLoginError('비밀번호가 올바르지 않습니다.');
		} else {
			window.location.href = redirectTo;
		}
	};

	return (
		<div className="min-h-screen flex">
			<div className="hidden md:flex md:w-105 lg:w-120 shrink-0 bg-zinc-950 flex-col justify-between p-10 lg:p-14">
				<div className="flex items-center gap-2.5">
					<LogoIcon size={40} variant="white" />
					<span className="text-white font-semibold text-xl tracking-tight">
						Dev.log
					</span>
				</div>

				<div className="space-y-4">
					<p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">
						개발자 블로그 플랫폼
					</p>
					<h2 className="text-white text-3xl lg:text-4xl font-bold leading-tight">
						생각을 코드처럼,
						<br />
						글로 남기세요.
					</h2>
					<p className="text-zinc-500 text-sm leading-relaxed">
						트렌드, 튜토리얼, 개발 인사이트를
						<br />
						직접 쓰고 커뮤니티와 공유하세요.
					</p>
				</div>

				<p className="text-zinc-300 text-xs">© 2026 Dev.log Platform</p>
			</div>

			<div className="md:flex-1 md:flex md:flex-col md:items-center md:justify-center md:py-14 px-6 py-25 bg-background">
				<div className="md:hidden flex items-center gap-2 mb-10">
					<LogoIcon size={40} variant="dark" />
					<span className="font-semibold text-xl text-foreground tracking-tight">
						Dev.log
					</span>
				</div>

				<div className="w-full max-w-85">
					<div className="mb-7">
						<h1 className="text-xl font-semibold text-foreground mb-1">
							로그인
						</h1>
						<p className="text-sm text-muted-foreground">
							계속하려면 이메일 또는 소셜 계정으로 로그인하세요.
						</p>
					</div>

					<Button
						variant="outline"
						onClick={handleGoogleLogin}
						disabled={loadingProvider !== null}
						className="w-full gap-2.5 py-2.5"
					>
						{loadingProvider === 'google' ? <LoadingSpinner /> : <GoogleIcon />}
						{loadingProvider === 'google' ? '연결 중...' : 'Google로 계속하기'}
					</Button>

					<div className="relative my-5">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t border-border" />
						</div>
						<div className="relative flex justify-center text-xs">
							<span className="bg-background px-2.5 text-muted-foreground">
								또는
							</span>
						</div>
					</div>

					{mode === 'social' && (
						<Button
							variant="outline"
							onClick={() => setMode('email')}
							className="w-full py-2.5"
						>
							이메일로 계속하기
						</Button>
					)}

					{mode === 'email' && (
						<form onSubmit={handleEmailSubmit} className="space-y-3.5">
							<div>
								<label className={labelCls}>이메일</label>
								<input
									type="email"
									name="email"
									required
									autoFocus
									placeholder="example@email.com"
									value={email}
									onChange={e => setEmail(e.target.value)}
									className={inputCls}
								/>
							</div>
							<Button
								type="submit"
								variant="outline"
								disabled={isSubmitting}
								className="w-full gap-2 py-2.5"
							>
								{isSubmitting && <LoadingSpinner />}
								{isSubmitting ? '확인 중...' : '계속하기'}
							</Button>
							<Button
								type="button"
								variant="ghost"
								onClick={() => setMode('social')}
								className="w-full text-xs text-muted-foreground hover:text-foreground pt-1"
							>
								<ChevronLeft className="w-3.5 h-3.5" />
								다른 방법으로 로그인
							</Button>
						</form>
					)}

					{mode === 'password' && (
						<form onSubmit={handlePasswordSubmit} className="space-y-3.5">
							<div>
								<label className={labelCls}>이메일</label>
								<input
									type="email"
									value={email}
									readOnly
									className={`${inputCls} opacity-60`}
								/>
							</div>
							<div>
								<label className={labelCls}>비밀번호</label>
								<input
									type="password"
									name="password"
									required
									autoFocus
									placeholder="••••••••"
									className={inputCls}
								/>
							</div>
							{loginError && (
								<p className="text-destructive text-xs">{loginError}</p>
							)}
							<Button
								type="submit"
								variant="outline"
								disabled={isSubmitting}
								className="w-full gap-2 py-2.5"
							>
								{isSubmitting && <LoadingSpinner />}
								{isSubmitting ? '로그인 중...' : '로그인'}
							</Button>
							<Button
								type="button"
								variant="ghost"
								onClick={() => {
									setMode('email');
									setLoginError(null);
								}}
								className="w-full text-xs text-muted-foreground hover:text-foreground pt-1"
							>
								<ChevronLeft className="w-3.5 h-3.5" />
								이메일 다시 입력
							</Button>
						</form>
					)}

					<p className="text-xs text-muted-foreground text-center mt-8 leading-relaxed">
						계속 진행하면{' '}
						<span className="underline underline-offset-2 cursor-pointer hover:text-foreground transition-colors">
							이용약관
						</span>{' '}
						및{' '}
						<span className="underline underline-offset-2 cursor-pointer hover:text-foreground transition-colors">
							개인정보처리방침
						</span>
						에 동의하게 됩니다.
					</p>
				</div>
			</div>
		</div>
	);
}
