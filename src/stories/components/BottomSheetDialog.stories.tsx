import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BottomSheetDialog from '@/components/bottom-sheet-dialog';
import { Button } from '@/components/ui/button';
import { FiEdit, FiTrash2, FiShare2, FiFlag } from 'react-icons/fi';

const meta: Meta = {
  title: 'Components/BottomSheetDialog',
  parameters: { layout: 'centered' },
};
export default meta;

export const Default: StoryObj = {
  name: '기본 (click 모드)',
  render: () => (
    <BottomSheetDialog>
      <BottomSheetDialog.Trigger>
        <Button variant="outline">메뉴 열기</Button>
      </BottomSheetDialog.Trigger>
      <BottomSheetDialog.BackDrop />
      <BottomSheetDialog.Items
        onItemClick={(id) => alert(`선택: ${id}`)}
      >
        <BottomSheetDialog.Item id="edit" icon={<FiEdit size={18} />}>
          수정하기
        </BottomSheetDialog.Item>
        <BottomSheetDialog.Item id="share" icon={<FiShare2 size={18} />}>
          공유하기
        </BottomSheetDialog.Item>
        <BottomSheetDialog.Separator />
        <BottomSheetDialog.Item id="delete" icon={<FiTrash2 size={18} />} variant="destructive">
          삭제하기
        </BottomSheetDialog.Item>
      </BottomSheetDialog.Items>
    </BottomSheetDialog>
  ),
};

export const PostActions: StoryObj = {
  name: '포스트 액션 메뉴',
  render: () => (
    <BottomSheetDialog>
      <BottomSheetDialog.Trigger>
        <Button variant="ghost" size="sm">더보기 ···</Button>
      </BottomSheetDialog.Trigger>
      <BottomSheetDialog.BackDrop />
      <BottomSheetDialog.Items
        onItemClick={(id) => alert(`선택: ${id}`)}
      >
        <BottomSheetDialog.Caption className="px-4 py-3">
          <p style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>
            포스트 제목 미리보기
          </p>
        </BottomSheetDialog.Caption>
        <BottomSheetDialog.Separator />
        <BottomSheetDialog.Item id="edit" icon={<FiEdit size={18} />}>
          포스트 수정
        </BottomSheetDialog.Item>
        <BottomSheetDialog.Item id="share" icon={<FiShare2 size={18} />}>
          링크 공유
        </BottomSheetDialog.Item>
        <BottomSheetDialog.Item id="report" icon={<FiFlag size={18} />}>
          신고하기
        </BottomSheetDialog.Item>
        <BottomSheetDialog.Separator />
        <BottomSheetDialog.Item id="delete" icon={<FiTrash2 size={18} />} variant="destructive">
          포스트 삭제
        </BottomSheetDialog.Item>
      </BottomSheetDialog.Items>
    </BottomSheetDialog>
  ),
};

export const LongPressMode: StoryObj = {
  name: 'longPress 모드',
  render: () => (
    <BottomSheetDialog>
      <BottomSheetDialog.Trigger mode="longPress" onShortPress={() => alert('단순 클릭!')}>
        <Button>길게 눌러서 메뉴 열기</Button>
      </BottomSheetDialog.Trigger>
      <BottomSheetDialog.BackDrop />
      <BottomSheetDialog.Items onItemClick={(id) => alert(`선택: ${id}`)}>
        <BottomSheetDialog.Item id="option1">옵션 1</BottomSheetDialog.Item>
        <BottomSheetDialog.Item id="option2">옵션 2</BottomSheetDialog.Item>
      </BottomSheetDialog.Items>
    </BottomSheetDialog>
  ),
};
