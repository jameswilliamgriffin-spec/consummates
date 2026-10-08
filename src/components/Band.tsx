/* Meet the band.
   Grace and Mick lead as wide feature cards; the other eight follow as compact portrait cards (2 + 4 + 4).
   Every card opens a full-screen profile: the photo you clicked grows out of the card into the profile
   (a FLIP morph) and flies back when you close it. A gold "Meet" bubble follows the cursor over cards,
   and each card carries a visible "Meet …" button, so it's obvious there's more to see. */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { band, type Member } from '../content'
import { INOUT, OUT, canHover, lenis, reduceMotion } from '../lib/motion'

const members = band.members
const TBD = () => <span className="tbd">To follow</span>
const Note = () => (
  <svg className="note-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 18V6l11-2v12" /><circle cx="6.5" cy="18" r="3" /><circle cx="17.5" cy="16" r="3" />
  </svg>
)
const Bulb = () => (
  <svg className="pro__bulb" viewBox="0 0 32 32" aria-hidden="true">
    <path d="M16 6.5a7.5 7.5 0 0 0-4.2 13.7c.8.6 1.2 1.4 1.2 2.3V24h6v-1.5c0-.9.4-1.7 1.2-2.3A7.5 7.5 0 0 0 16 6.5Z" />
    <path d="M13.5 27h5M14.5 29.5h3" /><path d="M16 1.5V3M5.5 6.2l1.1 1.1M26.5 6.2l-1.1 1.1M2 15.5h1.6M28.4 15.5H30" />
  </svg>
)
const Arrow = ({ dir = 1 }: { dir?: 1 | -1 }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" style={dir === -1 ? { transform: 'scaleX(-1)' } : undefined}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
)

function Photo({ m }: { m: Member }) {
  return m.photo ? (
    <img src={m.photo} alt={`${m.name}, ${m.role}`} loading="lazy" decoding="async" />
  ) : (
    <div className="placeholder" role="img" aria-label={`Photo of ${m.name} coming soon`}>
      <span>{m.name[0]}</span><small>Photo coming soon</small>
    </div>
  )
}

const FavLine = ({ m }: { m: Member }) => {
  const f = m.favourites?.[0]
  if (!f) return <span className="fav fav--tbd">Favourite song to follow</span>
  return (
    <span className="fav">
      {f.cover ? <img src={f.cover} alt="" width="28" height="28" loading="lazy" /> : <Note />}
      <span>Loves playing <b>{f.title}</b></span>
    </span>
  )
}

/* ── Cards ───────────────────────────────────────── */
function Feature({ m, onOpen }: { m: Member; onOpen: (el: HTMLElement) => void }) {
  const photo = useRef<HTMLDivElement>(null)
  return (
    <button className="feat" data-meet={m.name} onClick={() => onOpen(photo.current!)} aria-label={`Meet ${m.name}, ${m.role}`}>
      <div className="feat__photo" ref={photo} data-photo={m.name}><Photo m={m} /></div>
      <div className="feat__body">
        <span className="feat__name">{m.name}</span>
        <span className="feat__role">{m.role}</span>
        {m.quote && <span className="feat__quote">{m.quote}</span>}
        <FavLine m={m} />
        <span className="meet-btn">Meet {m.name} <Arrow /></span>
      </div>
    </button>
  )
}

function Crew({ m, onOpen }: { m: Member; onOpen: (el: HTMLElement) => void }) {
  const photo = useRef<HTMLDivElement>(null)
  return (
    <li>
      <button className="crew" data-meet={m.name} onClick={() => onOpen(photo.current!)} aria-label={`Meet ${m.name}, ${m.role}`}>
        <div className="crew__frame">
          <div className="crew__photo" ref={photo} data-photo={m.name}><Photo m={m} /></div>
          <span className="crew__shade" aria-hidden="true" />
          <span className="crew__label">
            <span className="crew__name">{m.name}</span>
            <span className="crew__role">{m.role}</span>
          </span>
          <span className="crew__plus" aria-hidden="true">
            <span className="crew__plus-text">Meet {m.name}</span>
            <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
          </span>
        </div>
        <FavLine m={m} />
      </button>
    </li>
  )
}

/* ── A gold "Meet" bubble that follows the cursor over cards ── */
function MeetCursor() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!canHover || reduceMotion) return
    const el = ref.current!
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })
    let current: string | null = null
    let px = -1, py = -1
    const show = (name: string | null) => {
      if (name === current) return
      current = name
      if (name) el.querySelector('b')!.textContent = name
      gsap.to(el, { scale: name ? 1 : 0, opacity: name ? 1 : 0, duration: 0.45, ease: name ? 'back.out(2)' : 'power2.in' })
    }
    const nameAt = (x: number, y: number) =>
      document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-meet]')?.dataset.meet ?? null
    const move = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY
      xTo(px); yTo(py)
      show((e.target as HTMLElement).closest<HTMLElement>('[data-meet]')?.dataset.meet ?? null)
    }
    // the page can scroll a card out from under a still pointer, so look again on scroll
    const scroll = () => { if (px >= 0) show(nameAt(px, py)) }
    const leave = () => { px = -1; show(null) }
    window.addEventListener('pointermove', move)
    window.addEventListener('scroll', scroll, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', scroll)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [])
  return <div className="meet-cursor" ref={ref} aria-hidden="true"><span>Meet</span><b /></div>
}

/* ── Full-screen profile with photo morph ───────── */
function Profile({ index, source, onClose, onJump }: {
  index: number | null; source: React.MutableRefObject<HTMLElement | null>
  onClose: () => void; onJump: (i: number) => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const prevIndex = useRef<number | null>(null)
  const busy = useRef(false)
  const m = index === null ? null : members[index]
  const count = members.length

  useLayoutEffect(() => {
    const d = dialog.current!
    const was = prevIndex.current
    prevIndex.current = index
    if (index === null) return
    const photo = d.querySelector<HTMLElement>('.pro__photo')!
    const reveal = d.querySelectorAll('.pro__info > *, .pro__strip')
    d.querySelector('.pro__scroll')?.scrollTo({ top: 0 })

    if (was === null) {
      // opening: the clicked photo grows into place
      d.showModal()
      lenis?.stop()
      if (reduceMotion) return
      const src = source.current?.getBoundingClientRect()
      const tgt = photo.getBoundingClientRect()
      gsap.fromTo(d.querySelector('.pro__bg'), { opacity: 0 }, { opacity: 1, duration: 0.7, ease: 'power2.out' })
      if (src && src.width) {
        source.current!.style.visibility = 'hidden'
        gsap.fromTo(photo,
          { x: src.left - tgt.left, y: src.top - tgt.top, scaleX: src.width / tgt.width, scaleY: src.height / tgt.height, transformOrigin: '0 0' },
          { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 1, ease: INOUT, clearProps: 'transform' })
      }
      gsap.fromTo(reveal, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: OUT, stagger: 0.05, delay: 0.45 })
    } else if (!reduceMotion) {
      // stepping between people: a quick cross-fade
      gsap.fromTo(photo, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.7, ease: OUT, clearProps: 'transform' })
      gsap.fromTo(d.querySelectorAll('.pro__info > *'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: OUT, stagger: 0.04 })
    }
  }, [index, source])

  const close = useCallback(() => {
    const d = dialog.current!
    if (busy.current || index === null) return
    const finish = () => {
      busy.current = false
      document.querySelectorAll<HTMLElement>('[data-photo]').forEach((el) => { el.style.visibility = '' })
      d.close()
    }
    if (reduceMotion) return finish()
    busy.current = true
    const photo = d.querySelector<HTMLElement>('.pro__photo')!
    const card = document.querySelector<HTMLElement>(`[data-photo="${members[index].name}"]`)
    const src = card?.getBoundingClientRect()
    const tgt = photo.getBoundingClientRect()
    const onScreen = src && src.bottom > 0 && src.top < innerHeight
    document.querySelectorAll<HTMLElement>('[data-photo]').forEach((el) => { el.style.visibility = el === card ? 'hidden' : '' })
    gsap.to(d.querySelectorAll('.pro__info > *, .pro__strip, .pro__close'), { opacity: 0, duration: 0.35, ease: 'power2.in' })
    gsap.to(d.querySelector('.pro__bg'), { opacity: 0, duration: 0.7, delay: 0.25, ease: 'power2.inOut' })
    if (onScreen && src) {
      gsap.to(photo, {
        x: src.left - tgt.left, y: src.top - tgt.top, scaleX: src.width / tgt.width, scaleY: src.height / tgt.height,
        transformOrigin: '0 0', duration: 0.9, ease: INOUT, onComplete: finish,
      })
    } else {
      gsap.to(photo, { opacity: 0, scale: 0.96, duration: 0.5, ease: 'power2.in', onComplete: finish })
    }
  }, [index])

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (!dialog.current?.open || index === null) return
      if (e.key === 'ArrowRight') onJump((index + 1) % count)
      if (e.key === 'ArrowLeft') onJump((index - 1 + count) % count)
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [index, count, onJump])

  return (
    <dialog
      className="pro" ref={dialog}
      aria-label={m ? `${m.name}: profile` : 'Band member profile'}
      onCancel={(e) => { e.preventDefault(); close() }}
      onClose={() => {
        const d = dialog.current!
        gsap.set(d.querySelectorAll('.pro__photo, .pro__info > *, .pro__strip, .pro__close, .pro__bg'), { clearProps: 'all' })
        document.querySelectorAll<HTMLElement>('[data-photo]').forEach((el) => { el.style.visibility = '' })
        lenis?.start(); onClose()
      }}
    >
      <div className="pro__bg" aria-hidden="true" />
      <button className="pro__close" onClick={close} aria-label="Close profile">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
      </button>
      {m && (
        <div className="pro__scroll" data-lenis-prevent>
          <div className="pro__grid">
            <div className="pro__photo"><Photo m={m} /></div>
            <div className="pro__info">
              <h2 className="pro__name">{m.name}</h2>
              <p className="pro__role">{m.role}</p>
              {m.quote && <p className="pro__quote">{m.quote}</p>}
              <section className="pro__sec">
                <h3>Musical background</h3>
                {m.background ? <p>{m.background}</p> : <p><TBD /></p>}
              </section>
              <section className="pro__sec">
                <h3>{m.favourites && m.favourites.length > 1 ? 'Favourite songs to perform live' : 'Favourite song to perform live'}</h3>
                {m.favourites?.length ? (
                  <ul className="pro__songs">
                    {m.favourites.map((f) => (
                      <li key={f.title}>
                        {f.cover ? <img src={f.cover} alt="" width="52" height="52" loading="lazy" /> : <Note />}
                        <span>{f.title}{f.artist && <em>, {f.artist}</em>}</span>
                      </li>
                    ))}
                  </ul>
                ) : <p><TBD /></p>}
              </section>
              <aside className="pro__fact">
                <Bulb />
                <div><h3>Fun fact</h3><p>{m.fact ?? <TBD />}</p></div>
              </aside>
            </div>
          </div>

          <nav className="pro__strip" aria-label="The band">
            <button className="pro__arrow" onClick={() => onJump((index! - 1 + count) % count)} aria-label="Previous musician"><Arrow dir={-1} /></button>
            <ol>
              {members.map((p, i) => (
                <li key={p.name}>
                  <button className={`pro__thumb${i === index ? ' is-current' : ''}`} onClick={() => onJump(i)} aria-label={`${p.name}, ${p.role}`} aria-current={i === index}>
                    {p.photo ? <img src={p.photo} alt="" loading="lazy" /> : <span>{p.name[0]}</span>}
                    <em>{p.name}</em>
                  </button>
                </li>
              ))}
            </ol>
            <button className="pro__arrow" onClick={() => onJump((index! + 1) % count)} aria-label="Next musician"><Arrow /></button>
          </nav>
        </div>
      )}
    </dialog>
  )
}

export function Band() {
  const [open, setOpen] = useState<number | null>(null)
  const source = useRef<HTMLElement | null>(null)
  const openAt = (i: number) => (el: HTMLElement) => { source.current = el; setOpen(i) }
  const core = members.map((m, i) => ({ m, i })).filter(({ m }) => m.core)
  const rest = members.map((m, i) => ({ m, i })).filter(({ m }) => !m.core)

  return (
    <section className="band" id="band" data-nav="dark">
      <header className="band__head">
        <h2 className="band__title">{band.title}</h2>
        <p className="band__intro">
          {band.intro} <strong>Tap anyone to meet them properly.</strong>
        </p>
      </header>

      <div className="band__featured">
        {core.map(({ m, i }) => <Feature m={m} key={m.name} onOpen={openAt(i)} />)}
      </div>
      <ul className="band__crew">
        {rest.map(({ m, i }) => <Crew m={m} key={m.name} onOpen={openAt(i)} />)}
      </ul>

      <MeetCursor />
      <Profile index={open} source={source} onClose={() => setOpen(null)} onJump={setOpen} />
    </section>
  )
}
