import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
	return (
		<div className="flex items-center">
			<Link href={'/'} className="flex items-center no-underline">
				<Image src={'/logo.svg'} alt="" width={150} height={100} />
			</Link>
		</div>
	);
}
