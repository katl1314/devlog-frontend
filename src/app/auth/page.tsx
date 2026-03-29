import AuthForm from './components/auth-form';

type Props = {
	searchParams?: Promise<{ callbackUrl?: string }>;
};

export default async function Page({ searchParams }: Props) {
	const { callbackUrl } = (await searchParams) ?? {};
	return <AuthForm callbackUrl={callbackUrl} />;
}
