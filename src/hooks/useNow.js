import { useEffect, useState } from 'react'

// Re-renders every second so elapsed/countdown clocks tick in real time.
export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}

export function fmtDuration(ms, withSeconds) {
  ms = Math.max(0, ms)
  const s = Math.floor(ms / 1000) % 60
  const m = Math.floor(ms / 60000) % 60
  const h = Math.floor(ms / 3600000) % 24
  const d = Math.floor(ms / 86400000)
  let out = ''
  if (d > 0) out += d + 'd '
  out += h + 'h ' + String(m).padStart(2, '0') + 'm'
  if (withSeconds) out += ' ' + String(s).padStart(2, '0') + 's'
  return out.trim()
}
