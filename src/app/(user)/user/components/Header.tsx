'use client';

import Profile from '@/components/Profile';
import Logo from '@/components/Logo';
import Searchbar from '@/components/Layout/Searchbar';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
	const { username } = useParams();
	return (
		<header>
			<div className="box-border max-h-[70px] mx-auto my-0">
				<div className="flex items-center justify-between p-[10px]">
					<h3 className="cursor-pointer flex gap-2">
						<Logo />
						<Link href={`./${username}`} className="flex items-center no-underline">
							<span className="text-xl text-[#333]">{username}의 블로그</span>
						</Link>
					</h3>
					<Searchbar />
					<Profile />
				</div>
			</div>
		</header>
	);
}
