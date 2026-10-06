/* Mounts a WebGL shader only while its section is near the viewport, so the page never
   runs more than a couple of GPU contexts at once. Reduced motion freezes the animation. */
import { useEffect, useRef, useState, type ReactNode } from 'react'

/* Soft, blurry gradients look identical at 1× and capped resolution, at a fraction of the GPU cost.
   (The library default is 2× pixel ratio, up to 8.3M pixels per frame.) */
export const LITE = { minPixelRatio: 1, maxPixelCount: 1_400_000 }
/* Shaders with fine detail (glitter dots) keep a little more resolution */
export const CRISP = { minPixelRatio: 1, maxPixelCount: 2_400_000 }

export function ShaderBox({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '300px 0px' })
    io.observe(ref.current!)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`shader ${className}`} aria-hidden="true">
      {visible && children}
    </div>
  )
}
