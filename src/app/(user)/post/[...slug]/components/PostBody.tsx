import ReactMarkdown from 'react-markdown';
import { Post } from '@/types/type';
import { GoHeart, GoComment, GoShareAndroid, GoBookmark } from 'react-icons/go';
import { createClientByBrowser } from '@/utils/supabase/client';
import UserProfile from '@/app/(user)/user/components/UserProfile';

export default async function PostBody({ content, userId }: Post) {
	const supabase = await createClientByBrowser();
	const { data } = await supabase.from('profiles').select().eq('userId', userId).single();
	return (
		<div className="mb-6">
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
			<div className="my-16">
				<ReactMarkdown>{content}</ReactMarkdown>
			</div>
			<div className="mt-[300px] mb-12">
				<UserProfile {...data} />
			</div>
		</div>
	);
}
