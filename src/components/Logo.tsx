import Link from 'next/link';

export default function Logo() {
	return (
		<div className="flex items-center">
			<Link href={'/'} className="flex items-center no-underline">
				<span className="text-2xl text-[#333]">Devs.log</span>
			</Link>
		</div>
	);
}
