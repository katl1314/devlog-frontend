import Searchbar from './Searchbar';
import Profile from '@/components/Profile';
import Logo from '@/components/Logo';

export default function Header() {
	return (
		<header>
			<div className="box-border max-h-[70px] mx-auto my-0">
				<div className="flex items-center justify-between p-[10px]">
					<h3 className="flex cursor-pointer">
						<Logo />
					</h3>
					<Searchbar />
					<Profile />
				</div>
			</div>
		</header>
	);
}
