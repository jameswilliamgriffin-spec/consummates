// Shared motion setup: GSAP plugins, Lenis smooth scroll, environment flags.
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches

// One easing family across the site: expo out / in-out. Nothing bouncy.
export const OUT = 'expo.out'
export const INOUT = 'expo.inOut'

export let lenis: Lenis | null = null

export function initSmoothScroll() {
  if (reduceMotion || lenis) return
  lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 0.95,
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis!.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
}

// True while a nav/button jump is in flight, so sections it passes (e.g. the autoplaying
// film) don't hijack the scroll.
let navScrolling = false
export const isNavScrolling = () => navScrolling

/** Smooth-scroll to an in-page anchor ("#contact") or the top. */
export function scrollToHash(hash: string) {
  const target = hash === '#top' ? 0 : document.querySelector<HTMLElement>(hash)
  if (target === null) return
  if (lenis) {
    navScrolling = true
    lenis.scrollTo(target, {
      duration: 1.8, easing: (t) => 1 - Math.pow(1 - t, 4), force: true,
      onComplete: () => { navScrolling = false },
    })
    setTimeout(() => { navScrolling = false }, 2200) // safety if interrupted
  }
  else if (target === 0) window.scrollTo({ top: 0 })
  else target.scrollIntoView()
}
