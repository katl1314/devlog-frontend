import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import NavTabs from '@/components/ui/nav-tabs';

const meta: Meta = {
  title: 'UI/NavTabs',
  parameters: { layout: 'centered' },
};
export default meta;

export const LineType: StoryObj = {
  name: 'Line 타입 (pathname 기반 활성)',
  render: () => (
    <div style={{ width: 400 }}>
      <NavTabs type="line">
        <NavTabs.List>
          <NavTabs.Item href="/new" active={true}>최신</NavTabs.Item>
          <NavTabs.Item href="/trends" active={false}>트렌드</NavTabs.Item>
        </NavTabs.List>
      </NavTabs>
    </div>
  ),
};

export const SegmentType: StoryObj = {
  name: 'Segment 타입',
  render: () => (
    <div style={{ width: 400 }}>
      <NavTabs type="segment">
        <NavTabs.List>
          <NavTabs.Item href="/user/testuser" active={true}>포스트</NavTabs.Item>
          <NavTabs.Item href="/user/testuser?tab=series" active={false}>시리즈</NavTabs.Item>
          <NavTabs.Item href="/user/testuser?tab=about" active={false}>소개</NavTabs.Item>
        </NavTabs.List>
      </NavTabs>
    </div>
  ),
};
