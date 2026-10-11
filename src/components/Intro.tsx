/* Elevator pitch + venue marquee, on ivory, straight after the hero. */
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { pitch, venues } from '../content'
import { reduceMotion, scrollToHash } from '../lib/motion'
import { DiscoBall } from './DiscoBall'

function Marquee() {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (reduceMotion) return
    const track = ref.current!.querySelector<HTMLElement>('.marquee__track')!
    // the track holds two copies; slide one copy's width, then wrap
    const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 })
    let visible = false
    const update = () => loop.paused(!visible || document.hidden)
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() })
    io.observe(ref.current!)
    document.addEventListener('visibilitychange', update)
    update()
    return () => { loop.kill(); io.disconnect(); document.removeEventListener('visibilitychange', update) }

  }, [])
  const items = [...venues, ...venues]
  return (
    <div className="marquee" ref={ref} aria-label="Venues we’ve played">
      <div className="marquee__track">
        {items.map((v, i) => (
          <span className="marquee__item" key={i} aria-hidden={i >= venues.length}>
            {v}<i aria-hidden="true">✦</i>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Intro() {
  const ref = useRef<HTMLElement>(null)
  const words = pitch.statement.split(' ')
  const last = words.length - 1

  // Words light up one by one as you scroll; when the last one ("song.") is lit, the mirror ball drops in beside it.
  useLayoutEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.intro__statement', start: 'top 80%', end: 'bottom 42%', scrub: true },
      })
      tl.fromTo('.intro__word', { opacity: 0.14 }, { opacity: 1, ease: 'none', stagger: 0.1, duration: 0.5 })
        .fromTo('.intro__ball',
          { opacity: 0, scale: 0.15, y: -26, rotate: -24, transformOrigin: '50% 0%' },
          { opacity: 1, scale: 1, y: 0, rotate: 0, ease: 'back.out(1.8)', duration: 0.9 }, '>-0.1')
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="intro" data-nav="dark" aria-label="About The Consummates" ref={ref}>
      <div className="intro__inner">
        <p className="intro__statement">
          {words.map((w, i) => (
            <span key={i}>
              {i < last ? (
                <>
                  <span className="intro__word">{w}</span>{' '}
                </>
              ) : (
                <span className="intro__tail">
                  <span className="intro__word">{w}</span>
                  <DiscoBall className="intro__ball" />
                </span>
              )}
            </span>
          ))}
        </p>
        <p className="intro__body">{pitch.body}</p>
        <div className="intro__actions">
          <a className="btn btn--solid" href="#night"
            onClick={(e) => { e.preventDefault(); scrollToHash('#night') }}>Your Evening</a>
        </div>
      </div>

      <p className="intro__venues-label">Recently played</p>
      <Marquee />

    </section>
  )
}
