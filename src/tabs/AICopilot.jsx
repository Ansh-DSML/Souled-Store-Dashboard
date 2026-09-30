import { PanelHead, Explainer, Card, Table, Td, Badge } from '../components/ui.jsx'
import { LabeledBarChart } from '../components/charts.jsx'
import { ANOMALIES, CREATIVE_LOG, SENTIMENT, THRESHOLDS } from '../data.js'

function AnomalyRow({ level, time, text }) {
  const styles = {
    crit: { cls: 'bg-critical text-white tss-glow-critical', icon: '✗' },
    warn: { cls: 'bg-warning text-warning-fillink', icon: '!' },
    good: { cls: 'bg-good text-white', icon: '✓' },
  }
  const s = styles[level]
  return (
    <div className="grid grid-cols-[22px_90px_1fr] gap-2.5 py-2.5 border-b border-border dark:border-border-dark last:border-0 items-start">
      <div className={`w-[18px] h-[18px] rounded-md flex items-center justify-center text-[12.5px] font-bold mt-px ${s.cls}`}>{s.icon}</div>
      <div className="mono-nums text-[12.5px] text-muted dark:text-muted-dark">{time}</div>
      <div className="text-[14.5px] text-ink-2 dark:text-ink-dark2">{text}</div>
    </div>
  )
}

const CREATIVE_BADGE = { good: 'good', neutral: 'neutral', warning: 'warning' }

export default function AICopilot() {
  return (
    <section>
      <PanelHead title="AI Copilot" sub="Where the assistant sits inside the system: it drafts, flags and recommends." />
      <Explainer>
        Where automated help actually fits into the process. It drafts ad copy variants, watches the numbers for
        anything unusual, and reads customer comments in bulk, but a person always approves the final call on
        scale, hold, or kill, and on every piece of copy before it ships. The table at the bottom shows the exact
        rule it follows, so it is not a black box.
      </Explainer>

      <Card className="mb-4">
        <div className="font-bold text-[15.5px] mb-1.5">Anomaly feed</div>
        {ANOMALIES.map((a, i) => (
          <AnomalyRow key={i} {...a} />
        ))}
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <div className="font-bold text-[15.5px] mb-2.5">AI drafted creative for OPP-021</div>
          <Table head={['Variant', 'Hook', 'Status']}>
            {CREATIVE_LOG.map((r) => (
              <tr key={r.variant}>
                <Td>{r.variant}</Td>
                <Td>{r.hook}</Td>
                <Td><Badge kind={CREATIVE_BADGE[r.kind]}>{r.status}</Badge></Td>
              </tr>
            ))}
          </Table>
          <div className="mt-4 pt-3.5 border-t border-border dark:border-border-dark">
            <div className="text-[13px] font-semibold text-ink-2 dark:text-ink-dark2 mb-1">Hook rate by variant</div>
            <div className="text-[12.5px] text-muted dark:text-muted-dark mb-2">Why A and B are live, and D is held: the numbers behind the status column above.</div>
            <LabeledBarChart data={CREATIVE_LOG.map((r) => ({ label: `Variant ${r.variant}`, v: r.hookRate }))} pct />
          </div>
        </Card>
        <Card>
          <div className="font-bold text-[15.5px]">Comment sentiment snapshot</div>
          <div className="text-[13px] text-muted dark:text-muted-dark mb-2.5">OPP-021, 1,900 comments scanned</div>
          <LabeledBarChart data={SENTIMENT} pct />
        </Card>
      </div>

      <Card>
        <div className="font-bold text-[15.5px] mb-2.5">Decision thresholds: the rule the AI is actually applying</div>
        <Table head={['Signal', 'Kill', 'Hold', 'Scale', 'OPP-021 actual']}>
          {THRESHOLDS.map((r) => (
            <tr key={r.signal}>
              <Td>{r.signal}</Td>
              <Td num>{r.kill}</Td>
              <Td num>{r.hold}</Td>
              <Td num>{r.scale}</Td>
              <Td num className="text-good font-bold">{r.actual}</Td>
            </tr>
          ))}
        </Table>
        <p className="text-[13px] text-muted dark:text-muted-dark mt-3.5 pt-3.5 border-t border-border dark:border-border-dark">
          These are recommendation thresholds, not autonomous actions. Any scale or kill call still routes to a
          human owner before anything changes in market.
        </p>
      </Card>
    </section>
  )
}
