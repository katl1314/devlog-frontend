export async function generateStaticParams() {
  return [{ tab: "trends" }, { tab: "new" }, { tab: "feed" }];
}

export default async function Trends({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const { tab } = await params;
  console.log(tab);
  return (
    <div>
      Trends
      <br />
    </div>
  );
}
