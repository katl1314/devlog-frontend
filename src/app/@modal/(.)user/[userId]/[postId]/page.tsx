import ModalWrapper from './modal-wrapper';
import { postService } from '@/services/post.service';
import PostContextProvider from '@/components/post/post-context-provider';
import PostFooter from '@/app/(blog)/user/[userId]/[postId]/components/post-footer';
import PostHeader from '@/app/(blog)/user/[userId]/[postId]/components/post-header';
import PostBody from '@/app/(blog)/user/[userId]/[postId]/components/post-body';

export default async function InterceptedPostPage({ 
  params 
}: { 
  params: Promise<{ userId: string; postId: string }> 
}) {
  const { userId, postId } = await params;
  const post = await postService.findPost(userId, postId);
  
  return (
    <ModalWrapper>
      <PostContextProvider postId={post.id} initIsLiked={false} initLikeCount={0} initCommentCount={0}>
        <div className="pb-24 lg:pb-8">
          <PostHeader {...post} />
          <PostBody {...post} />
          <PostFooter {...post} />
        </div>
      </PostContextProvider>
    </ModalWrapper>
  );
}