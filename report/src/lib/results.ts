import fs from 'fs';
import path from 'path';

export interface TestSpec {
  title: string;
  ok: boolean;
  file: string;
}

export interface TestRun {
  timestamp: string;
  duration: number;
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  flaky: number;
  passRate: number;
  specs: TestSpec[];
}

const RESULTS_DIR = path.join(process.cwd(), '..', 'report', 'results');

function parseSpecsFromSuites(suites: any[], file = ''): TestSpec[] {
  const specs: TestSpec[] = [];
  for (const suite of suites) {
    const currentFile = suite.file || file;
    if (suite.specs) {
      for (const spec of suite.specs) {
        specs.push({
          title: spec.title,
          ok: spec.ok,
          file: currentFile
        });
      }
    }
    if (suite.suites) {
      specs.push(...parseSpecsFromSuites(suite.suites, currentFile));
    }
  }
  return specs;
}

function parseResultFile(filePath: string): TestRun | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    const stats = data.stats ?? {};
    const total = (stats.expected ?? 0) + (stats.unexpected ?? 0) + (stats.skipped ?? 0) + (stats.flaky ?? 0);
    const passed = stats.expected ?? 0;
    const failed = stats.unexpected ?? 0;
    const skipped = stats.skipped ?? 0;
    const flaky = stats.flaky ?? 0;

    const specs = parseSpecsFromSuites(data.suites ?? []);

    return {
      timestamp: stats.startTime ?? new Date(0).toISOString(),
      duration: Math.round((stats.duration ?? 0) / 1000),
      total,
      passed,
      failed,
      skipped,
      flaky,
      passRate: total > 0 ? Math.round((passed / total) * 100) : 0,
      specs
    };
  } catch {
    return null;
  }
}

export function getAllRuns(): TestRun[] {
  const dir = fs.existsSync(RESULTS_DIR) ? RESULTS_DIR : path.join(process.cwd(), 'results');
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .reverse();

  return files
    .map((f) => parseResultFile(path.join(dir, f)))
    .filter((r): r is TestRun => r !== null);
}

export function getLatestRun(): TestRun | null {
  const runs = getAllRuns();
  return runs.length > 0 ? runs[0] : null;
}
