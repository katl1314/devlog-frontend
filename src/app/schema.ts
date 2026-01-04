import { z } from 'zod';

export type ProviderType = 'google' | 'github' | 'email';

export const RegisterSchema = z.object({
	email: z.email(),
	name: z.string().min(1),
	userId: z.string().min(1).max(20),
	description: z.string().optional(),
	// provider: z.enum(['google', 'github', 'email']).optional(),
	provider: z.string(),
	errors: z.record(z.string(), z.string()).optional()
});

export type RegisterType = z.infer<typeof RegisterSchema>;

export const formInitialState = {
	email: '',
	name: '',
	userId: '',
	description: '',
	provider: 'email' as ProviderType
};
