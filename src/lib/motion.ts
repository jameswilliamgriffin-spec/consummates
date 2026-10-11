import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
export const OUT = 'expo.out'
export const INOUT = 'expo.inOut'

/** Use the browser's scroll behaviour and move focus with in-page navigation. */
export function scrollToHash(hash: string, immediate = false) {
  const target = document.getElementById(hash.slice(1))
  if (!target) return
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.scrollIntoView({ behavior: immediate || reduceMotion ? 'instant' : 'smooth', block: 'start' })
  target.focus({ preventScroll: true })
}
