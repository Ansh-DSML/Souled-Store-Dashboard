import { useEffect, useState } from 'react'

// Charts render with plain hex fills (SVG, not Tailwind classes), so they need
// to know the active color scheme directly to pick the right series palette.
export function useIsDark() {
  const [isDark, setIsDark] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => setIsDark(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isDark
}

// Colorblind-safe categorical palette (kept independent of brand/status colors).
export const SERIES = {
  light: ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7', '#e34948'],
  dark: ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181', '#008300', '#9085e9', '#e66767'],
}

export function useSeriesColors() {
  const isDark = useIsDark()
  return isDark ? SERIES.dark : SERIES.light
}
