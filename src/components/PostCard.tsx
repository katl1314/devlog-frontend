import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ICard } from "@/types/type";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

export default function PostCard({
  title,
  thumbnail,
  comments,
  date,
  summary,
  user,
}: ICard) {
  return (
    <Card>
      <CardHeader>
        <div className="relative w-full h-[200px]">
          <Image src={thumbnail} alt={title} fill objectFit="cover"></Image>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-[120px] my-5">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-sm pt-2">{summary}</CardDescription>
        </div>
        <div className="flex flex-row gap-2 py-3 text-sm text-neutral-500">
          <Label>{date}</Label>
          <Label>{comments}개의 댓글</Label>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between py-3">
        <div>
          <Label>{user}</Label>
        </div>
      </CardFooter>
    </Card>
  );
}
