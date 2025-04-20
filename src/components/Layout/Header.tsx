import Profile from '@/components/Profile/Profile';
import Logo from '@/components/Logo';
import Image from 'next/image';

export default function Header() {
	return (
		<header>
			<div className="box-border max-h-[70px] mx-auto my-0">
				<div className="flex items-center justify-between p-[10px]">
					<h3 className="flex cursor-pointer">
						<Logo href="/">
							<Image src={'/logo.svg'} alt="" width={150} height={100} />
						</Logo>
					</h3>
					<Profile />
				</div>
			</div>
		</header>
	);
}
