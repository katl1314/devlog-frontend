import { Database } from '../../database.types';

export type User = Partial<Database['public']['Tables']['profiles']['Row']>;
export type Post = Database['public']['Tables']['posts']['Row'];
export type Comments = Database['public']['Tables']['comments']['Row'];

export type IPost = Post & {
	comments: number;
	like: number;
	isLike: boolean;
	userid: string;
	username: string;
};
export interface FetchPostsResponse {
	posts: IPost[];
	hasMore: boolean;
}

export interface FetchPostsResponseUser {
	posts: IPost[];
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

export type fetchPostsFnc = ({
	tab,
	pageParam
}: FetchPostsTab) => Promise<FetchPostsResponse>;
export type fetchPostsFncByUser = ({
	userId,
	pageParam
}: FetchPostsUser) => Promise<FetchPostsResponseUser>;
