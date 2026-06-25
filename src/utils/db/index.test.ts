import { describe, it, expect, vi, afterEach } from 'vitest';
import { apiClient, ApiError } from './index';

afterEach(() => {
	vi.restoreAllMocks();
});

describe('apiClient', () => {
	describe('성공 케이스', () => {
		it('응답이 ok이면 JSON을 파싱해서 반환한다', async () => {
			vi.spyOn(global, 'fetch').mockResolvedValueOnce(
				new Response(JSON.stringify({ id: 1, title: '테스트' }), { status: 200 })
			);

			const result = await apiClient('/post');
			expect(result).toEqual({ id: 1, title: '테스트' });
		});

		it('응답 body가 비어있으면 null을 반환한다', async () => {
			vi.spyOn(global, 'fetch').mockResolvedValueOnce(new Response('', { status: 200 }));

			const result = await apiClient('/post/1');
			expect(result).toBeNull();
		});

		it('accessToken이 있으면 Authorization 헤더를 포함해 fetch를 호출한다', async () => {
			const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce(
				new Response(JSON.stringify({}), { status: 200 })
			);

			await apiClient('/post', { accessToken: 'my-token' });

			const [, options] = fetchSpy.mock.calls[0] as [string, RequestInit];
			const headers = options.headers as Record<string, string>;
			expect(headers['Authorization']).toBe('Bearer my-token');
		});

		it('params가 있으면 쿼리스트링으로 변환해 URL에 포함한다', async () => {
			const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce(
				new Response(JSON.stringify([]), { status: 200 })
			);

			await apiClient('/post', { params: { cursor: 'abc', take: '10' } });

			const [url] = fetchSpy.mock.calls[0] as [string, RequestInit];
			expect(url).toContain('cursor=abc');
			expect(url).toContain('take=10');
		});

		it('Content-Type: application/json 헤더가 기본으로 포함된다', async () => {
			const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce(
				new Response(JSON.stringify({}), { status: 200 })
			);

			await apiClient('/post', { method: 'POST', body: JSON.stringify({ title: '제목' }) });

			const [, options] = fetchSpy.mock.calls[0] as [string, RequestInit];
			const headers = options.headers as Record<string, string>;
			expect(headers['Content-Type']).toBe('application/json');
		});
	});

	describe('실패 케이스', () => {
		it('응답이 ok가 아니면 ApiError를 던진다', async () => {
			vi.spyOn(global, 'fetch').mockResolvedValueOnce(
				new Response(JSON.stringify({ message: '찾을 수 없습니다.' }), { status: 404 })
			);

			await expect(apiClient('/post/999')).rejects.toThrow(ApiError);
		});

		it('ApiError에 응답 status가 담긴다', async () => {
			vi.spyOn(global, 'fetch').mockResolvedValueOnce(
				new Response(JSON.stringify({ message: '권한 없음' }), { status: 403 })
			);

			let error: ApiError | null = null;
			try {
				await apiClient('/post/secret');
			} catch (e) {
				error = e as ApiError;
			}

			expect(error).toBeInstanceOf(ApiError);
			expect(error?.status).toBe(403);
			expect(error?.message).toBe('권한 없음');
		});

		it('서버 응답에 message가 없으면 기본 에러 메시지를 사용한다', async () => {
			vi.spyOn(global, 'fetch').mockResolvedValueOnce(
				new Response(JSON.stringify({}), { status: 500 })
			);

			await expect(apiClient('/error')).rejects.toThrow('API 호출 중 에러가 발생하였습니다.');
		});
	});
});
