import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const colorGroups = [
  {
    label: '기반 색상',
    tokens: [
      { name: 'background',   var: '--background',   desc: '페이지 배경' },
      { name: 'foreground',   var: '--foreground',   desc: '기본 텍스트' },
      { name: 'card',         var: '--card',         desc: '카드 배경' },
      { name: 'card-foreground', var: '--card-foreground', desc: '카드 텍스트' },
      { name: 'border',       var: '--border',       desc: '경계선' },
      { name: 'input',        var: '--input',        desc: '인풋 경계선' },
      { name: 'ring',         var: '--ring',         desc: '포커스 링' },
    ],
  },
  {
    label: '주요 액션',
    tokens: [
      { name: 'primary',             var: '--primary',             desc: '주요 버튼 / 강조' },
      { name: 'primary-foreground',  var: '--primary-foreground',  desc: 'primary 위 텍스트' },
      { name: 'secondary',           var: '--secondary',           desc: '보조 버튼' },
      { name: 'secondary-foreground',var: '--secondary-foreground',desc: 'secondary 위 텍스트' },
    ],
  },
  {
    label: '비활성 / 호버',
    tokens: [
      { name: 'muted',           var: '--muted',           desc: '비활성 배경' },
      { name: 'muted-foreground',var: '--muted-foreground',desc: '약한 텍스트' },
      { name: 'accent',          var: '--accent',          desc: '호버 배경 (연초록 틴트)' },
      { name: 'accent-foreground',var:'--accent-foreground',desc: 'accent 위 텍스트' },
      { name: 'popover',         var: '--popover',         desc: '팝오버 배경' },
      { name: 'popover-foreground',var:'--popover-foreground',desc: '팝오버 텍스트' },
    ],
  },
  {
    label: '상태 색상',
    tokens: [
      { name: 'destructive',            var: '--destructive',            desc: '삭제 / 위험' },
      { name: 'destructive-foreground', var: '--destructive-foreground', desc: 'destructive 위 텍스트' },
      { name: 'success',                var: '--success',                desc: '성공' },
      { name: 'success-foreground',     var: '--success-foreground',     desc: 'success 위 텍스트' },
      { name: 'warning',                var: '--warning',                desc: '경고' },
      { name: 'warning-foreground',     var: '--warning-foreground',     desc: 'warning 위 텍스트' },
      { name: 'info',                   var: '--info',                   desc: '정보' },
      { name: 'info-foreground',        var: '--info-foreground',        desc: 'info 위 텍스트' },
    ],
  },
  {
    label: '기타',
    tokens: [
      { name: 'link',        var: '--link',        desc: '링크 색상' },
      { name: 'placeholder', var: '--placeholder', desc: '인풋 플레이스홀더' },
    ],
  },
];

function ColorSwatch({ name, cssVar, desc }: { name: string; cssVar: string; desc: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0' }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 8,
          background: `var(${cssVar})`,
          border: '1px solid var(--border)',
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600, color: 'var(--foreground)' }}>
          {cssVar}
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted-foreground)', marginTop: 2 }}>
          {desc}
        </div>
      </div>
    </div>
  );
}

function ColorsPage() {
  return (
    <div style={{ padding: 32, background: 'var(--background)', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: 'var(--foreground)' }}>
        Color Tokens
      </h1>
      <p style={{ fontSize: 14, color: 'var(--muted-foreground)', marginBottom: 40 }}>
        모든 색상은 CSS 변수(시맨틱 토큰)로만 참조한다. 임의 Tailwind 색상(<code>blue-500</code> 등) 사용 금지.
      </p>

      {colorGroups.map((group) => (
        <section key={group.label} style={{ marginBottom: 40 }}>
          <h2 style={{
            fontSize: 13,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--muted-foreground)',
            marginBottom: 16,
            paddingBottom: 8,
            borderBottom: '1px solid var(--border)',
          }}>
            {group.label}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 4 }}>
            {group.tokens.map((t) => (
              <ColorSwatch key={t.var} name={t.name} cssVar={t.var} desc={t.desc} />
            ))}
          </div>
        </section>
      ))}
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
