import AuthForm from '@/components/AuthForm';
import { Label } from '@/components/ui/label';

export default function Page() {
	return (
		<div className="p-6 w-[90%] lg:w-[60%] my-0 mx-auto">
			<Label className="text-2xl font-bold text-center">로그인</Label>
			<AuthForm />
		</div>
	);
}
