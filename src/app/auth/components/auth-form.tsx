'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { formInitialState, RegisterType } from '@/app/schema';
import { createUser } from '@/actions/actions';
import LogoIcon from '@/components/logo-icon';
import { signIn } from 'next-auth/react';

const LoadingSpinner = () => (
	<svg
		className="animate-spin h-5 w-5 mr-3 text-current"
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
		></circle>
		<path
			className="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
		></path>
	</svg>
);

type Mode = 'social' | 'login' | 'register';

export default function AuthForm({ callbackUrl }: { callbackUrl?: string }) {
	const redirectTo = callbackUrl ?? '/';
	const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
	const [mode, setMode] = useState<Mode>('social');
	const [loginError, setLoginError] = useState<string | null>(null);
	const [registerError, setRegisterError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [registerState, registerAction, isRegistering] = useActionState<
		RegisterType,
		FormData
	>(createUser, formInitialState);

	// 회원가입 완료 후 자동 로그인
	useEffect(() => {
		if (registerState.errors) {
			setRegisterError(Object.values(registerState.errors).join(' '));
		} else if (registerState.userId) {
			(async () => {
				await signIn('signup-complete', {
					email: registerState.email,
					redirect: true,
					redirectTo
				});
			})();
		}
	}, [registerState]);

	const handleGoogleLogin = async () => {
		setLoadingProvider('google');
		await signIn('google', { redirect: true, redirectTo });
		setLoadingProvider(null);
	};

	const handleCredentialsLogin = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		setLoginError(null);
		setIsSubmitting(true);
		const form = e.currentTarget;
		const email = (form.elements.namedItem('email') as HTMLInputElement).value;
		const password = (form.elements.namedItem('password') as HTMLInputElement)
			.value;

		const result = await signIn('credentials', {
			email,
			password,
			redirect: false
		});

		setIsSubmitting(false);
		if (result?.error) {
			setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.');
		} else {
			window.location.href = redirectTo;
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
			{/* 배경 장식 */}
			<div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
				<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/60 blur-[120px]"></div>
				<div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-100/60 blur-[120px]"></div>
			</div>

			<main className="w-full max-w-md z-10">
				<div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-white p-8 md:p-12 transition-all hover:shadow-indigo-200/40">
					{/* 헤더 */}
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center mb-6">
							<LogoIcon size={64} />
						</div>
						<h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
							Dev.log
						</h1>
						<p className="text-slate-500 font-medium">
							많은 개발자와 지식을 공유하세요!
						</p>
					</div>

					{/* 탭 */}
					<div className="flex rounded-2xl bg-slate-100 p-1 mb-8">
						<button
							onClick={() => setMode('social')}
							className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${mode === 'social' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
						>
							소셜 로그인
						</button>
						<button
							onClick={() => {
								setMode('login');
								setLoginError(null);
							}}
							className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
						>
							이메일 로그인
						</button>
						<button
							onClick={() => setMode('register')}
							className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${mode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
						>
							회원가입
						</button>
					</div>

					{/* 소셜 로그인 */}
					{mode === 'social' && (
						<div className="space-y-4">
							<button
								onClick={handleGoogleLogin}
								disabled={loadingProvider !== null}
								className="w-full group flex items-center justify-center gap-3 bg-white border border-slate-200 py-4 px-6 rounded-2xl text-slate-700 font-bold transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] disabled:opacity-70 shadow-sm cursor-pointer"
							>
								{loadingProvider === 'google' ? (
									<LoadingSpinner />
								) : (
									<svg
										className="w-5 h-5 group-hover:scale-110 transition-transform"
										viewBox="0 0 24 24"
									>
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
								)}
								{loadingProvider === 'google'
									? '로그인 시도 중...'
									: 'Google 계정으로 로그인'}
							</button>
						</div>
					)}

					{/* 이메일/비밀번호 로그인 */}
					{mode === 'login' && (
						<form onSubmit={handleCredentialsLogin} className="space-y-4">
							<div>
								<label className="block text-sm font-bold text-slate-700 mb-1.5">
									이메일
								</label>
								<input
									type="email"
									name="email"
									required
									placeholder="example@email.com"
									className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
								/>
							</div>
							<div>
								<label className="block text-sm font-bold text-slate-700 mb-1.5">
									비밀번호
								</label>
								<input
									type="password"
									name="password"
									required
									placeholder="비밀번호를 입력하세요"
									className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
								/>
							</div>
							{loginError && (
								<p className="text-red-500 text-sm font-medium">{loginError}</p>
							)}
							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-4 rounded-2xl hover:opacity-90 active:scale-[0.98] disabled:opacity-70 transition-all shadow-lg shadow-indigo-200 cursor-pointer"
							>
								{isSubmitting ? <LoadingSpinner /> : null}
								{isSubmitting ? '로그인 중...' : '로그인'}
							</button>
						</form>
					)}

					{/* 회원가입 */}
					{mode === 'register' && (
						<form action={registerAction} className="space-y-4">
							<div>
								<label className="block text-sm font-bold text-slate-700 mb-1.5">
									이메일
								</label>
								<input
									type="email"
									name="email"
									required
									placeholder="example@email.com"
									className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
								/>
							</div>
							<div>
								<label className="block text-sm font-bold text-slate-700 mb-1.5">
									비밀번호
								</label>
								<input
									type="password"
									name="password"
									required
									placeholder="비밀번호를 입력하세요"
									className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
								/>
							</div>
							<div>
								<label className="block text-sm font-bold text-slate-700 mb-1.5">
									프로필 이름
								</label>
								<input
									type="text"
									name="username"
									required
									placeholder="닉네임"
									className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
								/>
							</div>
							<div>
								<label className="block text-sm font-bold text-slate-700 mb-1.5">
									사용자 ID
								</label>
								<input
									type="text"
									name="userId"
									required
									maxLength={20}
									placeholder="영문/숫자 20자 이내"
									className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
								/>
							</div>
							<div>
								<label className="block text-sm font-bold text-slate-700 mb-1.5">
									한 줄 소개{' '}
									<span className="text-slate-400 font-normal">(선택)</span>
								</label>
								<input
									type="text"
									name="description"
									placeholder="간단한 자기소개"
									className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
								/>
							</div>
							<input type="hidden" name="provider" value="email" />
							<input type="hidden" name="image" value="" />
							{registerError && (
								<p className="text-red-500 text-sm font-medium">{registerError}</p>
							)}
							<button
								type="submit"
								disabled={isRegistering}
								className="w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-4 rounded-2xl hover:opacity-90 active:scale-[0.98] disabled:opacity-70 transition-all shadow-lg shadow-indigo-200 cursor-pointer"
							>
								{isRegistering ? <LoadingSpinner /> : null}
								{isRegistering ? '가입 중...' : '가입하기'}
							</button>
						</form>
					)}
				</div>

				{/* 법적 고지 */}
				<div className="mt-8 text-center space-y-1">
					<p className="text-slate-400 text-xs">
						로그인함으로써 귀하는 서비스{' '}
						<span className="text-slate-500 font-medium cursor-pointer hover:underline">
							이용약관
						</span>{' '}
						및
					</p>
					<p className="text-slate-400 text-xs">
						<span className="text-slate-500 font-medium cursor-pointer hover:underline">
							개인정보처리방침
						</span>
						에 동의하게 됩니다.
					</p>
				</div>
			</main>
		</div>
	);
}
