export default function TabLayout({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  return <div className="flex items-center">{children}</div>;
}
