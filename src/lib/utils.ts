import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

type DayjsArgType = Parameters<typeof dayjs>;

export const dayjsWithTimezone = (...args: DayjsArgType) =>
	dayjs(...args).tz('Asia/Seoul');

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const sleep = async (ms: number) => {
	return new Promise(res => {
		setTimeout(() => res(null), ms);
	});
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

/*
 * @Description 값이 참 거짓을 의미하는 값인지 확인하는 함수
 *
 */
export const isBool = (val: unknown): boolean => {
	return val === true || val === false || val === 'true' || val === 'false';
};
