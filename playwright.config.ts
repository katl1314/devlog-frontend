import { defineConfig, devices } from '@playwright/test';

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

export default defineConfig({
	testDir: './tests/e2e',
	globalSetup: './tests/global-setup.ts',
	globalTeardown: './tests/global-teardown.ts',
	fullyParallel: false,
	retries: 0,
	workers: 1,
	reporter: [
		['list'],
		['json', { outputFile: `report/results/${timestamp}.json` }],
		['html', { open: 'never', outputFolder: 'report/html' }]
	],
	use: {
		baseURL: 'http://localhost:3000',
		trace: 'on-first-retry'
	},
	projects: [
		{
			name: 'desktop',
			use: { ...devices['Desktop Chrome'] }
		},
		{
			name: 'mobile',
			use: {
				...devices['Desktop Chrome'],
				viewport: { width: 390, height: 844 },
				isMobile: true
			}
		}
	]
});
