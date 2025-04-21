import dayjs, { Dayjs } from 'dayjs';

export function getTimeDiff(timeToCompare: Dayjs): string {
	const now = dayjs();
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
}
