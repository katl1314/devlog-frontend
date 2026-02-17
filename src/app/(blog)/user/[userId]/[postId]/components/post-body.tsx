'use client';
import UserProfile from '@/app/(blog)/user/components/user-profile';
import Thumbnail from '@/app/(blog)/user/components/thumbnail';
import ReactMarkdown from 'react-markdown';
import { IPost, User } from '@/types/type';
import SideBar from './sidebar';
import Toc from './toc';

/*
export default async function PostBody(post: IPost & { user: User }) {
	return (
		<div>
			<SideBar {...post} />
			<Toc />
			<div id="content__entry_point">
				<Thumbnail thumbnail={post.thumbnail} />
				<ReactMarkdown>{post.content}</ReactMarkdown>
			</div>
			<div className="mt-[256px] mb-12">
				<UserProfile {...post.user} />
			</div>
		</div>
	);
}*/

export default function PostBody(post: IPost & { user: User }) {
	return (
		<div className="flex relative">
			<SideBar />
			<main id="content__entry_point" className="flex-1 w-full min-w-0">
				{/* Thumbnail */}
				<div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 font-bold mb-12 overflow-hidden">
					<span>Thumbnail Image Area</span>
				</div>

				{/* Markdown Content Style */}
				<div className="text-lg text-gray-800 leading-relaxed break-keep">
					<p className="mb-6">
						안녕하세요. 오늘은 프론트엔드 개발의 새로운 패러다임, <strong>서버 컴포넌트</strong>에 대해 알아보겠습니다.
					</p>

					<h3 className="text-3xl font-bold mt-10 mb-4 text-gray-900">1. 서버 컴포넌트란?</h3>
					<p className="mb-6">
						서버 컴포넌트(Server Components)는 서버에서 렌더링되어 HTML을 클라이언트로 전송하는 방식입니다. 이를 통해 번들 사이즈를 줄이고 백엔드 리소스에 직접 접근할 수 있는 장점이 있습니다.
					</p>

					<blockquote className="border-l-4 border-[#12b886] bg-gray-50 p-4 my-6 text-gray-600 rounded-r">
						<p>"Next.js 13 버전부터는 App Router 방식이 도입되면서 서버 컴포넌트가 기본값이 되었습니다."</p>
					</blockquote>

					<h3 className="text-3xl font-bold mt-10 mb-4 text-gray-900">2. 주요 특징</h3>
					<ul className="list-disc pl-6 mb-6 space-y-2">
						<li><strong>Zero Bundle Size:</strong> 서버 컴포넌트의 코드는 클라이언트로 전송되지 않습니다.</li>
						<li><strong>Backend Access:</strong> 데이터베이스나 파일 시스템에 직접 접근 가능합니다.</li>
					</ul>

					<pre className="bg-[#212529] text-gray-100 p-6 rounded-lg overflow-x-auto mb-6 font-mono text-sm">
            <code>{`// page.tsx
						async function getData() {
							const res = await fetch('https://api.example.com/...');
							return res.json();
						}`}</code>
          </pre>

					<p className="mb-6">
						위 코드처럼 비동기 컴포넌트를 사용하여 데이터를 쉽게 가져올 수 있습니다. 이제 클라이언트 상태 관리의 부담이 훨씬 줄어들겠죠?
					</p>
				</div>

				{/* User Profile Card */}
				<div className="mt-16 flex items-center gap-6 pt-8 border-t border-gray-200">
					<div className="w-20 h-20 rounded-full bg-[#12b886] text-white flex justify-center items-center text-2xl font-bold shrink-0">
						민혁
					</div>
					<div>
						<div className="text-xl font-bold mb-1">민혁 (Minhyeok)</div>
						<div className="text-gray-500">프론트엔드 개발자입니다. 깔끔한 UI와 UX를 중요하게 생각합니다.</div>
					</div>
				</div>
			</main>
			<Toc />
		</div>
	);
}