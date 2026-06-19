export default async function Layout({
	children
}: {
	children: React.ReactNode;
}) {
	return <main className="relative py-4">{children}</main>;
}
