'use client';

import { useState } from 'react';
import { Themes, useTheme } from '@/hooks/theme';
import { updateSettings } from '@/actions/actions';
import { toast } from 'sonner';
import ImageUpload, { useImageUpload } from '@/components/image-upload';

type ThemeOption = Themes;

const SOCIAL_FIELDS = [
	['github', 'GitHub', 'github.com/username'],
	['twitter', 'X (Twitter)', 'x.com/username'],
	['instagram', 'Instagram', '@username'],
	['linkedin', 'LinkedIn', 'linkedin.com/in/username'],
	['youtube', 'YouTube', 'youtube.com/@handle'],
	['website', 'Website', 'https://your-site.com']
] as const;

type SocialKey = (typeof SOCIAL_FIELDS)[number][0];

interface SettingsFormProps {
	name: string;
	email: string;
	image: string;
	userId: string;
	initialTheme: ThemeOption;
}

export default function SettingsForm({
	name,
	email,
	image,
	initialTheme
}: SettingsFormProps) {
	const { setTheme } = useTheme();

	const [username, setUsername] = useState(name);
	const [commentNotification, setCommentNotification] = useState(true);
	const [updateNotification, setUpdateNotification] = useState(false);
	const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(initialTheme);
	const [socials, setSocials] = useState<Record<SocialKey, string>>({
		github: '',
		twitter: '',
		instagram: '',
		linkedin: '',
		youtube: '',
		website: ''
	});
	const [isPending, setIsPending] = useState(false);

	const handleThemeChange = (value: ThemeOption) => {
		setSelectedTheme(value);
		setTheme(value);
	};

	const handleSave = async () => {
		setIsPending(true);
		try {
			await updateSettings({
				name: username,
				socials,
				theme: selectedTheme,
				comment_notification: commentNotification,
				update_notification: updateNotification,
			});
			toast.success('변경사항이 저장됐습니다.');
		} catch {
			toast.error('저장에 실패했습니다.');
		} finally {
			setIsPending(false);
		}
	};

	const handleCancel = () => {
		setUsername(name);
		setSocials({
			github: '',
			twitter: '',
			instagram: '',
			linkedin: '',
			youtube: '',
			website: ''
		});
	};

	return (
		<main className="bg-card rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-12">
			{/* 헤더 */}
			<header className="mb-12">
				<h1 className="text-[28px] font-extrabold tracking-[-0.8px] mb-2">
					환경 설정
				</h1>
				<p className="text-muted-foreground text-[15px]">
					계정 및 인터페이스에 대한 개인 설정을 변경합니다.
				</p>
			</header>

			{/* 기본 프로필 */}
			<section className="mb-10">
				<h3 className="text-[13px] font-bold text-muted-foreground uppercase tracking-[0.5px] mb-4">
					기본 프로필
				</h3>
				<div className="flex items-center gap-6">
					<ImageUpload initialUrl={image ?? ''} onFileChange={file => file && void file}>
						<div className="relative w-20 h-20 rounded-[24px] bg-muted overflow-hidden shrink-0 group">
							<ImageUpload.Upload className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground cursor-pointer">
								{username?.[0]?.toUpperCase()}
							</ImageUpload.Upload>
							<ImageUpload.Preview allowReupload width={80} height={80} />
							<AvatarEditOverlay />
						</div>
					</ImageUpload>
					<div className="flex-1">
						<input
							type="text"
							className="w-full border-none bg-muted px-[18px] py-[14px] rounded-full text-[15px] font-medium outline-none transition focus:bg-purple-50 dark:focus:bg-purple-950/20 focus:ring-2 focus:ring-[#7C3AED]"
							value={username}
							onChange={e => setUsername(e.target.value)}
							placeholder="이름을 입력하세요"
						/>
						<p className="text-xs text-muted-foreground mt-2 ml-3">
							공개 프로필에 표시될 이름입니다.
						</p>
					</div>
				</div>
			</section>

			{/* 이메일 주소 */}
			<section className="mb-10">
				<h3 className="text-[13px] font-bold text-muted-foreground uppercase tracking-[0.5px] mb-4">
					이메일 주소
				</h3>
				<div className="flex items-center justify-between bg-muted rounded-full pl-5 pr-5 h-12">
					<span className="text-[15px] font-extrabold">{email}</span>
					<button
						type="button"
						className="text-[#12b886] font-bold text-[15px] underline underline-offset-4 cursor-pointer bg-transparent border-none"
					>
						변경
					</button>
				</div>
				<p className="text-xs text-muted-foreground mt-2 ml-3">
					회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다.
				</p>
			</section>

			{/* 이메일 수신 설정 */}
			<section className="mb-10">
				<h3 className="text-[13px] font-bold text-muted-foreground uppercase tracking-[0.5px] mb-4">
					이메일 수신 설정
				</h3>
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between bg-muted rounded-full pl-5 pr-3 h-12">
						<span className="text-[15px] font-extrabold">댓글 알림</span>
						<Toggle
							checked={commentNotification}
							onChange={setCommentNotification}
						/>
					</div>
					<div className="flex items-center justify-between bg-muted rounded-full pl-5 pr-3 h-12">
						<span className="text-[15px] font-extrabold">
							Dev.Log 업데이트 소식
						</span>
						<Toggle
							checked={updateNotification}
							onChange={setUpdateNotification}
						/>
					</div>
				</div>
			</section>

			{/* 인터페이스 테마 */}
			<section className="mb-10">
				<h3 className="text-[13px] font-bold text-muted-foreground uppercase tracking-[0.5px] mb-4">
					인터페이스 테마
				</h3>
				<div className="grid grid-cols-3 gap-4">
					{(['light', 'dark', 'system'] as const).map(t => (
						<label key={t} className="cursor-pointer text-center">
							<input
								type="radio"
								name="ui-theme"
								className="hidden"
								checked={selectedTheme === t}
								onChange={() => handleThemeChange(t)}
							/>
							<div
								className={`h-20 rounded-2xl border-2 mb-2.5 overflow-hidden transition ${selectedTheme === t ? 'border-[#7C3AED] shadow-[0_0_0_1px_#7C3AED]' : 'border-border'}`}
							>
								{t === 'light' && (
									<div className="p-2.5 h-full bg-white">
										<div className="h-[6px] w-[40%] rounded-sm mb-2 bg-[#eee]" />
										<div className="h-1 w-[80%] rounded-sm mb-1 bg-[#f5f5f5]" />
										<div className="h-1 w-[50%] rounded-sm bg-[#f5f5f5]" />
									</div>
								)}
								{t === 'dark' && (
									<div className="p-2.5 h-full bg-[#1a1a1a]">
										<div className="h-[6px] w-[40%] rounded-sm mb-2 bg-[#333]" />
										<div className="h-1 w-[80%] rounded-sm mb-1 bg-[#2a2a2a]" />
										<div className="h-1 w-[50%] rounded-sm bg-[#2a2a2a]" />
									</div>
								)}
								{t === 'system' && (
									<div
										className="h-full"
										style={{
											background:
												'linear-gradient(135deg, #fff 50%, #1a1a1a 50%)'
										}}
									/>
								)}
							</div>
							<span
								className={`text-[13px] font-semibold ${selectedTheme === t ? 'text-[#7C3AED]' : 'text-muted-foreground'}`}
							>
								{t === 'light' ? 'Light' : t === 'dark' ? 'Dark' : 'System'}
							</span>
						</label>
					))}
				</div>
			</section>

			{/* 소셜 네트워크 */}
			<section className="mb-10">
				<h3 className="text-[13px] font-bold text-muted-foreground uppercase tracking-[0.5px] mb-4">
					소셜 네트워크
				</h3>
				<div className="flex flex-col gap-3">
					{SOCIAL_FIELDS.map(([key, label, placeholder]) => (
						<div
							key={key}
							className="flex items-center bg-muted rounded-full pl-5 h-12"
						>
							<span className="text-sm font-bold text-muted-foreground min-w-[110px]">
								{label}
							</span>
							<input
								type="text"
								className="flex-1 bg-transparent border-none outline-none text-[15px] font-medium pr-4"
								placeholder={placeholder}
								value={socials[key]}
								onChange={e =>
									setSocials(prev => ({ ...prev, [key]: e.target.value }))
								}
							/>
						</div>
					))}
				</div>
			</section>

			{/* 회원 탈퇴 */}
			<section className="mb-10">
				<h3 className="text-[13px] font-bold text-muted-foreground uppercase tracking-[0.5px] mb-4">
					회원 탈퇴
				</h3>
				<button
					type="button"
					className="bg-[#ff6b6b] text-white border-none px-6 py-3 rounded-[10px] font-bold text-sm cursor-pointer"
				>
					회원 탈퇴
				</button>
				<p className="text-xs text-muted-foreground mt-3">
					탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.
				</p>
			</section>

			{/* 푸터 */}
			<footer className="mt-14 flex justify-end gap-4">
				<button
					type="button"
					onClick={handleCancel}
					className="bg-transparent border-none text-muted-foreground font-semibold cursor-pointer text-[15px]"
				>
					취소
				</button>
				<button
					type="button"
					onClick={handleSave}
					disabled={isPending}
					className="bg-foreground text-background border-none px-8 py-3.5 rounded-full text-[15px] font-bold cursor-pointer hover:bg-foreground/80 hover:scale-[1.02] transition disabled:opacity-50"
				>
					{isPending ? '저장 중...' : '변경사항 저장'}
				</button>
			</footer>
		</main>
	);
}

function AvatarEditOverlay() {
	const { triggerInput } = useImageUpload();
	return (
		<div
			onClick={triggerInput}
			className="absolute inset-0 bg-black/40 text-white flex justify-center items-center text-xs font-semibold opacity-0 group-hover:opacity-100 transition cursor-pointer"
		>
			편집
		</div>
	);
}

function Toggle({
	checked,
	onChange
}: {
	checked: boolean;
	onChange: (v: boolean) => void;
}) {
	return (
		<label className="relative inline-block w-12 h-[26px] cursor-pointer">
			<input
				type="checkbox"
				className="sr-only"
				checked={checked}
				onChange={e => onChange(e.target.checked)}
			/>
			<span
				className={`absolute inset-0 rounded-full transition-colors ${checked ? 'bg-[#7C3AED]' : 'bg-border'}`}
			/>
			<span
				className={`absolute top-[3px] left-[3px] w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-[22px]' : ''}`}
			/>
		</label>
	);
}
