import { FaGithub, FaHome } from 'react-icons/fa';

export default async function UserProfileBottom() {
	return (
		<div className="my-2">
			<div className="flex flex-row justify-end gap-4 px:text-lg">
				<div>
					<span className="font-bold">0</span> 팔로워
				</div>
				<div>
					<span className="font-bold">0</span> 팔로잉
				</div>
			</div>
			<div className="flex flex-row justify-between mt-4 items-center">
				<div className="flex flex-row gap-3">
					<FaGithub size={30} fill="gray" />
					<FaHome size={30} fill="gray" />
				</div>
			</div>
		</div>
	);
}
