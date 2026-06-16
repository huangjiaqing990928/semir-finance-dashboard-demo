export type RiskLevel = '正常' | '关注' | '高风险'
export type ExpenseStatus = '审批中' | '待复核' | '已入账' | '已付款'
export type ExpenseType = '交通费' | '住宿费' | '餐饮费' | '招待费' | '市内交通' | '会务费'

export interface TravelExpenseRecord {
  id: string
  employee: string
  department: string
  city: string
  province: string
  amount: number
  days: number
  expenseType: ExpenseType
  transport: string
  status: ExpenseStatus
  riskLevel: RiskLevel
  date: string
  purpose: string
}

export interface DashboardFilters {
  month: string
  department: string
  expenseType: string
  riskLevel: string
}

export interface NamedMetric {
  name: string
  value: number
  count: number
}

export interface CityHeatMetric extends NamedMetric {
  province: string
  coordinate: [number, number]
  travelers: number
}

export interface MonthlyMetric {
  month: string
  amount: number
  count: number
  riskCount: number
}

export interface DashboardSummary {
  kpis: {
    totalAmount: number
    travelerCount: number
    hotCity: string
    hotCityAmount: number
    riskRecordCount: number
    avgAmount: number
    avgDays: number
    monthOverMonth: number
  }
  cityHeat: CityHeatMetric[]
  provinceHeat: NamedMetric[]
  monthlyTrend: MonthlyMetric[]
  departmentRanking: NamedMetric[]
  expenseTypeBreakdown: NamedMetric[]
  riskBreakdown: NamedMetric[]
  statusBreakdown: NamedMetric[]
}

export interface AiInsight {
  title: string
  detail: string
  action: string
  severity: 'info' | 'warning' | 'critical' | 'positive'
}

export const departments = [
  '财务共享中心',
  '零售运营中心',
  '供应链中心',
  '品牌事业部',
  '电商事业部',
  '商品企划部',
  '信息数字化部',
  '华东大区',
  '华南大区',
  '华北大区',
]

export const expenseTypes: ExpenseType[] = ['交通费', '住宿费', '餐饮费', '招待费', '市内交通', '会务费']
export const riskLevels: RiskLevel[] = ['正常', '关注', '高风险']
export const statuses: ExpenseStatus[] = ['审批中', '待复核', '已入账', '已付款']

export const cityCatalog = [
  { city: '上海', province: '上海', coordinate: [121.47, 31.23] as [number, number], weight: 1.65 },
  { city: '温州', province: '浙江', coordinate: [120.7, 27.99] as [number, number], weight: 1.55 },
  { city: '杭州', province: '浙江', coordinate: [120.15, 30.28] as [number, number], weight: 1.45 },
  { city: '宁波', province: '浙江', coordinate: [121.55, 29.87] as [number, number], weight: 1.2 },
  { city: '广州', province: '广东', coordinate: [113.26, 23.13] as [number, number], weight: 1.35 },
  { city: '深圳', province: '广东', coordinate: [114.06, 22.54] as [number, number], weight: 1.24 },
  { city: '北京', province: '北京', coordinate: [116.41, 39.9] as [number, number], weight: 1.1 },
  { city: '成都', province: '四川', coordinate: [104.07, 30.67] as [number, number], weight: 1.08 },
  { city: '重庆', province: '重庆', coordinate: [106.55, 29.56] as [number, number], weight: 1.02 },
  { city: '南京', province: '江苏', coordinate: [118.8, 32.06] as [number, number], weight: 1.16 },
  { city: '苏州', province: '江苏', coordinate: [120.58, 31.3] as [number, number], weight: 1.18 },
  { city: '武汉', province: '湖北', coordinate: [114.31, 30.52] as [number, number], weight: 1.04 },
  { city: '长沙', province: '湖南', coordinate: [112.94, 28.23] as [number, number], weight: 0.92 },
  { city: '郑州', province: '河南', coordinate: [113.62, 34.75] as [number, number], weight: 0.9 },
  { city: '西安', province: '陕西', coordinate: [108.94, 34.34] as [number, number], weight: 0.88 },
  { city: '青岛', province: '山东', coordinate: [120.38, 36.07] as [number, number], weight: 0.86 },
  { city: '济南', province: '山东', coordinate: [117.12, 36.65] as [number, number], weight: 0.82 },
  { city: '合肥', province: '安徽', coordinate: [117.23, 31.82] as [number, number], weight: 0.82 },
  { city: '福州', province: '福建', coordinate: [119.3, 26.08] as [number, number], weight: 0.82 },
  { city: '厦门', province: '福建', coordinate: [118.08, 24.48] as [number, number], weight: 0.86 },
  { city: '南昌', province: '江西', coordinate: [115.86, 28.68] as [number, number], weight: 0.78 },
  { city: '天津', province: '天津', coordinate: [117.2, 39.13] as [number, number], weight: 0.72 },
  { city: '沈阳', province: '辽宁', coordinate: [123.43, 41.8] as [number, number], weight: 0.68 },
  { city: '哈尔滨', province: '黑龙江', coordinate: [126.64, 45.76] as [number, number], weight: 0.62 },
  { city: '昆明', province: '云南', coordinate: [102.83, 24.88] as [number, number], weight: 0.66 },
  { city: '贵阳', province: '贵州', coordinate: [106.63, 26.65] as [number, number], weight: 0.6 },
  { city: '南宁', province: '广西', coordinate: [108.37, 22.82] as [number, number], weight: 0.6 },
  { city: '海口', province: '海南', coordinate: [110.2, 20.04] as [number, number], weight: 0.55 },
  { city: '兰州', province: '甘肃', coordinate: [103.84, 36.06] as [number, number], weight: 0.52 },
  { city: '乌鲁木齐', province: '新疆', coordinate: [87.62, 43.82] as [number, number], weight: 0.48 },
]

const employees = [
  '张怡',
  '陈舟',
  '林澈',
  '周闻',
  '吴越',
  '许诺',
  '赵宁',
  '马骁',
  '沈青',
  '宋岚',
  '黄远',
  '顾南',
  '梁可',
  '邵峰',
  '潘予',
  '何川',
  '陆星',
  '唐季',
  '秦安',
  '叶临',
]

const transports = ['高铁', '飞机', '网约车', '自驾', '城际巴士']
const purposes = ['门店巡检', '供应商走访', '月结支持', '新品订货会', '系统上线支持', '区域经营复盘', '费用制度宣贯']

function seededUnit(index: number, salt: number) {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

function pickWeightedCity(index: number) {
  const total = cityCatalog.reduce((sum, item) => sum + item.weight, 0)
  let cursor = seededUnit(index, 3) * total
  for (const item of cityCatalog) {
    cursor -= item.weight
    if (cursor <= 0) return item
  }
  return cityCatalog[0]
}

function pad(value: number) {
  return String(value).padStart(2, '0')
}

export function generateTravelRecords(count = 3200): TravelExpenseRecord[] {
  return Array.from({ length: count }, (_, index) => {
    const city = pickWeightedCity(index)
    const department = departments[Math.floor(seededUnit(index, 5) * departments.length)]
    const expenseType = expenseTypes[Math.floor(seededUnit(index, 7) * expenseTypes.length)]
    const transport = transports[Math.floor(seededUnit(index, 9) * transports.length)]
    const employee = employees[index % employees.length]
    const month = 1 + Math.floor(seededUnit(index, 11) * 6)
    const day = 1 + Math.floor(seededUnit(index, 13) * 27)
    const days = 1 + Math.floor(seededUnit(index, 17) * 5)
    const typeFactor = expenseType === '交通费' ? 1.45 : expenseType === '住宿费' ? 1.2 : expenseType === '招待费' ? 1.55 : 0.78
    const amount = Math.round((620 + seededUnit(index, 19) * 9200) * city.weight * typeFactor + days * 380)
    const riskLevel: RiskLevel =
      amount > 15500 || (expenseType === '招待费' && amount > 9000)
        ? '高风险'
        : amount > 8200 || seededUnit(index, 23) > 0.86
          ? '关注'
          : '正常'
    const status: ExpenseStatus =
      riskLevel === '高风险'
        ? '待复核'
        : statuses[Math.floor(seededUnit(index, 29) * statuses.length)]

    return {
      id: `SM-FE-${String(index + 1).padStart(5, '0')}`,
      employee,
      department,
      city: city.city,
      province: city.province,
      amount,
      days,
      expenseType,
      transport,
      status,
      riskLevel,
      date: `2026-${pad(month)}-${pad(day)}`,
      purpose: purposes[Math.floor(seededUnit(index, 31) * purposes.length)],
    }
  })
}

export function applyFilters(records: TravelExpenseRecord[], filters: DashboardFilters) {
  return records.filter((record) => {
    const monthMatched = !filters.month || filters.month === '全部' || record.date.startsWith(filters.month)
    const departmentMatched =
      !filters.department || filters.department === '全部' || record.department === filters.department
    const typeMatched = !filters.expenseType || filters.expenseType === '全部' || record.expenseType === filters.expenseType
    const riskMatched = !filters.riskLevel || filters.riskLevel === '全部' || record.riskLevel === filters.riskLevel

    return monthMatched && departmentMatched && typeMatched && riskMatched
  })
}

function byAmountDesc<T extends { value: number }>(items: T[]) {
  return [...items].sort((a, b) => b.value - a.value)
}

function pushMetric(map: Map<string, NamedMetric>, name: string, amount: number) {
  const metric = map.get(name) ?? { name, value: 0, count: 0 }
  metric.value += amount
  metric.count += 1
  map.set(name, metric)
}

export function buildDashboardSummary(records: TravelExpenseRecord[]): DashboardSummary {
  const totalAmount = records.reduce((sum, record) => sum + record.amount, 0)
  const travelerCount = new Set(records.map((record) => `${record.employee}-${record.department}`)).size
  const riskRecordCount = records.filter((record) => record.riskLevel !== '正常').length
  const cityMap = new Map<string, CityHeatMetric>()
  const provinceMap = new Map<string, NamedMetric>()
  const departmentMap = new Map<string, NamedMetric>()
  const expenseTypeMap = new Map<string, NamedMetric>()
  const riskMap = new Map<string, NamedMetric>()
  const statusMap = new Map<string, NamedMetric>()
  const monthMap = new Map<string, MonthlyMetric>()

  for (const record of records) {
    const cityMeta = cityCatalog.find((item) => item.city === record.city) ?? cityCatalog[0]
    const cityMetric = cityMap.get(record.city) ?? {
      name: record.city,
      value: 0,
      count: 0,
      province: record.province,
      coordinate: cityMeta.coordinate,
      travelers: 0,
    }
    cityMetric.value += record.amount
    cityMetric.count += 1
    cityMetric.travelers += record.days
    cityMap.set(record.city, cityMetric)

    pushMetric(provinceMap, record.province, record.amount)
    pushMetric(departmentMap, record.department, record.amount)
    pushMetric(expenseTypeMap, record.expenseType, record.amount)
    pushMetric(riskMap, record.riskLevel, record.amount)
    pushMetric(statusMap, record.status, record.amount)

    const month = record.date.slice(0, 7)
    const monthMetric = monthMap.get(month) ?? { month, amount: 0, count: 0, riskCount: 0 }
    monthMetric.amount += record.amount
    monthMetric.count += 1
    monthMetric.riskCount += record.riskLevel === '正常' ? 0 : 1
    monthMap.set(month, monthMetric)
  }

  const cityHeat = byAmountDesc([...cityMap.values()])
  const monthlyTrend = [...monthMap.values()].sort((a, b) => a.month.localeCompare(b.month))
  const latestMonth = monthlyTrend.at(-1)?.amount ?? 0
  const previousMonth = monthlyTrend.at(-2)?.amount ?? latestMonth
  const monthOverMonth = previousMonth === 0 ? 0 : Number((((latestMonth - previousMonth) / previousMonth) * 100).toFixed(1))

  return {
    kpis: {
      totalAmount,
      travelerCount,
      hotCity: cityHeat[0]?.name ?? '暂无',
      hotCityAmount: cityHeat[0]?.value ?? 0,
      riskRecordCount,
      avgAmount: records.length ? Math.round(totalAmount / records.length) : 0,
      avgDays: records.length ? Number((records.reduce((sum, record) => sum + record.days, 0) / records.length).toFixed(1)) : 0,
      monthOverMonth,
    },
    cityHeat,
    provinceHeat: byAmountDesc([...provinceMap.values()]),
    monthlyTrend,
    departmentRanking: byAmountDesc([...departmentMap.values()]),
    expenseTypeBreakdown: byAmountDesc([...expenseTypeMap.values()]),
    riskBreakdown: byAmountDesc([...riskMap.values()]),
    statusBreakdown: byAmountDesc([...statusMap.values()]),
  }
}

export function buildAiInsights(summary: DashboardSummary, records: TravelExpenseRecord[]): AiInsight[] {
  const hotCity = summary.cityHeat[0]
  const highRiskCount = records.filter((record) => record.riskLevel === '高风险').length
  const topDepartment = summary.departmentRanking[0]
  const topExpenseType = summary.expenseTypeBreakdown[0]

  return [
    {
      title: `${summary.kpis.hotCity}成为本期差旅热点`,
      detail: hotCity
        ? `${hotCity.name}累计报销 ${formatMoney(hotCity.value)}，涉及 ${hotCity.count} 张单据，建议结合门店巡检、供应链走访计划复盘差旅必要性。`
        : '当前筛选条件下暂无差旅热点。',
      action: '对热点城市建立预算阈值和部门出差计划联动提醒。',
      severity: 'info',
    },
    {
      title: `发现 ${highRiskCount} 张高风险报销单`,
      detail: `系统按金额阈值、招待费占比和待复核状态识别风险，当前高风险单据需优先穿透到影像、发票和审批流。`,
      action: '推送给费用会计复核，并沉淀为报销系统前置校验规则。',
      severity: highRiskCount > 0 ? 'critical' : 'positive',
    },
    {
      title: `${topDepartment?.name ?? '暂无部门'}费用占用最高`,
      detail: topDepartment
        ? `${topDepartment.name}当前金额 ${formatMoney(topDepartment.value)}，单据 ${topDepartment.count} 张，可作为预算执行和区域经营复盘重点。`
        : '当前筛选条件下暂无部门费用数据。',
      action: '按部门预算、项目目的和城市热度生成专项分析清单。',
      severity: 'warning',
    },
    {
      title: `可扩展为企业知识库和大模型接口`,
      detail: `当前为规则型 AI 洞察 Demo；后续可接入企业知识库 / 大模型接口，自动读取制度、合同、审批意见并生成复核建议。主要费用类型为 ${topExpenseType?.name ?? '暂无'}。`,
      action: '保留 API 接入层，先从月结分析、异常解释、费用制度问答三个低风险场景试点。',
      severity: 'positive',
    },
  ]
}

export function formatMoney(value: number) {
  if (value >= 10000) return `${(value / 10000).toFixed(1)} 万`
  return `${value.toLocaleString('zh-CN')} 元`
}

export function availableMonths(records: TravelExpenseRecord[]) {
  return [...new Set(records.map((record) => record.date.slice(0, 7)))].sort()
}
