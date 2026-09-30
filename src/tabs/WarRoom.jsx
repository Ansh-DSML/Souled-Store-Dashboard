import { useMemo, useState } from 'react'
import { PanelHead, Explainer, Card, StatTile, StatGrid, ChartTitle, Badge } from '../components/ui.jsx'
import { HourlyOrdersChart, LabeledBarChart, Funnel } from '../components/charts.jsx'
import { useNow, fmtDuration } from '../hooks/useNow.js'
import { WAR_ROOM } from '../data.js'

function HeroImage() {
  const [broken, setBroken] = useState(false)
  if (broken) return null
  return (
    <img
      src="/images/hero/opp-021-varsity-jacket.jpg"
      alt="OPP-021 Retro Varsity Jacket"
      className="w-full max-h-72 object-cover rounded-lg mb-4 bg-surface-2 dark:bg-surface-dark2"
      onError={() => setBroken(true)}
    />
  )
}

export default function WarRoom() {
  const now = useNow()
  const pageLoad = useMemo(() => Date.now(), [])
  const start = pageLoad - WAR_ROOM.agoMs
  const elapsed = now - start
  const remain = WAR_ROOM.verdictWindowMs - elapsed
  const h = Math.floor(elapsed / 3600000)
  const m = Math.floor(elapsed / 60000) % 60
  const k = WAR_ROOM.kpis

  return (
    <section>
      <PanelHead title="24 Hour War Room" sub="One opportunity, followed end to end: OPP-021, Retro Varsity Jacket." />
      <Explainer>
        One real example, followed from the moment it was spotted to the moment we decide whether to keep selling
        it, reorder more stock, or stop. Every number below comes from the first hours after the product actually
        went live, so you can see exactly what a 24 hour read looks like in practice.
      </Explainer>

      <HeroImage />

      <div className="border-l-[3px] border-brand bg-brand-soft dark:bg-brand-softdark rounded-r-lg px-4 py-3.5 mb-4">
        <div className="text-[12.5px] uppercase tracking-wide font-semibold text-brand-dark dark:text-brand mb-1">The trigger</div>
        <p className="text-[15.5px]">
          During a match, a national all rounder is filmed post match in an oversized cream and maroon varsity jacket
          with an owl patch, not a Souled Store product. Clips cross 40,000 mentions within three hours. The design
          is original styling, not tied to any licensed franchise, so it enters the fast track rather than rights
          review.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-4 mb-4">
        <Card>
          <div className="font-bold text-[15.5px] mb-1">Timeline since signal</div>
          <div className="mt-1">
            {WAR_ROOM.timeline.map((row, i) => (
              <div key={row[0]} className="grid grid-cols-[84px_16px_1fr] gap-2.5 py-1.5">
                <div className="mono-nums text-[13px] text-muted dark:text-muted-dark text-right">{row[0]}</div>
                <div className="flex flex-col items-center">
                  <div className="w-[9px] h-[9px] rounded-full bg-brand mt-0.5 flex-none" />
                  {i < WAR_ROOM.timeline.length - 1 && <div className="flex-1 w-[1.5px] bg-border dark:bg-border-dark mt-0.5" />}
                </div>
                <div className="text-[14px] text-ink-2 dark:text-ink-dark2 pt-px">{row[1]}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="font-bold text-[15.5px] mb-2.5">Live status</div>
          <p className="text-[14.5px] text-ink-2 dark:text-ink-dark2 mb-2.5">
            Time since signal: <b className="mono-nums text-ink dark:text-ink-dark">{fmtDuration(elapsed, true)}</b>
          </p>
          <p className="text-[14.5px] text-ink-2 dark:text-ink-dark2 mb-2.5">
            Time to 24 hour verdict:{' '}
            <b className="mono-nums text-ink dark:text-ink-dark">{remain > 0 ? fmtDuration(remain, true) : 'Verdict window closed'}</b>
          </p>
          <div className="flex flex-col gap-2 items-start">
            <Badge kind="fast">Fast track, original design</Badge>
            <Badge kind="good">On track, all go signals passing</Badge>
          </div>
        </Card>
      </div>

      <StatGrid className="mb-4">
        <StatTile label="Sell through" value={k.sellThroughPct} unit="%" delta={`${k.unitsSold.toLocaleString()} of ${k.unitsTotal.toLocaleString()} units`} highlight="good" />
        <StatTile label="Revenue" value={k.revenueLabel} note={`Blended AOV ₹${k.aov.toLocaleString()}`} />
        <StatTile label="Contribution margin" value={k.contributionMarginPct} unit="%" delta="Above 28% approval floor" />
        <StatTile label="New customer share" value={k.newCustomerSharePct} unit="%" note="Not existing customer cannibalization" />
        <StatTile label="Hook rate" value={k.hookRatePct} unit="%" note="Good band is 30%+, elite is 40%+" />
        <StatTile label="Frequency" value={k.frequency} unit="×" note="Fatigue risk starts above 3.0" />
      </StatGrid>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <ChartTitle title="Orders per hour since go live" sub="Hour 0 is the staged go live at T+11:30. Hover for exact values." />
          <HourlyOrdersChart labels={WAR_ROOM.hourlyLabels} data={WAR_ROOM.hourlyOrders} />
        </Card>
        <Card>
          <ChartTitle title="Channel split" sub="1,250 orders, by acquisition surface" />
          <LabeledBarChart data={WAR_ROOM.channelSplit} />
        </Card>
      </div>

      <Card className="mb-4">
        <ChartTitle title="Funnel" sub="Impressions through to purchase across the full 12.5 hour window" />
        <Funnel steps={WAR_ROOM.funnel} />
      </Card>

      <div className="border-[1.5px] border-good bg-good-soft dark:bg-good-softdark rounded-xl p-[18px]">
        <div className="flex items-center gap-2.5 mb-2.5">
          <Badge kind="good">Interim verdict</Badge>
          <span className="font-display font-black text-[20px] text-white bg-good px-3.5 py-1 rounded-full tracking-wide">
            {WAR_ROOM.verdict.tag}
          </span>
        </div>
        <p className="text-[14.5px] text-ink-2 dark:text-ink-dark2 mb-2.5">
          Read as of <span className="mono-nums text-ink dark:text-ink-dark">T+{h}:{String(m).padStart(2, '0')}</span>. {WAR_ROOM.verdict.action}
        </p>
        <ul className="list-disc pl-[18px] text-[14.5px] text-ink-2 dark:text-ink-dark2 flex flex-col gap-1.5">
          {WAR_ROOM.verdict.reasons.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
