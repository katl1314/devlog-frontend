import { Comments as TComments } from '@/types/type';
import { CiSquarePlus } from 'react-icons/ci';
import CommentsList from './CommentsList';
import Comments from './Comments';

// 클라이언트 컴포넌트에서 서버 컴포넌트 API를 사용하면 에러가 발생한다.
export default function CommentFooter({ path, id, data }: TComments & { data: TComments[] }) {
	return (
		<div>
			<div className="my-6">
				<div className="inline-block text-green-700 font-bold cursor-pointer">
					<CiSquarePlus size={20} className="inline-block mr-1" fill="green" />
					<span>답글 달기</span>
				</div>
				<div className="mt-6 ml-10">
					<CommentsList data={data} />
					<Comments path={path} pid={id} />
				</div>
			</div>
		</div>
	);
}
