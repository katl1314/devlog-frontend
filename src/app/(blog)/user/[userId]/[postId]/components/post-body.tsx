import UserProfile from '@/app/(blog)/user/components/user-profile';
import Thumbnail from '@/app/(blog)/user/components/thumbnail';
import ReactMarkdown from 'react-markdown';
import SideBar from './sidebar';
import Toc from './toc';

export default function PostBody(post: any) {

	const dummyMarkdown = `
# Next.js 15: 완벽 가이드 (H1)

안녕하세요. **Devs.Log** 팀입니다. 오늘은 *Next.js 15*의 새로운 기능과 ~~구버전~~ 마이그레이션 전략에 대해 알아봅니다.

## 1. 주요 변경 사항 (H2)

Next.js 15는 성능 최적화에 중점을 두었습니다. 특히 **Server Components**의 안정성이 대폭 강화되었습니다.

> **참고:** 이 문서는 공식 문서를 기반으로 작성되었습니다.
> > 중첩된 인용구 스타일도 확인해보세요.
> > * 리스트도 인용구 안에 들어갈 수 있습니다.
> > > 1

---

### 2. 라우터 비교 (H3)

기존 Pages Router와 새로운 App Router의 차이점을 표로 정리했습니다.

| 특징 | Pages Router | App Router | 비고 |
| :--- | :---: | :---: | ---: |
| **라우팅** | 파일 기반 | 폴더 기반 | \`page.tsx\` 사용 |
| **렌더링** | CSR/SSR 혼용 | **Server Component** 기본 | 번들 사이즈 감소 |
| **복잡도** | 낮음 | 높음 | 러닝 커브 존재 |
| **데이터 페칭** | \`getServerSideProps\` | \`async/await\` | 훨씬 간결함 |

### 3. 마이그레이션 체크리스트 (Task List)

이번 프로젝트에 적용할 항목들입니다.

- [x] Node.js v18.17.0 이상 설치
- [x] \`next.config.js\` 수정
- [ ] 기존 \`getStaticProps\` 제거
- [ ] **TanStack Query** v5로 업그레이드

### 5. 중첩 리스트 테스트

리스트의 들여쓰기(Indentation)가 제대로 먹히는지 확인하세요.

1. **Frontend**
   * React
     * Hooks (\`useEffect\`, \`useState\`)
     * Context API
   * Next.js
     1. App Router
     2. Server Actions
2. **Backend**
   * NestJS
   * TypeORM
3. **DevOps**
   * Docker
   * Vercel

---

### 6. 코드 예시 (Syntax Highlighting)

서버 컴포넌트에서 비동기 데이터를 가져오는 패턴입니다.

\`\`\`tsx
const a = 10;

import { Suspense } from 'react';

interface Post {
	id: number;
	title: string;
}

export default async function Page() {
	const data: Post[] = await getData();
	
	return (
		<section className=\\"p-4\\">
			
		</section>
	)
}

\`\`\`

[공식 문서 바로가기](https://nextjs.org) (링크 스타일 확인)
`;
	return (
		<div className="flex relative ">
			<SideBar />
			<main id="content__entry_point" className="flex-1 w-full min-w-0 pb-8">
				<Thumbnail thumbnail={post.thumbnail} />
				<MarkdownView content={dummyMarkdown} />
				<UserProfile {...post.user} />
			</main>
			<Toc />
		</div>
	);
}

const MarkdownView = ({ content }: { content: string }) => {
	return (
		<ReactMarkdown components={
			{
				// h1 태그를 만났을 때 적용할 스타일
				h1: ({node, ...props}) => (
					<h1 className="text-4xl font-bold mt-10 mb-4 text-gray-900" {...props} />
				),
				// h2, h3 등도 동일하게 설정
				h2: ({node, ...props}) => (
					<h3 className="text-3xl font-bold mt-8 mb-4 text-gray-900" {...props} />
				),
				// h2, h3 등도 동일하게 설정
				h3: ({node, ...props}) => (
					<h3 className="text-2xl font-bold mt-6 mb-4 text-gray-900" {...props} />
				),
				// p 태그 스타일
				p: ({node, ...props}) => (
					<p className="mb-6 leading-relaxed text-gray-800" {...props} />
				),
				// blockquote 스타일 (아까 작성하신 녹색 테두리 스타일)
				blockquote: ({node, ...props}) => (
					<blockquote className="border-l-4 border-[#12b886] bg-gray-50 p-4 my-6 text-gray-600 rounded-r" {...props} />
				),
				// 리스트 스타일
				ul: ({node, ...props}) => (
					<ul className="list-disc pl-6 mb-6 space-y-2" {...props} />
				),
				pre: ({node, ...props}) => (
					<pre className="px-3 py-2 text-[0.95rem] font-[monospace] bg-[#212529] text-[#f8f9fa] rounded-[8px] overflow-x-auto mb-[1.5rem] " {...props}/>
				),
				a: ({node, ...props}) => (
					<a className="text-[#12b886] font-medium hover:text-[#0ca678] hover:underline transition-colors duration-200" {...props} />
				)
			}
		}>
			{content}
		</ReactMarkdown>
	)
}