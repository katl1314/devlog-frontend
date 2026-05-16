import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PostCard from '@/components/post/post-card';

const meta: Meta = {
  title: 'Components/PostCardList',
  parameters: { layout: 'fullscreen' },
};
export default meta;

// PostCardList와 PostList는 서버 의존성(TanStack Query, NextAuth)이 있으므로
// PostCard를 직접 나열하여 목록 UI를 표현합니다.

const baseUser = {
  user_id: 'devuser',
  avatar_url: null,
  blog: { name: 'Dev Blog', description: '', url_slug: '/devuser' },
};

const mockPosts = [
  {
    path: '/devuser/post-1',
    title: 'Next.js 15 App Router 완전 정복',
    created_at: '2026-05-16T00:00:00Z',
    thumbnail: null,
    summary: 'Next.js 15의 App Router와 새로운 기능들을 깊이 있게 살펴봅니다.',
    comments: Array(3).fill({}),
    likes: Array(24).fill({}),
    visibility: true,
    user: baseUser,
  },
  {
    path: '/devuser/post-2',
    title: 'TypeScript 5.x 신기능 총정리',
    created_at: '2026-05-10T00:00:00Z',
    thumbnail: 'https://picsum.photos/seed/ts5/400/300',
    summary: 'TypeScript 5 버전의 새로운 기능과 개선 사항을 정리했습니다.',
    comments: Array(7).fill({}),
    likes: Array(58).fill({}),
    visibility: true,
    user: baseUser,
  },
  {
    path: '/devuser/post-3',
    title: 'TailwindCSS v4 마이그레이션 가이드',
    created_at: '2026-04-20T00:00:00Z',
    thumbnail: null,
    summary: 'TailwindCSS v3에서 v4로 마이그레이션하는 과정을 단계별로 안내합니다.',
    comments: [],
    likes: Array(11).fill({}),
    visibility: true,
    user: baseUser,
  },
];

export const WithPosts: StoryObj = {
  name: '포스트 목록',
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto', border: '1px solid var(--border)', borderRadius: 8 }}>
      {mockPosts.map((post, i) => (
        <PostCard key={i} {...post} />
      ))}
    </div>
  ),
};

export const EmptyState: StoryObj = {
  name: '빈 상태',
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <div className="flex flex-col items-center justify-center w-full py-24 text-center">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'var(--muted)',
            marginBottom: 20,
          }}
        >
          <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--foreground)' }}>
          아직 작성된 포스트가 없습니다
        </p>
        <p style={{ marginTop: 6, fontSize: 14, color: 'var(--muted-foreground)' }}>
          첫 포스트를 작성해 생각을 공유해보세요
        </p>
      </div>
    </div>
  ),
};
