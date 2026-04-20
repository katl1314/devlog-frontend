'use client';
import { postService } from '@/services/post.service';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { PostContext } from './post-context-provider';

const PostOwnerActionButton = () => {
	const session = useSession();
	const { postId } = useContext(PostContext);
	const handleClick = () => {
		postService.delete(postId, session.data?.accessToken);
	};
	return (
		<div>
			<Button
				variant="link"
				className="px-2 text-muted-foreground hover:text-foreground transition-colors"
				onClick={handleClick}
			>
				수정
			</Button>
			<Button
				variant="link"
				className="px-2 text-muted-foreground hover:text-foreground transition-colors"
				onClick={handleClick}
			>
				삭제
			</Button>
		</div>
	);
};

export default PostOwnerActionButton;
