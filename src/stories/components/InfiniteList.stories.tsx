import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PostCard from '@/components/post/post-card';

const meta: Meta = {
  title: 'Components/InfiniteList',
  parameters: { layout: 'fullscreen' },
};
export default meta;

// InfiniteList는 TanStack Query useSuspenseInfiniteQuery와 Intersection Observer에
// 강하게 결합되어 있어 Storybook에서 직접 렌더링이 어렵습니다.
// 동일한 레이아웃을 mock 데이터로 시각화합니다.

const baseUser = {
  user_id: 'devuser',
  avatar_url: null,
  blog: { name: 'Dev Blog', description: '', url_slug: '/devuser' },
};

const mockItems = Array.from({ length: 8 }, (_, i) => ({
  path: `/devuser/post-${i + 1}`,
  title: `포스트 제목 ${i + 1}: Next.js와 TypeScript로 만드는 블로그`,
  created_at: new Date(Date.now() - i * 86400000 * 3).toISOString(),
  thumbnail: i % 3 === 0 ? `https://picsum.photos/seed/post${i}/400/300` : null,
  summary: `${i + 1}번째 포스트의 요약 내용입니다. 개발 관련 인사이트를 공유합니다.`,
  comments: Array(Math.floor(Math.random() * 10)).fill({}),
  likes: Array(Math.floor(Math.random() * 50)).fill({}),
  visibility: i !== 2,
  user: baseUser,
}));

export const Default: StoryObj = {
  name: '무한 스크롤 목록 (mock)',
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto', border: '1px solid var(--border)', borderRadius: 8 }}>
      {mockItems.map((post, i) => (
        <PostCard key={i} {...post} />
      ))}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
          color: 'var(--muted-foreground)',
          fontSize: 13,
        }}
      >
        스크롤 하단 도달 시 추가 로드 (Intersection Observer)
      </div>
    </div>
  ),
};

export const EmptyState: StoryObj = {
  name: '빈 목록 상태',
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '96px 0',
          textAlign: 'center',
        }}
      >
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
          <svg
            width={28}
            height={28}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            style={{ color: 'var(--muted-foreground)' }}
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>
          아직 작성된 포스트가 없습니다
        </p>
        <p style={{ marginTop: 6, fontSize: 14, color: 'var(--muted-foreground)', margin: '6px 0 0' }}>
          첫 포스트를 작성해 생각을 공유해보세요
        </p>
      </div>
    </div>
  ),
};
