import { Database } from '../../database.types';

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

export interface FetchPosts {
	tab: string;
	pageParam: number;
}

export type fetchPostsFnc = ({ tab, pageParam }: FetchPosts) => Promise<FetchPostsResponse>;

export type Profile = Partial<Database['public']['Tables']['profiles']['Row']>;
