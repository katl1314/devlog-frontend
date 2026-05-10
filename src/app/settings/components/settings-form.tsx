'use client';

import { useState } from 'react';
import { Themes, useTheme } from '@/hooks/theme';
import { updateSettings } from '@/actions/actions';
import { toast } from 'sonner';
import ImageUpload, { useImageUpload } from '@/components/image-upload';
import { FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

export type SocialLinks = Record<SocialKey, string>;

export const EMPTY_SOCIALS: SocialLinks = {
	github: '',
	twitter: '',
	instagram: '',
	linkedin: '',
	youtube: '',
	website: ''
};

interface SettingsFormProps {
	name: string;
	email: string;
	image: string;
	userId: string;
	initialTheme: ThemeOption;
	initialSocials: SocialLinks;
	initialCommentNotification: boolean;
	initialUpdateNotification: boolean;
}

export default function SettingsForm({
	name,
	email,
	image,
	initialTheme,
	initialSocials,
	initialCommentNotification,
	initialUpdateNotification
}: SettingsFormProps) {
	const { setTheme } = useTheme();
	const { back } = useRouter();
	const [username, setUsername] = useState(name);
	const [commentNotification, setCommentNotification] = useState(initialCommentNotification);
	const [updateNotification, setUpdateNotification] = useState(initialUpdateNotification);
	const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(initialTheme);
	const [socials, setSocials] = useState<SocialLinks>(initialSocials);
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
				update_notification: updateNotification
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
		setSocials(initialSocials);
		setCommentNotification(initialCommentNotification);
		setUpdateNotification(initialUpdateNotification);
		setSelectedTheme(initialTheme);
		back();
	};

	return (
		<main>
			{/* 헤더 */}
			<header className="mb-10 sm:mb-12">
				<h1 className="text-[22px] sm:text-[28px] font-extrabold tracking-[-0.8px] mb-2">환경 설정</h1>
				<p className="text-muted-foreground text-[14px] sm:text-[15px]">
					계정 및 인터페이스에 대한 개인 설정을 변경합니다.
				</p>
			</header>

			{/* 기본 프로필 */}
			<section className="mb-10">
				<h3 className="text-[13px] font-bold text-muted-foreground uppercase tracking-[0.5px] mb-4">기본 프로필</h3>
				<div className="flex flex-col items-center sm:flex-row sm:items-center gap-4 sm:gap-6">
					<ImageUpload initialUrl={image ?? ''} onFileChange={file => file && void file}>
						<div className="relative w-32 h-32 rounded-4xl bg-muted overflow-hidden shrink-0 group">
							<ImageUpload.Upload className="w-full h-full flex items-center justify-center text-muted-foreground cursor-pointer">
								<FiPlus size={28} strokeWidth={2.5} />
							</ImageUpload.Upload>
							<ImageUpload.Preview allowReupload width={128} height={128} />
							<AvatarEditOverlay />
						</div>
					</ImageUpload>
					<div className="flex-1 min-w-0 w-full">
						<Input
							type="text"
							className="w-full h-12 border-none bg-muted px-5 rounded-full text-[15px] font-medium outline-none"
							value={username}
							onChange={e => setUsername(e.target.value)}
							placeholder="이름을 입력하세요"
						/>
						<p className="text-xs text-muted-foreground mt-2 ml-3">공개 프로필에 표시될 이름입니다.</p>
					</div>
				</div>
			</section>

			{/* 이메일 주소 */}
			<section className="mb-10">
				<h3 className="text-[13px] font-bold text-muted-foreground uppercase tracking-[0.5px] mb-4">이메일 주소</h3>
				<div className="flex items-center justify-between bg-muted rounded-full pl-5 pr-5 h-12 gap-3">
					<span className="text-[15px] font-extrabold truncate min-w-0">{email}</span>
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
						<Toggle checked={commentNotification} onChange={setCommentNotification} />
					</div>
					<div className="flex items-center justify-between bg-muted rounded-full pl-5 pr-3 h-12">
						<span className="text-[15px] font-extrabold">Dev.Log 업데이트 소식</span>
						<Toggle checked={updateNotification} onChange={setUpdateNotification} />
					</div>
				</div>
			</section>

			{/* 인터페이스 테마 */}
			<section className="mb-10">
				<h3 className="text-[13px] font-bold text-muted-foreground uppercase tracking-[0.5px] mb-4">인터페이스 테마</h3>
				<div className="grid grid-cols-3 gap-4">
					{(['light', 'dark', 'system'] as const).map(t => (
						<label key={t} className="cursor-pointer text-center">
							<Input
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
										<div className="h-1.5 w-[40%] rounded-sm mb-2 bg-[#eee]" />
										<div className="h-1 w-[80%] rounded-sm mb-1 bg-[#f5f5f5]" />
										<div className="h-1 w-[50%] rounded-sm bg-[#f5f5f5]" />
									</div>
								)}
								{t === 'dark' && (
									<div className="p-2.5 h-full bg-[#1a1a1a]">
										<div className="h-1.5 w-[40%] rounded-sm mb-2 bg-[#333]" />
										<div className="h-1 w-[80%] rounded-sm mb-1 bg-[#2a2a2a]" />
										<div className="h-1 w-[50%] rounded-sm bg-[#2a2a2a]" />
									</div>
								)}
								{t === 'system' && (
									<div
										className="h-full"
										style={{
											background: 'linear-gradient(135deg, #fff 50%, #1a1a1a 50%)'
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
				<h3 className="text-[13px] font-bold text-muted-foreground uppercase tracking-[0.5px] mb-4">소셜 네트워크</h3>
				<div className="flex flex-col gap-3">
					{SOCIAL_FIELDS.map(([key, label, placeholder]) => (
						<div
							key={key}
							className="flex flex-col sm:flex-row sm:items-center bg-muted rounded-2xl sm:rounded-full px-5 py-3 sm:py-0 sm:h-12 gap-1 sm:gap-0"
						>
							<span className="text-xs sm:text-sm font-bold text-muted-foreground sm:min-w-27.5 shrink-0">{label}</span>
							<Input
								type="text"
								className="flex-1 min-w-0 bg-transparent border-none outline-none text-[15px] font-medium sm:pr-4"
								placeholder={placeholder}
								value={socials[key] || ''}
								onChange={e => setSocials(prev => ({ ...prev, [key]: e.target.value }))}
							/>
						</div>
					))}
				</div>
			</section>

			{/* 회원 탈퇴 */}
			<section className="mb-10">
				<h3 className="text-[13px] font-bold text-muted-foreground uppercase tracking-[0.5px] mb-4">회원 탈퇴</h3>
				<Button type="button" variant="destructive" className="px-6 py-3 h-auto rounded-[10px] font-bold">
					회원 탈퇴
				</Button>
				<p className="text-xs text-muted-foreground mt-3">
					탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.
				</p>
			</section>

			{/* 푸터 */}
			<footer className="sticky bottom-0 mt-14 -mx-5 sm:-mx-12 px-5 sm:px-12 py-4 bg-background/80 backdrop-blur-xl border-t border-border/50 flex flex-col-reverse sm:flex-row sm:justify-end gap-6">
				<Button
					type="button"
					variant="ghost"
					onClick={handleCancel}
					className="text-muted-foreground font-semibold text-[15px] px-6 py-3 h-auto rounded-full"
				>
					이전 페이지로
				</Button>
				<Button
					type="button"
					onClick={handleSave}
					disabled={isPending}
					className="px-8 py-3.5 h-auto rounded-full text-[15px] font-bold hover:bg-foreground/80 hover:scale-[1.02] w-full sm:w-auto"
				>
					{isPending ? '저장 중...' : '변경사항 저장'}
				</Button>
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

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
	return (
		<label className="relative inline-block w-12 h-[26px] cursor-pointer">
			<Input type="checkbox" className="sr-only" checked={checked} onChange={e => onChange(e.target.checked)} />
			<span className={`absolute inset-0 rounded-full transition-colors ${checked ? 'bg-[#7C3AED]' : 'bg-border'}`} />
			<span
				className={`absolute top-[3px] left-[3px] w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-[22px]' : ''}`}
			/>
		</label>
	);
}
