import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';

export default async function UserProfile({
	user_id,
	user_name,
	avatar_url,
	blog
}: any) {
	return (
		<>
			{/* new */}
			<div className="mt-16 flex items-center gap-6 pt-8 border-gray-200">
				<div className="w-[80px] h-[80px] lg:w-[128px] lg:h-[128px] relative">
					<Link href={blog.url_slug}>
						{avatar_url ? (
							<Image
								src={avatar_url}
								alt={`${user_id}의 프로필사진`}
								fill
								className="rounded-[50%] object-cover"
							/>
						) : (
							<div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
								{(user_id?.[0] ?? 'U').toUpperCase()}
							</div>
						)}
					</Link>
				</div>
				<div>
					<div className="text-xl font-bold mb-1">{`${user_name}(${user_id})`}</div>
					<div className="text-gray-500">{blog.description}</div>
				</div>
			</div>
			<Separator className="mt-[20px]" />
		</>
	);
}
