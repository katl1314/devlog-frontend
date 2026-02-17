import Image from 'next/image';

export default function Thumbnail({
	thumbnail
}: {
	thumbnail: string | null | undefined;
}) {
	if (!thumbnail) return <></>;
	return (
		<div className="w-full h-80 relative bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 font-bold mb-12 overflow-hidden">
			<Image
				src={thumbnail}
				alt="썸네일 이미지"
				fill
				className="object-cover"
			></Image>
		</div>
	)
}
