import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

// 작성자 본인 여부를 판단할 수 있는 props가 있다면 추가 (예: isOwner)
interface PostHeaderProps {
	title: string;
	path: string;
	user_id: string;
	tags?: any[];
	created_at: string | Date;
	user?: {
		user_id: string;
		user_name: string;
		avatar_url: string;
		// 필요한 경우 profileImage, id 등 추가
	};
}

export default function PostHeader({
	 	title,
		created_at,
	 	tags = [],
		user_id,
 }: PostHeaderProps) {

	tags = ['javascript', 'python', 'front']; // 태그 테스트

	// 날짜 포맷팅 헬퍼 (예: "3일 전", "방금 전")
	const formatTimeAgo = (dateString: string | Date) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffMS = now.getTime() - date.getTime();
		const diffMin = Math.round(diffMS / (1000 * 60));
		const diffHour = Math.round(diffMS / (1000 * 60 * 60));
		const diffDay = Math.round(diffMS / (1000 * 60 * 60 * 24));

		if (diffMin < 1) return '방금 전';
		if (diffMin < 60) return `${diffMin}분 전`;
		if (diffHour < 24) return `${diffHour}시간 전`;
		if (diffDay < 7) return `${diffDay}일 전`;
		// 7일 이상이면 날짜 표시 (YYYY.MM.DD)
		return date.toISOString().split('T')[0].replace(/-/g, '.');
	};

	return (
		<section className="mb-8">
			{/* 1. 제목 영역 */}
			<h1 className="text-4xl font-extrabold mb-6 leading-tight break-keep text-gray-900">
				{title}
			</h1>

			{/* 2. 메타 정보 (작성자, 날짜, 액션 버튼) */}
			<div className="flex justify-between items-center text-base mb-4">
				<div className="flex items-center text-gray-600 font-medium">
					{/* 작성자 이름 */}
					<Link href={`/@${user_id}`}>
						<Label className="text-gray-900 font-bold cursor-pointer hover:underline">
							{user_id}
						</Label>
					</Link>
					<Label className="mx-2 text-gray-300">·</Label>
					{/* 작성일 */}
					<Label className="text-gray-500">{formatTimeAgo(created_at)}</Label>
				</div>

				{/* 실제 기능 구현 시에는 Client Component로 분리하거나 form action 사용 권장 */}
				<div className="">
					<Button variant='link' className="px-2 text-gray-500 hover:text-gray-900 transition-colors">
						통계
					</Button>
					<Button variant='link' className="px-2 text-gray-500 hover:text-gray-900 transition-colors">
						수정
					</Button>
					<Button variant='link' className="px-2 text-gray-500 hover:text-gray-900 transition-colors">
						삭제
					</Button>
				</div>
			</div>

			{/* 3. 태그 영역 */}
			{tags.length > 0 && (
				<div className="mt-4 flex flex-wrap gap-2">
					{tags.map((tag, index) => (
						<Label
							key={`${tag}-${index}`}
							className="inline-block bg-gray-100 text-[#12b886] px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors"
						>
              #{tag}
            </Label>
					))}
				</div>
			)}
		</section>
	);
}