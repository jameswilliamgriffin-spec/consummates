/* Nav: the small logo mark appears once the big hero logo has scrolled away; the bar tucks
   away while reading down and returns on scroll up; ink turns dark over light sections. */
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FacebookLogo, InstagramLogo } from '../brand/Social'
import { contact } from '../content'
import { Logo } from '../brand/Logo'
import { reduceMotion, scrollToHash } from '../lib/motion'

const LINKS = [
  { href: '#band', label: 'The Band' },
  { href: '#setlist', label: 'Setlist' },
  { href: '#packages', label: 'Packages' },
  { href: '#about', label: 'Our story' },
  { href: '#faq', label: 'FAQ' },
]

// Facebook + Instagram: beside "Get in touch" on desktop, top left on phones
const Socials = ({ className }: { className: string }) => (
  <div className={className}>
    <a href={contact.facebook} className="nav__social nav__social--fb" target="_blank" rel="noopener" aria-label="The Consummates on Facebook"><FacebookLogo /></a>
    <a href={contact.instagram} className="nav__social nav__social--ig" target="_blank" rel="noopener" aria-label="The Consummates on Instagram"><InstagramLogo /></a>
  </div>
)

// Ink turns dark while the nav's line (~40px down) sits over a light section
function useDarkOverLight() {
  const [dark, setDark] = useState(false)
  useLayoutEffect(() => {
    let disposed = false
    const update = () => queueMicrotask(() => { if (!disposed) setDark(triggers.some(t => t.isActive)) })
    const triggers = Array.from(document.querySelectorAll('[data-nav="dark"]')).map((el) =>
      ScrollTrigger.create({ trigger: el, start: 'top 40px', end: 'bottom 40px', onToggle: update, onRefresh: update }),
    )
    update()
    return () => { disposed = true; triggers.forEach((t) => t.kill()) }
  }, [])
  return dark
}

export function Nav() {
  const ref = useRef<HTMLElement>(null)
  const markRef = useRef<HTMLAnchorElement>(null)
  const dark = useDarkOverLight()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!menuOpen) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus() }
    }
    const outside = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', outside)
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside) }
  }, [menuOpen])

  useLayoutEffect(() => {
    const nav = ref.current!, mark = markRef.current!
    const showMark = ScrollTrigger.create({
      start: () => innerHeight * 0.42,
      end: 'max',
      onToggle: (self) => gsap.to(mark, { autoAlpha: self.isActive ? 1 : 0, duration: reduceMotion ? 0 : 0.4, ease: 'power2.out', overwrite: true }),
    })
    let hidden = false
    const tuck = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const hide = !nav.contains(document.activeElement) && !nav.classList.contains('nav--open') && self.direction === 1 && self.scroll() > innerHeight * 0.6
        if (hidden === hide) return
        hidden = hide
        gsap.to(nav, { yPercent: hide ? -110 : 0, duration: reduceMotion ? 0 : 0.9, ease: 'expo.out', overwrite: 'auto' })
      },
    })
    return () => { showMark.kill(); tuck.kill() }
  }, [])

  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href')!
    e.preventDefault()
    setMenuOpen(false)
    scrollToHash(href)
  }

  return (
    <header className={`nav${dark ? ' nav--dark' : ''}${menuOpen ? ' nav--open' : ''}`} ref={ref} onFocusCapture={() => gsap.to(ref.current, { yPercent: 0, duration: 0.2, overwrite: true })}>
      <Socials className="nav__socials nav__socials--start" />
      <a href="#top" className="nav__mark" ref={markRef} onClick={go} aria-label="The Consummates, back to top">
        <Logo />
      </a>
      <nav className="nav__links" id="primary-navigation" aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={go}><span>{l.label}</span></a>
        ))}
      </nav>
      <div className="nav__end">
        <button ref={menuButton} className="nav__menu" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(open => !open)}>{menuOpen ? 'Close' : 'Menu'}</button>
        <Socials className="nav__socials nav__socials--end" />
        <a href="#contact" className="btn btn--ghost nav__cta" onClick={go}>Get in touch</a>
      </div>
    </header>
  )
}
