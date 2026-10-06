import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { DotOrbit, GodRays } from '@paper-design/shaders-react'
import { CRISP, LITE } from './ShaderBox'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenis, isNavScrolling, scrollToHash } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

// ─── Tweakable values ───────────────────────────────────────────────
export const FILM_CONFIG = {
  frameCount: 200,
  smoothing: 0.2, // 0–1 per animation frame: lower = silkier glide, higher = tighter to the scroll
  // Frames live in /public/film/{desktop|mobile}/frame_0001.webp
  framePath: (set: 'desktop' | 'mobile', i: number) =>
    `/film/${set}/frame_${String(i + 1).padStart(4, '0')}.webp`,
  poster: '/film/poster.webp',
  mobileBreakpoint: 768,
  priorityFrames: 20, // loaded before anything else
  pinLength: 5, // section height in viewport heights
  // Autoplay: when the film lands (scrolling down), the page scrolls itself through it at a
  // constant speed. Scrolling is locked while it plays; "Skip" hands control back.
  autoplaySeconds: 8,
  fade: 0.06, // how long text takes to fade in/out (scroll progress)
  // Text beats: shown between `from` and `to` (scroll progress 0–1)
  beats: [
    { text: 'Real voices. Real musicians.', from: 0.07, to: 0.34 },
    { text: 'Every song played live.', from: 0.4, to: 0.66 },
  ],
  // The dive ends by flooding the screen with the chapter colour
  flood: { color: '#2F473A', from: 0.8, to: 0.9 },
  statement: { text: 'Live music for the best night of your life.', from: 0.88 },
  // Party lights (stage beams + disco glitter) rise behind the statement after the flood
  party: { from: 0.88, to: 0.97 },
}
// ────────────────────────────────────────────────────────────────────

export function ScrollFilm() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  // the party shaders only mount near the end, so the GPU is free while the dive plays
  const [partyOn, setPartyOn] = useState(false)

  useEffect(() => {
    if (reducedMotion) return
    const section = sectionRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d', { alpha: false })!
    const { frameCount, framePath, priorityFrames, fade, flood, smoothing } = FILM_CONFIG
    const set = window.innerWidth < FILM_CONFIG.mobileBreakpoint ? 'mobile' : 'desktop'
    // Memory-friendly frame store: every frame is downloaded once and kept *compressed* (~50 KB each);
    // only a small window around the playhead is decoded into ImageBitmaps (~8 MB each), and frames
    // that fall far behind are released. Drawing never waits on a decode inside the window.
    const WINDOW = 14 // decoded frames kept either side of the playhead
    const blobs: (Blob | undefined)[] = new Array(frameCount)
    const frames = new Map<number, ImageBitmap>()
    const decoding = new Set<number>()
    let centre = 0

    const decode = (i: number) => {
      const blob = blobs[i]
      if (!blob || frames.has(i) || decoding.has(i)) return
      decoding.add(i)
      createImageBitmap(blob).then((bmp) => {
        decoding.delete(i)
        if (Math.abs(i - centre) > WINDOW * 2) { bmp.close(); return } // no longer needed
        frames.set(i, bmp)
        lastPainted = -1 // repaint in case this frame is the one we're waiting for
      }).catch(() => decoding.delete(i))
    }
    const keepWindow = (c: number) => {
      centre = c
      for (let i = Math.max(0, c - WINDOW); i <= Math.min(frameCount - 1, c + WINDOW); i++) decode(i)
      for (const [i, bmp] of frames) if (Math.abs(i - c) > WINDOW * 2) { bmp.close(); frames.delete(i) }
    }

    const nearestLoaded = (i: number) => {
      for (let d = 0; d < frameCount; d++) {
        const a = frames.get(i - d); if (a) return a
        const b = frames.get(i + d); if (b) return b
      }
      return null
    }

    // canvas backing size: capped at 1.5× (the footage is soft and moving; 2× just costs fill-rate)
    let cw = 0, ch = 0
    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      cw = Math.round(canvas.clientWidth * dpr); ch = Math.round(canvas.clientHeight * dpr)
      if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch }
    }
    sizeCanvas()

    const paint = (bmp: ImageBitmap, alpha: number) => {
      const s = Math.max(cw / bmp.width, ch / bmp.height) // cover-fit
      const dw = bmp.width * s, dh = bmp.height * s
      ctx.globalAlpha = alpha
      ctx.drawImage(bmp, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }

    // Draw at a fractional position: frame i, with frame i+1 blended over it
    const draw = (pos: number) => {
      const i = Math.floor(pos), t = pos - i
      const a = nearestLoaded(i)
      if (!a) return false
      paint(a, 1)
      const b = t > 0.04 && t < 0.96 ? frames.get(i + 1) : undefined
      if (b) paint(b, t)
      ctx.globalAlpha = 1
      return true
    }

    const load = async (i: number) => {
      try {
        const res = await fetch(framePath(set, i))
        blobs[i] = await res.blob()
        if (Math.abs(i - centre) <= WINDOW) decode(i)
      } catch { /* a missing frame falls back to its nearest neighbour */ }
    }

    // priority frames first, then stream the rest (compressed) in small batches.
    // Starts once the page has loaded (so the hero video gets the bandwidth first), or straight
    // away if the film is about to come on screen.
    let cancelled = false, started = false
    const start = () => {
      if (started || cancelled) return
      started = true
      ;(async () => {
        await Promise.all(Array.from({ length: priorityFrames }, (_, i) => load(i)))
        for (let i = priorityFrames; i < frameCount && !cancelled; i += 6) {
          await Promise.all(
            Array.from({ length: 6 }, (_, k) => i + k).filter((n) => n < frameCount).map(load),
          )
        }
      })()
    }
    const startSoon = () => setTimeout(start, 600)
    if (document.readyState === 'complete') startSoon()
    else window.addEventListener('load', startSoon, { once: true })
    const near = new IntersectionObserver(([e]) => { if (e.isIntersecting) { start(); near.disconnect() } }, { rootMargin: '150% 0px' })
    near.observe(section)

    const layers = Array.from(section.querySelectorAll<HTMLElement>('[data-from]'))
    const floodEl = section.querySelector<HTMLElement>('.film__flood')!
    const partyEl = section.querySelector<HTMLElement>('.film__party')!
    const { party } = FILM_CONFIG
    let partyMounted = false
    const clamp = (v: number) => Math.min(1, Math.max(0, v))

    let target = 0 // scroll progress
    let shown = 0 // eased progress that's actually rendered
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: ({ progress }) => { target = progress },
      onEnter: (self) => {
        if (!lenis || isNavScrolling()) return
        const l = lenis
        // Wait a beat, then look again: a natural scroll is still near the start of the film,
        // a jump past it (scrollbar drag, End key, link) has already left it.
        setTimeout(() => {
          if (!self.isActive || self.progress > 0.2 || isNavScrolling()) return
          const release = () => { clearTimeout(safety); l.start() }
          const safety = setTimeout(release, FILM_CONFIG.autoplaySeconds * 1000 + 800)
          l.stop() // blocks wheel, touch, keys and the scrollbar; the glide below still runs (force)
          l.scrollTo(self.end, {
            duration: FILM_CONFIG.autoplaySeconds,
            easing: (t) => t, // constant speed
            force: true,
            onComplete: release,
          })
        }, 90)
      },
    })
    target = shown = st.progress

    // One render loop: ease towards the scroll position, paint, update overlays.
    // It only runs while the film is on screen, and skips work when nothing has changed.
    let raf = 0, lastPainted = -1, lastP = -1, onScreen = false
    const tick = () => {
      shown += (target - shown) * smoothing
      if (Math.abs(target - shown) < 0.00005) shown = target
      const p = shown
      const pos = p * (frameCount - 1)
      keepWindow(Math.round(pos))
      if (Math.abs(pos - lastPainted) > 0.001 || lastPainted < 0) {
        if (draw(pos)) lastPainted = pos
      }
      if (Math.abs(p - lastP) > 0.0002) {
        lastP = p
        floodEl.style.opacity = String(clamp((p - flood.from) / (flood.to - flood.from)))
        partyEl.style.opacity = String(clamp((p - party.from) / (party.to - party.from)))
        const wantParty = p > flood.from - 0.06
        if (wantParty !== partyMounted) { partyMounted = wantParty; setPartyOn(wantParty) }
        for (const el of layers) {
          const from = +el.dataset.from!, to = +(el.dataset.to ?? 9)
          const o = Math.min(clamp((p - from) / fade), clamp((to - p) / fade))
          el.style.opacity = String(o)
          el.style.setProperty('--o', String(o))
        }
      }
      raf = onScreen ? requestAnimationFrame(tick) : 0
    }
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
      if (onScreen && !raf) { lastPainted = -1; raf = requestAnimationFrame(tick) }
      if (!onScreen && partyMounted) { partyMounted = false; setPartyOn(false) } // free the GPU
    })
    io.observe(section)
    const onResize = () => { sizeCanvas(); lastPainted = -1 }
    window.addEventListener('resize', onResize)
    return () => {
      cancelled = true; st.kill(); cancelAnimationFrame(raf); io.disconnect(); near.disconnect()
      window.removeEventListener('resize', onResize); window.removeEventListener('load', startSoon)
      frames.forEach((f) => f.close())
    }
  }, [reducedMotion])

  const { beats, flood, statement } = FILM_CONFIG
  return (
    <section
      ref={sectionRef}
      className="film"
      id="film"
      style={{ height: reducedMotion ? 'auto' : `${FILM_CONFIG.pinLength * 100}svh` }}
      aria-label="The Consummates live"
    >
      <div className="film__sticky">
        {reducedMotion ? (
          <img className="film__canvas" src={FILM_CONFIG.poster} alt="The band’s singer performing live" />
        ) : (
          <canvas ref={canvasRef} className="film__canvas" aria-hidden="true" />
        )}
        <div className="film__shade" aria-hidden="true" />

        {beats.map((b) => (
          <p key={b.text} className="film__beat" data-from={b.from} data-to={b.to}>
            {b.text}
          </p>
        ))}

        <div className="film__flood" style={{ background: flood.color }} aria-hidden="true" />
        <div className="film__party" aria-hidden="true">
          {partyOn && (
            <>
              {/* stage beams sweeping down from the rig */}
              <GodRays
                {...LITE}
                className="film__party-layer"
                colorBack={flood.color}
                colorBloom="#E6C98A"
                colors={['#C8A86BCC', '#F6F1E999', '#E8A9A0AA', '#9FD3B566']}
                density={0.42}
                spotty={0.25}
                midSize={0.12}
                midIntensity={0.2}
                intensity={0.65}
                bloom={0.5}
                offsetY={-0.95}
                scale={1.2}
                speed={0.9}
              />
              {/* disco-ball glitter */}
              <DotOrbit
                {...CRISP}
                className="film__party-layer film__party-layer--glitter"
                colorBack="#00000000"
                colors={['#F6F1E9', '#E6C98A', '#C8A86B', '#F3D9C9']}
                size={0.55}
                sizeRange={0.85}
                spreading={1}
                stepsPerColor={2}
                scale={0.95}
                speed={1.6}
              />
            </>
          )}
        </div>
        <p className="film__statement" data-from={statement.from}>{statement.text}</p>
        {!reducedMotion && (
          <button className="film__skip" data-from="-1" data-to={statement.from} onClick={() => { lenis?.start(); scrollToHash('#about') }}>
            Skip <span aria-hidden="true">↓</span>
          </button>
        )}
      </div>
    </section>
  )
}
