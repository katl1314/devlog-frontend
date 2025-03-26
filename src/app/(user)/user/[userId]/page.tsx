export async function generateStaticParams() {
	try {
		const url = 'http://localhost:3001/user';
		const res = await fetch(url, { cache: 'force-cache' });

		if (!res.ok) throw new Error('데이터 조회 중 에러가 발생하였습니다.');

		const data = await res.json();
		console.log(data);
		return data;
	} catch (err) {
		console.error(err);
	}
}

export default async function Page({ params }: { params: { userId: string } }) {
	const userId = await params.userId;
	return <>{userId}</>;
}
