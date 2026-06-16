import { describe, expect, test } from 'vitest'
import {
  applyFilters,
  buildAiInsights,
  buildDashboardSummary,
  generateTravelRecords,
  type DashboardFilters,
  type TravelExpenseRecord,
} from './finance'

const fixtureRecords: TravelExpenseRecord[] = [
  {
    id: 'EX-001',
    employee: '张怡',
    department: '财务共享中心',
    city: '上海',
    province: '上海',
    amount: 3200,
    days: 2,
    expenseType: '住宿费',
    transport: '高铁',
    status: '已入账',
    riskLevel: '正常',
    date: '2026-03-12',
    purpose: '月结支持',
  },
  {
    id: 'EX-002',
    employee: '陈舟',
    department: '零售运营中心',
    city: '广州',
    province: '广东',
    amount: 18800,
    days: 4,
    expenseType: '交通费',
    transport: '飞机',
    status: '待复核',
    riskLevel: '高风险',
    date: '2026-03-18',
    purpose: '门店巡检',
  },
  {
    id: 'EX-003',
    employee: '林澈',
    department: '供应链中心',
    city: '杭州',
    province: '浙江',
    amount: 7600,
    days: 3,
    expenseType: '招待费',
    transport: '网约车',
    status: '审批中',
    riskLevel: '关注',
    date: '2026-04-08',
    purpose: '供应商走访',
  },
]

describe('finance dashboard data logic', () => {
  test('generates a large, deterministic travel expense dataset', () => {
    const records = generateTravelRecords(2600)

    expect(records).toHaveLength(2600)
    expect(new Set(records.map((record) => record.id)).size).toBe(2600)
    expect(new Set(records.map((record) => record.city)).size).toBeGreaterThan(18)
    expect(new Set(records.map((record) => record.department)).size).toBeGreaterThan(6)
    expect(records.every((record) => record.amount > 0 && record.days >= 1)).toBe(true)
  })

  test('filters records by month, department, expense type, and risk level', () => {
    const filters: DashboardFilters = {
      month: '2026-03',
      department: '零售运营中心',
      expenseType: '交通费',
      riskLevel: '高风险',
    }

    const result = applyFilters(fixtureRecords, filters)

    expect(result).toEqual([fixtureRecords[1]])
  })

  test('builds KPI, map, trend, department, type, and risk summaries from records', () => {
    const summary = buildDashboardSummary(fixtureRecords)

    expect(summary.kpis.totalAmount).toBe(29600)
    expect(summary.kpis.travelerCount).toBe(3)
    expect(summary.kpis.hotCity).toBe('广州')
    expect(summary.kpis.riskRecordCount).toBe(2)
    expect(summary.cityHeat.find((item) => item.name === '广州')?.value).toBe(18800)
    expect(summary.monthlyTrend.map((item) => item.month)).toEqual(['2026-03', '2026-04'])
    expect(summary.expenseTypeBreakdown.find((item) => item.name === '交通费')?.value).toBe(18800)
  })

  test('builds rule-based AI insights with finance-facing actions', () => {
    const summary = buildDashboardSummary(fixtureRecords)
    const insights = buildAiInsights(summary, fixtureRecords)

    expect(insights).toHaveLength(4)
    expect(insights[0].title).toContain('广州')
    expect(insights.some((insight) => insight.action.includes('复核'))).toBe(true)
    expect(insights.some((insight) => insight.detail.includes('大模型接口'))).toBe(true)
  })
})
