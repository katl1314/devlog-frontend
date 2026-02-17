import { type ClassValue, clsx } from 'clsx';
import timezone from 'dayjs/plugin/timezone';
import { twMerge } from 'tailwind-merge';
import utc from 'dayjs/plugin/utc';
import Dayjs from 'dayjs';

Dayjs.extend(utc);
Dayjs.extend(timezone);

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

// utf-8 to base64
export const stringToBase64 = (text: string): Base64URLString =>
	Buffer.from(text, 'utf-8').toString('base64url');

// base64 to utf-8
export const base64ToString = (base64: Base64URLString): string =>
	Buffer.from(base64, 'base64url').toString('utf-8');

type Type = 'string' | 'number' | 'object' | 'boolean';

// 객체 이외 타입을 object로 파싱?
export const parseFormData = <T extends { [name: string]: unknown }>(
	formData: FormData,
	config?: Record<string, Type>
): T => {
	const result = {} as { [name: string]: unknown };
	for (const key of formData.keys()) {
		const type = config?.[key];
		const data = formData.get(key);

		switch (type) {
			case 'number':
				result[key] = parseFloat(data?.toString() ?? '');
				break;
			case 'object':
				result[key] = JSON.parse(data?.toString() ?? '');
				break;
			case 'boolean':
				result[key] = !!data;
				break;
			default:
				result[key] = data;
		}
	}

	return result as T;
};

/*
 * @Description 값이 nullish 또는 빈배열인지, 빈객체인지 확인하는 함수
 * is를 사용하여 타입에 대한 힌트를 적용한다.
 */
export const isEmpty = (val: unknown): val is null | undefined => {
	return (
		val === null ||
		val === undefined ||
		(Array.isArray(val) && val.length === 0) ||
		(typeof val === 'object' && Object.keys(val).length === 0)
	);
};


export function getTimeDiff(date: string): string {
	try {
		if (isNaN(Number(new Date(date)))) {
			// Invalid Date 인지 검증한다.
			throw new Error('유효하지 않은 시간입니다.');
		}

		const timeToCompare = Dayjs(date); // 작성한 시간
		const now = Dayjs(); // 현재 시간
		const years = now.diff(timeToCompare, 'year');
		if (years > 0) return `${years}년 전`;

		const months = now.diff(timeToCompare, 'month');
		if (months > 0) return `${months}개월 전`;

		const days = now.diff(timeToCompare, 'day');
		if (days > 0) return `${days}일 전`;

		const hours = now.diff(timeToCompare, 'hour');
		if (hours > 0) return `${hours}시간 전`;

		const minutes = now.diff(timeToCompare, 'minute');
		if (minutes > 0) return `${minutes}분 전`;

		const seconds = now.diff(timeToCompare, 'second');
		if (seconds > 0) return `${seconds}초 전`;

		return '방금 전';
	} catch {
		return '';
	}
}

export function getTimeFormat(date: string, format: string): string {
	return Dayjs(date).format(format);
}

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
