import { useEffect, useState } from 'react'
import { TopBar, TabNav, TABS } from './components/Layout.jsx'
import CommandCenter from './tabs/CommandCenter.jsx'
import SpeedBenchmark from './tabs/SpeedBenchmark.jsx'
import WarRoom from './tabs/WarRoom.jsx'
import CohortRetention from './tabs/CohortRetention.jsx'
import Governance from './tabs/Governance.jsx'
import AICopilot from './tabs/AICopilot.jsx'

const PANELS = {
  command: CommandCenter,
  speed: SpeedBenchmark,
  war: WarRoom,
  cohort: CohortRetention,
  governance: Governance,
  ai: AICopilot,
}

export default function App() {
  const [active, setActive] = useState(() => {
    const hash = window.location.hash.replace('#', '')
    return TABS.some((t) => t.id === hash) ? hash : 'command'
  })

  useEffect(() => {
    window.history.replaceState(null, '', '#' + active)
  }, [active])

  const Panel = PANELS[active]

  return (
    <div className="min-h-screen bg-page dark:bg-page-dark text-ink dark:text-ink-dark">
      <TopBar />
      <TabNav active={active} onSelect={setActive} />
      <main className="max-w-[1280px] mx-auto px-5 py-7 pb-16">
        <Panel />
      </main>
    </div>
  )
}
