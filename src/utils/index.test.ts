import { describe, it, expect, beforeEach, vi } from 'vitest';
import { isEmpty, validatePost, parseFormData, stringToBase64, base64ToString, getTimeDiff } from './index';

describe('isEmpty', () => {
	it('null이면 true를 반환한다', () => {
		expect(isEmpty(null)).toBe(true);
	});

	it('undefined이면 true를 반환한다', () => {
		expect(isEmpty(undefined)).toBe(true);
	});

	it('빈 배열이면 true를 반환한다', () => {
		expect(isEmpty([])).toBe(true);
	});

	it('빈 객체이면 true를 반환한다', () => {
		expect(isEmpty({})).toBe(true);
	});

	it('값이 있는 문자열이면 false를 반환한다', () => {
		expect(isEmpty('hello')).toBe(false);
	});

	it('값이 있는 배열이면 false를 반환한다', () => {
		expect(isEmpty([1, 2])).toBe(false);
	});

	it('값이 있는 객체이면 false를 반환한다', () => {
		expect(isEmpty({ id: 1 })).toBe(false);
	});

	it('0이면 false를 반환한다', () => {
		expect(isEmpty(0)).toBe(false);
	});
});

describe('validatePost', () => {
	it('title이 없으면 에러 메시지를 반환한다', () => {
		expect(validatePost({ content: '내용' })).toBe('제목을 입력하세요.');
	});

	it('content가 없으면 에러 메시지를 반환한다', () => {
		expect(validatePost({ title: '제목' })).toBe('내용을 입력하세요.');
	});

	it('title과 content가 모두 있으면 null을 반환한다', () => {
		expect(validatePost({ title: '제목', content: '내용' })).toBeNull();
	});

	it('title이 빈 문자열이면 에러 메시지를 반환한다', () => {
		expect(validatePost({ title: '', content: '내용' })).toBe('제목을 입력하세요.');
	});
});

describe('parseFormData', () => {
	it('기본 string 타입 필드를 파싱한다', () => {
		const formData = new FormData();
		formData.append('name', 'John');
		const result = parseFormData<{ name: string }>(formData);
		expect(result.name).toBe('John');
	});

	it('number 타입 config가 지정된 필드를 숫자로 파싱한다', () => {
		const formData = new FormData();
		formData.append('age', '30');
		const result = parseFormData<{ age: number }>(formData, { age: 'number' });
		expect(result.age).toBe(30);
	});

	it('boolean 타입 config가 지정된 필드를 불리언으로 파싱한다', () => {
		const formData = new FormData();
		formData.append('active', 'true');
		const result = parseFormData<{ active: boolean }>(formData, { active: 'boolean' });
		expect(result.active).toBe(true);
	});

	it('object 타입 config가 지정된 필드를 JSON 파싱한다', () => {
		const formData = new FormData();
		formData.append('meta', JSON.stringify({ key: 'value' }));
		const result = parseFormData<{ meta: { key: string } }>(formData, { meta: 'object' });
		expect(result.meta).toEqual({ key: 'value' });
	});
});

describe('stringToBase64 / base64ToString', () => {
	it('문자열을 base64url로 인코딩하고 다시 복원한다', () => {
		const original = 'hello world 한글';
		const encoded = stringToBase64(original);
		const decoded = base64ToString(encoded);
		expect(decoded).toBe(original);
	});

	it('인코딩된 값은 원본 문자열과 다르다', () => {
		const original = 'test';
		expect(stringToBase64(original)).not.toBe(original);
	});
});

describe('getTimeDiff', () => {
	it('유효하지 않은 날짜이면 빈 문자열을 반환한다', () => {
		expect(getTimeDiff('invalid-date')).toBe('');
	});

	it('방금 생성한 날짜이면 "방금 전"을 반환한다', () => {
		const now = new Date().toISOString();
		expect(getTimeDiff(now)).toBe('방금 전');
	});

	it('1시간 전 날짜이면 "1시간 전"을 반환한다', () => {
		const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
		expect(getTimeDiff(oneHourAgo)).toBe('1시간 전');
	});

	it('2일 전 날짜이면 "2일 전"을 반환한다', () => {
		const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
		expect(getTimeDiff(twoDaysAgo)).toBe('2일 전');
	});
});
