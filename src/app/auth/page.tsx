import AuthForm from './components/auth-form';

type Props = {
	searchParams?: Promise<{
		callbackUrl?: string;
		error?: string;
		registered?: string;
	}>;
};

export default async function Page({ searchParams }: Props) {
	const { callbackUrl, error, registered } = (await searchParams) ?? {};
	return (
		<AuthForm
			callbackUrl={callbackUrl}
			error={error}
			registered={registered}
		/>
	);
}
