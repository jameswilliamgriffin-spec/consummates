import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { reduceMotion, scrollToHash } from '../lib/motion'
import { openFilm } from '../lib/dialogEvents'

gsap.registerPlugin(ScrollTrigger)
const FilmParty = lazy(() => import('./FilmParty'))
const count = 200
const clamp = (n: number) => Math.max(0, Math.min(1, n))

export function ScrollFilm() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [partyOn, setPartyOn] = useState(false)

  useEffect(() => {
    if (reduceMotion) return
    const section = sectionRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return
    const get = (selector: string) => section.querySelector<HTMLElement>(selector)!
    const frame = get('.film__frame'), poster = get('.film__poster'), shade = get('.film__shade')
    const intro = get('.film__intro'), beatOne = get('.film__beat--one'), beatTwo = get('.film__beat--two')
    const flood = get('.film__flood'), party = get('.film__party'), statement = get('.film__statement')
    const set = window.innerWidth < 768 ? 'mobile' : 'desktop'
    const blobs: (Blob | undefined)[] = Array(count)
    const bitmaps = new Map<number, ImageBitmap>()
    const downloading = new Set<number>(), decoding = new Set<number>()
    const abort = new AbortController()
    let centre = 0, cursor = 0, inflight = 0, width = 0, height = 0
    let target = 0, shown = 0, painted = -1, raf = 0
    let active = false, near = false, cancelled = false, mounted = false

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25)
      width = Math.min(1800, Math.round(window.innerWidth * ratio))
      height = Math.round(window.innerHeight * ratio)
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width; canvas.height = height; painted = -1
      }
    }
    const decode = (i: number) => {
      if (!blobs[i] || bitmaps.has(i) || decoding.has(i)) return
      decoding.add(i)
      createImageBitmap(blobs[i]!).then(bmp => {
        decoding.delete(i)
        if (cancelled || Math.abs(i - centre) > 24) { bmp.close(); return }
        bitmaps.set(i, bmp); painted = -1
      }).catch(() => decoding.delete(i))
    }
    const request = (i: number) => {
      if (i < 0 || i >= count || blobs[i] || downloading.has(i) || inflight >= 6) return
      downloading.add(i); inflight++
      fetch(`/film/${set}/frame_${String(i + 1).padStart(4, '0')}.webp`, { signal: abort.signal })
        .then(response => { if (!response.ok) throw new Error('Frame unavailable'); return response.blob() })
        .then(blob => { if (!cancelled) { blobs[i] = blob; if (Math.abs(i - centre) <= 12) decode(i) } })
        .catch(() => {})
        .finally(() => { downloading.delete(i); inflight--; if (!cancelled) fillQueue() })
    }
    const fillQueue = () => {
      if (!near || cancelled) return
      for (let d = 0; d <= 8 && inflight < 6; d++) { request(centre + d); request(centre - d) }
      while (inflight < 6 && cursor < count) request(cursor++)
    }
    const keepWindow = (i: number) => {
      centre = i
      for (let j = Math.max(0, i - 12); j <= Math.min(count - 1, i + 12); j++) decode(j)
      for (const [j, bmp] of bitmaps) if (Math.abs(j - i) > 24) { bmp.close(); bitmaps.delete(j) }
      fillQueue()
    }
    const nearest = (i: number) => {
      for (let d = 0; d < count; d++) {
        if (bitmaps.has(i - d)) return bitmaps.get(i - d)
        if (bitmaps.has(i + d)) return bitmaps.get(i + d)
      }
      return undefined
    }
    const paint = (bmp: ImageBitmap, alpha: number) => {
      const scale = Math.max(width / bmp.width, height / bmp.height)
      const w = bmp.width * scale, h = bmp.height * scale
      ctx.globalAlpha = alpha
      ctx.drawImage(bmp, (width - w) / 2, (height - h) / 2, w, h)
    }
    const draw = (pos: number) => {
      const i = Math.floor(pos), bmp = nearest(i)
      if (!bmp) return false
      paint(bmp, 1)
      const next = bitmaps.get(i + 1), mix = pos - i
      if (next && mix > 0.04 && mix < 0.96) paint(next, mix)
      ctx.globalAlpha = 1; canvas.style.opacity = '1'; poster.style.opacity = '0'
      return true
    }
    const fade = (p: number, from: number, to: number) =>
      Math.min(clamp((p - from) / 0.055), clamp((to - p) / 0.055))
    const render = () => {
      shown += (target - shown) * 0.22
      if (Math.abs(target - shown) < 0.00005) shown = target
      const p = shown, expansion = 1 - Math.pow(1 - clamp(p / 0.28), 3)
      frame.style.inset = `${30 * (1 - expansion)}% ${(window.innerWidth < 768 ? 14 : 26) * (1 - expansion)}%`
      frame.style.borderRadius = `${24 * (1 - expansion)}px`
      intro.style.opacity = String(1 - clamp(p / 0.09))
      const pos = clamp(p / 0.82) * (count - 1)
      keepWindow(Math.round(pos))
      if (Math.abs(pos - painted) > 0.001 || painted < 0) if (draw(pos)) painted = pos
      beatOne.style.opacity = String(fade(p, 0.32, 0.49))
      beatTwo.style.opacity = String(fade(p, 0.55, 0.73))
      shade.style.opacity = String(1 - clamp((p - 0.78) / 0.08))
      flood.style.opacity = String(clamp((p - 0.79) / 0.11))
      party.style.opacity = String(clamp((p - 0.86) / 0.11))
      statement.style.opacity = String(clamp((p - 0.87) / 0.07))
      statement.style.transform = `translateY(${24 * (1 - clamp((p - 0.87) / 0.07))}px)`
      const wantParty = p > 0.73
      if (wantParty !== mounted) { mounted = wantParty; setPartyOn(wantParty) }
      raf = active ? requestAnimationFrame(render) : 0
    }
    resize()
    const trigger = ScrollTrigger.create({
      trigger: section, start: 'top top', end: 'bottom bottom',
      onUpdate: self => { target = self.progress },
    })
    target = shown = trigger.progress
    const visible = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting
      if (active && !raf) raf = requestAnimationFrame(render)
      if (!active && mounted) { mounted = false; setPartyOn(false) }
    })
    visible.observe(section)
    const approaching = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { near = true; fillQueue(); approaching.disconnect() }
    }, { rootMargin: '150% 0px' })
    approaching.observe(section)
    window.addEventListener('resize', resize)
    return () => {
      cancelled = true; abort.abort(); trigger.kill(); cancelAnimationFrame(raf)
      visible.disconnect(); approaching.disconnect(); window.removeEventListener('resize', resize)
      bitmaps.forEach(bmp => bmp.close())
    }
  }, [])

  return (
    <section ref={sectionRef} className={`film${reduceMotion ? ' film--static' : ''}`} id="film" aria-label="The Consummates live">
      <div className="film__sticky">
        <p className="film__intro">Live. Up close.</p>
        <div className="film__frame">
          <img className="film__poster" src="/film/poster.webp" alt="The Consummates performing live" loading="lazy" decoding="async" />
          {!reduceMotion && <canvas ref={canvasRef} className="film__canvas" aria-hidden="true" />}
          <div className="film__shade" aria-hidden="true" />
          <p className="film__beat film__beat--one">Real voices. Real musicians.</p>
          <p className="film__beat film__beat--two">Every song played live.</p>
          <div className="film__flood" aria-hidden="true" />
          <div className="film__party" aria-hidden="true">{partyOn && <Suspense fallback={null}><FilmParty /></Suspense>}</div>
          <p className="film__statement">See you on the dancefloor.</p>
        </div>
        {!reduceMotion && <div className="film__scroll"><span>Keep scrolling</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16m-6-6 6 6 6-6" /></svg></div>}
        {!reduceMotion && <button className="film__skip" onClick={() => scrollToHash('#about', true)}>Skip <span aria-hidden="true">↓</span></button>}
        {reduceMotion && <button className="btn btn--ghost film__watch" onClick={openFilm}>Watch us play</button>}
      </div>
    </section>
  )
}
