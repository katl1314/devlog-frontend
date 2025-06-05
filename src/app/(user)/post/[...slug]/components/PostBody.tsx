import { Post } from '@/types/type';
import ReactMarkdown from 'react-markdown';

export default function PostBody({ content }: Post) {
	return <ReactMarkdown>{content}</ReactMarkdown>;
}
