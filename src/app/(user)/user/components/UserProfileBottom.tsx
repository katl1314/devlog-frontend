import { FaGithub, FaHome } from 'react-icons/fa';
import { User } from '@/types/type';
import { createClientByServer } from '@/utils/supabase/server';

export default async function UserProfileBottom({ userId }: User) {
	const supabase = await createClientByServer();
	const { data } = await supabase.auth.getUser();

	const profiles = await supabase.from('profiles').select('id').eq('userId', userId).single();
	// const isMyProfile = profiles.data?.id === data.user?.id;

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
