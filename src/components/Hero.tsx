import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Logo } from '../brand/Logo'
import { reduceMotion } from '../lib/motion'
import { openFilm } from '../lib/dialogEvents'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(false)

  useLayoutEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true; video.defaultMuted = true
    let visible = false
    const update = () => {
      if (visible && !document.hidden && !paused) video.play().catch(() => {})
      else video.pause()
    }
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() })
    io.observe(ref.current!)
    document.addEventListener('visibilitychange', update)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', update); video.pause() }
  }, [paused])

  useLayoutEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
        .to('.hero__frame', { clipPath: 'inset(7% 6% 7% 6% round 28px)', ease: 'none' }, 0)
        .to('.hero__zoom', { scale: 1, ease: 'none' }, 0)
        .to('.hero__inner', { yPercent: -18, scale: 0.9, ease: 'none' }, 0)
        .to('.hero__inner', { autoAlpha: 0, duration: 0.4, ease: 'none' }, 0)
        .to('.hero__foot', { opacity: 0, y: -30, ease: 'power1.in' }, 0)
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="top" ref={ref} aria-label="Introduction">
      <div className="hero__frame">
        <div className="hero__zoom">
          {reduceMotion ? <img className="hero__video" src="/media/hero-poster.webp" alt="The Consummates performing live" fetchPriority="high" /> : (
            <video ref={videoRef} className="hero__video" muted loop playsInline preload="metadata" poster="/media/hero-poster.webp" aria-hidden="true">
              <source media="(max-width: 800px)" src="/media/hero-720.mp4" type="video/mp4" />
              <source src="/media/hero-1080.mp4" type="video/mp4" />
            </video>
          )}
        </div>
        <div className="hero__veil" />
      </div>
      <div className="hero__inner">
        <h1 className="hero__logo"><Logo /></h1>
        <div className="hero__cta"><button className="btn btn--ghost" onClick={openFilm}><span className="btn__play" aria-hidden="true" />Watch us play.</button></div>
      </div>
      <div className="hero__foot">
        <p className="hero__eyebrow">Live wedding &amp; party band · West Midlands</p>
        <p className="hero__line">Your first dance to the very last song</p>
      </div>
      {!reduceMotion && <button className="hero__pause" onClick={() => setPaused(p => !p)}>{paused ? 'Play background video' : 'Pause video'}</button>}
    </section>
  )
}
