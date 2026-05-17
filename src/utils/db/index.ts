import { isEmpty } from '@/utils';

type FetchOptions = Omit<RequestInit, 'headers'> & {
	params?: Record<string, string>;
	headers?: Record<string, string>;
	accessToken?: string;
};

export class ApiError extends Error {
	constructor(
		public readonly status: number,
		message: string,
		public readonly data?: unknown
	) {
		super(message);
		this.name = 'ApiError';
	}
}

/**
 * 백엔드 API 호출 래퍼.
 *
 * @remarks
 * - `accessToken`이 주어지면 `Authorization: Bearer <token>` 헤더를 자동 주입한다.
 *   서비스 레이어에서 헤더를 수동으로 조립하지 않고 이 옵션으로 위임한다.
 * - `params`가 주어지면 쿼리스트링으로 직렬화한다.
 * - 서버 사이드는 `SERVER_URL`, 클라이언트 사이드는 `NEXT_PUBLIC_SERVER_URL`을 사용한다.
 *
 * @param endpoint - `/post` 등 백엔드 경로
 * @param options  - `fetch` 옵션 + `params`, `accessToken`
 * @returns JSON 파싱 결과
 * @throws {Error} 응답이 `!ok`일 때, 서버 메시지 또는 기본 메시지로 throw
 */
export const apiClient = async (
	endpoint: string,
	options: FetchOptions = {}
): Promise<any> => {
	const { params, headers, accessToken, ...other } = options;

	const queryString = !isEmpty(params) ? `?${new URLSearchParams(params)}` : '';
	const baseUrl =
		typeof window === 'undefined'
			? (process.env.SERVER_URL ?? '')
			: (process.env.NEXT_PUBLIC_SERVER_URL ?? '');
	const url = `${baseUrl}${endpoint}${queryString}`;

	const finalHeaders: Record<string, string> = {
		'Content-Type': 'application/json',
		...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
		...headers
	};

	const res = await fetch(url, {
		...other,
		headers: finalHeaders
	});

	if (!res.ok) {
		const errorData = await res.json().catch(() => ({}));
		throw new ApiError(
			res.status,
			errorData.message || 'API 호출 중 에러가 발생하였습니다.',
			errorData
		);
	}

	const text = await res.text();
	return text ? JSON.parse(text) : null;
};
