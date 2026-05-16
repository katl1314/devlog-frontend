import type { Meta, StoryObj } from '@storybook/nextjs-vite';

type TokenPair = {
  bg: string;
  fg: string;
  bgLabel: string;
  fgLabel: string;
  desc: string;
};

type SingleToken = {
  var: string;
  desc: string;
};

const pairedGroups: { label: string; pairs: TokenPair[] }[] = [
  {
    label: '기반 색상',
    pairs: [
      { bg: '--background',  fg: '--foreground',       bgLabel: 'background',  fgLabel: 'foreground',       desc: '페이지 배경 / 기본 텍스트' },
      { bg: '--card',        fg: '--card-foreground',   bgLabel: 'card',        fgLabel: 'card-foreground',  desc: '카드 배경 / 카드 텍스트' },
      { bg: '--popover',     fg: '--popover-foreground',bgLabel: 'popover',     fgLabel: 'popover-foreground',desc: '팝오버 배경 / 팝오버 텍스트' },
    ],
  },
  {
    label: '주요 액션',
    pairs: [
      { bg: '--primary',     fg: '--primary-foreground',    bgLabel: 'primary',    fgLabel: 'primary-foreground',    desc: '주요 버튼 / 버튼 위 텍스트' },
      { bg: '--secondary',   fg: '--secondary-foreground',  bgLabel: 'secondary',  fgLabel: 'secondary-foreground',  desc: '보조 버튼 / 버튼 위 텍스트' },
    ],
  },
  {
    label: '비활성 / 호버',
    pairs: [
      { bg: '--muted',   fg: '--muted-foreground',   bgLabel: 'muted',   fgLabel: 'muted-foreground',   desc: '비활성 배경 / 약한 텍스트' },
      { bg: '--accent',  fg: '--accent-foreground',  bgLabel: 'accent',  fgLabel: 'accent-foreground',  desc: '호버 배경 / 호버 위 텍스트' },
    ],
  },
  {
    label: '상태 색상',
    pairs: [
      { bg: '--destructive', fg: '--destructive-foreground', bgLabel: 'destructive', fgLabel: 'destructive-foreground', desc: '삭제 / 위험' },
      { bg: '--success',     fg: '--success-foreground',     bgLabel: 'success',     fgLabel: 'success-foreground',     desc: '성공 (청록 — primary 초록과 구분)' },
      { bg: '--warning',     fg: '--warning-foreground',     bgLabel: 'warning',     fgLabel: 'warning-foreground',     desc: '경고 (앰버)' },
      { bg: '--info',        fg: '--info-foreground',        bgLabel: 'info',        fgLabel: 'info-foreground',        desc: '정보 (파랑)' },
    ],
  },
];

const singleTokens: SingleToken[] = [
  { var: '--border',      desc: '경계선' },
  { var: '--input',       desc: '인풋 경계선' },
  { var: '--ring',        desc: '포커스 링' },
  { var: '--link',        desc: '링크 색상' },
  { var: '--placeholder', desc: '인풋 플레이스홀더' },
];

const hueMap: { label: string; hue: number; token: string; chroma: string }[] = [
  { label: 'primary (브랜드)',   hue: 137, token: '--primary',     chroma: '0.17' },
  { label: 'success (청록)',     hue: 162, token: '--success',     chroma: '0.17' },
  { label: 'destructive (위험)', hue: 25,  token: '--destructive', chroma: '0.22' },
  { label: 'warning (앰버)',     hue: 80,  token: '--warning',     chroma: '0.17' },
  { label: 'info (파랑)',        hue: 238, token: '--info',        chroma: '0.19' },
];

function PairSwatch({ pair }: { pair: TokenPair }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{
        display: 'flex',
        borderRadius: 10,
        overflow: 'hidden',
        border: '1px solid var(--border)',
        height: 64,
      }}>
        <div style={{
          flex: 1,
          background: `var(${pair.bg})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontFamily: 'monospace',
          color: `var(${pair.fg})`,
          fontWeight: 600,
        }}>
          Aa
        </div>
        <div style={{
          flex: 1,
          background: `var(${pair.fg})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontFamily: 'monospace',
          color: `var(${pair.bg})`,
          fontWeight: 600,
          borderLeft: '1px solid var(--border)',
        }}>
          Aa
        </div>
      </div>
      <div style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>
        <code style={{ color: 'var(--foreground)', fontWeight: 600 }}>{pair.bgLabel}</code>
        {' / '}
        <code>{pair.fgLabel}</code>
      </div>
      <div style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{pair.desc}</div>
    </div>
  );
}

function SingleSwatch({ token }: { token: SingleToken }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 40,
        height: 40,
        borderRadius: 8,
        background: `var(${token.var})`,
        border: '1px solid var(--border)',
        flexShrink: 0,
      }} />
      <div>
        <code style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--foreground)', fontWeight: 600 }}>
          {token.var}
        </code>
        <div style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{token.desc}</div>
      </div>
    </div>
  );
}

function ColorsPage() {
  return (
    <div style={{ padding: 32, background: 'var(--background)', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, color: 'var(--foreground)' }}>
        Color Tokens
      </h1>
      <p style={{ fontSize: 13, color: 'var(--muted-foreground)', marginBottom: 40 }}>
        모든 색상은 CSS 변수(시맨틱 토큰)로만 참조한다. 임의 Tailwind 색상(<code>blue-500</code> 등) 사용 금지.
      </p>

      {/* Hue 분포 */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{
          fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
          color: 'var(--muted-foreground)', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid var(--border)',
        }}>
          Hue 분포 — 색상환에서 고르게 배치
        </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {hueMap.map(({ label, hue, token, chroma }) => (
            <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: `var(${token})`,
                border: '1px solid var(--border)',
                flexShrink: 0,
              }} />
              <div>
                <div style={{ fontSize: 12, color: 'var(--foreground)', fontWeight: 600 }}>{label}</div>
                <div style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>
                  hue {hue}° · chroma {chroma}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 페어링 스와치 */}
      {pairedGroups.map((group) => (
        <section key={group.label} style={{ marginBottom: 40 }}>
          <h2 style={{
            fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
            color: 'var(--muted-foreground)', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid var(--border)',
          }}>
            {group.label}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {group.pairs.map((pair) => (
              <PairSwatch key={pair.bgLabel} pair={pair} />
            ))}
          </div>
        </section>
      ))}

      {/* 단독 토큰 */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{
          fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
          color: 'var(--muted-foreground)', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid var(--border)',
        }}>
          구조 토큰
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {singleTokens.map((t) => (
            <SingleSwatch key={t.var} token={t} />
          ))}
        </div>
      </section>
    </div>
  );
}

const meta: Meta = {
  title: 'Design/Colors',
  component: ColorsPage,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const All: StoryObj = { name: '색상 팔레트' };
