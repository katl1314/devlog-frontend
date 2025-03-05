export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1440px] my-0 mx-auto px-4 lg:px-0">{children}</div>
  );
}
