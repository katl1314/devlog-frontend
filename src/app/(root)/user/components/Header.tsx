import Profile from '@/components/Profile';
import Searchbar from '@/components/Layout/Searchbar';
import Logo from './Logo';
import Image from 'next/image';

interface Header {
	userId: string | null | undefined;
}

export default function Header({ userId }: Header) {
	return (
		<header>
			<div className="box-border max-h-[70px] mx-auto my-0">
				<div className="flex items-center justify-between p-[10px] gap-3">
					<Logo href="/">
						<Image src={'/next.svg'} alt="" width={100} height={50} />
					</Logo>
					<Logo href={`/user/${userId}`}>
						<h3 className="text-xl font-bold">{userId}.log</h3>
					</Logo>
					<Searchbar />
					<Profile />
				</div>
			</div>
		</header>
	);
}
