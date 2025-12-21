const authAction = {
	users: `${process.env.SERVER_URL}/auth/users`
};

// db에 사용자가 있는지 확인한다.
export const hasUser = async (email: string) => {
	const action = authAction.users + `/${encodeURIComponent(email)}/exists`;
	const res = await fetch(action, {
		method: 'GET',
		cache: 'no-store'
	});
	if (!res.ok) {
		throw new Error('API 에러');
	}

	return await res.json();
};

export const saveUser = async (user: any) => {
	try {
		const action = authAction.users;
		const res = await fetch(action, {
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		});

		if (!res.ok) throw new Error('API 에러');

		return res.json();
	} catch {
		return;
	}
};

// 조회
export const searchUser = async (id: string) => {
	const action = authAction.users + `/${encodeURIComponent(id)}`;
	const res = await fetch(action, {
		method: 'GET',
		cache: 'no-store'
	});
	if (!res.ok) throw new Error('API 에러');

	return res.json();
};

// 조회 (이메일)
export const searchUserByEmail = async (email: string) => {
	const action = authAction.users + `/email/${encodeURIComponent(email)}`;
	const res = await fetch(action, {
		method: 'GET',
		cache: 'no-store'
	});
	if (!res.ok) throw new Error('API 에러');

	return res.json();
};

// 모든 사용자 조회
export const allUser = async () => {
	const action = authAction.users;
	const res = await fetch(action, {
		method: 'GET',
		cache: 'no-store'
	});
	if (!res.ok) throw new Error('API 에러');
	return res.json();
};
