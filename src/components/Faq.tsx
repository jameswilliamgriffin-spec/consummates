/* FAQ accordion. Heights animate with the CSS grid 0fr → 1fr trick (no measuring). */
import { useState } from 'react'
import { faq } from '../content'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="faq" id="faq" data-nav="dark">
      <header className="faq__head">
        <p className="eyebrow eyebrow--dark" data-fade>Good to know</p>
        <h2 className="faq__title" data-split>Questions couples ask</h2>
      </header>
      <div className="faq__list" data-fade="stagger">
        {faq.map((item, i) => {
          const isOpen = open === i
          return (
            <div className={`faq__item${isOpen ? ' is-open' : ''}`} key={item.q}>
              <h3>
                <button
                  className="faq__q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  id={`faq-q-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <i className="faq__icon" aria-hidden="true" />
                </button>
              </h3>
              <div className="faq__a" id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                <div><p>{item.a}</p></div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
