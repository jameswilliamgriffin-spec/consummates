/* "Watch the film": the full promo with sound, in a dialog. Opened from anywhere via openFilm(). */
import { useEffect, useRef } from 'react'
import { lenis } from '../lib/motion'

const OPEN = 'consummates:open-film'
export const openFilm = () => window.dispatchEvent(new Event(OPEN))

export function FilmModal() {
  const dialog = useRef<HTMLDialogElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const open = () => {
      dialog.current!.showModal()
      lenis?.stop()
      video.current!.currentTime = 0
      video.current!.play().catch(() => {})
    }
    window.addEventListener(OPEN, open)
    return () => window.removeEventListener(OPEN, open)
  }, [])

  const close = () => dialog.current!.close()
  const onClose = () => { video.current!.pause(); lenis?.start() }

  return (
    <dialog
      className="film-modal"
      ref={dialog}
      onClose={onClose}
      onClick={(e) => { if (e.target === dialog.current) close() }}
      aria-label="The Consummates: live film"
    >
      <video ref={video} className="film-modal__video" controls playsInline preload="none" poster="/media/hero-poster.webp">
        <source src="/media/the-consummates-film.mp4" type="video/mp4" />
      </video>
      <button className="film-modal__close" onClick={close} aria-label="Close film">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
      </button>
    </dialog>
  )
}
