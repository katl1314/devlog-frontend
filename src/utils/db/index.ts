import { isEmpty } from '@/utils';

type FetchOptions = RequestInit & {
	params?: Record<string, string>
};

export const apiClient = async(endpoint: string, options: FetchOptions = {}) => {

	const { params, headers, ...other } = options;
	// URL 파라미터 조립
	const queryString = !isEmpty(params)
		? `?${new URLSearchParams(params)}`
		: '';
	// URL 설정
	const url = `${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}${queryString}`;
	// 헤더 설정
	const defaultHeaders = {
		'Content-Type': 'application/json',
		...headers
	}

	// 요청
	const res = await fetch(url, {
		...other,
		headers: defaultHeaders,
	});

	// 요청 실패 시
	if (!res.ok) {
		const errorData = await res.json().catch(() => ({}));
		throw new Error(errorData.message || 'API 호출 중 에러가 발생하였습니다.');
	}

	return await res.json();
}