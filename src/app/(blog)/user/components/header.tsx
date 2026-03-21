import Logo from '@/components/common/logo';

interface HeaderProps {
	userId: string | null | undefined;
	title: string;
}

export default async function Header({ userId, title }: HeaderProps) {
	return (
		<header className="md:hidden sticky top-0 z-20 bg-background">
			<div className="box-border max-h-[70px] mx-auto my-0">
				<div className="flex items-center justify-between p-[10px] gap-3">
					<div className="flex items-center">
						<Logo
							href={`/@${userId}`}
							className="text-lg lg:text-xl ml-[12px] flex items-center"
						>
							<span className="font-bold whitespace-nowrap overflow-ellipsis  overflow-hidden w-[110px] lg:w-full">
								{title}
							</span>
						</Logo>
					</div>
				</div>
			</div>
		</header>
	);
}
