import ModalWrapper from './modal-wrapper';
import PostDetailContent from '@/app/(blog)/user/[userId]/[postId]/components/post-detail-content';

export default async function InterceptedPostPage({
	params
}: {
	params: Promise<{ userId: string; postId: string }>;
}) {
	const { userId, postId } = await params;
	return (
		<ModalWrapper>
			<PostDetailContent postId={postId} userId={userId} />
		</ModalWrapper>
	);
}
