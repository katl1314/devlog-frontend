import Image from 'next/image';

export default function Thumbnail({
	thumbnail
}: {
	thumbnail: string | null | undefined;
}) {
	if (!thumbnail) return <></>;
	return (
		<div className="relative w-full h-[200px] lg:h-[400px]">
			<Image
				src={thumbnail}
				alt="썸네일 이미지"
				fill
				className="object-cover"
			></Image>
		</div>
	);
}
