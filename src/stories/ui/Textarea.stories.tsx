import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Textarea } from '@/components/ui/textarea';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
  },
  args: {
    placeholder: '내용을 입력하세요',
    disabled: false,
  },
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 400 }}>
      <Textarea {...args} />
    </div>
  ),
};

export const AllStates: Story = {
  name: '전체 상태',
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 4 }}>기본</p>
        <Textarea placeholder="내용을 입력하세요" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 4 }}>입력된 상태</p>
        <Textarea defaultValue="이미 입력된 내용입니다. 여러 줄에 걸쳐 작성할 수도 있습니다." />
      </div>
      <div>
        <p style={{ fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 4 }}>비활성</p>
        <Textarea placeholder="비활성 상태" disabled />
      </div>
    </div>
  ),
};
