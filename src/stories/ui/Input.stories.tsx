import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search'],
    },
  },
  args: {
    placeholder: '입력해주세요',
    type: 'text',
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithLabel: Story = {
  name: '레이블 포함',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 320 }}>
      <Label htmlFor="email">이메일</Label>
      <Input id="email" type="email" placeholder="example@email.com" />
    </div>
  ),
};

export const AllStates: Story = {
  name: '전체 상태',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Label>기본</Label>
        <Input placeholder="기본 인풋" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Label>비활성</Label>
        <Input placeholder="비활성 인풋" disabled />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Label>에러</Label>
        <Input placeholder="에러 인풋" aria-invalid="true" />
        <span style={{ fontSize: 12, color: 'var(--destructive)' }}>
          올바른 값을 입력해주세요.
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Label>패스워드</Label>
        <Input type="password" placeholder="비밀번호" />
      </div>
    </div>
  ),
};
