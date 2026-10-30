import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type Video = { id: string; title: string; published: string }
const fallback: Video[] = [{ id: 'ZCjX85WasGo', title: 'The Consummates Showreel', published: '2026-10-12T18:13:52+00:00' }]
const channel = 'https://www.youtube.com/@TheConsummatesUK'

export function Videos() {
  const section = useRef<HTMLElement>(null)
  const [videos, setVideos] = useState(fallback)
  const [playing, setPlaying] = useState<string | null>(null)
  useEffect(() => {
    const abort = new AbortController()
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      observer.disconnect()
      void fetch('/api/youtube', { signal: abort.signal }).then(async response => {
        if (!response.ok) return
        const data: { videos?: Video[] } = await response.json()
        const valid = data.videos?.filter(v => /^[\w-]{11}$/.test(v.id) && typeof v.title === 'string' && typeof v.published === 'string' && Number.isFinite(Date.parse(v.published))).slice(0, 3)
        if (valid?.length) setVideos(valid)
      }).catch(() => { /* Keep the verified showreel if the feed is unavailable. */ })
    }, { rootMargin: '400px' })
    observer.observe(section.current!)
    return () => { observer.disconnect(); abort.abort() }
  }, [])
  useEffect(() => { ScrollTrigger.refresh() }, [videos])
  return (
    <section className="videos" id="videos" ref={section} aria-labelledby="videos-title">
      <header className="videos__head">
        <div><h2 id="videos-title">Watch us live.</h2><p>A taste of the voices, the harmonies and the energy we bring to your night.</p></div>
        <a href={channel} target="_blank" rel="noopener noreferrer">More on YouTube ↗</a>
      </header>
      <div className={`videos__grid${videos.length > 1 ? ' videos__grid--multiple' : ''}`}>
        {videos.map((video, i) => (
          <article className="videos__card" key={video.id}>
            <div className="videos__player">
              {playing === video.id ? <iframe title={video.title} src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : (
                <button type="button" onClick={() => setPlaying(video.id)} aria-label={`Play ${video.title}`}>
                  <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
                  <span className="videos__play" aria-hidden="true">▶</span>
                </button>
              )}
            </div>
            <div className="videos__caption"><h3>{video.title}</h3><a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${video.title} on YouTube`}>Watch on YouTube ↗</a></div>
            {i === 0 && <p className="videos__label">Latest from The Consummates</p>}
          </article>
        ))}
      </div>
    </section>
  )
}
