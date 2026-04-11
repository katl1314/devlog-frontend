import { test, expect } from '@playwright/test';
import { authTest, TEST_USER } from '../fixtures/auth.fixture';

test.describe('인증 — 미인증 접근 제어', () => {
	test('/write 접근 시 /auth로 리다이렉트', async ({ page }) => {
		await page.goto('/write');
		await expect(page).toHaveURL(/\/auth/);
	});

	test('/settings 접근 시 /auth로 리다이렉트', async ({ page }) => {
		await page.goto('/settings');
		await expect(page).toHaveURL(/\/auth/);
	});
});

test.describe('인증 — 로그인', () => {
	test('이메일 로그인 성공 → / 이동', async ({ page }) => {
		await page.goto('/auth');
		await page.waitForTimeout(800);

		await page.getByText('이메일 로그인').click();
		await page.waitForTimeout(300);
		await page.locator('input[name=email]').fill(TEST_USER.email);
		await page.locator('input[name=password]').fill(TEST_USER.password);
		await page.getByRole('button', { name: '로그인', exact: true }).click();

		await expect(page).toHaveURL('/', { timeout: 10000 });
	});

	test('잘못된 비밀번호 → 에러 메시지 표시', async ({ page }) => {
		await page.goto('/auth');
		await page.waitForTimeout(800);

		await page.getByText('이메일 로그인').click();
		await page.waitForTimeout(300);
		await page.locator('input[name=email]').fill(TEST_USER.email);
		await page.locator('input[name=password]').fill('wrongpassword');
		await page.getByRole('button', { name: '로그인', exact: true }).click();

		await expect(page.getByText('이메일 또는 비밀번호가 올바르지 않습니다')).toBeVisible({ timeout: 5000 });
	});
});

test.describe('인증 — 로그아웃', () => {
	authTest('로그아웃 → 세션 제거 후 / 이동', async ({ authPage: page }) => {
		await page.goto('/');
		await page.waitForTimeout(1000);

		// Next.js dev tools 버튼 제외하고 유저 메뉴 드롭다운 트리거 클릭
		const menuBtn = page.locator('button[aria-haspopup="menu"]:not([data-nextjs-dev-tools-button])');
		await menuBtn.click();
		await page.getByRole('menuitem', { name: '로그아웃' }).click();

		await expect(page).toHaveURL('/', { timeout: 8000 });
	});
});
