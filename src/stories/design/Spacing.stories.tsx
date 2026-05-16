import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const spacingScale = [
  { token: '1',  px: '4px',  desc: '아이콘-텍스트 간격, 최소 간격' },
  { token: '2',  px: '8px',  desc: '인라인 요소 간격' },
  { token: '3',  px: '12px', desc: '작은 컴포넌트 내부 패딩' },
  { token: '4',  px: '16px', desc: '기본 패딩, 카드 내부' },
  { token: '6',  px: '24px', desc: '섹션 내 요소 간격' },
  { token: '8',  px: '32px', desc: '컴포넌트 간 여백' },
  { token: '12', px: '48px', desc: '페이지 섹션 간격' },
  { token: '16', px: '64px', desc: '주요 레이아웃 여백' },
];

const radiusScale = [
  { name: 'rounded-sm', value: '~6px', desc: '배지, 태그' },
  { name: 'rounded-md', value: '~8px', desc: '인풋, 버튼' },
  { name: 'rounded-lg', value: '~10px', desc: '카드, 드롭다운' },
  { name: 'rounded-xl', value: '~14px', desc: '모달, 바텀시트' },
  { name: 'rounded-full', value: '9999px', desc: '아바타, 필 배지' },
];

function SpacingPage() {
  return (
    <div style={{ padding: 32, background: 'var(--background)', minHeight: '100vh' }}>
      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
        Spacing & Radius
      </h1>
      <p className="text-sm" style={{ color: 'var(--muted-foreground)', marginBottom: 40 }}>
        4px 기반 Tailwind 스케일. 임의값(<code>p-[14px]</code>, <code>gap-[10px]</code>) 금지.
      </p>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{
          fontSize: 13, fontWeight: 600, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: 'var(--muted-foreground)',
          marginBottom: 24, paddingBottom: 8, borderBottom: '1px solid var(--border)',
        }}>
          스페이싱 스케일
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {spacingScale.map(({ token, px, desc }) => (
            <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <code style={{ width: 80, flexShrink: 0, fontSize: 12, fontFamily: 'monospace', color: 'var(--foreground)' }}>
                space-{token}
              </code>
              <div style={{
                height: 20,
                width: `${parseInt(px) * 2}px`,
                background: 'var(--primary)',
                borderRadius: 4,
                flexShrink: 0,
              }} />
              <span style={{ fontSize: 12, color: 'var(--muted-foreground)', minWidth: 40 }}>{px}</span>
              <span style={{ fontSize: 13, color: 'var(--foreground)' }}>{desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{
          fontSize: 13, fontWeight: 600, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: 'var(--muted-foreground)',
          marginBottom: 24, paddingBottom: 8, borderBottom: '1px solid var(--border)',
        }}>
          Border Radius
        </h2>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {radiusScale.map(({ name, value, desc }) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div
                className={name}
                style={{
                  width: 72,
                  height: 72,
                  background: 'var(--primary)',
                  opacity: 0.8,
                }}
              />
              <code style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--foreground)' }}>{name}</code>
              <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{value}</span>
              <span style={{ fontSize: 11, color: 'var(--muted-foreground)', textAlign: 'center', maxWidth: 80 }}>{desc}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta: Meta = {
  title: 'Design/Spacing',
  component: SpacingPage,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Scale: StoryObj = { name: '스페이싱 & 반경' };
