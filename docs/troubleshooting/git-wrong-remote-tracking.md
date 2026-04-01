# Git 브랜치 tracking 오설정으로 인한 잘못된 remote push

## 발생일

2026-04-01

## 증상

- 로컬 `feature/post-layout` 브랜치에서 작업한 커밋 3개가 `origin/feat/refactor`에 잘못 push됨
- `git branch -vv` 확인 결과: `feature/post-layout`이 `origin/feat/refactor`를 추적하고 있었음
- `origin/feature/post-layout`은 3커밋 뒤처진 상태

## 원인

이전 세션에서 CLAUDE.md의 `기본 브랜치: feat/refactor` 설정을 따라 push 시 `-u origin feat/refactor` 옵션을 사용한 것으로 추정.
결과적으로 로컬 `feature/post-layout`의 upstream이 `origin/feat/refactor`로 잘못 설정됨.

## 해결 과정

1. `git branch -vv`로 잘못된 tracking 확인
2. tracking 재설정: `git branch --set-upstream-to=origin/feature/post-layout feature/post-layout`
3. 올바른 remote에 push: `git push origin feature/post-layout`
4. `feat/refactor`에 병합: `git merge feature/post-layout` (이미 커밋이 포함돼 있어 Already up to date)

## 재발 방지

- push 전 반드시 `git branch -vv`로 tracking 확인
- 로컬 브랜치명과 remote 브랜치명이 일치하는지 검증 (예: `feature/post-layout` → `origin/feature/post-layout`)
- CLAUDE.md의 "기본 브랜치" 설정이 현재 작업 브랜치와 다를 경우, 임의로 다른 remote에 push하지 않고 사용자에게 먼저 확인
- tracking 변경(`git branch --set-upstream-to`)은 사용자 승인 없이 실행 불가
