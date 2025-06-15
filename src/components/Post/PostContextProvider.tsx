'use client';

import { createContext, useEffect, useState } from 'react';

type FuncType = (prev: boolean) => void;
type FuncType2 = (prev: string | null) => void;

export const PostContext = createContext<{
	userId: string | null | undefined;
	nLike: number;
	isLiked: boolean;
	setIsLiked: FuncType | null | undefined;
	setToggle: FuncType2 | null | undefined;
}>({
	userId: null,
	nLike: 0,
	isLiked: false,
	setIsLiked: null,
	setToggle: null
});

type IPostContextProvider = React.PropsWithChildren<{ userId: string; isLike: boolean; like: number }>;

export default function PostContextProvider({ userId, children, isLike, like }: IPostContextProvider) {
	const [isLiked, setIsLiked] = useState(isLike);
	const [toggle, setToggle] = useState<string | null>(null);
	const [nLike, setLike] = useState(like);

	useEffect(() => {
		// 초기값은 무조건 null 이후 toggle하면 'y' or 'n'으로 처리한다.
		if (toggle) {
			if (isLiked) {
				setLike(nLike + 1);
			} else {
				setLike(nLike - 1);
			}
		}
	}, [toggle, isLiked]);

	return (
		<PostContext.Provider value={{ userId, isLiked, nLike, setIsLiked, setToggle }}>{children}</PostContext.Provider>
	);
}
