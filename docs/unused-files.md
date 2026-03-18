# 미사용 파일 목록

> 분석일: 2026-03-16

## 컴포넌트 — Comment

| 파일 | 이유 |
|------|------|
| `src/components/comment/comment-item.tsx` | 빈 파일, 어디서도 임포트되지 않음 |
| `src/components/comment/comments-list.tsx` | 빈 파일, 어디서도 임포트되지 않음 |
| `src/components/comment/comment-footer.tsx` | 주석 처리된 코드에서만 참조됨 |

## 컴포넌트 — 기타

| 파일 | 이유 |
|------|------|
| `src/components/post/post-card-header.tsx` | 어디서도 임포트되지 않음 |
| `src/components/tab/tabview.tsx` | 어디서도 임포트되지 않음 |
| `src/components/skeleton/comment-skeleton.tsx` | 어디서도 임포트되지 않음 |

## UI 컴포넌트 (shadcn/ui — 생성 후 미사용)

| 파일 | 이유 |
|------|------|
| `src/components/ui/checkbox.tsx` | 미사용 |
| `src/components/ui/command.tsx` | 미사용 |
| `src/components/ui/dialog.tsx` | `command.tsx`에서만 임포트되나 `command.tsx`도 미사용 |
| `src/components/ui/popover.tsx` | 미사용 |
| `src/components/ui/scroll-area.tsx` | 미사용 |
| `src/components/ui/select.tsx` | 미사용 |
| `src/components/ui/toggle-group.tsx` | 미사용 |
| `src/components/ui/tooltip.tsx` | 미사용 |

## Hooks / Utils

| 파일 | 이유 |
|------|------|
| `src/hooks/layout.ts` | `useLayout` 훅 정의됐으나 어디서도 사용되지 않음 |
| `src/hooks/modal.tsx` | `useModal` 훅 정의됐으나 어디서도 사용되지 않음 |
| `src/utils/consts.ts` | `ERROR_STATUS` 상수 정의됐으나 어디서도 사용되지 않음 |

---

총 **17개** 파일
