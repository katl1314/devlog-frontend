import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';

const meta: Meta = {
  title: 'Components/ConfirmDialog',
  parameters: { layout: 'centered' },
};
export default meta;

export const Default: StoryObj = {
  name: '기본 확인 다이얼로그',
  render: () => (
    <ConfirmDialog
      title="변경사항을 저장하시겠습니까?"
      description="저장하지 않으면 변경사항이 사라집니다."
      onConfirm={() => alert('확인 클릭!')}
    >
      <Button>저장 확인</Button>
    </ConfirmDialog>
  ),
};

export const Destructive: StoryObj = {
  name: '위험 액션 (삭제)',
  render: () => (
    <ConfirmDialog
      title="포스트를 삭제하시겠습니까?"
      description="삭제된 포스트는 복구할 수 없습니다."
      confirmText="삭제"
      cancelText="취소"
      variant="destructive"
      onConfirm={() => alert('삭제 실행!')}
    >
      <Button variant="destructive">포스트 삭제</Button>
    </ConfirmDialog>
  ),
};

export const WithAsyncConfirm: StoryObj = {
  name: '비동기 확인 (로딩 상태)',
  render: () => (
    <ConfirmDialog
      title="회원 탈퇴"
      description="정말로 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다."
      confirmText="탈퇴"
      cancelText="취소"
      variant="destructive"
      onConfirm={() =>
        new Promise<void>(resolve => setTimeout(resolve, 2000))
      }
    >
      <Button variant="outline">회원 탈퇴</Button>
    </ConfirmDialog>
  ),
};

export const NoDescription: StoryObj = {
  name: '설명 없음',
  render: () => (
    <ConfirmDialog
      title="로그아웃 하시겠습니까?"
      onConfirm={() => alert('로그아웃!')}
    >
      <Button variant="ghost">로그아웃</Button>
    </ConfirmDialog>
  ),
};
