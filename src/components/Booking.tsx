/* How booking works (six steps, a gold line drawing through them as you scroll),
   then a "Not just weddings" panel for corporate and party work. Sits on night, after Packages. */
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { booking, events } from '../content'
import { reduceMotion, scrollToHash } from '../lib/motion'

export function Booking() {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      // the line runs across on desktop and down on phones
      const vertical = window.matchMedia('(max-width: 900px)').matches
      const axis = vertical ? 'scaleY' : 'scaleX'
      gsap.fromTo('.steps__line i', { [axis]: 0 }, {
        [axis]: 1, ease: 'none',
        scrollTrigger: { trigger: '.steps', start: 'top 75%', end: 'bottom 55%', scrub: true },
      })
      gsap.utils.toArray<HTMLElement>('.step').forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 40, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="booking" id="booking" ref={ref}>
      <header className="booking__head">
        <p className="eyebrow" data-fade>{booking.eyebrow}</p>
        <h2 className="booking__title" data-split>{booking.title}</h2>
      </header>

      <ol className="steps">
        <span className="steps__line" aria-hidden="true"><i /></span>
        {booking.steps.map((s, i) => (
          <li className="step" key={s.title}>
            <span className="step__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span className="step__dot" aria-hidden="true" />
            <h3 className="step__title">{s.title}</h3>
            <p className="step__body">{s.body}</p>
          </li>
        ))}
      </ol>

      <aside className="events" data-fade>
        <div className="events__text">
          <p className="eyebrow">{events.eyebrow}</p>
          <h3 className="events__title">{events.title}</h3>
          <p className="events__body">{events.body}</p>
        </div>
        <ul className="events__list">
          {events.list.map((e) => <li key={e}>{e}</li>)}
        </ul>
        <a className="btn btn--gold events__cta" href="#contact" data-magnetic
          onClick={(e) => { e.preventDefault(); scrollToHash('#contact') }}>{events.cta}</a>
      </aside>
    </section>
  )
}
