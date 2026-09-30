import { useEffect, useRef } from 'react'
import { TICKER_ITEMS } from '../data.js'

export function TopBar() {
  const ref = useRef(null)

  useEffect(() => {
    function sync() {
      if (ref.current) document.documentElement.style.setProperty('--header-h', ref.current.offsetHeight + 'px')
    }
    sync()
    window.addEventListener('resize', sync)
    document.fonts?.ready?.then(sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  return (
    <header ref={ref} className="sticky top-0 z-40 bg-surface dark:bg-surface-dark border-b border-border dark:border-border-dark">
      <div className="max-w-[1280px] mx-auto px-5 flex items-center justify-between gap-4 py-3.5">
        <div className="flex items-center gap-3">
          <img
            src="/images/brand/logo.jpg"
            alt="The Souled Store"
            className="w-10 h-10 rounded-[10px] object-cover flex-none shadow-card dark:shadow-cardDark"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div>
            <div className="text-[24px] leading-none font-display font-extrabold tracking-tight">TSS DropDesk</div>
            <div className="text-[13px] text-muted dark:text-muted-dark mt-0.5">The Souled Store &middot; trend response desk</div>
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <span className="hidden sm:inline text-[12.5px] uppercase tracking-wide text-muted dark:text-muted-dark border border-dashed border-border dark:border-border-dark px-2.5 py-1 rounded-full whitespace-nowrap">
            Illustrative case study data
          </span>
          <div className="flex items-center gap-1.5 text-[14.5px] text-ink-2 dark:text-ink-dark2">
            <span className="relative w-2 h-2 rounded-full bg-good tss-pulse-ring text-good flex-none" />
            <span className="whitespace-nowrap">1 launch live</span>
          </div>
        </div>
      </div>
      <Ticker />
    </header>
  )
}

function Ticker() {
  const items = TICKER_ITEMS.map((it, i) => (
    <span key={i} className="text-[14px] text-ink-2 dark:text-ink-dark2 inline-flex items-center gap-2">
      &#9679; {typeof it === 'string' ? it : (<><b className="text-ink dark:text-ink-dark font-semibold">{it.bold}</b>{it.text}</>)}
    </span>
  ))
  return (
    <div className="tss-ticker bg-surface-2 dark:bg-surface-dark2 border-t border-border dark:border-border-dark overflow-hidden whitespace-nowrap">
      <div className="tss-ticker-track inline-flex gap-12 py-2">
        {items}
        {items}
      </div>
    </div>
  )
}

const TABS = [
  { id: 'command', label: 'Command Center' },
  { id: 'speed', label: 'Speed Benchmark' },
  { id: 'war', label: '24-Hr War Room' },
  { id: 'cohort', label: 'Cohort & Retention' },
  { id: 'governance', label: 'Catalog & Governance' },
  { id: 'ai', label: 'AI Copilot' },
]

export function TabNav({ active, onSelect }) {
  return (
    <nav
      className="sticky z-30 bg-brand shadow-[0_2px_10px_-2px_rgba(23,20,18,0.3)]"
      style={{ top: 'var(--header-h, 96px)' }}
    >
      <div className="max-w-[1280px] mx-auto px-5 flex flex-wrap gap-2 py-2.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            aria-selected={active === t.id}
            className={`font-display font-bold text-[14.5px] whitespace-nowrap px-4 py-2 rounded-full transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.08)] ${
              active === t.id ? 'bg-ink text-white dark:bg-page dark:text-ink' : 'bg-white text-brand-dark hover:opacity-90'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

export { TABS }
