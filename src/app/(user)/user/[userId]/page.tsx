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

export const dynamicParams = false; // generateStaticParams 반환 외 처리는 404페이지를 표시한다. => 동적 경로는 404
export const dynamic = 'force-static'; // 무조건 정적 페이지로 생성 다양한 옵션 제공

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
	const userId = (await params).userId;
	return <>{userId}</>;
}
