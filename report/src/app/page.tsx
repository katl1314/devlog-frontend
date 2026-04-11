import { getAllRuns, getLatestRun } from '@/lib/results';
import PassRateChart from '@/components/pass-rate-chart';

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const runs = getAllRuns();
  const latest = getLatestRun();

  const chartData = [...runs]
    .reverse()
    .slice(-20)
    .map((r, i) => ({
      label: `#${i + 1}`,
      passRate: r.passRate,
      passed: r.passed,
      failed: r.failed
    }));

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dev.Log — Test Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Playwright E2E 테스트 실행 이력 및 커버리지</p>
      </div>

      {/* 최근 실행 요약 카드 */}
      {latest ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
          <SummaryCard label="통과율" value={`${latest.passRate}%`} color="text-green-400" />
          <SummaryCard label="전체 테스트" value={String(latest.total)} color="text-blue-400" />
          <SummaryCard label="통과" value={String(latest.passed)} color="text-green-400" />
          <SummaryCard label="실패" value={String(latest.failed)} color={latest.failed > 0 ? 'text-red-400' : 'text-gray-400'} />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-700 p-8 text-center text-gray-500 mb-8">
          아직 테스트 결과가 없습니다. <code className="text-gray-400">npm run test:e2e</code>를 실행해 주세요.
        </div>
      )}

      {/* 통과율 트렌드 차트 */}
      <div className="rounded-xl bg-gray-900 border border-gray-800 p-6 mb-8">
        <h2 className="text-base font-semibold text-gray-200 mb-4">통과율 트렌드</h2>
        <PassRateChart data={chartData} />
      </div>

      {/* 최근 실행 스펙 목록 */}
      {latest && latest.specs.length > 0 && (
        <div className="rounded-xl bg-gray-900 border border-gray-800 p-6 mb-8">
          <h2 className="text-base font-semibold text-gray-200 mb-4">
            최근 실행 결과 <span className="text-gray-500 font-normal text-sm">— {formatDate(latest.timestamp)}</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-left">
                  <th className="pb-2 pr-4 font-medium">테스트 이름</th>
                  <th className="pb-2 pr-4 font-medium">파일</th>
                  <th className="pb-2 font-medium">상태</th>
                </tr>
              </thead>
              <tbody>
                {latest.specs.map((spec, i) => (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="py-2 pr-4 text-gray-200">{spec.title}</td>
                    <td className="py-2 pr-4 text-gray-500 text-xs font-mono">{spec.file}</td>
                    <td className="py-2">
                      {spec.ok ? (
                        <span className="inline-flex items-center gap-1 text-green-400 text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                          PASS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-400 text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                          FAIL
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 전체 실행 이력 테이블 */}
      <div className="rounded-xl bg-gray-900 border border-gray-800 p-6">
        <h2 className="text-base font-semibold text-gray-200 mb-4">실행 이력</h2>
        {runs.length === 0 ? (
          <p className="text-gray-500 text-sm">이력 없음</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-left">
                  <th className="pb-2 pr-4 font-medium">실행 일시</th>
                  <th className="pb-2 pr-4 font-medium">소요 시간</th>
                  <th className="pb-2 pr-4 font-medium">전체</th>
                  <th className="pb-2 pr-4 font-medium">통과</th>
                  <th className="pb-2 pr-4 font-medium">실패</th>
                  <th className="pb-2 font-medium">통과율</th>
                </tr>
              </thead>
              <tbody>
                {runs.map((run, i) => (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="py-2 pr-4 text-gray-300">{formatDate(run.timestamp)}</td>
                    <td className="py-2 pr-4 text-gray-400">{formatDuration(run.duration)}</td>
                    <td className="py-2 pr-4 text-gray-300">{run.total}</td>
                    <td className="py-2 pr-4 text-green-400">{run.passed}</td>
                    <td className="py-2 pr-4">
                      <span className={run.failed > 0 ? 'text-red-400' : 'text-gray-500'}>
                        {run.failed}
                      </span>
                    </td>
                    <td className="py-2">
                      <span
                        className={`font-semibold ${
                          run.passRate === 100
                            ? 'text-green-400'
                            : run.passRate >= 80
                            ? 'text-yellow-400'
                            : 'text-red-400'
                        }`}
                      >
                        {run.passRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl bg-gray-900 border border-gray-800 p-5">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
