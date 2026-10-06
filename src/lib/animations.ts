/* Site-wide scroll animations, driven by data attributes so sections stay declarative:
   data-split           headings: lines rise up through a mask
   data-fade            fade + rise on enter (children stagger if data-fade="stagger")
   data-scrub-words     words brighten one by one as you scroll past
   data-clip            images: wipe open from the bottom, image settles from 1.2× scale
   data-parallax="0.15" drift against the scroll
   data-count="50"      numbers count up on enter
   data-magnetic        buttons lean towards the cursor */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { OUT, canHover, reduceMotion } from './motion'

gsap.registerPlugin(ScrollTrigger, SplitText)

const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s))

export function initAnimations() {
  const ctx = gsap.context(() => {
    if (reduceMotion) {
      $$('[data-count]').forEach((el) => { el.textContent = el.dataset.count! })
      return
    }

    // Headings: lines rise through masks
    $$('[data-split]').forEach((el) => {
      const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' })
      gsap.from(split.lines, {
        yPercent: 110, duration: 1.4, ease: OUT, stagger: 0.09,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      })
    })

    // Fades
    $$('[data-fade]').forEach((el) => {
      const targets = el.dataset.fade === 'stagger' ? Array.from(el.children) : [el]
      gsap.from(targets, {
        opacity: 0, y: 36, duration: 1.3, ease: OUT, stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })

    // Words brighten as you scroll through the statement
    $$('[data-scrub-words]').forEach((el) => {
      const split = SplitText.create(el, { type: 'words', wordsClass: 'scrub-word' })
      gsap.fromTo(split.words, { opacity: 0.14 }, {
        opacity: 1, ease: 'none', stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
      })
    })

    // Image wipes
    $$('[data-clip]').forEach((el) => {
      const img = el.querySelector('img')
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' })
      if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 2, ease: OUT }, 0)
    })

    // Parallax drift
    $$('[data-parallax]').forEach((el) => {
      const amount = parseFloat(el.dataset.parallax || '0.15')
      gsap.fromTo(el, { yPercent: amount * 100 }, {
        yPercent: -amount * 100, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })

    // Count-ups
    $$('[data-count]').forEach((el) => {
      const end = parseFloat(el.dataset.count!)
      const obj = { v: 0 }
      gsap.to(obj, {
        v: end, duration: 2.2, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => { el.textContent = String(Math.round(obj.v)) },
      })
    })
  })

  // Magnetic buttons (pointer devices only)
  const cleanups: (() => void)[] = []
  if (canHover && !reduceMotion) {
    $$('[data-magnetic]').forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic || '0.3') || 0.3
      const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        xTo((e.clientX - r.left - r.width / 2) * strength)
        yTo((e.clientY - r.top - r.height / 2) * strength)
      }
      const leave = () => { xTo(0); yTo(0) }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      cleanups.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) })
    })
  }

  return () => { ctx.revert(); cleanups.forEach((c) => c()) }
}
