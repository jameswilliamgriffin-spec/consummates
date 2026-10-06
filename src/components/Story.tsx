/* Chapter 1 continues on the moss the scroll film floods into. */
import { MeshGradient } from '@paper-design/shaders-react'
import { story } from '../content'
import { reduceMotion } from '../lib/motion'
import { LITE, ShaderBox } from './ShaderBox'

export function Story() {
  return (
    <section className="story" id="about">
      <ShaderBox className="story__shader">
        <MeshGradient
          {...LITE}
          style={{ width: '100%', height: '100%' }}
          colors={['#0B2A1D', '#14A672', '#F0C46C', '#0F3B2A']}
          distortion={1}
          swirl={0.7}
          speed={reduceMotion ? 0 : 0.6}
          grainOverlay={0.18}
        />
      </ShaderBox>
      <div className="story__inner">
        <div className="story__head">
          <p className="eyebrow" data-fade>{story.eyebrow}</p>
          <h2 className="story__title" data-split>{story.title}</h2>
        </div>
        <div className="story__body" data-fade="stagger">
          {story.paragraphs.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        </div>
      </div>
    </section>
  )
}
