import { expect } from '@playwright/test';
import { authTest } from '../fixtures/auth.fixture';

authTest.describe('설정 페이지', () => {
	authTest('/settings 진입 시 폼이 렌더링된다', async ({ authPage: page }) => {
		await page.goto('/settings');
		await page.waitForTimeout(1000);

		await expect(page.getByText('환경 설정')).toBeVisible();
		await expect(page.getByText('변경사항 저장')).toBeVisible();
	});

	authTest('이름 변경 후 저장 → 성공 토스트 표시', async ({ authPage: page }) => {
		await page.goto('/settings');
		await page.waitForTimeout(1000);

		const nameInput = page.locator('input[placeholder="이름을 입력하세요"]');
		await nameInput.clear();
		await nameInput.fill('관리자');

		await page.getByText('변경사항 저장').click();
		await expect(page.getByText('변경사항이 저장됐습니다.')).toBeVisible({ timeout: 5000 });
	});

	// Server Action은 서버 측에서 실행되므로 page.route()로 백엔드 인터셉트 불가
	// → 실제 에러 케이스는 통합 테스트 대상
});
