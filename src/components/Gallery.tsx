/* In the moment: two rows of live photos drifting in opposite directions as you scroll. */
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { gallery } from '../content'
import { reduceMotion } from '../lib/motion'

export function Gallery() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      const st = { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
      gsap.fromTo('.gallery__row--a', { xPercent: 0 }, { xPercent: -22, ease: 'none', scrollTrigger: st })
      gsap.fromTo('.gallery__row--b', { xPercent: -22 }, { xPercent: 0, ease: 'none', scrollTrigger: st })
    }, ref)
    return () => ctx.revert()
  }, [])

  const a = gallery.images.slice(0, 6)
  const b = gallery.images.slice(5)
  const row = (imgs: string[], cls: string) => (
    <div className={`gallery__row ${cls}`}>
      {imgs.map((src, i) => (
        <figure className="gallery__item" key={src + i}>
          <img src={src} alt="The Consummates playing live" loading="lazy" decoding="async" />
        </figure>
      ))}
    </div>
  )
  return (
    <section className="gallery" ref={ref} aria-label={gallery.title}>
      <header className="gallery__head">
        <h2 className="gallery__title">{gallery.title}</h2>
      </header>
      {row(a, 'gallery__row--a')}
      {row(b, 'gallery__row--b')}
    </section>
  )
}
