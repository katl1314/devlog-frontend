import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PostMeta from '@/components/post/post-meta';

const meta: Meta<typeof PostMeta> = {
  title: 'Components/PostMeta',
  component: PostMeta,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof PostMeta>;

export const Default: Story = {
  args: {
    date: new Date().toISOString(),
  },
};

export const OldDate: Story = {
  name: '오래된 날짜 (날짜 형식 표시)',
  args: {
    date: '2025-01-15T09:00:00Z',
  },
};

export const WithStyle: Story = {
  name: '스타일 적용',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <PostMeta date={new Date().toISOString()} className="text-sm text-muted-foreground" />
      <PostMeta date="2025-06-01T00:00:00Z" className="text-xs" />
      <PostMeta date="2024-12-25T00:00:00Z" className="text-base font-semibold" />
    </div>
  ),
};
