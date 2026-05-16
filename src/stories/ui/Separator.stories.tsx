import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Separator } from '@/components/ui/separator';

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  name: '수평 (기본)',
  render: () => (
    <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ color: 'var(--foreground)', fontSize: 14 }}>위 섹션</p>
      <Separator />
      <p style={{ color: 'var(--foreground)', fontSize: 14 }}>아래 섹션</p>
    </div>
  ),
};

export const Vertical: Story = {
  name: '수직',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 40 }}>
      <span style={{ color: 'var(--foreground)', fontSize: 14 }}>항목 1</span>
      <Separator orientation="vertical" />
      <span style={{ color: 'var(--foreground)', fontSize: 14 }}>항목 2</span>
      <Separator orientation="vertical" />
      <span style={{ color: 'var(--foreground)', fontSize: 14 }}>항목 3</span>
    </div>
  ),
};
