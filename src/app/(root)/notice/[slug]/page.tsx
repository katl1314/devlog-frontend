import data from "@/mock/food.json";

// food/[slug]/page.tsx에서 SSG처리
export async function generateStaticParams() {
  const foodList = data.data;
  return foodList.map(({ id }) => ({
    slug: id.toString(),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  console.log(slug);
  return <div>Page Detail -- {slug}</div>;
}
