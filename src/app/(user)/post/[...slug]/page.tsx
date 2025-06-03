export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
	const slug = await params;

	console.log(slug);

	return <div></div>;
}

// http://localhost:3000/post/n/1
