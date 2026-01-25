import TagView from '@/components/Post/TagView';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { IPost } from '@/types/type';
import PostMeta from '@/components/Post/PostMeta';

export default async function PostHeader({
	title,
	path,
	userId,
	created_at,
	auth_cd
}: IPost) {
	// const res = await fetch(
	// 	`${process.env.NEXT_PUBLIC_SITE_URL}/api/tag?path=${path}`
	// );
	// if (!res.ok) throw new Error('태그 정보를 가져오는중 에러가 발생하였습니다');
	//
	// const { data } = await res.json();
	return (
		<div className="mb-4">
			<div className="font-bold mb-4 text-3xl lg:text-5xl">{title}</div>
			<div className="flex flex-row justify-between items-center mb-4">
				<div className="flex flex-row gap-3 items-center">
					{/* 사용자 */}
					<Link href={`/@${userId}`}>
						<Label className="font-bold text-sm lg:text-base cursor-pointer hover:underline">
							{userId}
						</Label>
					</Link>
					{/* 날짜 */}
					<PostMeta
						className="text-neutral-500 text-sm lg:text-base"
						date={created_at}
					/>
					{/* 공개/비공개 */}
				</div>
				<div className="flex flex-row gap-2 items-center">
					{/* TODO 만약 본인이 작성자면 삭제 기능 추가 */}
					{/* TODO 다른 사람이면 팔로잉 */}
				</div>
			</div>
			{/* 태그 */}
			{/*<div className="mb-4">*/}
			{/*	<TagView tags={data} />*/}
			{/*</div>*/}
		</div>
	);
}
