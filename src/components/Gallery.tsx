import { useEffect, useRef, useState } from 'react'
import { gallery } from '../content'
import { reduceMotion } from '../lib/motion'

export function Gallery() {
  const rail = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const [active, setActive] = useState<number | null>(null)
  const count = gallery.images.length
  const jump = (step: number) => setActive(i => i === null ? null : (i + step + count) % count)
  useEffect(() => {
    const d = dialog.current!
    if (active === null) return
    if (!d.open) d.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = overflow }
  }, [active])
  const close = () => { dialog.current?.close(); setActive(null) }
  const scroll = (step: number) => rail.current?.scrollBy({ left: step * rail.current.clientWidth * .8, behavior: reduceMotion ? 'instant' : 'smooth' })
  return (
    <section className="gallery" aria-label={gallery.title}>
      <header className="gallery__head">
        <h2 className="gallery__title">{gallery.title}</h2>
        <div className="gallery__controls"><p>Swipe or scroll through. Tap a photo to explore.</p><div>
          <button type="button" onClick={() => scroll(-1)} aria-label="Scroll photos left">←</button>
          <button type="button" onClick={() => scroll(1)} aria-label="Scroll photos right">→</button>
        </div></div>
      </header>
      <div className="gallery__rail" ref={rail} tabIndex={0} role="region" aria-label="Live photo gallery" onKeyDown={e => {
        if (e.target !== e.currentTarget) return
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); scroll(e.key === 'ArrowRight' ? 1 : -1) }
      }}>
        {gallery.images.map((src, i) => <button type="button" className="gallery__photo" key={src} onClick={() => setActive(i)} aria-label={`Open photo ${i + 1} of ${count}`}>
          <img src={src} alt={`The Consummates performing live, photo ${i + 1}`} loading="lazy" decoding="async" />
        </button>)}
      </div>
      <dialog className="gallery-lightbox" ref={dialog} aria-label="Live photo gallery" onClose={() => setActive(null)} onClick={e => { if (e.target === e.currentTarget) close() }} onKeyDown={e => {
        if (e.key === 'ArrowRight') { e.preventDefault(); jump(1) }
        if (e.key === 'ArrowLeft') { e.preventDefault(); jump(-1) }
      }}>
        <button type="button" className="gallery-lightbox__close" onClick={close} aria-label="Close gallery">×</button>
        {active !== null && <>
          <div className="gallery-lightbox__stage" onTouchStart={e => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }} onTouchEnd={e => {
            if (!touch.current) return
            const dx = e.changedTouches[0].clientX - touch.current.x
            const dy = e.changedTouches[0].clientY - touch.current.y
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) jump(dx < 0 ? 1 : -1)
            touch.current = null
          }}>
            <img src={gallery.images[active]} alt={`The Consummates performing live, photo ${active + 1} of ${count}`} />
          </div>
          <div className="gallery-lightbox__controls">
            <button type="button" onClick={() => jump(-1)} aria-label="Previous photo">←</button>
            <span aria-live="polite">{active + 1} / {count}</span>
            <button type="button" onClick={() => jump(1)} aria-label="Next photo">→</button>
          </div>
        </>}
      </dialog>
    </section>
  )
}
