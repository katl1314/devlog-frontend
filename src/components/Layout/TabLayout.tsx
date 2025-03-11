export default function TabLayout({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  return (
    <div className="flex items-center sticky top-[0] z-[9999] bg-[#f5f5f5]">
      {children}
    </div>
  );
}
