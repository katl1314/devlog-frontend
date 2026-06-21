import { apiClient } from '@/utils/db';

export interface SuggestResult {
	posts: { id: string; title: string; userId: string; path: string }[];
	tags: { name: string }[];
}

export interface SearchResult {
	data: {
		id: string;
		title: string;
		summary: string;
		thumbnail: string | null;
		userId: string;
		path: string;
		tags: string[];
		createdAt: string;
	}[];
	hasNext: boolean;
	cursor: { after: string } | null;
	count: number;
	relatedTags: string[] | null;
}

const HISTORY_KEY = 'search_history';
const HISTORY_MAX = 10;
const Q_PATTERN = /^[^\p{Cc}<>{}()|\\^`"]+$/u;

function validateQuery(q: string): boolean {
	return q.length >= 1 && q.length <= 100 && Q_PATTERN.test(q);
}

export const searchService = {
	async suggest(q: string, userId?: string): Promise<SuggestResult> {
		return apiClient('/posts/search/suggest', {
			method: 'GET',
			params: { q, ...(userId ? { userId } : {}) }
		});
	},

	async search(q: string, after?: string, take = 10, userId?: string): Promise<SearchResult> {
		return apiClient('/posts/search', {
			method: 'GET',
			params: {
				q,
				take: String(take),
				...(after ? { after } : {}),
				...(userId ? { userId } : {})
			}
		});
	},

	getHistory(): string[] {
		try {
			const raw = localStorage.getItem(HISTORY_KEY);
			return raw ? (JSON.parse(raw) as string[]) : [];
		} catch {
			return [];
		}
	},

	addHistory(q: string) {
		if (!validateQuery(q)) return;
		const prev = this.getHistory().filter(item => item !== q);
		localStorage.setItem(HISTORY_KEY, JSON.stringify([q, ...prev].slice(0, HISTORY_MAX)));
	},

	removeHistory(q: string) {
		const next = this.getHistory().filter(item => item !== q);
		localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
	},

	clearHistory() {
		localStorage.removeItem(HISTORY_KEY);
	}
};
