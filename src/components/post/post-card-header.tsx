import { CardHeader } from '@/components/ui/card';
import Image from 'next/image';

const PostCardHeader = ({
  children,
  thumbnail
}: {
  children: React.ReactNode | React.ReactNode[];
  thumbnail?: string;
}) => {
  const ThumbnailView = thumbnail && (
    <div className="relative w-full min-h-[200px]">
      <Image
        src={thumbnail}
        alt={'thumbnail'}
        fill
        className="object-cover rounded-t-xl"
      ></Image>
    </div>
  );
  return (
    <CardHeader className="block max-h-[222px] h-[222px]">
      {ThumbnailView}
      <div className="px-2 pt-2">{children}</div>
    </CardHeader>
  );
};

export default PostCardHeader;