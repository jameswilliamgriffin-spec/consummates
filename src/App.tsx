import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Preloader } from './components/Preloader'
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
import { initAnimations } from './lib/animations'
import { reduceMotion } from './lib/motion'

/* The scroll film slides up over the intro like a card being laid on top: the intro pins at its
   bottom edge, shrinks back and dims, while the film's rounded top corners square off as it lands. */
function useStack() {
  useLayoutEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.intro', start: 'bottom bottom', endTrigger: '.film', end: 'top top',
        pin: true, pinSpacing: false,
      })
      const arrive = { trigger: '.film', start: 'top bottom', end: 'top top', scrub: true }
      gsap.fromTo('.intro', { scale: 1 }, { scale: 0.9, ease: 'none', scrollTrigger: arrive })
      gsap.fromTo('.intro__dim', { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: arrive })
      gsap.fromTo('.film', { '--r': '32px' }, { '--r': '0px', ease: 'power2.in', scrollTrigger: arrive })
    })
    return () => ctx.revert()
  }, [])
}

export default function App() {
  useStack()
  useLayoutEffect(() => {
    const cleanup = initAnimations()
    ScrollTrigger.sort() // pins were created by different components; put them in page order
    ScrollTrigger.refresh()
    return cleanup
  }, [])

  return (
    <>
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Intro />
        <ScrollFilm />
        <Story />
        <Night />
        <Band />
        <Gallery />
        <Setlist />
        <Packages />
        <Booking />
        <Testimonials />
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
