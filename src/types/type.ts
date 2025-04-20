import { Database } from '../../database.types';

export type User = Partial<Database['public']['Tables']['profiles']['Row']>;
export type Post = Partial<Database['public']['Tables']['posts']['Row']>;

export interface ICard {
	id: number;
	title: string;
	summary: string;
	date: string;
	comments: number;
	like: number;
	user: string;
	thumbnail: string;
}

export interface FetchPostsResponse {
	posts: ICard[];
	hasMore: boolean;
}

export interface FetchPostsResponseUser {
	posts: Post[];
	hasMore: boolean;
}

export interface FetchPostsTab {
	tab: string;
	pageParam: number;
}

export interface FetchPostsUser {
	userId: string;
	pageParam: number;
}

export type fetchPostsFnc = ({ tab, pageParam }: FetchPostsTab) => Promise<FetchPostsResponse>;
export type fetchPostsFncByUser = ({ userId, pageParam }: FetchPostsUser) => Promise<FetchPostsResponseUser>;
