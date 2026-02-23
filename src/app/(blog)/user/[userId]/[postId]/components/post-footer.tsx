import Comments from '@/components/comment/comments';

export default async function PostFooter(post: any) {
	return (
		<div className="mt-5 mb-12" id="comments">
			<div className="font-bold text-lg mb-4">{0}개의 댓글</div>
			<Comments {...post} />
			{
				Array.from({ length: 10}).map((_, i) => {
					return <div key={i} className="h-[300px] w-full bg-red-200">{i}</div>;
				})
			}
			{/*<CommentsList data={[] as TComments[]} />*/}
		</div>
	);
}
