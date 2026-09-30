import { PanelHead, Explainer, Card, StatTile, StatGrid, ChartTitle, Table, Td } from '../components/ui.jsx'
import { StackedStageBar } from '../components/charts.jsx'
import { OLD_PROCESS_STAGES, FAST_TRACK_STAGES, COMPRESSION_ROWS } from '../data.js'

export default function SpeedBenchmark() {
  return (
    <section>
      <PanelHead title="Speed Benchmark" sub="What actually gets compressed, and what does not." />
      <Explainer>
        A side by side comparison of how long a launch used to take against how long it takes now. The old way is
        measured in days. The new way is measured in hours. Rights clearance, sampling and bulk production are not
        shortcuts, they are replaced with a different, faster path for the moments that can legally take it. The
        table below explains exactly what changed.
      </Explainer>

      <StatGrid className="mb-4">
        <StatTile label="Old process" value="21" unit="days" note="Idea to live on site and app" />
        <StatTile label="Fast track build" value="11.5" unit="hrs" note="Signal to live, non IP path" />
        <StatTile label="Speed gain" value="~42" unit="×" note="Hours instead of weeks" highlight="brand" />
        <StatTile label="Verdict window" value="24" unit="hrs" note="Build, then 12.5h of live read, from signal" />
      </StatGrid>

      <Card className="mb-3.5">
        <ChartTitle title="Old process: 21 days, stage by stage" sub="One SKU, one channel launch, run in sequence by separate teams." />
        <StackedStageBar stages={OLD_PROCESS_STAGES} unit="days" />
      </Card>

      <Card className="mb-3.5">
        <ChartTitle title="Fast track process: 11.5 hours to live" sub="Same checks, compressed by pre approval and automation instead of skipped." />
        <StackedStageBar stages={FAST_TRACK_STAGES} unit="hrs" />
      </Card>

      <Card>
        <div className="font-bold text-[15.5px] mb-2.5">What makes each stage compressible</div>
        <Table head={['Stage', 'Compression', 'How']}>
          {COMPRESSION_ROWS.map((r) => (
            <tr key={r.stage}>
              <Td>{r.stage}</Td>
              <Td className="mono-nums">{r.change}</Td>
              <Td>{r.how}</Td>
            </tr>
          ))}
        </Table>
      </Card>
    </section>
  )
}
