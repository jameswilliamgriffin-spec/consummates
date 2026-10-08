/* Kind words: one quote at a time, cross-fading on a timer, with progress bars you can click. */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { testimonials } from '../content'
import { reduceMotion } from '../lib/motion'

const DURATION = 7 // seconds per quote

export function Testimonials() {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 })
    io.observe(ref.current!)
    return () => io.disconnect()
  }, [])

  // advance only while on screen
  useEffect(() => {
    if (!inView || reduceMotion) return
    const id = setTimeout(() => setActive((a) => (a + 1) % testimonials.length), DURATION * 1000)
    return () => clearTimeout(id)
  }, [active, inView])

  useEffect(() => {
    const q = ref.current!.querySelector('.quote.is-active')
    if (q && !reduceMotion) gsap.fromTo(q.querySelectorAll('.quote__text, .quote__by'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.12 })
  }, [active])

  return (
    <section className="words" ref={ref} data-nav="dark" aria-labelledby="words-title">
      <h2 className="words__title" id="words-title">What people said</h2>
      <div className="words__stage" aria-live="polite">
        {testimonials.map((t, i) => (
          <figure className={`quote${i === active ? ' is-active' : ''}`} key={i} aria-hidden={i !== active}>
            <p className="quote__stars" aria-label="Rated 10 out of 10">★★★★★</p>
            <blockquote className="quote__text">“{t.quote}”</blockquote>
            <figcaption className="quote__by"><strong>{t.name}</strong> · {t.context}</figcaption>
          </figure>
        ))}
      </div>
      <div className="words__dots" role="tablist" aria-label="Choose a quote">
        {testimonials.map((t, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            aria-label={`Quote from ${t.name}`}
            className={`words__dot${i === active ? ' is-active' : ''}${inView ? ' is-running' : ''}`}
            style={{ ['--d' as string]: `${DURATION}s` }}
            onClick={() => setActive(i)}
          ><i /></button>
        ))}
      </div>
      <p className="words__source">All rated 10/10 on Last Minute Musicians.</p>
    </section>
  )
}
