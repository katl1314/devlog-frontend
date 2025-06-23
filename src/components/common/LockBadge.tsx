import { CiLock } from 'react-icons/ci';

export default function LockBadge() {
	return (
		<div className="flex flex-row gap-2 items-center bg-black text-white px-2 rounded-sm">
			<CiLock />
			비공개
		</div>
	);
}
