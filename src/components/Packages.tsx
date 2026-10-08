/* Packages: three metal cards (silver, gold, platinum), each a slowly shimmering metallic shader
   with a light sweep and a cursor spotlight. Then "Every package includes" as an icon row, and the
   two add-ons with large hand-drawn icons (a turntable that spins, a microphone that sings). */
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MeshGradient } from '@paper-design/shaders-react'
import { packages } from '../content'
import { OUT, reduceMotion, scrollToHash } from '../lib/motion'
import { LITE, ShaderBox } from './ShaderBox'

const METALS: Record<string, string[]> = {
  silver: ['#F4F6F8', '#BFC8D0', '#8C97A1', '#E3E8ED'],
  gold: ['#F8E7B0', '#D3AC55', '#A57828', '#F2D589'],
  platinum: ['#F7F3FB', '#D8D2E8', '#B6C5D6', '#E9DAEC'], // pearly, with a faint iridescence
}

const spotlight = (e: React.PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/* ── Small line icons for "every package includes" ── */
const SMALL: Record<string, React.ReactNode> = {
  heart: <path d="M24 39s-13-8.2-13-17.4A7.1 7.1 0 0 1 24 17a7.1 7.1 0 0 1 13 4.6C37 30.8 24 39 24 39Z" />,
  requests: (<>
    <path d="M30 12v15.5" /><path d="M30 12l8 2.5v5L30 17" /><circle cx="26.5" cy="28.5" r="3.5" />
    <path d="M10 16h13M10 23h11M10 30h9M10 37h20" />
  </>),
  calendar: (<>
    <rect x="9" y="12" width="30" height="27" rx="4" /><path d="M9 20h30M17 8v7M31 8v7" />
    <path d="M18.5 29.5l3.5 3.5 7.5-8" />
  </>),
  shield: (<>
    <path d="M24 8l13 5v9.5c0 8.4-5.6 14.6-13 17.5-7.4-2.9-13-9.1-13-17.5V13l13-5Z" />
    <path d="M18.5 24.5l4 4 7.5-8" />
  </>),
  plug: (<>
    <path d="M18 9v8M30 9v8" /><path d="M13 17h22v6a11 11 0 0 1-22 0v-6Z" /><path d="M24 34v6" />
    <path d="M25.5 21.5l-3 4.5h4l-3 4.5" />
  </>),
  pin: (<>
    <path d="M24 40s-11-10.2-11-19a11 11 0 0 1 22 0c0 8.8-11 19-11 19Z" /><circle cx="24" cy="21" r="4" />
  </>),
}
const SmallIcon = ({ name }: { name: string }) => (
  <svg className="inc__icon" viewBox="0 0 48 48" aria-hidden="true">{SMALL[name]}</svg>
)

/* ── Large add-on icons ── */
const Turntable = () => (
  <svg className="xicon xicon--turntable" viewBox="0 0 120 120" aria-hidden="true">
    <rect x="14" y="22" width="92" height="76" rx="10" />
    <g className="xicon__record">
      <circle cx="54" cy="60" r="29" />
      <circle cx="54" cy="60" r="23" className="xicon__thin" />
      <circle cx="54" cy="60" r="17" className="xicon__thin" />
      <circle cx="54" cy="60" r="9" className="xicon__label" />
      <circle cx="54" cy="60" r="1.6" className="xicon__fill" />
      <path d="M40 46a20 20 0 0 1 9-5" className="xicon__shine" />
    </g>
    <circle cx="92" cy="36" r="5" />
    <path d="M92 41v26l-12 13" className="xicon__arm" />
    <rect x="75.5" y="78" width="8" height="5" rx="1.5" transform="rotate(-42 79.5 80.5)" className="xicon__fill" />
    <circle cx="94" cy="88" r="2.4" className="xicon__fill" /><path d="M85 88h4" />
  </svg>
)
const Microphone = () => (
  <svg className="xicon xicon--mic" viewBox="0 0 120 120" aria-hidden="true">
    <g className="xicon__waves">
      <path d="M30 34a32 32 0 0 0 0 36" /><path d="M21 27a44 44 0 0 0 0 50" />
      <path d="M90 34a32 32 0 0 1 0 36" /><path d="M99 27a44 44 0 0 1 0 50" />
    </g>
    <rect x="44" y="14" width="32" height="46" rx="16" />
    <path d="M44 28h32M44 36h32M44 44h32" className="xicon__thin" />
    <path d="M60 14v46" className="xicon__thin" />
    <path d="M36 46v4a24 24 0 0 0 48 0v-4" />
    <path d="M60 74v18M46 104h28M60 92l-10 12M60 92l10 12" />
  </svg>
)
const BIG: Record<string, () => React.ReactElement> = { turntable: Turntable, microphone: Microphone }

export function Packages() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      // explicit end values, then hand transforms back to CSS (hover lift, Gold's raised scale)
      gsap.fromTo('.tier',
        { y: 90, opacity: 0, rotateX: -10, transformOrigin: '50% 100%' },
        {
          y: 0, opacity: 1, rotateX: 0, duration: 1.6, ease: OUT, stagger: 0.12,
          clearProps: 'transform,translate,rotate,scale,transformOrigin,opacity',
          scrollTrigger: { trigger: '.tiers', start: 'top 80%', once: true },
        })
      gsap.from('.inc__item', {
        y: 30, opacity: 0, duration: 1.1, ease: OUT, stagger: 0.07,
        scrollTrigger: { trigger: '.inc', start: 'top 85%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="packages stack-under" id="packages" ref={ref}>
      <div className="stack-under__dim" aria-hidden="true" />
      <header className="packages__head">
        <h2 className="packages__title">{packages.title}</h2>
        <p className="packages__intro">{packages.intro}</p>
      </header>

      <div className="tiers">
        {packages.tiers.map((t) => (
          <article className={`tier tier--${t.metal}${t.featured ? ' tier--featured' : ''}`} key={t.name} onPointerMove={spotlight}>
            <ShaderBox className="tier__metal">
              <MeshGradient
                {...LITE}
                style={{ width: '100%', height: '100%' }}
                colors={METALS[t.metal]}
                distortion={0.85}
                swirl={0.45}
                speed={reduceMotion ? 0 : 0.28}
                grainOverlay={0.08}
              />
            </ShaderBox>
            <span className="tier__sheen" aria-hidden="true" />
            <span className="tier__spot" aria-hidden="true" />
            <div className="tier__content">
              {t.featured && <p className="tier__badge">Most booked</p>}
              <h3 className="tier__name">{t.name}</h3>
              <p className="tier__price">{t.price}</p>
              <ul className="tier__list">
                {t.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a className="btn btn--tier" href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToHash('#contact') }}>Book {t.name}</a>
            </div>
          </article>
        ))}
      </div>

      <div className="inc">
        <h3 className="inc__title">{packages.includedTitle}</h3>
        <ul className="inc__list">
          {packages.included.map((i) => (
            <li className="inc__item" key={i.title}>
              <SmallIcon name={i.icon} />
              <p className="inc__name">{i.title}</p>
              <p className="inc__body">{i.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="extras">
        <h3 className="inc__title">{packages.extrasTitle}</h3>
        <div className="extras__grid">
          {packages.extras.map((x) => {
            const Icon = BIG[x.icon]
            return (
              <article className="extra" key={x.name}>
                <div className="extra__medal"><Icon /></div>
                <div className="extra__text">
                  <p className="extra__role">Add-on · {x.role}</p>
                  <h4 className="extra__name">{x.name}</h4>
                  <p className="extra__body">{x.body}</p>
                  <a className="packages__link" href={x.href} target="_blank" rel="noopener">See them on Facebook <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
