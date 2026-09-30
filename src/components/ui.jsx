export function Card({ children, className = '', padded = true }) {
  return (
    <div
      className={`bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl shadow-card dark:shadow-cardDark ${
        padded ? 'p-4' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function StatTile({ label, value, unit, note, delta, highlight }) {
  const hlClasses = {
    brand: 'bg-brand-soft dark:bg-brand-softdark',
    good: 'bg-good-soft dark:bg-good-softdark',
    critical: 'bg-critical/10 text-critical-ink dark:text-critical-inkdark ring-1 ring-critical/25',
  }
  return (
    <Card className="flex flex-col gap-1.5">
      <div className="text-[13px] font-semibold uppercase tracking-wide text-muted dark:text-muted-dark">{label}</div>
      <div
        className={`font-display font-extrabold text-[30px] leading-none tracking-tight w-fit ${
          highlight ? `inline-block rounded-lg px-2.5 py-0.5 ${hlClasses[highlight] || ''}` : ''
        }`}
      >
        {value}
        {unit && <small className="text-[15px] font-bold text-muted dark:text-muted-dark ml-0.5">{unit}</small>}
      </div>
      {delta && (
        <span className="text-[13px] font-semibold w-fit px-2 py-0.5 rounded-full bg-good-soft dark:bg-good-softdark text-good">
          {delta}
        </span>
      )}
      {note && <div className="text-[13px] text-muted dark:text-muted-dark">{note}</div>}
    </Card>
  )
}

const BADGE_STYLES = {
  fast: 'bg-brand-soft dark:bg-brand-softdark text-brand-dark dark:text-brand',
  rights: 'bg-graphite-soft dark:bg-graphite-softdark text-graphite dark:text-graphite-dark',
  good: 'bg-good-soft dark:bg-good-softdark text-good',
  warning: 'bg-warning text-warning-fillink font-extrabold',
  critical: 'bg-critical text-white tss-glow-critical',
  neutral: 'bg-surface-2 dark:bg-surface-dark2 text-ink-2 dark:text-ink-dark2',
}

export function Badge({ kind = 'neutral', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[12.5px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md whitespace-nowrap ${BADGE_STYLES[kind]}`}
    >
      {children}
    </span>
  )
}

export function Explainer({ children }) {
  return (
    <div className="flex gap-2.5 items-start bg-brand-soft dark:bg-brand-softdark border border-border dark:border-border-dark rounded-lg px-3.5 py-3 mt-3 mb-4">
      <div className="flex-none w-[22px] h-[22px] rounded-full bg-brand text-white flex items-center justify-center font-display font-extrabold text-[14.5px] mt-px">
        i
      </div>
      <p className="text-[14.5px] leading-relaxed">
        <b className="block font-display font-bold uppercase text-[12.5px] tracking-wide mb-0.5 text-brand-dark dark:text-brand">
          What this tab shows
        </b>
        {children}
      </p>
    </div>
  )
}

export function PanelHead({ title, sub }) {
  return (
    <div className="flex items-baseline justify-between gap-4 flex-wrap mb-2.5">
      <div>
        <h2 className="text-[clamp(21px,2.8vw,26px)]">{title}</h2>
        {sub && <p className="text-muted dark:text-muted-dark text-[14.5px] max-w-[62ch]">{sub}</p>}
      </div>
    </div>
  )
}

export function StatGrid({ children, className = '' }) {
  return <div className={`grid grid-cols-[repeat(auto-fit,minmax(168px,1fr))] gap-3 ${className}`}>{children}</div>
}

export function Table({ head, children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[14.5px]">
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="text-left px-2.5 py-2 border-b border-border dark:border-border-dark text-[12.5px] uppercase tracking-wide text-muted dark:text-muted-dark font-semibold"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function Td({ children, num, className = '' }) {
  return (
    <td
      className={`px-2.5 py-2 border-b border-border dark:border-border-dark align-top last:border-0 ${
        num ? 'text-right mono-nums' : ''
      } ${className}`}
    >
      {children}
    </td>
  )
}

export function ChartTitle({ title, sub }) {
  return (
    <div className="mb-2.5">
      <div className="font-bold text-[15.5px]">{title}</div>
      {sub && <div className="text-[13px] text-muted dark:text-muted-dark">{sub}</div>}
    </div>
  )
}
