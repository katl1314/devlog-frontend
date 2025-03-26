import Modal from '@/components/Modal/Modal';
import UserPage from '@/app/(user)/user/[userId]/page';
export default function Page({ params }: { params: { userId: string } }) {
	return (
		<Modal>
			<UserPage params={params} />
		</Modal>
	);
}
