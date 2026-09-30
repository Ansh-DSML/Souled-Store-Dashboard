import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  LineChart,
  Line,
  Legend,
  Cell,
} from 'recharts'
import { useIsDark, useSeriesColors } from '../hooks/useIsDark.js'

function useChrome() {
  const isDark = useIsDark()
  return {
    grid: isDark ? '#332e2b' : '#e7e2dc',
    axis: isDark ? '#948c86' : '#8c847e',
    tooltipBg: isDark ? '#fdfcfb' : '#171412',
    tooltipInk: isDark ? '#171412' : '#faf9f7',
  }
}

function ChartTooltip({ active, payload, label, chrome, suffix }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div
      className="text-[13px] rounded-lg px-2.5 py-2 shadow-card"
      style={{ background: chrome.tooltipBg, color: chrome.tooltipInk }}
    >
      {label && <div className="font-semibold mb-1">{label}</div>}
      {payload.map((p) => (
        <div key={p.dataKey || p.name}>
          {p.name}: <b>{typeof p.value === 'number' ? p.value.toLocaleString() : p.value}{suffix || ''}</b>
        </div>
      ))}
    </div>
  )
}

// Single-row horizontal stacked bar: used by Speed Benchmark for the old vs
// fast-track process breakdowns.
export function StackedStageBar({ stages, unit }) {
  const chrome = useChrome()
  const series = useSeriesColors()
  const row = { name: 'stages' }
  stages.forEach((s) => (row[s.name] = s.v))
  return (
    <div>
      <ResponsiveContainer width="100%" height={70}>
        <BarChart data={[row]} layout="vertical" margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" hide />
          <Tooltip content={<ChartTooltip chrome={chrome} suffix={unit === 'hrs' ? 'h' : 'd'} />} cursor={false} />
          {stages.map((s, i) => (
            <Bar key={s.name} dataKey={s.name} stackId="a" fill={series[i % series.length]} isAnimationActive={false} radius={i === 0 ? [4, 0, 0, 4] : i === stages.length - 1 ? [0, 4, 4, 0] : 0} />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-3 mt-2">
        {stages.map((s, i) => (
          <div key={s.name} className="flex items-center gap-1.5 text-[13px] text-ink-2 dark:text-ink-dark2">
            <span className="w-2.5 h-2.5 rounded-sm flex-none" style={{ background: series[i % series.length] }} />
            {s.name} ({s.v}{unit === 'hrs' ? 'h' : 'd'})
          </div>
        ))}
      </div>
    </div>
  )
}

export function HourlyOrdersChart({ labels, data }) {
  const chrome = useChrome()
  const series = useSeriesColors()
  const rows = labels.map((l, i) => ({ hour: l, orders: data[i] }))
  return (
    <ResponsiveContainer width="100%" height={230}>
      <AreaChart data={rows} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="ordersFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={series[0]} stopOpacity={0.28} />
            <stop offset="100%" stopColor={series[0]} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={chrome.grid} vertical={false} />
        <XAxis dataKey="hour" tick={{ fontSize: 10, fill: chrome.axis, fontFamily: 'Inter, sans-serif' }} axisLine={{ stroke: chrome.axis }} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: chrome.axis, fontFamily: 'Inter, sans-serif' }} axisLine={false} tickLine={false} width={36} />
        <Tooltip content={<ChartTooltip chrome={chrome} suffix=" orders" />} />
        <Area type="monotone" dataKey="orders" name="Orders" stroke={series[0]} strokeWidth={2} fill="url(#ordersFill)" dot={{ r: 2.6, fill: series[0] }} activeDot={{ r: 4 }} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function LabeledBarChart({ data, pct }) {
  const chrome = useChrome()
  const series = useSeriesColors()
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 16, right: 8, bottom: 8, left: 0 }}>
        <CartesianGrid stroke={chrome.grid} vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 9.5, fill: chrome.axis }} axisLine={{ stroke: chrome.axis }} tickLine={false} interval={0} height={50} tickFormatter={(v) => v} />
        <YAxis tick={{ fontSize: 10, fill: chrome.axis }} axisLine={false} tickLine={false} width={36} tickFormatter={(v) => (pct ? v + '%' : v)} />
        <Tooltip content={<ChartTooltip chrome={chrome} suffix={pct ? '%' : ''} />} cursor={{ fill: chrome.grid, opacity: 0.4 }} />
        <Bar dataKey="v" name="Value" isAnimationActive={false} radius={[4, 4, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={series[i % series.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// Plain funnel (not a Recharts primitive): a stack of bars, each width scaled
// to the top step, with the drop from the previous step shown on hover.
export function Funnel({ steps }) {
  const series = useSeriesColors()
  const max = steps[0].v
  return (
    <div className="flex flex-col gap-2">
      {steps.map((s, i) => {
        const pct = Math.max((s.v / max) * 100, 6)
        const drop = i > 0 ? ((1 - s.v / steps[i - 1].v) * 100).toFixed(1) : null
        return (
          <div key={s.name} className="group relative">
            <div
              className="h-9 rounded-md flex items-center px-3 text-white text-[13.5px] font-semibold transition-[width] cursor-default"
              style={{ width: pct + '%', background: series[i % series.length], minWidth: 120 }}
              title={`${s.name}: ${s.v.toLocaleString()}${drop ? `, ${drop}% drop from previous step` : ''}`}
            >
              {s.name}, {s.v.toLocaleString()}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function RetentionChart({ days, trend, baseline }) {
  const chrome = useChrome()
  const series = useSeriesColors()
  const rows = days.map((d, i) => ({ day: d, 'Trend cohort, OPP-021 buyers': trend[i], 'Baseline new-customer buyers': baseline[i] }))
  return (
    <ResponsiveContainer width="100%" height={230}>
      <LineChart data={rows} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
        <CartesianGrid stroke={chrome.grid} vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 10, fill: chrome.axis }} axisLine={{ stroke: chrome.axis }} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: chrome.axis }} axisLine={false} tickLine={false} width={32} tickFormatter={(v) => v + '%'} />
        <Tooltip content={<ChartTooltip chrome={chrome} suffix="%" />} />
        <Legend wrapperStyle={{ fontSize: 11.5, color: chrome.axis }} />
        <Line type="monotone" dataKey="Trend cohort, OPP-021 buyers" stroke={series[0]} strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} />
        <Line type="monotone" dataKey="Baseline new-customer buyers" stroke={series[1]} strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
