import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

type DayjsArguType = Parameters<typeof dayjs>;

export const dayjsWithTimezone = (...args: DayjsArguType) =>
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
