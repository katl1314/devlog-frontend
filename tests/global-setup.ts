import { chromium } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

// 이미 존재하는 테스트 계정 사용
export const TEST_USER = {
	email: 'test1@test.com',
	password: '1234',
	userId: 'test1',
	name: '관리자'
};

export default async function globalSetup() {
	const browser = await chromium.launch();
	const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
	const page = await ctx.newPage();

	await page.goto(`${BASE_URL}/auth`);
	await page.waitForTimeout(1000);

	await page.getByText('이메일 로그인').click();
	await page.waitForTimeout(300);
	await page.locator('input[name=email]').fill(TEST_USER.email);
	await page.locator('input[name=password]').fill(TEST_USER.password);
	await page.getByRole('button', { name: '로그인', exact: true }).click();
	await page.waitForURL(`${BASE_URL}/`, { timeout: 10000 });

	await ctx.storageState({ path: 'tests/storage/auth.json' });
	await browser.close();

	console.log('[global-setup] 테스트 세션 저장 완료');
}
