import { Label } from './ui/label';
import Link from 'next/link';
import Image from 'next/image';

export default function SignInForm() {
	return (
		<div className="p-6 w-[90%] lg:w-[65%] my-0 mx-auto">
			<Label className="text-2xl font-bold text-center">로그인</Label>
			<div className="mt-4 flex flex-col">
				<div>
					<h3 className="text-lg font-bold text-neutral-400">소셜 계정으로 로그인</h3>
					<div className="flex py-4 flex-col gap-6">
						<div>
							{/* public 접근 시 / 절대경로로 접근한다. */}
							<Link href={'/auth'}>
								<Image src={'/img/kakao_login2.png'} alt="카카오 로그인" width={200} height={30} />
							</Link>
						</div>
						<div>
							<Link href={'/auth'}>
								<Image src={'/img/naver_login.png'} alt="카카오 로그인" width={200} height={30} />
							</Link>
						</div>
						{/* <div>구글 로그인</div> */}
					</div>
				</div>
				<div>asdasd</div>
			</div>
		</div>
	);
}
