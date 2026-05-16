import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Tabs from '@/components/ui/tabs';

const meta: Meta = {
  title: 'UI/Tabs',
  parameters: { layout: 'centered' },
};
export default meta;

export const LineType: StoryObj = {
  name: 'Line 타입',
  render: () => (
    <div style={{ width: 400 }}>
      <Tabs defaultValue="posts" type="line">
        <Tabs.List>
          <Tabs.Item value="posts">포스트</Tabs.Item>
          <Tabs.Item value="series">시리즈</Tabs.Item>
          <Tabs.Item value="about">소개</Tabs.Item>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="posts">
            <div style={{ padding: '16px 0', color: 'var(--foreground)' }}>포스트 목록 영역</div>
          </Tabs.Panel>
          <Tabs.Panel value="series">
            <div style={{ padding: '16px 0', color: 'var(--foreground)' }}>시리즈 목록 영역</div>
          </Tabs.Panel>
          <Tabs.Panel value="about">
            <div style={{ padding: '16px 0', color: 'var(--foreground)' }}>소개 영역</div>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </div>
  ),
};

export const SegmentType: StoryObj = {
  name: 'Segment 타입',
  render: () => (
    <div style={{ width: 400 }}>
      <Tabs defaultValue="new" type="segment">
        <Tabs.List>
          <Tabs.Item value="new">최신</Tabs.Item>
          <Tabs.Item value="trends">트렌드</Tabs.Item>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="new">
            <div style={{ padding: '16px 0', color: 'var(--foreground)' }}>최신 포스트 영역</div>
          </Tabs.Panel>
          <Tabs.Panel value="trends">
            <div style={{ padding: '16px 0', color: 'var(--foreground)' }}>트렌드 포스트 영역</div>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </div>
  ),
};
