import UserLayout from '@/components/Layout/UserLayout';
import { GoHeartFill, GoHeart, GoComment, GoShareAndroid, GoBookmark } from 'react-icons/go';
import './init.css';

export default async function Layout({ children }: { children: React.ReactNode }) {
	return (
		<UserLayout>
			<main className="relative">
				{/* 메뉴 */}
				<div className="hidden lg:block sticky top-[100px]">
					<div className="absolute left-[-120px]">
						<div className="flex flex-col gap-6">
							<div className="flex flex-col items-center gap-1">
								<div className="rounded-[50%] border-1 p-3 cursor-pointer group bg-neutral-200  hover:bg-neutral-100">
									<GoHeart size={24} fill="black" />
								</div>
								<div>{0}</div>
							</div>
							<div className="flex flex-col items-center gap-1">
								<div className="rounded-[50%] border-1 p-3 cursor-pointer group  bg-neutral-200 hover:bg-neutral-100">
									<GoComment size={24} fill="black" />
								</div>
								<div>{0}</div>
							</div>
							<div className="flex flex-col items-center gap-1">
								<div className="rounded-[50%] border-1 p-3 cursor-pointer group  bg-neutral-200 hover:bg-neutral-100">
									<GoBookmark size={24} fill="black" />
								</div>
							</div>
							<div className="flex flex-col items-center gap-1">
								<div className="rounded-[50%] border-1 p-3 cursor-pointer group  bg-neutral-200 hover:bg-neutral-100">
									<GoShareAndroid size={24} fill="black" />
								</div>
							</div>
						</div>
					</div>
				</div>
				{children}
			</main>
		</UserLayout>
	);
}
