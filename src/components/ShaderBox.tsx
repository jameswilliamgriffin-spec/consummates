import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { reduceMotion } from '../lib/motion'

const Backdrop = lazy(() => import('./Backdrop'))
class BackdropBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

// Decorative WebGL is optional: CSS provides the base appearance. Load its code
// only on entry, and release GPU contexts offscreen or when the tab is hidden.
export function ShaderBox({ preset, className = '' }: { preset: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (reduceMotion) return
    let inView = false
    const update = () => setVisible(inView && !document.hidden)
    const io = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update() })
    io.observe(ref.current!)
    document.addEventListener('visibilitychange', update)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', update) }
  }, [])
  return <div ref={ref} className={`shader ${className}`} aria-hidden="true">
    {visible && <BackdropBoundary><Suspense fallback={null}><Backdrop preset={preset} /></Suspense></BackdropBoundary>}
  </div>
}
