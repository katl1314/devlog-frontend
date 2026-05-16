import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LogoIcon from '@/components/logo-icon';

const meta: Meta<typeof LogoIcon> = {
  title: 'Components/LogoIcon',
  component: LogoIcon,
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

type Story = StoryObj<typeof LogoIcon>;

export const Default: Story = {};

export const AllVariants: Story = {
  name: '전체 Variant',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <LogoIcon variant="dark" size={40} />
        <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>dark</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          background: '#09090b',
          padding: '16px',
          borderRadius: 12,
        }}
      >
        <LogoIcon variant="white" size={40} />
        <span style={{ fontSize: 11, color: '#666' }}>white</span>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  name: '크기 가이드',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
      {[20, 24, 28, 32, 40, 48, 56].map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <LogoIcon size={size} />
          <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};
