/* The full setlist as its own "page": slides up over the site, scrolls on its own,
   closes with the × button, Escape or "Get in touch" (which then scrolls to contact). */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { setlist } from '../content'
import { INOUT, OUT, lenis, reduceMotion, scrollToHash } from '../lib/motion'

const OPEN = 'consummates:open-setlist'
export const openSetlist = () => window.dispatchEvent(new Event(OPEN))

export function FullSetlist() {
  const dialog = useRef<HTMLDialogElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const closing = useRef(false)

  const favourites = setlist.songs.filter((s) => s.favourite).sort((a, b) => a.favourite! - b.favourite!)
  const rest = setlist.songs.filter((s) => !s.favourite && !s.christmas)
  const christmas = setlist.songs.filter((s) => s.christmas)

  useEffect(() => {
    const open = () => {
      const d = dialog.current!, p = panel.current!
      d.showModal()
      p.scrollTop = 0
      lenis?.stop()
      if (reduceMotion) return
      gsap.fromTo(p, { yPercent: 100 }, { yPercent: 0, duration: 1.2, ease: INOUT })
      gsap.fromTo(p.querySelectorAll('.fullset__head > *, .fullset__fav'), { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: OUT, stagger: 0.06, delay: 0.55 })
      gsap.fromTo(p.querySelectorAll('.fullset__row'), { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: OUT, stagger: 0.025, delay: 0.85 })
    }
    window.addEventListener(OPEN, open)
    return () => window.removeEventListener(OPEN, open)
  }, [])

  const close = (then?: () => void) => {
    if (closing.current) return
    const finish = () => { dialog.current!.close(); closing.current = false; then?.() }
    if (reduceMotion) return finish()
    closing.current = true
    gsap.to(panel.current, { yPercent: 100, duration: 0.9, ease: INOUT, onComplete: finish })
  }

  return (
    <dialog
      className="fullset"
      ref={dialog}
      aria-label="The full setlist"
      onCancel={(e) => { e.preventDefault(); close() }}
      onClose={() => lenis?.start()}
    >
      <div className="fullset__panel" ref={panel} data-lenis-prevent>
        <button className="fullset__close" onClick={() => close()} aria-label="Close the setlist">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
        </button>

        <header className="fullset__head">
          <p className="eyebrow">The Consummates</p>
          <h2 className="fullset__title">The full setlist</h2>
          <p className="fullset__intro">{setlist.intro}</p>
        </header>

        <h3 className="fullset__label">Top five floor-fillers</h3>
        <ol className="fullset__favs">
          {favourites.map((s) => (
            <li className="fullset__fav" key={s.title}>
              <div className="fullset__fav-cover"><img src={s.cover} alt={`${s.title} cover`} loading="lazy" /></div>
              <span className="fullset__fav-n">{String(s.favourite).padStart(2, '0')}</span>
              <p className="fullset__fav-title">{s.title}</p>
              <p className="fullset__artist">{s.artist}</p>
            </li>
          ))}
        </ol>

        <h3 className="fullset__label">The rest of the party</h3>
        <ol className="fullset__list">
          {rest.map((s, i) => (
            <li className="fullset__row" key={s.title}>
              <span className="fullset__n">{String(i + 6).padStart(2, '0')}</span>
              <img className="fullset__cover" src={s.cover} alt="" loading="lazy" width="64" height="64" />
              <span className="fullset__song">{s.title}</span>
              <span className="fullset__artist">{s.artist}</span>
            </li>
          ))}
        </ol>

        <h3 className="fullset__label">At Christmas</h3>
        <ol className="fullset__list">
          {christmas.map((s) => (
            <li className="fullset__row" key={s.title}>
              <span className="fullset__n">✦</span>
              <img className="fullset__cover" src={s.cover} alt="" loading="lazy" width="64" height="64" />
              <span className="fullset__song">{s.title}</span>
              <span className="fullset__artist">{s.artist}</span>
            </li>
          ))}
        </ol>

        <footer className="fullset__foot">
          <p>Got a song you need on the night? Ask us. Learning your first dance is included.</p>
          <button className="btn btn--gold" onClick={() => close(() => scrollToHash('#contact'))}>Get in touch</button>
        </footer>
      </div>
    </dialog>
  )
}
