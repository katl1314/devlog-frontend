import Dayjs from 'dayjs';
import PostMetaClient from './PostMetaClient';

interface IPostMeta {
	date: string;
	className?: string;
}

// hydration mismatch로 인해서 fallback으로 절대시간을 보여준다.
export default function PostMeta({ date, className }: IPostMeta) {
	const formatted = Dayjs(date).format('YYYY-MM-DD');
	return <PostMetaClient date={date} fallback={formatted} className={className} />;
}
