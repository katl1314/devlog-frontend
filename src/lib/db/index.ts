const authAction = {
	user: `${process.env.SERVER_URL}/auth/users`,
	blog: `${process.env.SERVER_URL}/blog`,
};

// db에 사용자가 있는지 확인한다.
export const hasUser = async (email: string) => {
	const action = authAction.user + `/${encodeURIComponent(email)}/exists`;
	const res = await fetch(action, {
		method: 'GET',
		cache: 'no-store'
	});
	if (!res.ok) {
		throw new Error('API 에러');
	}

	return await res.json();
};

export const createAccount = async (user: any) => {
		const action = authAction.user;
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

// export const saveBlog = async (blog: any) => {
// 	const action = authAction.blog;
// 	console.log(action);
// 	const res = await fetch(action, {
// 		body: JSON.stringify(blog),
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		method: 'POST'
// 	});
// 	console.log(res);
// 	if (!res.ok) throw new Error();
//
// 	return res.json();
// }

// 조회
export const searchUser = async (id: string) => {
	const action = authAction.user + `/${encodeURIComponent(id)}`;
	const res = await fetch(action, {
		method: 'GET',
		cache: 'no-store'
	});
	if (!res.ok) throw new Error('API 에러');

	return res.json();
};

// 조회 (이메일)
export const searchUserByEmail = async (email: string) => {
	const action = authAction.user + `/email/${encodeURIComponent(email)}`;
	const res = await fetch(action, {
		method: 'GET',
		cache: 'no-store'
	});
	if (!res.ok) return {};

	return res.json();
};

// 모든 사용자 조회
export const allUser = async () => {
	const action = authAction.user;
	const res = await fetch(action, {
		method: 'GET',
		cache: 'no-store'
	});
	if (!res.ok) throw new Error('API 에러');
	return res.json();
};
