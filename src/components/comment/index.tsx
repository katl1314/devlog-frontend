'use client';

import {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
	PropsWithChildren
} from 'react';
import { MAX_COMMENT_LEVEL } from '@/utils/consts';
import UserAvatar from '@/components/user-avatar';
import { useSession } from 'next-auth/react';
import { Textarea } from '../ui/textarea';
import { apiClient } from '@/utils/db';
import { getTimeDiff } from '@/utils';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface CommentUser {
	user_name: string;
	user_id: string;
	avatar_url: string;
}

export interface CommentTree {
	id: string;
	content: string;
	level: number;
	parent_id: string | null;
	user_id: string;
	user: CommentUser;
	children: CommentTree[];
	created_at: string;
}

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

interface CommentContextValue {
	/** 트리 구조 댓글 목록 */
	comments: CommentTree[];
	/** 현재 답글 입력 중인 댓글 ID (없으면 null) */
	replyingTo: string | null;
	setReplyingTo: (id: string | null) => void;
	/** 댓글 또는 대댓글 작성 */
	addComment: (content: string, parentId?: string) => Promise<void>;
	/** 본인 댓글 삭제 */
	deleteComment: (commentId: string) => Promise<void>;
	/** 현재 로그인한 유저 ID (비로그인이면 null) */
	currentUserId: string | null;
}

const CommentContext = createContext<CommentContextValue | null>(null);

export function useComment() {
	const ctx = useContext(CommentContext);
	if (!ctx) throw new Error('useComment must be used within <CommentModule>');
	return ctx;
}

// ─────────────────────────────────────────────
// Root: CommentModule
// ─────────────────────────────────────────────

interface CommentModuleProps extends PropsWithChildren {
	postId: number;
	initialComments: CommentTree[];
	onCountChange: (comments: number) => void;
}

function CommentModule({
	postId,
	initialComments,
	children,
	onCountChange
}: CommentModuleProps) {
	const [comments, setComments] = useState<CommentTree[]>(initialComments);
	const [replyingTo, setReplyingTo] = useState<string | null>(null);
	const { data: session } = useSession();
	const accessToken = session?.accessToken;
	const currentUserId = session?.user.id ?? null;

	/** 서버에서 최신 댓글 트리를 다시 불러와 동기화한다 */
	const refetch = useCallback(async () => {
		const updated = await apiClient(`/comment/${postId}`);
		setComments(updated);
	}, [postId]);

	/**
	 * 댓글 또는 대댓글을 작성한다.
	 * 작성 완료 후 서버에서 최신 트리를 다시 불러온다.
	 */
	const addComment = useCallback(
		async (content: string, parentId?: string) => {
			if (!accessToken) return;
			await apiClient(`/comment/${postId}`, {
				method: 'POST',
				accessToken,
				body: JSON.stringify({ content, parent_id: parentId ?? null })
			});
			await refetch();
			setReplyingTo(null);
		},
		[accessToken, postId, refetch]
	);

	/**
	 * 댓글을 삭제한다 (soft delete).
	 * 삭제 완료 후 서버에서 최신 트리를 다시 불러온다.
	 */
	const deleteComment = useCallback(
		async (commentId: string) => {
			if (!accessToken) return;
			await apiClient(`/comment/${commentId}`, {
				method: 'DELETE',
				accessToken
			});
			await refetch();
		},
		[accessToken, refetch]
	);

	useEffect(() => {
		onCountChange?.(countAll(comments));
	}, [comments, onCountChange]);

	return (
		<CommentContext.Provider
			value={{
				comments,
				replyingTo,
				setReplyingTo,
				addComment,
				deleteComment,
				currentUserId
			}}
		>
			{children}
		</CommentContext.Provider>
	);
}

// ─────────────────────────────────────────────
// CommentModule.Count
// ─────────────────────────────────────────────

/** 전체 댓글 수(루트 기준)를 표시한다 */
function Count({ className }: { className?: string }) {
	const { comments } = useComment();
	const total = countAll(comments);

	return (
		<div className={`font-bold text-lg ${className ?? ''}`}>
			{total}개의 댓글
		</div>
	);
}

function countAll(comments: CommentTree[]): number {
	return comments.reduce((sum, c) => sum + 1 + countAll(c.children), 0);
}

// ─────────────────────────────────────────────
// CommentModule.Form
// ─────────────────────────────────────────────

interface FormProps {
	/** 대댓글 폼일 경우 부모 댓글 ID */
	parentId?: string;
	/** 폼 제출 또는 취소 후 콜백 */
	onClose?: () => void;
	placeholder?: string;
	className?: string;
}

/** 댓글 입력 폼. parentId 없으면 루트 댓글, 있으면 대댓글 폼으로 동작한다 */
function Form({ parentId, onClose, placeholder, className }: FormProps) {
	const { addComment } = useComment();
	const { status } = useSession();
	const isAuth = status === 'authenticated';

	const [content, setContent] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async () => {
		if (!content.trim() || submitting) return;
		setSubmitting(true);
		try {
			await addComment(content.trim(), parentId);
			setContent('');
			onClose?.();
		} finally {
			setSubmitting(false);
		}
	};

	if (!isAuth) {
		return (
			<div className={`flex flex-col gap-2 ${className ?? ''}`}>
				<Textarea
					disabled
					placeholder="댓글을 작성하려면 로그인이 필요합니다."
					rows={3}
					className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-70"
				/>
			</div>
		);
	}

	return (
		<div className={`flex flex-col gap-2 ${className ?? ''}`}>
			<Textarea
				value={content}
				onChange={e => setContent(e.target.value)}
				placeholder={placeholder ?? '댓글을 입력하세요...'}
				rows={3}
				className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
			/>
			<div className="flex justify-end gap-2">
				{onClose && (
					<button
						type="button"
						onClick={onClose}
						className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted cursor-pointer"
					>
						취소
					</button>
				)}
				<button
					type="button"
					onClick={handleSubmit}
					disabled={!content.trim() || submitting}
					className="rounded-md bg-foreground px-3 py-1.5 text-sm text-background disabled:opacity-40 cursor-pointer"
				>
					{submitting ? '등록 중...' : '등록'}
				</button>
			</div>
		</div>
	);
}

// ─────────────────────────────────────────────
// CommentModule.List
// ─────────────────────────────────────────────

/** 루트 댓글 목록을 렌더링한다 */
function List({ className }: { className?: string }) {
	const { comments } = useComment();

	if (comments.length === 0) {
		return (
			<div className={`text-sm text-muted-foreground py-6 ${className ?? ''}`}>
				아직 댓글이 없습니다. 첫 댓글을 작성해보세요.
			</div>
		);
	}

	return (
		<div className={`flex flex-col gap-4 ${className ?? ''}`}>
			{comments.map(comment => (
				<Item key={comment.id} comment={comment} />
			))}
		</div>
	);
}

// ─────────────────────────────────────────────
// CommentModule.Item
// ─────────────────────────────────────────────

interface ItemProps {
	comment: CommentTree;
}

/** 단일 댓글 + 자식 댓글을 재귀적으로 렌더링한다 */
function Item({ comment }: ItemProps) {
	const { replyingTo, setReplyingTo, deleteComment, currentUserId } =
		useComment();
	const isReplying = replyingTo === comment.id;
	const isOwner = currentUserId === comment.user.user_id;
	const canReply = comment.level < MAX_COMMENT_LEVEL;
	const hasChildren = comment.children.length > 0;

	return (
		<div className="relative">
			{hasChildren && (
				<div className="absolute left-4.5 top-11 bottom-0 w-px bg-border" />
			)}

			{/* 댓글 본문 */}
			<div className="flex flex-col gap-2 mt-2">
				<div className="flex items-center gap-2">
					<UserAvatar
						src={comment.user?.avatar_url}
						userId={comment.user?.user_id ?? 'U'}
						className="w-9 h-9 shrink-0"
					/>
					<span className="text-base font-medium">
						{comment.user?.user_name}
					</span>
					<span className="text-sm text-muted-foreground">
						{getTimeDiff(comment.created_at)}
					</span>
				</div>

				<p className="text-base leading-relaxed pl-11">{comment.content}</p>

				<div className="flex items-center gap-3 pl-11">
					{canReply && (
						<button
							type="button"
							onClick={() => setReplyingTo(isReplying ? null : comment.id)}
							className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
						>
							{isReplying ? '취소' : '답글'}
						</button>
					)}
					{isOwner && (
						<button
							type="button"
							onClick={() => deleteComment(comment.id)}
							className="text-sm text-muted-foreground hover:text-destructive cursor-pointer"
						>
							삭제
						</button>
					)}
				</div>

				{isReplying && (
					<div className="pl-11 mt-1">
						<Form
							parentId={comment.id}
							onClose={() => setReplyingTo(null)}
							placeholder={`${comment.user?.user_name}에게 답글 작성...`}
						/>
					</div>
				)}
			</div>

			{/* 자식 댓글 재귀 렌더링 */}
			{hasChildren && (
				<div className="mt-1 ml-11 flex flex-col">
					{comment.children.map((child, index) => {
						const isLast = index === comment.children.length - 1;
						return (
							<div key={child.id} className="relative">
								<div
									className="absolute top-0 h-6.5 w-6.5 border-l border-b border-border"
									style={{ left: '-26px' }}
								/>
								{isLast && (
									<div
										className="absolute bottom-0 w-px bg-background"
										style={{ left: '-26px', top: '26px' }}
									/>
								)}
								<Item comment={child} />
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

// ─────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────

CommentModule.Count = Count;
CommentModule.Form = Form;
CommentModule.List = List;
CommentModule.Item = Item;

export default CommentModule;
