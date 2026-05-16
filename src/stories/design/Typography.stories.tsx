import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const scale = [
  { name: 'heading-1', classes: 'text-3xl font-bold',     sample: 'Heading 1 — 페이지 제목' },
  { name: 'heading-2', classes: 'text-2xl font-bold',     sample: 'Heading 2 — 섹션 제목' },
  { name: 'heading-3', classes: 'text-xl font-semibold',  sample: 'Heading 3 — 카드 제목' },
  { name: 'heading-4', classes: 'text-lg font-semibold',  sample: 'Heading 4 — 서브 항목' },
  { name: 'body-lg',   classes: 'text-base font-normal',  sample: 'Body Large — 본문 강조' },
  { name: 'body',      classes: 'text-sm font-normal',    sample: 'Body — 기본 본문 텍스트' },
  { name: 'label',     classes: 'text-sm font-medium',    sample: 'Label — 폼 레이블, UI 레이블' },
  { name: 'caption',   classes: 'text-xs font-normal',    sample: 'Caption — 보조 설명, 날짜, 메타' },
];

const weights = [
  { name: 'Regular 400', cls: 'font-normal' },
  { name: 'Medium 500',  cls: 'font-medium' },
  { name: 'Semibold 600',cls: 'font-semibold' },
  { name: 'Bold 700',    cls: 'font-bold' },
];

function TypographyPage() {
  return (
    <div style={{ padding: 32, background: 'var(--background)', minHeight: '100vh' }}>
      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
        Typography Scale
      </h1>
      <p className="text-sm" style={{ color: 'var(--muted-foreground)', marginBottom: 40 }}>
        임의값(<code>text-[17px]</code> 등) 금지. 아래 스케일 안에서만 선택한다.
      </p>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{
          fontSize: 13, fontWeight: 600, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: 'var(--muted-foreground)',
          marginBottom: 24, paddingBottom: 8, borderBottom: '1px solid var(--border)',
        }}>
          스케일
        </h2>
        {scale.map(({ name, classes, sample }) => (
          <div key={name} style={{
            display: 'flex', alignItems: 'baseline', gap: 24,
            padding: '14px 0', borderBottom: '1px solid var(--border)',
          }}>
            <code style={{
              width: 100, flexShrink: 0, fontSize: 11,
              color: 'var(--muted-foreground)', fontFamily: 'monospace',
            }}>
              {name}
            </code>
            <span className={classes} style={{ color: 'var(--foreground)', flex: 1 }}>
              {sample}
            </span>
            <code style={{ fontSize: 11, color: 'var(--muted-foreground)', fontFamily: 'monospace' }}>
              {classes}
            </code>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{
          fontSize: 13, fontWeight: 600, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: 'var(--muted-foreground)',
          marginBottom: 24, paddingBottom: 8, borderBottom: '1px solid var(--border)',
        }}>
          폰트 웨이트 (Roboto)
        </h2>
        {weights.map(({ name, cls }) => (
          <div key={name} style={{
            display: 'flex', alignItems: 'center', gap: 24,
            padding: '12px 0', borderBottom: '1px solid var(--border)',
          }}>
            <code style={{
              width: 140, flexShrink: 0, fontSize: 11,
              color: 'var(--muted-foreground)', fontFamily: 'monospace',
            }}>
              {cls}
            </code>
            <span className={`text-base ${cls}`} style={{ color: 'var(--foreground)', flex: 1 }}>
              {name} — The quick brown fox jumps over the lazy dog
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}

const meta: Meta = {
  title: 'Design/Typography',
  component: TypographyPage,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Scale: StoryObj = { name: '타이포그래피 스케일' };
