import { PanelHead, Explainer, Card, Table, Td } from '../components/ui.jsx'
import { RetentionChart } from '../components/charts.jsx'
import { RETENTION_DAYS, RETENTION_TREND_COHORT, RETENTION_BASELINE, COHORT_TABLE } from '../data.js'

export default function CohortRetention() {
  return (
    <section>
      <PanelHead title="Cohort & Retention" sub="Launch day revenue says a trend worked. A second purchase says it created a customer." />
      <Explainer>
        Whether people who bought the trend jacket keep shopping with us afterward. The chart tracks two groups
        from their first order forward in time: everyone who bought the varsity jacket during the trend, and a
        normal group of new customers from the same period who did not. Each line is the percent of that group who
        has come back and bought a second time by that day. If the trend line stays above the normal line, the
        campaign built real customers and is worth repeating. If the two lines end up the same, it was just a one
        time spike.
      </Explainer>

      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-4">
        <Card>
          <div className="font-bold text-[15.5px] mb-2.5">Percent of each group that has bought again, by day</div>
          <RetentionChart days={RETENTION_DAYS} trend={RETENTION_TREND_COHORT} baseline={RETENTION_BASELINE} />
        </Card>
        <Card>
          <div className="font-bold text-[15.5px] mb-3">90 day cohort comparison</div>
          <Table head={['Metric', 'Trend cohort', 'Baseline', 'Delta']}>
            {COHORT_TABLE.map((r) => (
              <tr key={r.metric}>
                <Td>{r.metric}</Td>
                <Td num>{r.trend}</Td>
                <Td num>{r.baseline}</Td>
                <Td num className={r.good ? 'text-good' : ''}>{r.delta}</Td>
              </tr>
            ))}
          </Table>
        </Card>
      </div>

      <Card className="mt-4">
        <p className="text-[14.5px] text-ink-2 dark:text-ink-dark2">
          New customer CAC on this cohort, ₹410, is a blended figure that includes organic and earned reach
          from the moment itself, so it is not comparable to a paid only CAC and should not be read as a repeatable
          paid benchmark. The number that matters more for a scale decision is the 4 point gap in repeat rate
          against baseline at every stage, since that is what determines whether this SKU is worth reordering at
          all.
        </p>
      </Card>
    </section>
  )
}
