import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const session = await auth();
	if (!session?.accessToken) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	const formData = await request.formData();
	const backendUrl = process.env.SERVER_URL ?? '';

	const res = await fetch(`${backendUrl}/image`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${session.accessToken}` },
		body: formData
	});

	if (!res.ok) {
		const error = await res.json().catch(() => ({}));
		return NextResponse.json(error, { status: res.status });
	}

	const data = (await res.json()) as { key: string };
	return NextResponse.json({ url: `/api/image/${data.key}` });
}
