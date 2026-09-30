import { PanelHead, Explainer } from '../components/ui.jsx'
import { Kanban } from '../components/Kanban.jsx'

export default function CommandCenter() {
  return (
    <section>
      <PanelHead title="Command Center" sub="Every trend signal the brand is currently sitting on, and where it is in the pipeline right now." />
      <Explainer>
        Every trend opportunity we are currently working on, and exactly which stage it is stuck at. Cards move
        left to right. A red chip means the idea is ours to design and print quickly. A dark chip means it needs
        sign off from a license holder first, which we cannot speed up. A colored SLA tag tells you if a task is
        on time, at risk, or already late.
      </Explainer>
      <Kanban />
    </section>
  )
}
