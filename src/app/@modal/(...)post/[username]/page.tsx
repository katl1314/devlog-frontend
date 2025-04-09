import Modal from '@/components/Modal/Modal';
import UserPage from '@/app/(root)/user/[userId]/page';
export default function Page({ params }: { params: Promise<{ userId: string }> }) {
	return (
		<Modal>
			<UserPage params={params} />
		</Modal>
	);
}
