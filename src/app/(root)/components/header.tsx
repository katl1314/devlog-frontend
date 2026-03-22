import Logo from '@/components/common/logo';
import NavbarLogo from './navbar-logo';

export default async function Header() {
	return (
		<header className="md:hidden border-b border-border">
			<div className="box-border max-h-[70px] mx-auto my-0">
				<div className="flex items-center justify-between px-4 py-[10px]">
					<h3 className="flex cursor-pointer">
						<Logo href="/">
							<NavbarLogo />
						</Logo>
					</h3>
				</div>
			</div>
		</header>
	);
}
