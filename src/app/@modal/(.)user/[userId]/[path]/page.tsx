import ModalWrapper from './modal-wrapper';
import PostDetailContent from '@/app/(blog)/user/[userId]/[path]/components/post-detail-content';

export default async function InterceptedPostPage({
	params
}: {
	params: Promise<{ userId: string; path: string }>;
}) {
	const { userId, path } = await params;
	return (
		<ModalWrapper>
			<PostDetailContent path={path} userId={userId} isModal={true} />
		</ModalWrapper>
	);
}
