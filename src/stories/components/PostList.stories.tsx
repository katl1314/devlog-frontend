import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PostCard from '@/components/post/post-card';

const meta: Meta = {
  title: 'Components/PostList',
  parameters: { layout: 'fullscreen' },
};
export default meta;

// PostList는 NextAuth 세션과 TanStack Query에 의존합니다.
// 실제 컴포넌트 대신 동일한 레이아웃의 mock 버전으로 표현합니다.

const baseUser = {
  user_id: 'alice',
  avatar_url: null,
  blog: { name: 'Alice Blog', description: '', url_slug: '/alice' },
};

const mockPosts = [
  {
    path: '/alice/react-server-components',
    title: 'React Server Components 심층 분석',
    created_at: '2026-05-14T00:00:00Z',
    thumbnail: null,
    summary: 'RSC의 동작 원리와 실전 적용 방법을 코드 예시와 함께 살펴봅니다.',
    comments: Array(5).fill({}),
    likes: Array(33).fill({}),
    visibility: true,
    user: baseUser,
  },
  {
    path: '/alice/zustand-v5-guide',
    title: 'Zustand v5 마이그레이션 완전 가이드',
    created_at: '2026-05-08T00:00:00Z',
    thumbnail: 'https://picsum.photos/seed/zustand/400/300',
    summary: 'Zustand v4에서 v5로 업그레이드할 때 주의해야 할 점들을 정리합니다.',
    comments: Array(2).fill({}),
    likes: Array(19).fill({}),
    visibility: true,
    user: baseUser,
  },
];

export const Default: StoryObj = {
  name: '포스트 목록 (mock)',
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto', border: '1px solid var(--border)', borderRadius: 8 }}>
      {mockPosts.map((post, i) => (
        <PostCard key={i} {...post} />
      ))}
    </div>
  ),
};

export const UserSpecific: StoryObj = {
  name: '특정 유저 포스트 목록',
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 14, color: 'var(--muted-foreground)' }}>
          userId: <code>alice</code> 의 포스트
        </p>
      </div>
      <div style={{ border: '1px solid var(--border)', borderRadius: '0 0 8px 8px' }}>
        {mockPosts.map((post, i) => (
          <PostCard key={i} {...post} />
        ))}
      </div>
    </div>
  ),
};
