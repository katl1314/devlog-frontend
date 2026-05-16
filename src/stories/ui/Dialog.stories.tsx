import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const meta: Meta = {
  title: 'UI/Dialog',
  parameters: { layout: 'centered' },
};
export default meta;

export const Default: StoryObj = {
  name: '기본',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>다이얼로그 제목</DialogTitle>
          <DialogDescription>다이얼로그 설명 내용입니다.</DialogDescription>
        </DialogHeader>
        <p style={{ fontSize: 14, color: 'var(--foreground)' }}>다이얼로그 본문 영역입니다.</p>
        <DialogFooter>
          <Button variant="outline">취소</Button>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Destructive: StoryObj = {
  name: '위험 액션 (삭제 확인)',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">포스트 삭제</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>포스트를 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>
            삭제된 포스트는 복구할 수 없습니다. 신중하게 결정해 주세요.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">취소</Button>
          <Button variant="destructive">삭제</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: StoryObj = {
  name: '폼 포함',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">프로필 수정</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
          <DialogDescription>변경할 정보를 입력하세요.</DialogDescription>
        </DialogHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 4 }}>이름</label>
            <input
              type="text"
              defaultValue="홍길동"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid var(--border)',
                borderRadius: 6,
                fontSize: 14,
                background: 'transparent',
                color: 'var(--foreground)',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 4 }}>소개</label>
            <textarea
              rows={3}
              defaultValue="개발자입니다."
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid var(--border)',
                borderRadius: 6,
                fontSize: 14,
                background: 'transparent',
                color: 'var(--foreground)',
                resize: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">취소</Button>
          <Button>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
