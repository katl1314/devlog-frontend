import { notFound } from "next/navigation";
import CardLayout from "@/components/Layout/CardLayout";
import { Suspense } from "react";
import PostCardList from "@/components/PostCardList";
import PostCardSkeleton from "@/components/PostCardSkeleton";

export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:3001/tabs", {
      cache: "force-cache",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const { tab } = await params;
  const res = await fetch(`http://localhost:3001/${tab}`);

  if (!res.ok) {
    // 만약 res가 404이거나 ok가 false이면 not-found페이지를 보여준다.
    notFound();
  }

  const Fallback = (
    <>
      {Array.from({ length: 10 }).map((_, index) => {
        return <PostCardSkeleton key={index} />;
      })}
    </>
  );
  return (
    <CardLayout>
      <Suspense fallback={Fallback}>
        <PostCardList tab={tab} />
      </Suspense>
    </CardLayout>
  );
}
