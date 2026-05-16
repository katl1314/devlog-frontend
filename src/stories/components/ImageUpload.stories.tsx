import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ImageUpload from '@/components/image-upload';
import { FiUploadCloud } from 'react-icons/fi';

const meta: Meta = {
  title: 'Components/ImageUpload',
  parameters: { layout: 'centered' },
};
export default meta;

export const Default: StoryObj = {
  name: '기본 업로드',
  render: () => (
    <ImageUpload onFileChange={(file) => console.log('파일 선택:', file?.name)}>
      <div style={{ width: 200, height: 200, position: 'relative' }}>
        <ImageUpload.Upload
          className="w-full h-full border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/30 transition-colors"
        >
          <FiUploadCloud size={32} style={{ color: 'var(--muted-foreground)' }} />
          <span style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>클릭하여 이미지 선택</span>
        </ImageUpload.Upload>
        <ImageUpload.Preview className="w-full h-full rounded-xl overflow-hidden" />
      </div>
    </ImageUpload>
  ),
};

export const WithInitialImage: StoryObj = {
  name: '초기 이미지 있음',
  render: () => (
    <ImageUpload
      initialUrl="https://picsum.photos/seed/avatar/200/200"
      onFileChange={(file) => console.log('파일 변경:', file?.name)}
    >
      <div style={{ width: 200, height: 200, position: 'relative' }}>
        <ImageUpload.Upload
          className="w-full h-full border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer"
        />
        <ImageUpload.Preview className="w-full h-full rounded-xl overflow-hidden" />
      </div>
    </ImageUpload>
  ),
};

export const AvatarStyle: StoryObj = {
  name: '아바타 스타일',
  render: () => (
    <ImageUpload onFileChange={(file) => console.log('아바타 변경:', file?.name)}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', position: 'relative', overflow: 'hidden' }}>
        <ImageUpload.Upload className="w-full h-full bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/70 transition-colors">
          <FiUploadCloud size={24} style={{ color: 'var(--muted-foreground)' }} />
        </ImageUpload.Upload>
        <ImageUpload.Preview allowReupload />
      </div>
    </ImageUpload>
  ),
};

export const ThumbnailStyle: StoryObj = {
  name: '썸네일 스타일 (재업로드 허용)',
  render: () => (
    <ImageUpload onFileChange={(file) => console.log('썸네일 변경:', file?.name)}>
      <div style={{ width: 320, height: 180, borderRadius: 12, position: 'relative', overflow: 'hidden', border: '2px dashed var(--border)' }}>
        <ImageUpload.Upload className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/30 transition-colors">
          <FiUploadCloud size={28} style={{ color: 'var(--muted-foreground)' }} />
          <span style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>썸네일 이미지 (16:9 권장)</span>
        </ImageUpload.Upload>
        <ImageUpload.Preview allowReupload className="w-full h-full" />
      </div>
    </ImageUpload>
  ),
};
