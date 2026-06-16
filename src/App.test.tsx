import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import App from './App'

afterEach(() => {
  cleanup()
})

describe('Semir finance dashboard shell', () => {
  test('renders the finance cockpit title, filters, AI insights, and record table', async () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /森马集团数字化财务驾驶舱 Demo/ })).toBeInTheDocument()
    expect(screen.getByLabelText('月份')).toBeInTheDocument()
    expect(screen.getByLabelText('部门')).toBeInTheDocument()
    expect(screen.getByText('AI 财务洞察')).toBeInTheDocument()
    expect(screen.getByText('报销明细样本')).toBeInTheDocument()
    expect(screen.getByText(/当前筛选/)).toBeInTheDocument()
  })

  test('explains the user value and how to read the heat map', async () => {
    render(<App />)

    expect(screen.getAllByText('它能帮财务部做什么').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/从报销系统到管理决策/).length).toBeGreaterThan(0)
    expect(screen.getAllByText('地图解读').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/颜色越亮代表费用越集中/).length).toBeGreaterThan(0)
    expect(screen.getAllByText('城市热度 Top 5').length).toBeGreaterThan(0)
    expect(screen.getByTestId('map-panel')).toBeInTheDocument()
  })

  test('uses presentation-ready Chinese copy for data source and system access badge', async () => {
    render(<App />)

    expect(screen.getByText('数据来源')).toBeInTheDocument()
    expect(screen.getByText('模拟数据')).toBeInTheDocument()
    expect(screen.getByText('可接报销系统数据')).toBeInTheDocument()
    expect(screen.queryByText('Mock')).not.toBeInTheDocument()
    expect(screen.queryByText('嘲笑')).not.toBeInTheDocument()
    expect(screen.queryByText('可报接销系统')).not.toBeInTheDocument()
    expect(screen.queryByText('可接报销系统')).not.toBeInTheDocument()
  })
})
