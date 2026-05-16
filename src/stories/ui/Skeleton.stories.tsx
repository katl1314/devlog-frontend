import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Skeleton } from '@/components/ui/skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    style: { width: 200, height: 20 },
  },
};

export const PostCardSkeleton: Story = {
  name: '포스트 카드 스켈레톤',
  render: () => (
    <div style={{ width: 400, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Skeleton style={{ width: 24, height: 24, borderRadius: '50%' }} />
        <Skeleton style={{ width: 80, height: 14 }} />
        <Skeleton style={{ width: 60, height: 14 }} />
      </div>
      <Skeleton style={{ width: '90%', height: 20 }} />
      <Skeleton style={{ width: '70%', height: 20 }} />
      <Skeleton style={{ width: '100%', height: 14 }} />
      <Skeleton style={{ width: '85%', height: 14 }} />
    </div>
  ),
};

export const Shapes: Story = {
  name: '다양한 형태',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Skeleton style={{ width: 200, height: 16 }} />
      <Skeleton style={{ width: 200, height: 16, borderRadius: '9999px' }} />
      <Skeleton style={{ width: 80, height: 80, borderRadius: '50%' }} />
      <Skeleton style={{ width: 200, height: 120 }} />
    </div>
  ),
};
