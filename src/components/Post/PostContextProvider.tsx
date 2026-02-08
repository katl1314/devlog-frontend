'use client';

import { createContext, useEffect, useState, PropsWithChildren } from 'react';

type FuncType = (prev: boolean, path: string) => void;

export const PostContext = createContext<{
	userId: string | null | undefined;
	nLike: number;
	isLiked: boolean;
	toggle: boolean;
	setToggle: FuncType;
}>({
	userId: null,
	nLike: 0,
	toggle: false,
	isLiked: false,
	setToggle: (arg: boolean, path: string) => {}
});

type IPostContextProvider = PropsWithChildren<{ userId: string; isLike: boolean; like: number }>;

export default function PostContextProvider({ userId, children, isLike, like }: IPostContextProvider) {
	const [isLiked, setIsLiked] = useState(isLike);
	const [toggle, setToggle] = useState<boolean>(false);
	const [nLike, setLike] = useState(like);
	const [isTrigger, setTrigger] = useState(false);

	useEffect(() => {
		if (isTrigger) {
			setIsLiked(!isLiked);
		}
	}, [toggle]);

	useEffect(() => {
		if (isTrigger) {
			const like = isLiked ? nLike + 1 : nLike - 1;
			setLike(like);
		}
	}, [isLiked]);

	const handleToggle = async (newToggle: boolean, path: string) => {
		!isTrigger && setTrigger(true);
		// await toggleLike(path);
		setToggle(newToggle);
	};

	return (
		<PostContext.Provider value={{ userId, isLiked, nLike, toggle, setToggle: handleToggle }}>
			{children}
		</PostContext.Provider>
	);
}
