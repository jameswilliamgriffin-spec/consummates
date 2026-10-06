/* Preloader: the logo rises softly into view on a moss panel and the tagline fades up. Once the hero video can play, the panel wipes away upwards while the logo
   travels to its hero position (a FLIP move, transform only) and turns ivory-white. */
import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Logo } from '../brand/Logo'
import { INOUT, OUT, lenis, reduceMotion } from '../lib/motion'

const videoReady = (video: HTMLVideoElement | null, timeout = 4000) =>
  new Promise<void>((resolve) => {
    if (!video || video.readyState >= 3) return resolve()
    const done = () => resolve()
    video.addEventListener('canplay', done, { once: true })
    setTimeout(done, timeout)
  })

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLParagraphElement>(null)
  const [gone, setGone] = useState(false)

  useLayoutEffect(() => {
    const root = rootRef.current!, panel = panelRef.current!, wrap = wrapRef.current!, tag = tagRef.current!
    const heroLogo = document.querySelector<HTMLElement>('.hero__logo')!
    const nav = document.querySelector<HTMLElement>('.nav')!
    const video = document.querySelector<HTMLVideoElement>('.hero__video')
    const heroFoot = Array.from(document.querySelectorAll<HTMLElement>('.hero__foot > *, .hero__cta'))
    const html = document.documentElement
    video?.play().catch(() => {})

    const finish = () => {
      gsap.set(heroLogo, { autoAlpha: 1 })
      html.classList.remove('is-loading')
      setGone(true)
      lenis?.start()
      ScrollTrigger.refresh()
    }
    const reveal = () => html.classList.add('is-ready')

    /* Reduced motion: a calm, static version */
    if (reduceMotion) {
      reveal()
      gsap.set(wrap, { opacity: 1 })
      gsap.timeline({ onComplete: finish })
        .to({}, { duration: 0.9 })
        .to(root, { opacity: 0, duration: 0.7, ease: 'power1.out' })
      return
    }

    /* Initial states */
    gsap.set(heroLogo, { autoAlpha: 0 })
    gsap.set(tag, { opacity: 0, y: 14 })
    if (video) gsap.set(video, { scale: 1.2 })
    gsap.set(heroFoot, { opacity: 0, y: 24 })
    gsap.set(nav, { opacity: 0 })
    reveal()

    const write = gsap.timeline({ delay: 0.3 })
    write
      .fromTo(wrap, { opacity: 0, y: 30, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1.6, ease: OUT }, 0)
      .to(tag, { opacity: 1, y: 0, duration: 1.2, ease: OUT }, 0.7)
      .to({}, { duration: 0.9 }) // a beat to take it in

    let cancelled = false
    write.eventCallback('onComplete', async () => {
      await Promise.all([videoReady(video), new Promise((r) => setTimeout(r, 600))])
      if (cancelled || !wrap.isConnected || !heroLogo.isConnected) return
      // FLIP: measure both logos, then move the preloader logo onto the hero logo
      const a = wrap.getBoundingClientRect()
      const b = heroLogo.getBoundingClientRect()
      const s = b.width / a.width
      const dx = b.left + b.width / 2 - (a.left + a.width / 2)
      const dy = b.top + b.height / 2 - (a.top + a.height / 2)

      // start the loop from its first shot (the whole band) as it's revealed
      if (video) { video.currentTime = 0; video.play().catch(() => {}) }
      gsap.timeline({ onComplete: finish })
        .to(panel, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.5, ease: INOUT }, 0)
        .to(tag, { opacity: 0, y: -10, duration: 0.5, ease: 'power2.in' }, 0)
        .to(wrap, { x: dx, y: dy, scale: s, duration: 1.5, ease: INOUT }, 0)
        .to(wrap, { color: '#ffffff', duration: 0.9, ease: 'power2.inOut' }, 0.2)
        .to(video, { scale: 1, duration: 2.4, ease: OUT }, 0.15)
        .to(nav, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 1)
        .to(heroFoot, { opacity: 1, y: 0, duration: 1.3, ease: OUT, stagger: 0.1 }, 1)
    })
    return () => { cancelled = true; write.kill() }
  }, [])

  if (gone) return null
  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader__panel" ref={panelRef} />
      <div className="preloader__logo" ref={wrapRef}>
        <Logo className="logo--pre" />
      </div>
      <p className="preloader__tag" ref={tagRef}>Live wedding &amp; party band</p>
    </div>
  )
}
