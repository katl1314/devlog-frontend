import { test, expect } from '@playwright/test';
import { mobileAuthTest, longPress, TEST_USER } from '../fixtures/auth.fixture';

test.describe('유저 프로필 — 페이지', () => {
	test('프로필 정보가 정상 렌더링된다', async ({ page }) => {
		await page.goto(`/@${TEST_USER.userId}`);
		await page.waitForTimeout(1000);

		// URL이 프로필 페이지인지 확인
		await expect(page).toHaveURL(new RegExp(`/@${TEST_USER.userId}`));
		// 프로필 유저 정보 확인 (렌더링: "유저명(userId)" 형태의 div)
		await expect(page.locator('div').filter({ hasText: TEST_USER.userId }).first()).toBeVisible({ timeout: 5000 });
	});
});

test.describe('모바일 하단 nav — 프로필 버튼', () => {
	mobileAuthTest('비로그인 시 프로필 탭 → /auth 이동', async ({ browser }) => {
		const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
		const page = await ctx.newPage();
		await page.goto('/new');
		await page.waitForTimeout(1000);

		await page.getByRole('link', { name: '프로필' }).click();
		await expect(page).toHaveURL(/\/auth/, { timeout: 5000 });
		await ctx.close();
	});

	mobileAuthTest('탭(단순 클릭) → 프로필 페이지로 이동', async ({ mobilePage: page }) => {
		await page.goto('/new');
		await page.waitForTimeout(2000);

		const btn = page.locator('button').first();
		const box = await btn.boundingBox();
		if (!box) throw new Error('프로필 버튼을 찾을 수 없음');

		await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
		await page.mouse.down();
		await page.waitForTimeout(100);
		await page.mouse.up();

		await expect(page).toHaveURL(new RegExp(`/@${TEST_USER.userId}`), { timeout: 5000 });
	});

	mobileAuthTest('꾹 누르기(500ms+) → 바텀 시트 오픈', async ({ mobilePage: page }) => {
		await page.goto('/new');
		await page.waitForTimeout(2000);

		const btn = page.locator('button').first();
		const box = await btn.boundingBox();
		if (!box) throw new Error('프로필 버튼을 찾을 수 없음');

		await longPress(page, box.x + box.width / 2, box.y + box.height / 2, 650);
		await page.waitForTimeout(400);

		await expect(page.getByText('블로그 가기').first()).toBeVisible();
		await expect(page.getByText('환경설정').first()).toBeVisible();
		await expect(page.getByText('로그아웃').first()).toBeVisible();
	});

	mobileAuthTest('바텀 시트 — 블로그 가기 클릭 → 프로필 이동', async ({ mobilePage: page }) => {
		await page.goto('/new');
		await page.waitForTimeout(2000);

		const btn = page.locator('button').first();
		const box = await btn.boundingBox();
		if (!box) throw new Error('프로필 버튼을 찾을 수 없음');

		await longPress(page, box.x + box.width / 2, box.y + box.height / 2, 650);
		await page.waitForTimeout(400);

		await page.getByText('블로그 가기').first().click();
		await expect(page).toHaveURL(new RegExp(`/@${TEST_USER.userId}`), { timeout: 5000 });
	});

	mobileAuthTest('바텀 시트 — backdrop 클릭 → 닫힘', async ({ mobilePage: page }) => {
		await page.goto('/new');
		await page.waitForTimeout(2000);

		const btn = page.locator('button').first();
		const box = await btn.boundingBox();
		if (!box) throw new Error('프로필 버튼을 찾을 수 없음');

		await longPress(page, box.x + box.width / 2, box.y + box.height / 2, 650);
		await page.waitForTimeout(400);
		await expect(page.getByText('블로그 가기').first()).toBeVisible();

		// backdrop: 화면 상단 클릭 (바텀 시트 외부)
		await page.mouse.click(195, 100);
		await page.waitForTimeout(500);

		// 바텀 시트가 화면 밖으로 이동 (translate-y-full) → 시각적으로 숨겨짐
		const sheetBox = await page.locator('div.fixed.bottom-0.left-0.w-full').last().boundingBox();
		// 바텀 시트가 뷰포트 아래로 내려갔으면 y > viewport height
		expect(sheetBox === null || (sheetBox.y >= 844)).toBeTruthy();
	});
});
