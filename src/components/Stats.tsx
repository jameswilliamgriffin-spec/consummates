/* The numbers, brought to life. When the row scrolls into view:
   · the big figures roll up like an odometer, one digit at a time
   · each has a small gold drawing that tells its story:
       50+ weddings  → a grid of 50 dots, one per wedding, popping in
       4 years       → four rings drawing themselves, one per year
       6 members     → six bars bouncing like a live equaliser
   Without JS (or with reduced motion) everything simply sits in its final state. */
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stats } from '../content'
import { OUT, reduceMotion } from '../lib/motion'

const EQ = [46, 78, 100, 62, 88, 54] // equaliser bar heights (%)

function Odometer({ value, suffix }: { value: number; suffix: string }) {
  const digits = String(value).split('').map(Number)
  return (
    <span className="odo" role="img" aria-label={`${value}${suffix}`}>
      {digits.map((d, i) => {
        // a zero rolls a full turn (to the extra 0 at the end) instead of staying put
        const idx = d === 0 ? 10 : d
        return (
          <span className="odo__digit" key={i} aria-hidden="true">
            <span className="odo__col" data-idx={idx} style={{ ['--i' as string]: idx }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n, k) => <span key={k}>{n}</span>)}
            </span>
          </span>
        )
      })}
      {suffix && <span className="odo__suffix" aria-hidden="true">{suffix}</span>}
    </span>
  )
}

const Viz = ({ id }: { id: string }) => {
  if (id === 'weddings')
    return <span className="viz viz--dots" aria-hidden="true">{Array.from({ length: 50 }, (_, i) => <i key={i} />)}</span>
  if (id === 'years')
    return (
      <svg className="viz viz--rings" viewBox="0 0 120 120" aria-hidden="true">
        {[14, 27, 40, 54].map((r) => (
          <circle key={r} cx="60" cy="60" r={r} pathLength={1} transform="rotate(-90 60 60)" />
        ))}
        <circle cx="60" cy="60" r="3" className="viz__core" />
      </svg>
    )
  return (
    <span className="viz viz--eq" aria-hidden="true">
      {EQ.map((h, i) => <i key={i} style={{ ['--h' as string]: `${h}%`, ['--d' as string]: `${(i * 0.17).toFixed(2)}s`, ['--s' as string]: `${(1.1 + (i % 3) * 0.28).toFixed(2)}s` }} />)}
    </span>
  )
}

export function Stats() {
  const ref = useRef<HTMLDListElement>(null)

  useLayoutEffect(() => {
    if (reduceMotion) return
    const root = ref.current!
    const cols = Array.from(root.querySelectorAll<HTMLElement>('.odo__col'))
    const suffixes = Array.from(root.querySelectorAll<HTMLElement>('.odo__suffix'))
    const dots = Array.from(root.querySelectorAll<HTMLElement>('.viz--dots i'))
    const rings = Array.from(root.querySelectorAll<SVGCircleElement>('.viz--rings circle:not(.viz__core)'))
    const core = root.querySelector<SVGCircleElement>('.viz__core')
    const bars = Array.from(root.querySelectorAll<HTMLElement>('.viz--eq i'))
    const labels = Array.from(root.querySelectorAll<HTMLElement>('.stat__label'))
    const rules = Array.from(root.querySelectorAll<HTMLElement>('.stat'))

    const ctx = gsap.context(() => {
      // starting states (set before first paint, so nothing flashes)
      gsap.set(cols, { y: 0, yPercent: 0 }) // y: 0 clears the CSS resting offset GSAP would otherwise read as pixels
      gsap.set(suffixes, { opacity: 0, scale: 0.4, transformOrigin: '0% 50%' })
      gsap.set(dots, { scale: 0, opacity: 0 })
      gsap.set(rings, { strokeDasharray: 1, strokeDashoffset: 1 })
      gsap.set(core, { scale: 0, transformOrigin: '50% 50%' })
      gsap.set(bars, { scaleY: 0.05 })
      gsap.set(labels, { opacity: 0, y: 14 })
      gsap.set(rules, { '--rule': 0 })

      ScrollTrigger.create({
        trigger: root, start: 'top 82%', once: true,
        onEnter: () => {
          const tl = gsap.timeline()
          tl.to(rules, { '--rule': 1, duration: 1.4, ease: 'expo.inOut', stagger: 0.12 }, 0)
            .to(cols, {
              yPercent: (_i, el: HTMLElement) => -(Number(el.dataset.idx) / 11) * 100,
              duration: 2.6, ease: OUT, stagger: 0.16,
            }, 0.2)
            .to(suffixes, { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(3)' }, 1.5)
            .to(dots, { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(2.4)', stagger: { each: 0.034, from: 'start' } }, 0.35)
            .to(rings, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', stagger: 0.38 }, 0.35)
            .to(core, { scale: 1, duration: 0.6, ease: 'back.out(3)' }, 1.7)
            .to(bars, { scaleY: 1, duration: 0.9, ease: OUT, stagger: 0.09 }, 0.35)
            .to(labels, { opacity: 1, y: 0, duration: 1, ease: OUT, stagger: 0.12 }, 0.9)
            .add(() => root.classList.add('is-live'), 1.4) // the equaliser starts to bounce
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <dl className="stats" ref={ref}>
      {stats.map((s) => (
        <div className="stat" key={s.id}>
          <Viz id={s.id} />
          <dd className="stat__num"><Odometer value={s.value} suffix={s.suffix} /></dd>
          <dt className="stat__label">{s.label}</dt>
        </div>
      ))}
    </dl>
  )
}
