import { test as base, Page } from '@playwright/test';

export const MOBILE_VIEWPORT = { width: 390, height: 844 };
export const DESKTOP_VIEWPORT = { width: 1280, height: 800 };

export const TEST_USER = {
	email: 'test1@test.com',
	password: '1234',
	userId: 'test1',
	name: '관리자'
};

/** 인증된 데스크탑 페이지 */
export const authTest = base.extend<{ authPage: Page }>({
	authPage: async ({ browser }, use) => {
		const ctx = await browser.newContext({
			storageState: 'tests/storage/auth.json',
			viewport: DESKTOP_VIEWPORT
		});
		const page = await ctx.newPage();
		await use(page);
		await ctx.close();
	}
});

/** 인증된 모바일 페이지 */
export const mobileAuthTest = base.extend<{ mobilePage: Page }>({
	mobilePage: async ({ browser }, use) => {
		const ctx = await browser.newContext({
			storageState: 'tests/storage/auth.json',
			viewport: MOBILE_VIEWPORT
		});
		const page = await ctx.newPage();
		await use(page);
		await ctx.close();
	}
});

/** 모바일 꾹 누르기 헬퍼 */
export async function longPress(page: Page, x: number, y: number, ms = 600) {
	await page.mouse.move(x, y);
	await page.mouse.down();
	await page.waitForTimeout(ms);
	await page.mouse.up();
}
