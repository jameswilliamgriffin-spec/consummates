/* A small, classy mirror ball: real tiles on a slowly rotating sphere (canvas 2D),
   lit from the upper left in champagne and ivory over deep moss, with a few tiles
   that catch the light and a couple of slow four-point twinkles. Sized in `em`, so it
   sits in a line of text like a glyph. Only animates while on screen. */
import { useEffect, useRef } from 'react'
import { reduceMotion } from '../lib/motion'

const ROWS = 14
const COLS = 26
const TILT = 0.3 // radians, tips the top towards the viewer
const GAP = 0.1 // grout between tiles, as a share of tile size
const L = norm([-0.5, 0.62, 0.62]) // light direction (towards the light)

const DARK = [52, 74, 58] as const
const GOLD = [230, 205, 148] as const
const IVORY = [250, 246, 238] as const

type Tile = { lat0: number; lat1: number; lon0: number; lon1: number; seed: number; shade: number }
const tiles: Tile[] = []
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const i = r * COLS + c
    const rand = (k: number) => { const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x) }
    tiles.push({
      lat0: -Math.PI / 2 + (r / ROWS) * Math.PI,
      lat1: -Math.PI / 2 + ((r + 1) / ROWS) * Math.PI,
      lon0: (c / COLS) * Math.PI * 2,
      lon1: ((c + 1) / COLS) * Math.PI * 2,
      seed: rand(1),
      shade: 0.82 + rand(2) * 0.3,
    })
  }
}

function norm(v: number[]) {
  const m = Math.hypot(v[0], v[1], v[2])
  return v.map((x) => x / m)
}
const mix = (a: readonly number[], b: readonly number[], t: number) =>
  [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))

/** point on the unit sphere → [x, y, z] with the viewer's tilt applied (z towards viewer) */
function point(lat: number, lon: number) {
  const x = Math.cos(lat) * Math.sin(lon)
  const y = Math.sin(lat)
  const z = Math.cos(lat) * Math.cos(lon)
  const ct = Math.cos(TILT), st = Math.sin(TILT)
  return [x, y * ct - z * st, y * st + z * ct]
}

function star(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number) {
  if (alpha <= 0.02) return
  ctx.save()
  ctx.translate(x, y)
  ctx.globalAlpha = alpha
  ctx.fillStyle = `rgb(${IVORY.join(',')})`
  ctx.beginPath()
  ctx.moveTo(0, -size); ctx.quadraticCurveTo(size * 0.09, -size * 0.09, size, 0)
  ctx.quadraticCurveTo(size * 0.09, size * 0.09, 0, size); ctx.quadraticCurveTo(-size * 0.09, size * 0.09, -size, 0)
  ctx.quadraticCurveTo(-size * 0.09, -size * 0.09, 0, -size); ctx.fill()
  ctx.restore()
}

function draw(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h)
  const cx = w / 2, cy = h / 2
  const R = w / 4.4 // the canvas is 2.2× the ball's diameter, leaving room for glow and twinkles

  // soft champagne glow behind the ball
  const glow = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 2.1)
  glow.addColorStop(0, 'rgba(230, 201, 138, 0.34)')
  glow.addColorStop(1, 'rgba(230, 201, 138, 0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, w, h)

  // the thread it hangs from
  ctx.strokeStyle = 'rgba(214, 187, 131, 0.8)'
  ctx.lineWidth = Math.max(1, R * 0.035)
  ctx.beginPath(); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy - R * 1.32); ctx.stroke()

  // grout / body
  ctx.fillStyle = 'rgb(38, 56, 44)'
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill()

  const spin = t * 0.34
  for (const tile of tiles) {
    const dLat = (tile.lat1 - tile.lat0) * GAP * 0.5
    const dLon = (tile.lon1 - tile.lon0) * GAP * 0.5
    const lat0 = tile.lat0 + dLat, lat1 = tile.lat1 - dLat
    const lon0 = tile.lon0 + dLon + spin, lon1 = tile.lon1 - dLon + spin
    const n = point((tile.lat0 + tile.lat1) / 2, (tile.lon0 + tile.lon1) / 2 + spin)
    if (n[2] <= 0.04) continue // on the far side

    const diffuse = Math.max(0, n[0] * L[0] + n[1] * L[1] + n[2] * L[2])
    let col = mix(DARK, GOLD, clamp((0.3 + 0.8 * diffuse) * tile.shade) ** 1.1)
    // a tile catching the light, slowly, at its own moment
    const twinkle = Math.max(0, Math.sin(t * 1.5 + tile.seed * 40)) ** 11
    col = mix(col, IVORY, twinkle * 0.92 * clamp(n[2] * 1.5))
    const edge = 0.68 + 0.32 * n[2]

    ctx.fillStyle = `rgb(${Math.round(col[0] * edge)},${Math.round(col[1] * edge)},${Math.round(col[2] * edge)})`
    ctx.beginPath()
    const corners = [[lat0, lon0], [lat0, lon1], [lat1, lon1], [lat1, lon0]]
    corners.forEach(([la, lo], k) => {
      const p = point(la, lo)
      const px = cx + p[0] * R, py = cy - p[1] * R
      if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
    })
    ctx.closePath(); ctx.fill()
  }

  // a broad soft highlight so it reads as a polished sphere
  ctx.save()
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip()
  const spec = ctx.createRadialGradient(cx - R * 0.38, cy - R * 0.42, 0, cx - R * 0.38, cy - R * 0.42, R * 0.85)
  spec.addColorStop(0, 'rgba(255, 252, 244, 0.42)')
  spec.addColorStop(1, 'rgba(255, 252, 244, 0)')
  ctx.fillStyle = spec; ctx.fillRect(0, 0, w, h)
  ctx.restore()

  // two slow twinkles off the ball (never all at once)
  const s1 = Math.max(0, Math.sin(t * 1.1)) ** 3
  const s2 = Math.max(0, Math.sin(t * 0.9 + 2.2)) ** 3
  const s3 = Math.max(0, Math.sin(t * 1.3 + 4.1)) ** 4
  star(ctx, cx + R * 1.18, cy - R * 0.72, R * 0.34 * (0.5 + s1 * 0.5), s1)
  star(ctx, cx - R * 1.22, cy + R * 0.42, R * 0.26 * (0.5 + s2 * 0.5), s2)
  star(ctx, cx + R * 0.82, cy + R * 0.98, R * 0.2 * (0.5 + s3 * 0.5), s3)
}

export function DiscoBall({ className = '' }: { className?: string }) {
  const wrap = useRef<HTMLSpanElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = canvas.current!
    const ctx = cv.getContext('2d')!
    let raf = 0
    let visible = false
    const t0 = performance.now()

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.round(cv.clientWidth * dpr), h = Math.round(cv.clientHeight * dpr)
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h }
    }
    const frame = (now: number) => {
      size()
      draw(ctx, cv.width, cv.height, (now - t0) / 1000)
      raf = visible ? requestAnimationFrame(frame) : 0
    }

    if (reduceMotion) {
      size(); draw(ctx, cv.width, cv.height, 1.4) // one still frame
      return
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(frame)
    })
    io.observe(wrap.current!)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [])

  return (
    <span className={`disco ${className}`} ref={wrap} aria-hidden="true">
      <canvas ref={canvas} />
    </span>
  )
}
