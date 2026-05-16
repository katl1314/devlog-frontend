import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TagViewer } from '@/components/tag/tag-viewer';

const meta: Meta<typeof TagViewer> = {
  title: 'Components/TagViewer',
  component: TagViewer,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof TagViewer>;

export const Default: Story = {
  args: {
    tags: [
      { id: '1', name: 'Next.js' },
      { id: '2', name: 'TypeScript' },
      { id: '3', name: 'React' },
    ],
  },
};

export const ManyTags: Story = {
  name: '태그 많음',
  args: {
    tags: [
      { id: '1', name: 'Next.js' },
      { id: '2', name: 'TypeScript' },
      { id: '3', name: 'React' },
      { id: '4', name: 'TailwindCSS' },
      { id: '5', name: 'Zustand' },
    ],
  },
};

export const Empty: Story = {
  name: '빈 태그 목록',
  args: {
    tags: [],
  },
};

export const SingleTag: Story = {
  name: '태그 1개',
  args: {
    tags: [{ id: '1', name: 'React' }],
  },
};
