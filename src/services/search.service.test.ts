// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { searchService } from './search.service';

describe('searchService — 로컬 기록 관리', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	describe('getHistory', () => {
		it('저장된 기록이 없으면 빈 배열을 반환한다', () => {
			expect(searchService.getHistory()).toEqual([]);
		});

		it('localStorage가 손상된 JSON이면 빈 배열을 반환한다', () => {
			localStorage.setItem('search_history', 'NOT_JSON{{{');
			expect(searchService.getHistory()).toEqual([]);
		});
	});

	describe('addHistory', () => {
		it('검색어를 추가하면 getHistory에서 조회된다', () => {
			searchService.addHistory('NestJS');
			expect(searchService.getHistory()).toContain('NestJS');
		});

		it('동일한 검색어를 추가하면 중복 없이 맨 앞으로 이동한다', () => {
			searchService.addHistory('React');
			searchService.addHistory('NestJS');
			searchService.addHistory('React');

			const history = searchService.getHistory();
			expect(history[0]).toBe('React');
			expect(history.filter((h) => h === 'React').length).toBe(1);
		});

		it('최대 10개를 초과하면 오래된 항목이 제거된다', () => {
			for (let i = 1; i <= 11; i++) {
				searchService.addHistory(`item${i}`);
			}
			expect(searchService.getHistory().length).toBe(10);
		});

		it('빈 문자열은 추가되지 않는다', () => {
			searchService.addHistory('');
			expect(searchService.getHistory()).toEqual([]);
		});

		it('100자를 초과하는 검색어는 추가되지 않는다', () => {
			searchService.addHistory('a'.repeat(101));
			expect(searchService.getHistory()).toEqual([]);
		});

		it('특수문자(<>)가 포함된 검색어는 추가되지 않는다', () => {
			searchService.addHistory('<script>');
			expect(searchService.getHistory()).toEqual([]);
		});
	});

	describe('removeHistory', () => {
		it('특정 검색어를 삭제하면 목록에서 제거된다', () => {
			searchService.addHistory('TypeScript');
			searchService.addHistory('NestJS');

			searchService.removeHistory('TypeScript');

			const history = searchService.getHistory();
			expect(history).not.toContain('TypeScript');
			expect(history).toContain('NestJS');
		});

		it('존재하지 않는 검색어를 삭제해도 에러가 나지 않는다', () => {
			searchService.addHistory('NestJS');
			expect(() => searchService.removeHistory('없는항목')).not.toThrow();
		});
	});

	describe('clearHistory', () => {
		it('clearHistory를 호출하면 모든 기록이 삭제된다', () => {
			searchService.addHistory('React');
			searchService.addHistory('TypeScript');

			searchService.clearHistory();

			expect(searchService.getHistory()).toEqual([]);
		});
	});
});
