'use client';

import { Comments as TComments } from '@/types/type';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import CommentsList from './CommentsList';
import Comments from './Comments';
import { useEffect, useState } from 'react';
import { createClientByBrowser } from '@/utils/supabase/client';

// 클라이언트 컴포넌트에서 서버 컴포넌트 API를 사용하면 에러가 발생한다.
export default function CommentFooter({ path, id, level }: TComments) {
	const [open, setOpen] = useState(false);
	const [comments, setComments] = useState<TComments[]>([]);

	useEffect(() => {
		const supabase = createClientByBrowser();
		// 열려있을때 데이터를 가져온다.
		supabase
			.from('comments')
			.select()
			.eq('pid', id)
			.then(children => {
				setComments(children.data as TComments[]);
			});
	}, [id]);

	return (
		<div className="my-6">
			<div className="inline-block text-green-700 font-bold cursor-pointer" onClick={() => setOpen(prev => !prev)}>
				{open ? (
					<CiSquareMinus size={20} className="inline-block mr-1" fill="green" />
				) : (
					<CiSquarePlus size={20} className="inline-block mr-1" fill="green" />
				)}
				<span className="align-middle">
					{open ? '숨기기' : comments.length > 0 ? `${comments.length}개의 답변` : `답글 달기`}
				</span>
			</div>
			{open && (
				<div className="mt-6 ml-5 lg:ml-15">
					<CommentsList data={comments} />
					<Comments path={path} pid={id} level={level} />
				</div>
			)}
		</div>
	);
}
