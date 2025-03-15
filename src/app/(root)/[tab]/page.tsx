import { notFound } from "next/navigation";
import { ICard } from "@/types/type";
import CardView from "@/components/Layout/CardLayout";

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

  const data: ICard[] = await res.json();
  return (
    <>
      {tab}
      <CardView>
        {data.map(({ id, ...args }) => (
          <div key={id}>{args.title}</div>
        ))}
      </CardView>
    </>
  );
}
