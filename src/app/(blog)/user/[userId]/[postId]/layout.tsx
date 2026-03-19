export default async function Layout({
	children
}: {
	children: React.ReactNode;
}) {
	return <main className="relative p-2 py-4">{children}</main>;
}
