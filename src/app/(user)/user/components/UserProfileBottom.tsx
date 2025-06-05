import { FaGithub, FaHome } from 'react-icons/fa';
import { User } from '@/types/type';
import { createClientByServer } from '@/utils/supabase/server';
import Button from '@/components/Button';

export default async function UserProfileBottom({ userId }: User) {
	const supabase = await createClientByServer();
	const { data } = await supabase.auth.getUser();

	let isMyProfile = false;
	if (data) {
		const { data: user } = await supabase.from('profiles').select('id').eq('userId', userId).limit(1).single();
		isMyProfile = user?.id === data.user?.id;
	}

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
				<div>{!isMyProfile && <Button type="button" value="팔로우" />}</div>
			</div>
		</div>
	);
}
