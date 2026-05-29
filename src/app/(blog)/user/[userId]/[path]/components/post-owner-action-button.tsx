'use client';

import { ConfirmDialog } from '@/components/confirm-dialog';
import { PostContext } from './post-context-provider';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { deletePostAction } from '@/actions/actions';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

const PostOwnerActionButton = () => {
	const { postId, isModal, path, userId } = useContext(PostContext);
	const router = useRouter();
	const queryClient = useQueryClient();
	console.log('postId >>> ', postId);
	const handleDeletePost = async () => {
		await deletePostAction(postId);
		await queryClient.invalidateQueries({ queryKey: ['posts'] });
		if (isModal) {
			router.back();
		} else {
			router.replace('/');
		}
	};

	const handleUpdatePost = () => {
		if (isModal) {
			router.back(); // 모달 닫기
			setTimeout(() => router.push(`/write?id=${postId}`), 100);
		} else {
			router.push(`/write?id=${postId}`);
		}
	};

	return (
		<div>
			<Button
				variant="link"
				className="px-2 text-muted-foreground hover:text-foreground transition-colors"
				onClick={handleUpdatePost}
			>
				수정
			</Button>
			<ConfirmDialog
				title="알림"
				confirmText="예"
				cancelText="아니오"
				description="정말 해당 포스트를 삭제하시겠습니까?"
				variant="default"
				onConfirm={handleDeletePost}
			>
				<Button variant="link" className="px-2 text-muted-foreground hover:text-foreground transition-colors">
					삭제
				</Button>
			</ConfirmDialog>
		</div>
	);
};

export default PostOwnerActionButton;
