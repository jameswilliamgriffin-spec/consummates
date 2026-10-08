/* Hero: the band, live, on a muted loop. As you scroll away the film pulls back into a
   rounded frame on ivory (the camera "zooming out") while the logo and footer fade. */
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Logo } from '../brand/Logo'
import { reduceMotion } from '../lib/motion'
import { openFilm } from './FilmModal'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useLayoutEffect(() => {
    // React doesn't reflect `muted` as an attribute, and autoplay needs it
    if (videoRef.current) { videoRef.current.muted = true; videoRef.current.defaultMuted = true }
    // stop decoding the video once it has scrolled away; resume when it comes back
    const v = videoRef.current
    const io = new IntersectionObserver(([e]) => {
      if (!v) return
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    })
    if (ref.current) io.observe(ref.current)
    if (reduceMotion) return () => io.disconnect()
    const ctx = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
        .to('.hero__frame', { clipPath: 'inset(7% 6% 7% 6% round 28px)', ease: 'none' }, 0)
        .to('.hero__zoom', { scale: 1, ease: 'none' }, 0)
        .to('.hero__inner', { yPercent: -18, scale: 0.9, ease: 'none' }, 0)
        .to('.hero__inner', { opacity: 0, duration: 0.4, ease: 'none' }, 0) // gone before it reaches the nav
        .to('.hero__foot', { opacity: 0, y: -30, ease: 'power1.in' }, 0)
    }, ref)
    return () => { ctx.revert(); io.disconnect() }
  }, [])

  return (
    <section className="hero" id="top" ref={ref} aria-label="Introduction">
      <div className="hero__frame">
        <div className="hero__zoom">
          <video
            ref={videoRef}
            className="hero__video"
            autoPlay muted loop playsInline preload="auto"
            poster="/media/hero-poster.webp"
            aria-hidden="true"
          >
            <source media="(max-width: 800px)" src="/media/hero-720.mp4" type="video/mp4" />
            <source src="/media/hero-1080.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero__veil" />
      </div>
      <div className="hero__inner">
        <h1 className="hero__logo">
          <Logo />
        </h1>
        <div className="hero__cta">
          <button className="btn btn--ghost" onClick={openFilm}>
            <span className="btn__play" aria-hidden="true" />Watch us play.
          </button>
        </div>
      </div>
      <div className="hero__foot">
        <p className="hero__eyebrow">Live wedding &amp; party band · West Midlands</p>
        <p className="hero__line">Your first dance to the very last song</p>
      </div>
    </section>
  )
}
