'use client';

import {
	createContext,
	useContext,
	useState,
	useCallback,
	PropsWithChildren
} from 'react';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { apiClient } from '@/utils/db';
import Image from 'next/image';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

const MAX_LEVEL = 3;

export interface CommentUser {
	id: string;
	user_name: string;
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
}

function CommentModule({
	postId,
	initialComments,
	children
}: CommentModuleProps) {
	const [comments, setComments] = useState<CommentTree[]>(initialComments);
	const [replyingTo, setReplyingTo] = useState<string | null>(null);
	const { data: session, status } = useSession();
	const accessToken = (session as Session & { accessToken?: string })
		?.accessToken;
	const currentUserId =
		status === 'authenticated'
			? ((session as Session & { userId?: string })?.userId ?? null)
			: null;

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
				headers: { authorization: `Bearer ${accessToken}` },
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
				headers: { authorization: `Bearer ${accessToken}` }
			});
			await refetch();
		},
		[accessToken, refetch]
	);

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
			<div className={`text-sm text-muted-foreground py-3 ${className ?? ''}`}>
				댓글을 작성하려면 로그인이 필요합니다.
			</div>
		);
	}

	return (
		<div className={`flex flex-col gap-2 ${className ?? ''}`}>
			<textarea
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
			{comments.map((comment) => (
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
	const isOwner = currentUserId === comment.user_id;
	const canReply = comment.level < MAX_LEVEL;

	/** 들여쓰기: 레벨에 따라 좌측 패딩 증가 */
	const indentClass =
		comment.level === 1 ? '' : 'ml-8 border-l border-border pl-4';

	return (
		<div className={indentClass}>
			{/* 댓글 본문 */}
			<div className="flex flex-col gap-1.5">
				{/* 헤더: 아바타 + 작성자 + 날짜 */}
				<div className="flex items-center gap-2">
					<div className="relative w-7 h-7 rounded-full overflow-hidden bg-muted shrink-0">
						{comment.user?.avatar_url && (
							<Image
								src={comment.user.avatar_url}
								alt={comment.user.user_name}
								fill
								className="object-cover"
							/>
						)}
					</div>
					<span className="text-sm font-medium">{comment.user?.user_name}</span>
					<span className="text-xs text-muted-foreground">
						{formatDate(comment.created_at)}
					</span>
				</div>

				{/* 내용 */}
				<p className="text-sm leading-relaxed pl-9">{comment.content}</p>

				{/* 액션 버튼 */}
				<div className="flex items-center gap-3 pl-9">
					{canReply && (
						<button
							type="button"
							onClick={() => setReplyingTo(isReplying ? null : comment.id)}
							className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
						>
							{isReplying ? '취소' : '답글'}
						</button>
					)}
					{isOwner && (
						<button
							type="button"
							onClick={() => deleteComment(comment.id)}
							className="text-xs text-muted-foreground hover:text-destructive cursor-pointer"
						>
							삭제
						</button>
					)}
				</div>

				{/* 인라인 답글 폼 */}
				{isReplying && (
					<div className="pl-9 mt-1">
						<Form
							parentId={comment.id}
							onClose={() => setReplyingTo(null)}
							placeholder={`${comment.user?.user_name}에게 답글 작성...`}
						/>
					</div>
				)}
			</div>

			{/* 자식 댓글 재귀 렌더링 */}
			{comment.children.length > 0 && (
				<div className="flex flex-col gap-3 mt-3">
					{comment.children.map((child) => (
						<Item key={child.id} comment={child} />
					))}
				</div>
			)}
		</div>
	);
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function formatDate(dateStr: string) {
	const date = new Date(dateStr);
	return date.toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

// ─────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────

CommentModule.Count = Count;
CommentModule.Form = Form;
CommentModule.List = List;
CommentModule.Item = Item;

export default CommentModule;
