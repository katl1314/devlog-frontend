import { GoHeart, GoComment, GoShareAndroid, GoBookmark } from 'react-icons/go';

export default function SideActionBar() {
	return (
		<div className="hidden lg:block sticky top-[10px]">
			<div className="absolute left-[-80px]">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col items-center gap-1">
						<div className="rounded-[50%] border-1 p-3 cursor-pointer group bg-neutral-100  hover:bg-neutral-200">
							<GoHeart size={24} fill="black" />
						</div>
						<div>{0}</div>
					</div>
					<div className="flex flex-col items-center gap-1">
						<div className="rounded-[50%] border-1 p-3 cursor-pointer group  bg-neutral-100 hover:bg-neutral-200">
							<GoComment size={24} fill="black" />
						</div>
						<div>{0}</div>
					</div>
					<div className="flex flex-col items-center gap-1">
						<div className="rounded-[50%] border-1 p-3 cursor-pointer group  bg-neutral-100 hover:bg-neutral-200">
							<GoBookmark size={24} fill="black" />
						</div>
					</div>
					<div className="flex flex-col items-center gap-1">
						<div className="rounded-[50%] border-1 p-3 cursor-pointer group  bg-neutral-100 hover:bg-neutral-200">
							<GoShareAndroid size={24} fill="black" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
