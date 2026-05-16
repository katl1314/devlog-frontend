import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Label } from '@/components/ui/label';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  parameters: { layout: 'centered' },
  args: {
    children: '레이블 텍스트',
  },
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const WithInput: Story = {
  name: '인풋과 함께',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label htmlFor="email">이메일</Label>
        <input
          id="email"
          type="email"
          placeholder="example@email.com"
          style={{
            padding: '8px 12px',
            border: '1px solid var(--border)',
            borderRadius: 6,
            fontSize: 14,
            background: 'transparent',
            color: 'var(--foreground)',
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label htmlFor="password">비밀번호</Label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          style={{
            padding: '8px 12px',
            border: '1px solid var(--border)',
            borderRadius: 6,
            fontSize: 14,
            background: 'transparent',
            color: 'var(--foreground)',
          }}
        />
      </div>
    </div>
  ),
};

export const WithCheckbox: Story = {
  name: '체크박스와 함께',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="checkbox" id="notifications" />
        <Label htmlFor="notifications">알림 받기</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="checkbox" id="email-sub" defaultChecked />
        <Label htmlFor="email-sub">이메일 구독</Label>
      </div>
    </div>
  ),
};
