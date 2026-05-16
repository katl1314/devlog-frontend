import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Modal from '@/components/modal';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const meta: Meta = {
  title: 'Components/Modal',
  parameters: { layout: 'centered' },
};
export default meta;

export const Default: StoryObj = {
  name: '기본 모달',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>모달 열기</Button>
        <Modal open={open} onAfterClose={() => setOpen(false)}>
          <div style={{ padding: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#111' }}>
              모달 제목
            </h2>
            <p style={{ fontSize: 14, color: '#555', marginBottom: 24 }}>
              모달 내용입니다. 배경 클릭 또는 ESC로 닫을 수 있습니다.
            </p>
            <Button onClick={() => setOpen(false)}>닫기</Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithoutCloseButton: StoryObj = {
  name: '닫기 버튼 없음',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>모달 열기 (닫기 버튼 없음)</Button>
        <Modal open={open} onAfterClose={() => setOpen(false)} showCloseButton={false}>
          <div style={{ padding: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#111' }}>
              닫기 버튼 없는 모달
            </h2>
            <p style={{ fontSize: 14, color: '#555', marginBottom: 24 }}>
              배경 클릭 또는 ESC 키로 닫을 수 있습니다.
            </p>
            <Button variant="outline" onClick={() => setOpen(false)}>직접 닫기</Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithCustomContent: StoryObj = {
  name: '커스텀 콘텐츠',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>이미지 미리보기</Button>
        <Modal open={open} onAfterClose={() => setOpen(false)} className="max-w-sm">
          <div>
            <img
              src="https://picsum.photos/seed/modal/600/400"
              alt="preview"
              style={{ width: '100%', display: 'block', borderRadius: '16px 16px 0 0' }}
            />
            <div style={{ padding: '16px 24px 24px' }}>
              <p style={{ fontSize: 14, color: '#555' }}>이미지 설명 텍스트입니다.</p>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};
