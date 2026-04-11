import { test, expect } from '@playwright/test';
import { authTest } from '../fixtures/auth.fixture';

test.describe('포스트 목록 — 비로그인', () => {
	test('포스트 카드가 렌더링된다', async ({ page }) => {
		await page.goto('/new');
		await page.waitForTimeout(1500);

		const cards = page.locator('article');
		await expect(cards.first()).toBeVisible({ timeout: 5000 });
	});

	test('트랜드 탭으로 전환된다', async ({ page }) => {
		await page.goto('/new');
		await page.waitForTimeout(1000);

		// 모바일: 하단 nav 링크 클릭, 데스크탑: 직접 이동
		const isMobile = page.viewportSize()?.width === 390;
		if (isMobile) {
			await page.locator('a[href="/trends"]').filter({ hasText: '트랜드' }).click();
		} else {
			await page.goto('/trends');
		}
		await expect(page).toHaveURL(/\/trends/);
	});

	test('포스트 카드 클릭 → 상세 페이지 또는 모달 이동', async ({ page }) => {
		await page.goto('/new');
		await page.waitForTimeout(1500);

		const firstCard = page.locator('article').first();
		await firstCard.click();
		await page.waitForTimeout(1500);

		const url = page.url();
		const isDetail = url !== 'http://localhost:3000/new' && url !== 'http://localhost:3000/';
		const isModal = await page.locator('[role="dialog"]').isVisible().catch(() => false);
		expect(isDetail || isModal).toBeTruthy();
	});
});

test.describe('포스트 목록 — 로그인', () => {
	authTest('로그인 상태에서 포스트 목록이 정상 렌더링된다', async ({ authPage: page }) => {
		await page.goto('/new');
		await page.waitForTimeout(1500);

		const cards = page.locator('article');
		await expect(cards.first()).toBeVisible({ timeout: 5000 });
	});
});
