import { cookies } from 'next/headers';

const actions = {
	auth: `${process.env.SERVER_URL}/auth`,
	user: `${process.env.SERVER_URL}/auth/users`,
	blog: `${process.env.SERVER_URL}/blog`,
	post: `${process.env.SERVER_URL}/post`,
};

interface User {
	id?: string,
	name?: string | null,
	email?: string | null,
	image?: string | null,
}

// db에 사용자가 있는지 확인한다.
export const hasUser = async (email: string) => {
	const action = actions.user + `/${encodeURIComponent(email)}/exists`;
	const res = await fetch(action, {
		method: 'GET',
		cache: 'no-store'
	});
	if (!res.ok) {
		throw new Error('API 에러');
	}

	return await res.json();
};

// 로그인 토큰 생성
export const signInAuth = async (payload: User) => {
	const action = actions.auth + '/signIn';
	const res = await fetch(action, {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json',
		},
		body: JSON.stringify(payload)
	});

	if (!res.ok) throw new Error('에러');

	return await res.json();
}

// 계정 생성
export const createAccount = async (user: any) => {
		const action = actions.user;
		console.log('action ::', action);
		const res = await fetch(action, {
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		});

		console.log('action ::', res);
		if (!res.ok) throw new Error();

		return res.json();
};

// 포스트 생성
export const createPost = async ({ headers, body }: { headers?: any, body: any }) => {
	const action = actions.post;
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('service-access-token')?.value;

	const res = await fetch(action, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			...headers,
			'Content-Type': 'application/json',
			'authorization': `Bearer ${accessToken}`,
		},
	});

	if (!res.ok) {
		throw new Error('블라블라');
	}

	return await res.json()
}

// 사용자 조회
export const searchUser = async (id: string) => {
	const action = actions.user + `/${encodeURIComponent(id)}`;
	const res = await fetch(action, {
		method: 'GET',
		cache: 'no-store'
	});
	if (!res.ok) throw new Error('API 에러');

	return res.json();
};

// 사용자 조회 (이메일)
export const searchUserByEmail = async (email: string) => {
	const action = actions.user + `/email/${encodeURIComponent(email)}`;
	const res = await fetch(action, {
		method: 'GET',
		cache: 'no-store'
	});
	if (!res.ok) return {};

	return res.json();
};

// 모든 사용자 조회
export const allUser = async () => {
	const action = actions.user;
	const res = await fetch(action, {
		method: 'GET',
		cache: 'no-store'
	});
	if (!res.ok) throw new Error('API 에러');
	return res.json();
};
