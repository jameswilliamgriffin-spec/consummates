/* The setlist, in champagne gold: rows of song titles drifting in alternate directions.
   Hover (or tap) a title and its cover pops up; a row pauses while you're over it.
   "View the full setlist" opens the full list as a page that slides up (FullSetlist). */
import { useState } from 'react'
import { GrainGradient } from '@paper-design/shaders-react'
import { setlist, type Song } from '../content'
import { reduceMotion } from '../lib/motion'
import { LITE, ShaderBox } from './ShaderBox'
import { openSetlist } from './FullSetlist'

const ROWS = 3
const DURATIONS = [70, 84, 76] // seconds per loop, per row

function Row({ songs, index }: { songs: Song[]; index: number }) {
  const [active, setActive] = useState<string | null>(null)
  const items = [...songs, ...songs] // two copies so the loop is seamless
  return (
    <div className="setrow" onPointerLeave={() => setActive(null)}>
      <ul
        className={`setrow__track${index % 2 ? ' setrow__track--rtl' : ''}`}
        style={{ animationDuration: `${DURATIONS[index % DURATIONS.length]}s` }}
      >
        {items.map((s, i) => {
          const copy = i >= songs.length
          const key = s.title + (copy ? '-b' : '')
          return (
            <li className={`setrow__item${active === key ? ' is-active' : ''}`} key={key} aria-hidden={copy}>
              <button
                className="setrow__title"
                tabIndex={copy ? -1 : 0}
                onClick={() => setActive(active === key ? null : key)}
                aria-label={`${s.title} by ${s.artist}`}
              >
                {s.favourite && <i className="setrow__star" aria-hidden="true">✦</i>}
                {s.title}<span className="setrow__comma">,</span>
              </button>
              <span className="setrow__pop" aria-hidden="true">
                <img src={s.cover} alt="" width="160" height="160" loading="lazy" decoding="async" />
                <span className="setrow__artist">{s.artist}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function Setlist() {
  const songs = setlist.songs.filter((s) => !s.christmas)
  // spread songs across rows so each row has a mix (favourites go first so they're seen early)
  const ordered = [...songs.filter((s) => s.favourite), ...songs.filter((s) => !s.favourite)]
  const rows = Array.from({ length: ROWS }, (_, r) => ordered.filter((_, i) => i % ROWS === r))

  return (
    <section className="setlist" id="setlist" data-nav="dark">
      <ShaderBox className="setlist__shader">
        <GrainGradient
          {...LITE}
          style={{ width: '100%', height: '100%' }}
          colorBack="#E9CF93"
          colors={['#F6E6B8', '#C8A04F', '#A87E33', '#FBF1D3']}
          shape="wave"
          softness={0.8}
          intensity={0.42}
          noise={0.28}
          speed={reduceMotion ? 0 : 0.75}
        />
      </ShaderBox>
      <div className="setlist__inner">
        <header className="setlist__head">
          <h2 className="setlist__title">{setlist.title}</h2>
          <p className="setlist__intro">{setlist.intro}</p>
        </header>
      </div>

      <div className="setlist__rows">
        {rows.map((r, i) => <Row songs={r} index={i} key={i} />)}
      </div>

      <div className="setlist__cta">
        <button className="btn btn--dark" onClick={openSetlist}>
          {setlist.cta}
          <svg className="btn__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" />
          </svg>
        </button>
        <p className="setlist__legend"><i aria-hidden="true">✦</i> Our top five floor-fillers</p>
      </div>
    </section>
  )
}
