import { useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import { ChinaData } from 'china-map-geojson'
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  Building2,
  CalendarDays,
  Database,
  FileSpreadsheet,
  Filter,
  MapPinned,
  Route,
  Sparkles,
  TrendingUp,
  UsersRound,
} from 'lucide-react'
import {
  applyFilters,
  availableMonths,
  buildAiInsights,
  buildDashboardSummary,
  cityCatalog,
  departments,
  expenseTypes,
  formatMoney,
  generateTravelRecords,
  type AiInsight,
  type DashboardFilters,
  type TravelExpenseRecord,
} from './lib/finance'

echarts.registerMap('china', ChinaData as never)

const allOption = '全部'

function ChartPanel({
  title,
  subtitle,
  option,
  height = 280,
}: {
  title: string
  subtitle: string
  option: echarts.EChartsOption
  height?: number
}) {
  const isTestRuntime = import.meta.env.MODE === 'test'

  return (
    <section className="rounded-lg border border-white/10 bg-panel/95 p-4 shadow-cockpit">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
        </div>
        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-mint">BI</span>
      </div>
      {isTestRuntime ? (
        <div className="grid place-items-center rounded-md border border-dashed border-white/15 bg-white/[.03] text-sm text-slate-400" style={{ height }}>
          {title}
        </div>
      ) : (
        <ReactECharts option={option} style={{ height }} notMerge lazyUpdate />
      )}
    </section>
  )
}

function ProductValueStrip() {
  const items = [
    {
      title: '接入数据',
      text: '承接报销系统、Excel 导出或费控接口，把散落单据统一成标准字段。',
    },
    {
      title: '看清分布',
      text: '用地图和 BI 图表看出哪些城市、部门、费用类型正在消耗预算。',
    },
    {
      title: '形成动作',
      text: 'AI 洞察把异常单据、复核建议、流程优化点直接整理给费用会计和经理。',
    },
  ]

  return (
    <section className="mb-5 rounded-lg border border-white/10 bg-panel/95 p-4 shadow-cockpit">
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">它能帮财务部做什么</h2>
          <p className="mt-1 text-xs text-slate-400">从报销系统到管理决策：先清洗，再看板，最后形成复核动作。</p>
        </div>
        <span className="w-fit rounded-md border border-mint/25 bg-mint/10 px-2 py-1 text-xs text-mint">面试演示版</span>
      </div>
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {items.map((item, index) => (
          <div key={item.title} className="contents">
            <article className="rounded-lg border border-white/10 bg-white/[.04] p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-mint/15 text-sm font-semibold text-mint">{index + 1}</span>
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              </div>
              <p className="text-xs leading-5 text-slate-300">{item.text}</p>
            </article>
            {index < items.length - 1 ? (
              <div className="hidden place-items-center text-slate-500 md:grid">
                <ArrowRight size={18} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}

function KpiCard({
  icon,
  label,
  value,
  helper,
  tone,
}: {
  icon: React.ReactNode
  label: string
  value: string
  helper: string
  tone: 'mint' | 'amber' | 'coral' | 'peacock'
}) {
  const toneMap = {
    mint: 'text-mint bg-mint/10 border-mint/25',
    amber: 'text-amber bg-amber/10 border-amber/25',
    coral: 'text-coral bg-coral/10 border-coral/25',
    peacock: 'text-peacock bg-peacock/10 border-peacock/25',
  }

  return (
    <section className="rounded-lg border border-white/10 bg-panel/95 p-4 shadow-cockpit">
      <div className="flex items-center justify-between gap-3">
        <div className={`grid h-10 w-10 place-items-center rounded-lg border ${toneMap[tone]}`}>{icon}</div>
        <span className="text-xs text-slate-400">{helper}</span>
      </div>
      <p className="mt-4 text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
    </section>
  )
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <label className="flex min-w-[150px] flex-1 flex-col gap-2 text-xs text-slate-400">
      {label}
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 rounded-lg border border-white/10 bg-ink px-3 text-sm text-white outline-none transition focus:border-mint"
      >
        {[allOption, ...options].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function InsightItem({ insight }: { insight: AiInsight }) {
  const tone = {
    info: 'border-peacock/30 bg-peacock/10 text-peacock',
    warning: 'border-amber/30 bg-amber/10 text-amber',
    critical: 'border-coral/30 bg-coral/10 text-coral',
    positive: 'border-mint/30 bg-mint/10 text-mint',
  }[insight.severity]

  return (
    <article className="rounded-lg border border-white/10 bg-white/[.04] p-3">
      <div className="flex items-start gap-3">
        <span className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg border ${tone}`}>
          <Sparkles size={16} />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-white">{insight.title}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-300">{insight.detail}</p>
          <p className="mt-2 text-xs text-mint">{insight.action}</p>
        </div>
      </div>
    </article>
  )
}

function makeMapOption(summary: ReturnType<typeof buildDashboardSummary>): echarts.EChartsOption {
  const maxProvince = Math.max(...summary.provinceHeat.map((item) => item.value), 1)
  const origin = cityCatalog.find((item) => item.city === '温州') ?? cityCatalog[0]
  const scatterData = summary.cityHeat.slice(0, 26).map((item) => ({
    name: item.name,
    value: [item.coordinate[0], item.coordinate[1], item.value, item.count],
    symbolSize: Math.max(9, Math.min(34, item.value / (summary.cityHeat[0]?.value || 1) * 34)),
  }))
  const routeData = summary.cityHeat
    .slice(0, 10)
    .filter((item) => item.name !== origin.city)
    .map((item) => ({
      name: `${origin.city}-${item.name}`,
      coords: [origin.coordinate, item.coordinate],
      value: item.value,
    }))

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      borderWidth: 0,
      backgroundColor: 'rgba(17,19,24,.95)',
      textStyle: { color: '#e5edf0' },
      formatter: (rawParams: unknown) => {
        const params = (Array.isArray(rawParams) ? rawParams[0] : rawParams) as {
          name?: string
          data?: { value?: number | [number, number, number, number] }
        }
        const data = params.data as { value?: number | [number, number, number, number] } | undefined
        if (Array.isArray(data?.value)) {
          return `${params.name}<br/>报销金额：${formatMoney(data.value[2])}<br/>单据数：${data.value[3]}`
        }
        return `${params.name}<br/>报销金额：${formatMoney(Number(data?.value ?? 0))}`
      },
    },
    visualMap: {
      min: 0,
      max: maxProvince,
      left: 14,
      bottom: 18,
      calculable: true,
      textStyle: { color: '#94a3b8' },
      itemWidth: 10,
      itemHeight: 110,
      inRange: { color: ['#1b2630', '#1f6b74', '#29d4a4', '#f7b955', '#ff7f6e'] },
    },
    geo: {
      map: 'china',
      roam: true,
      zoom: 1.22,
      center: [106.5, 35.2],
      label: { color: '#9fb2bd', fontSize: 10 },
      itemStyle: {
        areaColor: '#18232c',
        borderColor: 'rgba(151, 191, 196, .28)',
        borderWidth: 0.8,
        shadowBlur: 18,
        shadowColor: 'rgba(0,0,0,.35)',
      },
      emphasis: { itemStyle: { areaColor: '#2f8178' }, label: { color: '#fff' } },
    },
    series: [
      {
        name: '省份费用',
        type: 'map',
        map: 'china',
        geoIndex: 0,
        data: summary.provinceHeat,
      },
      {
        name: '差旅动线',
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 2,
        effect: {
          show: true,
          period: 4,
          trailLength: 0.25,
          symbol: 'arrow',
          symbolSize: 7,
          color: '#f7b955',
        },
        lineStyle: {
          color: 'rgba(247,185,85,.58)',
          width: 1.1,
          opacity: 0.48,
          curveness: 0.25,
        },
        data: routeData,
      },
      {
        name: '城市热点',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 3,
        rippleEffect: { brushType: 'stroke', scale: 4.2 },
        label: {
          show: true,
          formatter: '{b}',
          position: 'right',
          color: '#e9fbf4',
          fontSize: 10,
          backgroundColor: 'rgba(17,19,24,.42)',
          padding: [2, 4],
          borderRadius: 4,
        },
        itemStyle: { color: '#f7b955', shadowBlur: 18, shadowColor: 'rgba(247,185,85,.78)' },
        data: scatterData,
      },
    ],
  }
}

function MapPanel({ summary, option }: { summary: ReturnType<typeof buildDashboardSummary>; option: echarts.EChartsOption }) {
  const isTestRuntime = import.meta.env.MODE === 'test'
  const topCities = summary.cityHeat.slice(0, 5)
  const maxAmount = topCities[0]?.value || 1

  return (
    <section data-testid="map-panel" className="rounded-lg border border-white/10 bg-panel/95 p-4 shadow-cockpit">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">全国差旅城市热点图</h2>
          <p className="mt-1 text-xs text-slate-400">省份色阶、城市光点和差旅动线叠加，帮助财务经理先看到分布，再追问原因。</p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <span className="rounded-md border border-mint/20 bg-mint/10 px-2 py-1 text-mint">省份热力</span>
          <span className="rounded-md border border-amber/20 bg-amber/10 px-2 py-1 text-amber">城市光点</span>
          <span className="rounded-md border border-peacock/20 bg-peacock/10 px-2 py-1 text-peacock">差旅动线</span>
        </div>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.55fr_.55fr]">
        <div className="relative min-h-[520px] overflow-hidden rounded-lg border border-white/10 bg-[#101820]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(79,209,165,.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,.06),transparent_20%)]" />
          {isTestRuntime ? (
            <div className="relative grid h-[520px] place-items-center text-sm text-slate-400">全国差旅城市热点图</div>
          ) : (
            <ReactECharts option={option} style={{ height: 520 }} notMerge lazyUpdate />
          )}
        </div>
        <aside className="grid gap-3">
          <article className="rounded-lg border border-white/10 bg-white/[.04] p-4">
            <h3 className="text-sm font-semibold text-white">地图解读</h3>
            <p className="mt-2 text-xs leading-5 text-slate-300">
              颜色越亮代表费用越集中；发光城市代表单据密度高；动线用于模拟从核心管理视角观察主要出差去向。
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-md bg-ink/80 p-2">
                <p className="text-slate-400">最高城市</p>
                <p className="mt-1 font-semibold text-white">{summary.kpis.hotCity}</p>
              </div>
              <div className="rounded-md bg-ink/80 p-2">
                <p className="text-slate-400">最高金额</p>
                <p className="mt-1 font-semibold text-amber">{formatMoney(summary.kpis.hotCityAmount)}</p>
              </div>
            </div>
          </article>
          <article className="rounded-lg border border-white/10 bg-white/[.04] p-4">
            <h3 className="text-sm font-semibold text-white">城市热度 Top 5</h3>
            <div className="mt-3 space-y-3">
              {topCities.map((city, index) => (
                <div key={city.name}>
                  <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                    <span className="font-medium text-white">{index + 1}. {city.name}</span>
                    <span className="text-slate-300">{formatMoney(city.value)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-mint via-amber to-coral"
                      style={{ width: `${Math.max(8, (city.value / maxAmount) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </div>
    </section>
  )
}

function makeTrendOption(summary: ReturnType<typeof buildDashboardSummary>): echarts.EChartsOption {
  return {
    grid: { left: 36, right: 18, top: 24, bottom: 32 },
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(17,19,24,.95)', borderWidth: 0, textStyle: { color: '#fff' } },
    xAxis: { type: 'category', data: summary.monthlyTrend.map((item) => item.month), axisLabel: { color: '#94a3b8' }, axisLine: { lineStyle: { color: '#334155' } } },
    yAxis: { type: 'value', axisLabel: { color: '#94a3b8' }, splitLine: { lineStyle: { color: 'rgba(148,163,184,.12)' } } },
    series: [
      {
        name: '报销金额',
        type: 'line',
        smooth: true,
        data: summary.monthlyTrend.map((item) => item.amount),
        areaStyle: { color: 'rgba(79,209,165,.16)' },
        lineStyle: { color: '#4fd1a5', width: 3 },
        itemStyle: { color: '#4fd1a5' },
      },
      {
        name: '风险单据',
        type: 'bar',
        data: summary.monthlyTrend.map((item) => item.riskCount),
        itemStyle: { color: '#ff7f6e' },
      },
    ],
  }
}

function makeBarOption(data: { name: string; value: number }[], color: string): echarts.EChartsOption {
  const top = data.slice(0, 6).reverse()
  return {
    grid: { left: 76, right: 18, top: 12, bottom: 20 },
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(17,19,24,.95)', borderWidth: 0, textStyle: { color: '#fff' } },
    xAxis: { type: 'value', axisLabel: { color: '#94a3b8' }, splitLine: { lineStyle: { color: 'rgba(148,163,184,.12)' } } },
    yAxis: { type: 'category', data: top.map((item) => item.name), axisLabel: { color: '#cbd5e1' }, axisLine: { show: false }, axisTick: { show: false } },
    series: [{ type: 'bar', data: top.map((item) => item.value), itemStyle: { color, borderRadius: [0, 6, 6, 0] }, barWidth: 14 }],
  }
}

function makePieOption(data: { name: string; value: number }[]): echarts.EChartsOption {
  return {
    tooltip: { trigger: 'item', backgroundColor: 'rgba(17,19,24,.95)', borderWidth: 0, textStyle: { color: '#fff' } },
    legend: { bottom: 0, textStyle: { color: '#94a3b8' } },
    series: [
      {
        type: 'pie',
        radius: ['48%', '72%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: true,
        label: { color: '#cbd5e1', formatter: '{b}' },
        itemStyle: { borderColor: '#191d24', borderWidth: 3 },
        data,
      },
    ],
    color: ['#4fd1a5', '#f7b955', '#5aa7ff', '#ff7f6e', '#a3e635', '#f472b6'],
  }
}

function RecordTable({ records }: { records: TravelExpenseRecord[] }) {
  return (
    <section className="rounded-lg border border-white/10 bg-panel/95 p-4 shadow-cockpit">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-white">报销明细样本</h2>
          <p className="mt-1 text-xs text-slate-400">当前筛选 {records.length.toLocaleString('zh-CN')} 张单据，展示前 12 条</p>
        </div>
        <span className="whitespace-nowrap rounded-md border border-mint/30 bg-mint/10 px-2 py-1 text-xs text-mint">可接报销系统数据</span>
      </div>
      <div className="dashboard-scrollbar overflow-auto">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs text-slate-400">
              <th className="py-3 pr-4 font-medium">单据号</th>
              <th className="py-3 pr-4 font-medium">员工</th>
              <th className="py-3 pr-4 font-medium">部门</th>
              <th className="py-3 pr-4 font-medium">城市</th>
              <th className="py-3 pr-4 font-medium">类型</th>
              <th className="py-3 pr-4 font-medium">金额</th>
              <th className="py-3 pr-4 font-medium">风险</th>
              <th className="py-3 pr-4 font-medium">状态</th>
              <th className="py-3 pr-4 font-medium">日期</th>
            </tr>
          </thead>
          <tbody>
            {records.slice(0, 12).map((record) => (
              <tr key={record.id} className="border-b border-white/[.06] text-slate-200">
                <td className="py-3 pr-4 font-mono text-xs text-slate-300">{record.id}</td>
                <td className="py-3 pr-4">{record.employee}</td>
                <td className="py-3 pr-4">{record.department}</td>
                <td className="py-3 pr-4">{record.city}</td>
                <td className="py-3 pr-4">{record.expenseType}</td>
                <td className="py-3 pr-4 text-white">{formatMoney(record.amount)}</td>
                <td className="py-3 pr-4">
                  <span className={`rounded-md px-2 py-1 text-xs ${record.riskLevel === '高风险' ? 'bg-coral/15 text-coral' : record.riskLevel === '关注' ? 'bg-amber/15 text-amber' : 'bg-mint/15 text-mint'}`}>
                    {record.riskLevel}
                  </span>
                </td>
                <td className="py-3 pr-4">{record.status}</td>
                <td className="py-3 pr-4">{record.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function App() {
  const records = useMemo(() => generateTravelRecords(3600), [])
  const months = useMemo(() => availableMonths(records), [records])
  const [filters, setFilters] = useState<DashboardFilters>({
    month: allOption,
    department: allOption,
    expenseType: allOption,
    riskLevel: allOption,
  })
  const filteredRecords = useMemo(() => applyFilters(records, filters), [records, filters])
  const summary = useMemo(() => buildDashboardSummary(filteredRecords), [filteredRecords])
  const insights = useMemo(() => buildAiInsights(summary, filteredRecords), [summary, filteredRecords])
  const mapOption = useMemo(() => makeMapOption(summary), [summary])
  const trendOption = useMemo(() => makeTrendOption(summary), [summary])
  const departmentOption = useMemo(() => makeBarOption(summary.departmentRanking, '#5aa7ff'), [summary])
  const typeOption = useMemo(() => makePieOption(summary.expenseTypeBreakdown), [summary])
  const riskOption = useMemo(() => makeBarOption(summary.riskBreakdown, '#ff7f6e'), [summary])

  const updateFilter = (key: keyof DashboardFilters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  return (
    <main className="min-h-screen px-4 py-5 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-5 rounded-lg border border-white/10 bg-panel/95 p-5 shadow-cockpit">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="rounded-md border border-mint/25 bg-mint/10 px-2 py-1 text-mint">财务中心</span>
                <span>费用报销数据清洗</span>
                <span>BI 看板</span>
                <span>AI 提效</span>
              </div>
              <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">森马集团数字化财务驾驶舱 Demo</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                给财务部看的费用运营工具：把报销单据清洗成可视化驾驶舱，快速回答“谁在出差、钱花在哪、哪里需要复核”。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4 xl:min-w-[540px]">
              <div className="rounded-lg border border-white/10 bg-ink p-3">
                <p className="text-xs text-slate-400">模拟单据</p>
                <p className="mt-1 text-xl font-semibold text-white">{records.length.toLocaleString('zh-CN')}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-ink p-3">
                <p className="text-xs text-slate-400">筛选结果</p>
                <p className="mt-1 text-xl font-semibold text-mint">{filteredRecords.length.toLocaleString('zh-CN')}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-ink p-3">
                <p className="text-xs text-slate-400">城市覆盖</p>
                <p className="mt-1 text-xl font-semibold text-amber">{summary.cityHeat.length}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-ink p-3">
                <p className="text-xs text-slate-400">数据来源</p>
                <p className="mt-1 text-xl font-semibold text-peacock">模拟数据</p>
              </div>
            </div>
          </div>
        </header>

        <ProductValueStrip />

        <section className="mb-5 rounded-lg border border-white/10 bg-panel/95 p-4 shadow-cockpit">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <Filter size={16} className="text-mint" />
            筛选条件
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            <FilterSelect label="月份" value={filters.month} options={months} onChange={(value) => updateFilter('month', value)} />
            <FilterSelect label="部门" value={filters.department} options={departments} onChange={(value) => updateFilter('department', value)} />
            <FilterSelect label="费用类型" value={filters.expenseType} options={expenseTypes} onChange={(value) => updateFilter('expenseType', value)} />
            <FilterSelect label="风险等级" value={filters.riskLevel} options={['正常', '关注', '高风险']} onChange={(value) => updateFilter('riskLevel', value)} />
          </div>
        </section>

        <section className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <KpiCard icon={<Database size={20} />} label="报销总金额" value={formatMoney(summary.kpis.totalAmount)} helper={`均单 ${formatMoney(summary.kpis.avgAmount)}`} tone="mint" />
          <KpiCard icon={<UsersRound size={20} />} label="出差人员" value={`${summary.kpis.travelerCount} 人`} helper={`均 ${summary.kpis.avgDays} 天`} tone="peacock" />
          <KpiCard icon={<MapPinned size={20} />} label="热点城市" value={summary.kpis.hotCity} helper={formatMoney(summary.kpis.hotCityAmount)} tone="amber" />
          <KpiCard icon={<AlertTriangle size={20} />} label="异常/关注单据" value={`${summary.kpis.riskRecordCount} 张`} helper="待复核优先" tone="coral" />
          <KpiCard icon={<TrendingUp size={20} />} label="环比波动" value={`${summary.kpis.monthOverMonth}%`} helper="按筛选月份" tone="mint" />
        </section>

        <section className="mb-5 grid gap-4 xl:grid-cols-[1.6fr_.9fr]">
          <MapPanel summary={summary} option={mapOption} />
          <section className="rounded-lg border border-white/10 bg-panel/95 p-4 shadow-cockpit">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <BrainCircuit size={18} className="text-mint" />
                  <h2 className="text-base font-semibold text-white">AI 财务洞察</h2>
                </div>
                <p className="mt-1 text-xs text-slate-400">规则型分析，后续可接企业知识库 / 大模型接口</p>
              </div>
              <span className="rounded-md border border-amber/30 bg-amber/10 px-2 py-1 text-xs text-amber">Demo</span>
            </div>
            <div className="space-y-3">
              {insights.map((insight) => (
                <InsightItem key={insight.title} insight={insight} />
              ))}
            </div>
          </section>
        </section>

        <section className="mb-5 grid gap-4 xl:grid-cols-3">
          <ChartPanel title="费用趋势与风险单据" subtitle="按月观察费用峰值和异常复核压力" option={trendOption} />
          <ChartPanel title="部门费用排行" subtitle="定位预算执行压力最大的业务部门" option={departmentOption} />
          <ChartPanel title="费用类型结构" subtitle="查看交通、住宿、招待等科目占比" option={typeOption} />
        </section>

        <section className="mb-5 grid gap-4 xl:grid-cols-[.9fr_1.4fr]">
          <ChartPanel title="风险等级金额分布" subtitle="高风险和关注单据形成复核池" option={riskOption} height={250} />
          <section className="rounded-lg border border-white/10 bg-panel/95 p-4 shadow-cockpit">
            <div className="mb-3 flex items-center gap-2">
              <Route size={18} className="text-amber" />
              <h2 className="text-base font-semibold text-white">后续扩展路径</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { icon: <FileSpreadsheet size={18} />, title: 'Excel / CSV 导入', text: '将报销系统导出数据映射为标准字段，自动校验缺失值和异常金额。' },
                { icon: <Building2 size={18} />, title: '业财接口打通', text: '对接费控、影像、发票、SAP / Oracle 等系统，形成财务闭环。' },
                { icon: <CalendarDays size={18} />, title: '月结效率看板', text: '把关账、付款、费用复核和凭证生成节点纳入过程监控。' },
              ].map((item) => (
                <article key={item.title} className="rounded-lg border border-white/10 bg-white/[.04] p-4">
                  <span className="mb-3 grid h-9 w-9 place-items-center rounded-lg border border-mint/25 bg-mint/10 text-mint">{item.icon}</span>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{item.text}</p>
                </article>
              ))}
            </div>
          </section>
        </section>

        <RecordTable records={filteredRecords} />
      </div>
    </main>
  )
}

export default App
