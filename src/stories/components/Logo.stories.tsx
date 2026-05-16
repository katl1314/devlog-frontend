import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Logo from '@/components/logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'number' },
    variant: {
      control: 'select',
      options: ['dark', 'white'],
    },
  },
  args: {
    size: 32,
    variant: 'dark',
  },
};
export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {};

export const AllVariants: Story = {
  name: '전체 Variant',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Logo variant="dark" size={32} />
        <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>dark (기본)</span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: '#18181b',
          padding: '12px 16px',
          borderRadius: 8,
        }}
      >
        <Logo variant="white" size={32} />
        <span style={{ fontSize: 12, color: '#aaa' }}>white (다크 배경용)</span>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  name: '크기 가이드',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
      {[20, 24, 28, 32, 40, 48].map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo size={size} />
          <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>size={size}</span>
        </div>
      ))}
    </div>
  ),
};
