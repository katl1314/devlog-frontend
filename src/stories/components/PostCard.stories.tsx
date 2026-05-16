import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PostCard from '@/components/post/post-card';

const meta: Meta = {
  title: 'Components/PostCard',
  parameters: { layout: 'fullscreen' },
};
export default meta;

const mockPost = {
  path: '/testuser/test-post',
  title: '테스트 포스트 제목입니다',
  created_at: '2026-05-16T00:00:00Z',
  thumbnail: null,
  summary: '포스트 요약 내용입니다. 이 포스트는 Next.js와 TypeScript를 사용한 개발 경험을 공유합니다.',
  comments: [],
  likes: [],
  visibility: true,
  user: {
    user_id: 'testuser',
    avatar_url: null,
    blog: { name: 'Test Blog', description: '', url_slug: '/testuser' },
  },
};

export const Default: StoryObj = {
  name: '기본',
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <PostCard {...mockPost} />
    </div>
  ),
};

export const WithThumbnail: StoryObj = {
  name: '썸네일 포함',
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <PostCard
        {...mockPost}
        title="썸네일이 있는 포스트"
        thumbnail="https://picsum.photos/seed/devlog/400/300"
      />
    </div>
  ),
};

export const WithStats: StoryObj = {
  name: '좋아요·댓글 포함',
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <PostCard
        {...mockPost}
        title="좋아요와 댓글이 많은 포스트"
        likes={Array(42).fill({})}
        comments={Array(17).fill({})}
      />
    </div>
  ),
};

export const Private: StoryObj = {
  name: '비공개 포스트',
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <PostCard
        {...mockPost}
        title="비공개 포스트입니다"
        visibility={false}
      />
    </div>
  ),
};

export const LongTitle: StoryObj = {
  name: '긴 제목',
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <PostCard
        {...mockPost}
        title="Next.js 15와 React 19를 활용한 풀스택 개발: App Router, Server Actions, TanStack Query를 모두 조합한 실전 아키텍처 설계기"
        summary="매우 긴 요약 내용입니다. 이 포스트에서는 Next.js 15의 App Router와 React 19의 새로운 기능들을 활용하여 실전 프로젝트를 구축하는 방법에 대해 상세히 설명합니다."
      />
    </div>
  ),
};

export const MultipleCards: StoryObj = {
  name: '목록 형태',
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto', border: '1px solid var(--border)', borderRadius: 8 }}>
      <PostCard {...mockPost} title="첫 번째 포스트" likes={Array(5).fill({})} comments={Array(2).fill({})} />
      <PostCard {...mockPost} title="두 번째 포스트: 썸네일 포함" thumbnail="https://picsum.photos/seed/abc/400/300" likes={Array(12).fill({})} />
      <PostCard {...mockPost} title="세 번째 포스트: 비공개" visibility={false} />
    </div>
  ),
};
