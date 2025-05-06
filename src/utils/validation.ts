export type PostFormData = {
	title?: string;
	content?: string;
};

export function validatePost(data: PostFormData) {
	const { title, content } = data;

	if (!title) return '제목을 입력하세요.';
	if (!content) return '내용을 입력하세요.';

	return null;
}
