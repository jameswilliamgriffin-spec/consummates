/* Our story, on the moss the scroll film floods into. */
import { story } from '../content'

export function Story() {
  return (
    <section className="story" id="about">
      <div className="story__inner">
        <div className="story__head">
          <h2 className="story__title">{story.title}</h2>
        </div>
        <div className="story__body">
          {story.paragraphs.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        </div>
      </div>
    </section>
  )
}
