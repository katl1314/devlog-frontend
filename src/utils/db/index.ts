import { isEmpty } from '@/utils';

type FetchOptions = RequestInit & {
	params?: Record<string, string>;
};

export const apiClient = async (
	endpoint: string,
	options: FetchOptions = {}
) => {
	const { params, headers, ...other } = options;
	// URL 파라미터 조립
	const queryString = !isEmpty(params) ? `?${new URLSearchParams(params)}` : '';
	// 서버 사이드는 Docker 내부 주소, 클라이언트 사이드는 nginx 경유
	const baseUrl =
		typeof window === 'undefined'
			? (process.env.SERVER_URL ?? '')
			: (process.env.NEXT_PUBLIC_SERVER_URL ?? '');
	// URL 설정
	const url = `${baseUrl}${endpoint}${queryString}`;
	// 헤더 설정
	const defaultHeaders = {
		'Content-Type': 'application/json',
		...headers
	};

	// 요청
	const res = await fetch(url, {
		...other,
		headers: defaultHeaders
	});

	// 요청 실패 시
	if (!res.ok) {
		const errorData = await res.json().catch(() => ({}));
		throw new Error(errorData.message || 'API 호출 중 에러가 발생하였습니다.');
	}

	return await res.json();
};
