import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TagEditor from '@/components/tag/tag-editor';
import { useState } from 'react';

const meta: Meta = {
  title: 'Components/TagEditor',
  parameters: { layout: 'centered' },
};
export default meta;

export const Default: StoryObj = {
  name: '기본 (빈 상태)',
  render: () => {
    const [tags, setTags] = useState<string[]>([]);
    return (
      <div style={{ width: 500 }}>
        <TagEditor tags={tags} onChange={setTags} />
        <p style={{ marginTop: 12, fontSize: 12, color: 'var(--muted-foreground)' }}>
          현재 태그: [{tags.join(', ')}]
        </p>
      </div>
    );
  },
};

export const WithTags: StoryObj = {
  name: '태그 있는 상태',
  render: () => {
    const [tags, setTags] = useState<string[]>(['Next.js', 'TypeScript', 'React']);
    return (
      <div style={{ width: 500 }}>
        <TagEditor tags={tags} onChange={setTags} />
        <p style={{ marginTop: 12, fontSize: 12, color: 'var(--muted-foreground)' }}>
          Enter 또는 , 키로 태그 추가 · Backspace로 마지막 태그 삭제
        </p>
      </div>
    );
  },
};

export const MaxTags: StoryObj = {
  name: '최대 태그 상태 (5개)',
  render: () => {
    const [tags, setTags] = useState<string[]>(['Next.js', 'TypeScript', 'React', 'TailwindCSS', 'Zustand']);
    return (
      <div style={{ width: 500 }}>
        <TagEditor tags={tags} onChange={setTags} max={5} />
        <p style={{ marginTop: 12, fontSize: 12, color: 'var(--muted-foreground)' }}>
          태그가 최대(5개)에 도달했습니다. 추가 시 토스트 에러가 표시됩니다.
        </p>
      </div>
    );
  },
};
