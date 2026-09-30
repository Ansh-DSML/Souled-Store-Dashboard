import { useMemo, useState } from 'react'
import { OPPORTUNITIES, PIPELINE_COLUMNS } from '../data.js'
import { useNow, fmtDuration } from '../hooks/useNow.js'
import { Badge } from './ui.jsx'

function slaStatus(elapsed, slaMs, done) {
  if (done) return { label: 'Closed', kind: 'neutral' }
  const ratio = elapsed / slaMs
  if (ratio >= 1) return { label: 'Breached', kind: 'critical' }
  if (ratio >= 0.8) return { label: 'At risk', kind: 'warning' }
  return { label: 'On track', kind: 'good' }
}

function ImgThumb({ id, image }) {
  const [broken, setBroken] = useState(false)
  if (broken) return null
  return (
    <img
      src={`/images/products/${image}`}
      alt=""
      className="w-full h-24 object-cover rounded-md mb-1.5 bg-surface-2 dark:bg-surface-dark2"
      onError={() => setBroken(true)}
    />
  )
}

export function Kanban() {
  const now = useNow()
  const pageLoad = useMemo(() => Date.now(), [])

  const cards = OPPORTUNITIES.map((o) => {
    const start = pageLoad - o.agoMs
    const elapsed = now - start
    return { ...o, elapsed, status: slaStatus(elapsed, o.slaMs, o.done) }
  })

  const breaches = cards.filter((c) => !c.done && c.status.kind === 'critical').length
  const counts = {
    triage: cards.filter((c) => c.col === 'signal' || c.col === 'triage').length,
    decision: cards.filter((c) => c.col === 'decision').length,
    production: cards.filter((c) => c.col === 'production').length,
    live: cards.filter((c) => c.col === 'live').length,
  }

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(168px,1fr))] gap-3 mb-4">
        <KpiTile label="In triage" value={counts.triage} note="Signal detected, not yet a decision" />
        <KpiTile label="Awaiting decision" value={counts.decision} note="Rights or feasibility gated" />
        <KpiTile label="In production" value={counts.production} note="Cleared to build" />
        <KpiTile label="Live now" value={counts.live} note="Inside the 24 hour read window" />
        <KpiTile
          label="SLA breaches"
          value={breaches}
          note="Needs an owner today"
          highlight={breaches > 0 ? 'critical' : 'good'}
        />
      </div>

      {/* Fixed breakpoint columns (1 / 2 / 3 / 6) so a lone last column never
          leaves an empty grid track next to it. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 items-start">
        {PIPELINE_COLUMNS.map((col) => {
          const items = cards.filter((c) => c.col === col.id)
          const isLive = col.id === 'live'
          return (
            <div
              key={col.id}
              className={`rounded-xl p-2.5 flex flex-col gap-2.5 min-h-[80px] ${
                isLive ? 'bg-brand-soft dark:bg-brand-softdark' : 'bg-surface-2 dark:bg-surface-dark2'
              }`}
            >
              <div className="flex items-center justify-between px-1 pt-1">
                <h4 className={`text-[14px] uppercase tracking-wide font-semibold ${isLive ? 'text-brand-dark dark:text-brand' : 'text-ink-2 dark:text-ink-dark2'}`}>
                  {col.label}
                </h4>
                <span className="mono-nums text-[12.5px] text-muted dark:text-muted-dark bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-full px-2 py-0.5">
                  {items.length}
                </span>
              </div>
              {items.map((o) => (
                <div
                  key={o.id}
                  className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-lg p-3.5 flex flex-col gap-2.5 min-h-[280px] shadow-card dark:shadow-cardDark hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  <ImgThumb image={o.image} />
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[12px] font-semibold text-muted dark:text-muted-dark whitespace-nowrap">{o.id}</span>
                    <Badge kind={o.track === 'fast' ? 'fast' : 'rights'}>{o.track === 'fast' ? 'Fast track' : 'Rights-gated'}</Badge>
                  </div>
                  <div className="font-display font-extrabold text-[16.5px] leading-tight">{o.title}</div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] text-muted dark:text-muted-dark">{o.pod}</span>
                    <span className="mono-nums text-[12.5px] font-semibold">{fmtDuration(o.elapsed)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] text-muted dark:text-muted-dark">SLA</span>
                    <Badge kind={o.status.kind}>{o.status.label}</Badge>
                  </div>
                  <div className="mt-auto text-[13px] text-ink-2 dark:text-ink-dark2 border-t border-dashed border-border dark:border-border-dark pt-2">
                    {o.next}
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function KpiTile({ label, value, note, highlight }) {
  const hl = {
    good: 'bg-good-soft dark:bg-good-softdark',
    critical: 'bg-critical/10 text-critical-ink dark:text-critical-inkdark ring-1 ring-critical/25',
  }
  return (
    <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl shadow-card dark:shadow-cardDark p-4 flex flex-col gap-1.5">
      <div className="text-[13px] font-semibold uppercase tracking-wide text-muted dark:text-muted-dark">{label}</div>
      <div className={`font-display font-extrabold text-[30px] leading-none w-fit ${highlight ? `inline-block rounded-lg px-2.5 py-0.5 ${hl[highlight]}` : ''}`}>
        {value}
      </div>
      <div className="text-[13px] text-muted dark:text-muted-dark">{note}</div>
    </div>
  )
}
