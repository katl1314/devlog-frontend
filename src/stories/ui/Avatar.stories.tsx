import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import UserAvatar from '@/components/user-avatar';

const meta: Meta = {
  title: 'UI/Avatar',
  parameters: { layout: 'centered' },
};
export default meta;

export const WithImage: StoryObj = {
  name: '이미지 있음',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar className="size-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar className="size-10">
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar className="size-14">
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar className="size-20">
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Fallback: StoryObj = {
  name: '이미지 없음 (Fallback)',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar className="size-8">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar className="size-10">
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar className="size-14">
        <AvatarFallback>EF</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const UserAvatarStory: StoryObj = {
  name: 'UserAvatar (커스텀)',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <UserAvatar src={null} userId="devuser" className="size-8" />
      <UserAvatar src={null} userId="alice" className="size-10" />
      <UserAvatar src="https://github.com/shadcn.png" userId="shadcn" className="size-14" />
      <UserAvatar src={null} userId="minchoi" className="size-20" />
    </div>
  ),
};

export const Sizes: StoryObj = {
  name: '크기 가이드',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { cls: 'size-6',  label: 'size-6 (24px) — 포스트 카드 작성자' },
        { cls: 'size-8',  label: 'size-8 (32px) — 기본 (댓글, 목록)' },
        { cls: 'size-10', label: 'size-10 (40px) — 헤더 유저 메뉴' },
        { cls: 'size-14', label: 'size-14 (56px) — 프로필 소형' },
        { cls: 'size-20', label: 'size-20 (80px) — 프로필 중형' },
      ].map(({ cls, label }) => (
        <div key={cls} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <UserAvatar src={null} userId="user" className={cls} />
          <span style={{ fontSize: 13, color: 'var(--foreground)' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};
