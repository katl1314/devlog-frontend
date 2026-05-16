import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ThemeToggle from '@/components/theme/theme-toggle';

const meta: Meta = {
  title: 'Components/ThemeToggle',
  parameters: { layout: 'centered' },
};
export default meta;

export const Default: StoryObj = {
  name: '기본 (Zustand 상태 사용)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <ThemeToggle />
      <p style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
        클릭 시 다크/라이트 모드 전환
      </p>
    </div>
  ),
};

export const InContext: StoryObj = {
  name: '헤더 컨텍스트',
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        height: 56,
        borderBottom: '1px solid var(--border)',
        width: 400,
        background: 'var(--background)',
      }}
    >
      <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--foreground)' }}>Dev.log</span>
      <ThemeToggle />
    </div>
  ),
};
