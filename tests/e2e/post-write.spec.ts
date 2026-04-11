import { expect } from '@playwright/test';
import { authTest } from '../fixtures/auth.fixture';

authTest.describe('포스트 작성', () => {
	authTest('/write 진입 시 에디터가 렌더링된다', async ({ authPage: page }) => {
		await page.goto('/write');
		await page.waitForTimeout(3000);

		await expect(page.locator('.ProseMirror')).toBeVisible({ timeout: 15000 });
		// 제목 input (textarea가 아닌 input)
		await expect(page.locator('input[placeholder="제목을 입력하세요"]')).toBeVisible();
	});

	authTest('다음 버튼 클릭 → 발행 설정 모달 오픈', async ({ authPage: page }) => {
		await page.goto('/write');
		await page.waitForTimeout(3000);

		await page.locator('input[placeholder="제목을 입력하세요"]').fill('테스트 제목');
		await page.locator('button:has-text("다음")').click();
		await page.waitForTimeout(500);

		await expect(page.getByRole('dialog')).toBeVisible({ timeout: 5000 });
	});

	authTest('임시저장 버튼이 노출된다', async ({ authPage: page }) => {
		await page.goto('/write');
		await page.waitForTimeout(3000);

		await expect(page.locator('button:has-text("임시저장")')).toBeVisible({ timeout: 10000 });
	});
});
