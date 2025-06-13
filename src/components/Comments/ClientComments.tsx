'use client';

import { createContext } from 'react';

export const PostContext = createContext<{ userId: string | null | undefined }>({ userId: null });

export default function ClientComments({ userId, children }: React.PropsWithChildren<{ userId: string }>) {
	return <PostContext.Provider value={{ userId }}>{children}</PostContext.Provider>;
}
