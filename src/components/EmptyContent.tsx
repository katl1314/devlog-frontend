export default function EmptyContent({ message }: { message: string }) {
	return (
		<div className="flex flex-col items-center mt-[15%]">
			<div className="font-bold text-7xl">Ooops</div>
			<div className="mt-6 text-xl">{message}</div>
		</div>
	);
}
