import { notFound } from "next/navigation";

export default async function Trends({ params }: { params: { type: any } }) {
  // 경로 Validation
  const pages = ["week", "day", "month", "year"];
  const type = (await params.type?.[0]) ?? "week";

  // week, day, month, year외 경로 접근 시 notFound
  if (!pages.includes(type)) notFound();

  return <div>{type}</div>;
}
