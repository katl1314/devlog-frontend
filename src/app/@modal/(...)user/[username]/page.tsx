import Modal from '@/components/Modal/Modal';
import UserPage from '@/app/(user)/user/[username]/page';
export default function Page({ params }: { params: Promise<{ username: string }> }) {
	return (
		<Modal>
			<UserPage params={params} />
		</Modal>
	);
}
