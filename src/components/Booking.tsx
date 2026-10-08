/* How booking works (six steps in order), then the other events the band plays. */
import { booking, events } from '../content'
import { scrollToHash } from '../lib/motion'

export function Booking() {
  return (
    <section className="booking" id="booking">
      <header className="booking__head">
        <h2 className="booking__title">{booking.title}</h2>
      </header>

      <ol className="steps">
        {booking.steps.map((s) => (
          <li className="step" key={s.title}>
            <h3 className="step__title">{s.title}</h3>
            <p className="step__body">{s.body}</p>
          </li>
        ))}
      </ol>

      <aside className="events" aria-labelledby="events-title">
        <div className="events__text">
          <h3 className="events__title" id="events-title">{events.title}</h3>
          <p className="events__body">{events.body}</p>
        </div>
        <ul className="events__list">
          {events.list.map((e) => <li key={e}>{e}</li>)}
        </ul>
        <a className="btn btn--gold events__cta" href="#contact"
          onClick={(e) => { e.preventDefault(); scrollToHash('#contact') }}>{events.cta}</a>
      </aside>
    </section>
  )
}
