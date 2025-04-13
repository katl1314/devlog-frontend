import Profile from '@/components/Profile';
import Searchbar from '@/components/Layout/Searchbar';
import Image from 'next/image';
import Logo from '@/components/Logo';

interface Header {
	slug: string | null | undefined;
}

export default function Header({ slug }: Header) {
	return (
		<header>
			<div className="box-border max-h-[70px] mx-auto my-0">
				<div className="flex items-center justify-between p-[10px] gap-3">
					<div className="flex items-center">
						<Logo href="/" className="flex items-center">
							<Image src={'/logo-small.svg'} alt="" width={40} height={40} />
						</Logo>
						<Logo href={`/${slug}`} className="text-base lg:text-xl ml-[12px] flex items-center">
							<span className="font-bold whitespace-nowrap overflow-ellipsis">{`{${slug}}.log`}</span>
						</Logo>
					</div>
					<Searchbar />
					<Profile />
				</div>
			</div>
		</header>
	);
}
