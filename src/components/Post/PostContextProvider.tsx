'use client';

import { createContext, useEffect, useState, useRef } from 'react';
import { toggleLike } from '@/actions/actions';

type FuncType = (prev: boolean) => void;
type FuncType2 = (prev: boolean, path: string) => void;

export const PostContext = createContext<{
	userId: string | null | undefined;
	nLike: number;
	isLiked: boolean;
	toggle: boolean;
	setTrigger: FuncType; // 사용자가 직접 눌렀을때
	setToggle: FuncType2;
}>({
	userId: null,
	nLike: 0,
	toggle: false,
	isLiked: false,
	setTrigger: (arg: boolean) => {},
	setToggle: (arg: boolean, path: string) => {}
});

type IPostContextProvider = React.PropsWithChildren<{ userId: string; isLike: boolean; like: number }>;

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
		setToggle(newToggle);
		await toggleLike(path); // 갱신
	};

	return (
		<PostContext.Provider value={{ userId, isLiked, nLike, toggle, setTrigger, setToggle: handleToggle }}>
			{children}
		</PostContext.Provider>
	);
}
