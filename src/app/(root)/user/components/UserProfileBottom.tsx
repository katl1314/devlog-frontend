import { Button } from '@/components/ui/button';
import { FaGithub, FaHome } from 'react-icons/fa';
import { User } from '@/types/type';

export default function UserProfileBottom({ userId }: User) {
	console.log('userId', userId);
	return (
		<div>
			<FollowInfo />
			<FollowButton />
		</div>
	);
}

function FollowInfo() {
	return (
		<div className="flex flex-row justify-end gap-4 px:text-lg">
			<div>
				<span className="font-bold">0</span> 팔로워
			</div>
			<div>
				<span className="font-bold">0</span> 팔로잉
			</div>
		</div>
	);
}

function FollowButton() {
	return (
		<div className="flex flex-row justify-between mt-6 items-center">
			<div className="flex flex-row gap-3">
				<FaGithub size={30} fill="gray" />
				<FaHome size={30} fill="gray" />
			</div>
			<div>
				<Button type="button" className="text-lg">
					팔로잉
				</Button>
			</div>
		</div>
	);
}
