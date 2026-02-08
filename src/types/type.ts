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
	nextCursor: number;
}
