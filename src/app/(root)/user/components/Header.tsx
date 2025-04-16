import Profile from '@/components/Profile';
import Searchbar from '@/components/Layout/Searchbar';
import Image from 'next/image';
import Logo from '@/components/Logo';
import { createClientByServer } from '@/utils/supabase/server';

interface Header {
	userId: string | null | undefined;
}

export default async function Header({ userId }: Header) {
	const supabase = await createClientByServer();
	const { error, data } = await supabase.from('blog').select().eq('userId', userId).single();

	if (error) throw new Error(error.message);

	return (
		<header>
			<div className="box-border max-h-[70px] mx-auto my-0">
				<div className="flex items-center justify-between p-[10px] gap-3">
					<div className="flex items-center">
						<Logo href="/" className="flex items-center">
							<Image src={'/logo-small.svg'} alt="" width={40} height={40} />
						</Logo>
						<Logo href={`/@${userId}`} className="text-lg lg:text-xl ml-[12px] flex items-center">
							<span className="font-bold whitespace-nowrap overflow-ellipsis  overflow-hidden w-[90px] lg:w-full">
								{data.title}
							</span>
						</Logo>
					</div>
					<Searchbar />
					<Profile />
				</div>
			</div>
		</header>
	);
}
