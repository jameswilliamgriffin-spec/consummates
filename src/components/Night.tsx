/* Your night: "the light changes as the night goes on".
   On wide screens the section pins and scrolling travels sideways through the six moments, each
   with a gold line icon that draws itself on as it comes into focus. As you go, the sky tint shifts (afternoon gold → dusk rose → night → party),
   an icon travels the timeline (sun → sunset → moon → disco ball) and the card in focus lights up. */
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { night } from '../content'
import { reduceMotion } from '../lib/motion'
import { NightIcon } from './NightIcons'

const clamp = (v: number) => Math.min(1, Math.max(0, v))
// a soft "hill": 0 outside [a, d], rising a→b, flat b→c, falling c→d
const hill = (p: number, a: number, b: number, c: number, d: number) =>
  Math.min(clamp((p - a) / (b - a)), clamp((d - p) / (d - c)))

const SkyIcon = () => (
  <svg className="sky" viewBox="0 0 48 48" aria-hidden="true">
    <g className="sky__sun">
      <circle cx="24" cy="24" r="7" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4
        return <path key={i} d={`M${24 + Math.cos(a) * 11} ${24 + Math.sin(a) * 11}L${24 + Math.cos(a) * 15} ${24 + Math.sin(a) * 15}`} />
      })}
    </g>
    <g className="sky__sunset">
      <path d="M13 29a11 11 0 0 1 22 0" /><path d="M8 29h32M14 34h20M19 39h10" />
      <path d="M24 12v4M12.5 17.5l2.8 2.8M35.5 17.5l-2.8 2.8" />
    </g>
    <g className="sky__moon">
      <path d="M30 13a12 12 0 1 0 6 18 10 10 0 0 1-6-18Z" />
      <path d="M36 10l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9Z" className="sky__fill" />
    </g>
    <g className="sky__disco">
      <path d="M24 5v6" /><circle cx="24" cy="25" r="13" />
      <path d="M11.5 21h25M11.5 29h25M15 15.5h18M15 34.5h18" className="sky__thin" />
      <path d="M24 12c-4 3.5-6 8-6 13s2 9.5 6 13M24 12c4 3.5 6 8 6 13s-2 9.5-6 13" className="sky__thin" />
    </g>
  </svg>
)

export function Night() {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (reduceMotion) return
    const section = ref.current!
    const mm = gsap.matchMedia()

    mm.add('(min-width: 900px)', () => {
      const track = section.querySelector<HTMLElement>('.night__track')!
      const cards = Array.from(section.querySelectorAll<HTMLElement>('.night__card'))
      const labels = Array.from(section.querySelectorAll<HTMLElement>('.night__tick'))
      const tints = {
        afternoon: section.querySelector<HTMLElement>('.night__tint--afternoon')!,
        dusk: section.querySelector<HTMLElement>('.night__tint--dusk')!,
        party: section.querySelector<HTMLElement>('.night__tint--party')!,
      }
      const icons = {
        sun: section.querySelector<SVGGElement>('.sky__sun')!,
        sunset: section.querySelector<SVGGElement>('.sky__sunset')!,
        moon: section.querySelector<SVGGElement>('.sky__moon')!,
        disco: section.querySelector<SVGGElement>('.sky__disco')!,
      }
      const distance = () => track.scrollWidth - window.innerWidth
      let active = -1

      const update = (p: number) => {
        section.style.setProperty('--p', p.toFixed(4))
        tints.afternoon.style.opacity = String(1 - clamp(p / 0.4))
        tints.dusk.style.opacity = String(hill(p, 0.15, 0.4, 0.55, 0.8))
        tints.party.style.opacity = String(clamp((p - 0.62) / 0.3))
        icons.sun.style.opacity = String(1 - clamp((p - 0.12) / 0.12))
        icons.sunset.style.opacity = String(hill(p, 0.12, 0.24, 0.4, 0.52))
        icons.moon.style.opacity = String(hill(p, 0.4, 0.52, 0.7, 0.8))
        icons.disco.style.opacity = String(clamp((p - 0.7) / 0.1))
        const i = Math.round(p * (cards.length - 1))
        if (i !== active) {
          active = i
          cards.forEach((c, k) => {
            c.classList.toggle('is-active', k === i)
            if (k <= i + 2) c.classList.add('is-seen') // icons draw on as they arrive on screen, then stay drawn
          })
          labels.forEach((l, k) => l.classList.toggle('is-past', k <= i))
        }
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section, start: 'top top', end: () => '+=' + distance() * 1.15,
          pin: true, scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (self) => update(self.progress),
        },
      })
      tl.to(track, { x: () => -distance(), ease: 'none' }, 0)
      update(0)
    })
    return () => mm.revert()
  }, [])

  const n = night.steps.length
  return (
    <section className="night" id="night" ref={ref}>
      <div className="night__tint night__tint--afternoon" aria-hidden="true" />
      <div className="night__tint night__tint--dusk" aria-hidden="true" />
      <div className="night__tint night__tint--party" aria-hidden="true" />

      <div className="night__head">
        <h2 className="night__title">{night.title}</h2>
        <p className="night__hint">{night.hint}</p>
      </div>

      <ol className="night__track">
        {night.steps.map((s, i) => (
          <li className={`night__card${i === 0 ? ' is-active is-seen' : ''}`} key={s.title}>
            <div className="night__art">
              <NightIcon name={s.icon} />
            </div>
            <div className="night__text">
              <p className="night__time">{s.time}</p>
              <h3 className="night__step">{s.title}</h3>
              <p className="night__body">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="night__timeline" aria-hidden="true">
        <div className="night__rail"><i /></div>
        <span className="night__traveller"><SkyIcon /></span>
        <ol className="night__ticks">
          {night.steps.map((s, i) => (
            <li className={`night__tick${i === 0 ? ' is-past' : ''}`} key={s.time} style={{ left: `${(i / (n - 1)) * 100}%` }}>{s.time}</li>
          ))}
        </ol>
      </div>
    </section>
  )
}
