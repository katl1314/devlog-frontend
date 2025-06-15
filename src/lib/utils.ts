import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

type DayjsArguType = Parameters<typeof dayjs>;

export const dayjsWithTimezone = (...args: DayjsArguType) => dayjs(...args).tz('Asia/Seoul');

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const sleep = async (ms: number) => {
	return new Promise(res => {
		setTimeout(() => res(null), ms);
	});
};

type Type = 'string' | 'number' | 'object' | 'boolean';

// parseFormData(formData, { tags: 'object' })
// 객체 이외 타입을 object로 파싱?
export const parseFormData = <T extends { [name: string]: unknown }>(
	formData: FormData,
	keyConfig?: Record<string, Type>
): T => {
	const result = {} as { [name: string]: unknown };
	for (const key of formData.keys()) {
		const type = keyConfig?.[key];
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
