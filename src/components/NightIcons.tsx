/* Gold line icons for "How the evening unfolds". Every path has pathLength=1 so CSS can draw it on
   like a pen stroke when the card comes into focus. Accents (sparkles, bubbles, waves) are classed
   so they can twinkle or float once drawn. */
const P = (props: React.SVGProps<SVGPathElement>) => <path pathLength={1} {...props} />
const C = (props: React.SVGProps<SVGCircleElement>) => <circle pathLength={1} {...props} />
const Sparkle = ({ x, y, s = 1, className = 'ni__spark' }: { x: number; y: number; s?: number; className?: string }) => (
  <P className={className} d={`M${x} ${y - 7 * s}c${0.9 * s} ${4.6 * s} ${2.4 * s} ${6.1 * s} ${7 * s} ${7 * s}c${-4.6 * s} ${0.9 * s} ${-6.1 * s} ${2.4 * s} ${-7 * s} ${7 * s}c${-0.9 * s} ${-4.6 * s} ${-2.4 * s} ${-6.1 * s} ${-7 * s} ${-7 * s}c${4.6 * s} ${-0.9 * s} ${6.1 * s} ${-2.4 * s} ${7 * s} ${-7 * s}Z`} />
)

const Speaker = () => (<>
  <P d="M38 16h44a8 8 0 0 1 8 8v72a8 8 0 0 1-8 8H38a8 8 0 0 1-8-8V24a8 8 0 0 1 8-8Z" />
  <C cx="60" cy="40" r="11" /><C cx="60" cy="40" r="4" className="ni__thin" />
  <C cx="60" cy="78" r="19" /><C cx="60" cy="78" r="11" className="ni__thin" /><C cx="60" cy="78" r="3.5" />
  <C cx="40" cy="24" r="1.6" className="ni__thin" /><C cx="80" cy="24" r="1.6" className="ni__thin" />
  <g className="ni__float">
    <P d="M98 64a14 14 0 0 0 0-14" className="ni__wave" /><P d="M106 70a26 26 0 0 0 0-26" className="ni__wave" />
    <P d="M22 50a14 14 0 0 0 0 14" className="ni__wave" /><P d="M14 44a26 26 0 0 0 0 26" className="ni__wave" />
  </g>
</>)

const Rings = () => (<>
  <C cx="48" cy="72" r="21" /><C cx="72" cy="72" r="21" />
  <P d="M48 51l-7-8 7-7 7 7-7 8Z" /><P d="M41 43h14" className="ni__thin" />
  <Sparkle x={86} y={30} s={1.1} /><Sparkle x={28} y={36} s={0.7} />
  <g className="ni__float"><P d="M94 56V44l10-3v12" /><C cx="91" cy="56" r="3" /><C cx="101" cy="53" r="3" /></g>
</>)

const Guitar = () => (
  <g transform="rotate(32 60 60)">
    <P d="M60 50c-7 0-11 5-11 11 0 4 2 6 2 9 0 2-7 6-7 14 0 10 7 17 16 17s16-7 16-17c0-8-7-12-7-14 0-3 2-5 2-9 0-6-4-11-11-11Z" />
    <C cx="60" cy="81" r="5.5" /><P d="M53 96h14" />
    <P d="M57 50V14h6v36" /><P d="M55 14V6h10v8" />
    <P d="M55 8h-3M55 12h-3M65 8h3M65 12h3" className="ni__thin" />
    <P d="M59 16v80M61 16v80" className="ni__thin" />
    <Sparkle x={86} y={36} s={0.8} />
  </g>
)

const Coupes = () => (<>
  <g transform="rotate(-14 44 62)">
    <P d="M27 44h34c0 11-7.5 17-17 17s-17-6-17-17Z" /><P d="M30 50h28" className="ni__thin" />
    <P d="M44 61v22M35 83h18" />
  </g>
  <g transform="rotate(14 76 62)">
    <P d="M59 44h34c0 11-7.5 17-17 17s-17-6-17-17Z" /><P d="M62 50h28" className="ni__thin" />
    <P d="M76 61v22M67 83h18" />
  </g>
  <Sparkle x={60} y={22} s={1.1} />
  <g className="ni__bubbles"><C cx="40" cy="34" r="2" /><C cx="47" cy="26" r="1.5" /><C cx="80" cy="33" r="2" /><C cx="73" cy="25" r="1.5" /></g>
</>)

const Mic = () => (<>
  <P d="M60 14a17 17 0 0 1 17 17v12a17 17 0 0 1-34 0V31a17 17 0 0 1 17-17Z" />
  <P d="M44 28h32M43 36h34M44 44h32M60 15v43" className="ni__thin" />
  <P d="M36 48v2a24 24 0 0 0 48 0v-2" />
  <P d="M60 74v16M46 104h28M60 90l-10 14M60 90l10 14" />
  <g className="ni__burst"><P d="M18 22l9 6M102 22l-9 6M14 46h10M106 46H96M22 68l8-4M98 68l-8-4" /></g>
  <Sparkle x={98} y={92} s={0.7} />
</>)

const Disco = () => (<>
  <P d="M60 6v14" />
  <C cx="60" cy="50" r="28" />
  <P d="M33 42h54M32 52h56M35 62h50M40 32h40M46 24h28M44 72h32" className="ni__thin" />
  <P d="M60 22c-8 7-12 17-12 28s4 21 12 28M60 22c8 7 12 17 12 28s-4 21-12 28" className="ni__thin" />
  <g className="ni__beams"><P d="M30 82l-12 20M90 82l12 20M48 88l-4 18M72 88l4 18" /></g>
  <Sparkle x={96} y={22} s={0.9} /><Sparkle x={22} y={30} s={0.7} />
</>)

const ICONS: Record<string, () => React.ReactElement> = { speaker: Speaker, rings: Rings, guitar: Guitar, coupes: Coupes, mic: Mic, disco: Disco }

export function NightIcon({ name }: { name: string }) {
  const Icon = ICONS[name]
  return (
    <svg className="ni" viewBox="0 0 120 120" aria-hidden="true">
      {Icon && <Icon />}
    </svg>
  )
}
