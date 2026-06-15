import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ key: string }> }) {
	const { key } = await params;
	const backendUrl = process.env.SERVER_URL ?? '';

	const res = await fetch(`${backendUrl}/image/${key}`);

	if (!res.ok) {
		return NextResponse.json({ message: 'Not Found' }, { status: 404 });
	}

	const buffer = await res.arrayBuffer();
	const contentType = res.headers.get('Content-Type') ?? 'application/octet-stream';

	return new NextResponse(buffer, {
		headers: {
			'Content-Type': contentType,
			'Cache-Control': 'public, max-age=31536000'
		}
	});
}
