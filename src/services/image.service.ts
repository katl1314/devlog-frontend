import { apiClient } from '@/utils/db';

export const imageService = {
	async upload(file: File, accessToken: string): Promise<string> {
		const formData = new FormData();
		formData.set('image', file);
		const data = await apiClient('/image', {
			method: 'POST',
			accessToken,
			body: formData
		});
		return (data as { key: string }).key;
	}
};
