import { PanelHead, Explainer, Card, Table, Td } from '../components/ui.jsx'
import { OFFER_LEDGER, FEED_HEALTH, DEEPLINK_QA, GOVERNANCE_ALERTS } from '../data.js'

function StatusText({ status, note }) {
  if (status === 'match' || status === 'pass') return <span className="text-good font-semibold">&#10003; {status === 'match' ? 'Match' : 'Pass'}</span>
  if (status === 'flagged' || status === 'warn') return <span className="text-warning-ink dark:text-warning-inkdark font-semibold">&#9888; {note}</span>
  return <span>{note}</span>
}

function AlertRow({ level, time, text }) {
  const ico = level === 'warn' ? { cls: 'bg-warning text-warning-fillink', icon: '!' } : { cls: 'bg-good text-white', icon: '✓' }
  return (
    <div className="grid grid-cols-[22px_90px_1fr] gap-2.5 py-2.5 border-b border-border dark:border-border-dark last:border-0 items-start">
      <div className={`w-[18px] h-[18px] rounded-md flex items-center justify-center text-[12.5px] font-bold mt-px ${ico.cls}`}>{ico.icon}</div>
      <div className="mono-nums text-[12.5px] text-muted dark:text-muted-dark">{time}</div>
      <div className="text-[14.5px] text-ink-2 dark:text-ink-dark2">{text}</div>
    </div>
  )
}

export default function Governance() {
  return (
    <section>
      <PanelHead title="Catalog & Governance" sub="Speed without one source of truth just reproduces the same problem faster." />
      <Explainer>
        Whether the price and details of a product are the same everywhere a customer might see them: website,
        app, ads, and search. If they do not match, customers lose trust fast, and it usually gets noticed on
        social media before anyone on the team spots it. This tab also lists the automated checks running in the
        background and anything they have caught, including a real gap this exact system is built to catch.
      </Explainer>

      <Card className="mb-4">
        <div className="font-bold text-[15.5px] mb-2.5">Offer ledger: price consistency check</div>
        <Table head={['Surface', 'Price shown', 'Last verified', 'Status']}>
          {OFFER_LEDGER.map((r) => (
            <tr key={r.surface}>
              <Td>{r.surface}</Td>
              <Td className="mono-nums">{r.price}</Td>
              <Td className="mono-nums">{r.verified}</Td>
              <Td><StatusText status={r.status} note={r.note} /></Td>
            </tr>
          ))}
        </Table>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <div className="font-bold text-[15.5px] mb-2.5">Feed health</div>
          <Table head={['Feed', 'GTIN complete', 'Sync', 'Disapprovals']}>
            {FEED_HEALTH.map((r) => (
              <tr key={r.feed}>
                <Td>{r.feed}</Td>
                <Td num className={r.warn ? 'text-warning-ink dark:text-warning-inkdark' : ''}>{r.gtin}</Td>
                <Td>{r.sync}</Td>
                <Td num>{r.disapprovals}</Td>
              </tr>
            ))}
          </Table>
        </Card>
        <Card>
          <div className="font-bold text-[15.5px] mb-2.5">Deep link QA</div>
          <Table head={['Path', 'Destination', 'Result']}>
            {DEEPLINK_QA.map((r) => (
              <tr key={r.path}>
                <Td>{r.path}</Td>
                <Td>{r.dest}</Td>
                <Td><StatusText status={r.status} note={r.note} /></Td>
              </tr>
            ))}
          </Table>
        </Card>
      </div>

      <Card>
        <div className="font-bold text-[15.5px] mb-1.5">Alert log</div>
        {GOVERNANCE_ALERTS.map((a, i) => (
          <AlertRow key={i} {...a} />
        ))}
      </Card>
    </section>
  )
}
