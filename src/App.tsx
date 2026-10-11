import { useLayoutEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { ScrollFilm } from './components/ScrollFilm'
import { Story } from './components/Story'
import { Night } from './components/Night'
import { Band } from './components/Band'
import { Gallery } from './components/Gallery'
import { Setlist } from './components/Setlist'
import { Packages } from './components/Packages'
import { Booking } from './components/Booking'
import { Testimonials } from './components/Testimonials'
import { Faq } from './components/Faq'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { FilmModal } from './components/FilmModal'
import { FullSetlist } from './components/FullSetlist'

export default function App() {
  useLayoutEffect(() => {
    ScrollTrigger.sort() // pins were created by different components; put them in page order
    ScrollTrigger.refresh()
    let cancelled = false
    void document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
    if (location.hash) {
      try { document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView() } catch { /* malformed hash: leave the page at its current position */ }
    }
    return () => { cancelled = true }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Intro />
        <Band />
        <Setlist />
        <Gallery />
        <Testimonials />
        <Packages />
        <ScrollFilm />
        <Story />
        <Night />
        <Booking />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FilmModal />
      <FullSetlist />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
