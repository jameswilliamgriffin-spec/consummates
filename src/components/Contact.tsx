/* Contact: heading and socials on the left, the three ways to reach Grace (WhatsApp, email, phone) as rows on the right. */
import { MeshGradient } from '@paper-design/shaders-react'
import { contact } from '../content'
import { reduceMotion } from '../lib/motion'
import { LITE, ShaderBox } from './ShaderBox'

const icons = {
  email: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="6" y="11" width="36" height="26" rx="3" />
      <path d="M7.5 13.5 24 26l16.5-12.5" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 40l2.6-8.2A16 16 0 1 1 16.4 37.6Z" />
      <path d="M18.5 16.5c.5-1 1.3-1 1.9-1 .4 0 .9 0 1.2.8l1.5 3.6c.2.5 0 .9-.3 1.3l-1.1 1.3c-.3.3-.4.7-.1 1.1a12 12 0 0 0 5.9 5.1c.4.2.8.1 1.1-.2l1.4-1.6c.4-.4.8-.4 1.3-.2l3.5 1.7c.5.2.8.5.7 1-.1 1.6-1.3 3.1-3.1 3.4-2 .3-4.6-.5-7.6-2.6a20 20 0 0 1-6.4-7.4c-1-2.3-.9-4.5.1-6.4Z" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M14.5 7.5h-4a3 3 0 0 0-3 3.2C8.3 27 21 39.7 37.3 40.5a3 3 0 0 0 3.2-3v-4.1a2 2 0 0 0-1.5-1.9l-6.1-1.6a2 2 0 0 0-2 .6l-2.4 2.6a24 24 0 0 1-10.6-10.6l2.6-2.4a2 2 0 0 0 .6-2l-1.6-6.1a2 2 0 0 0-1.9-1.5Z" />
    </svg>
  ),
}

const ways = [
  { key: 'whatsapp', label: 'WhatsApp', value: 'Message Grace', href: contact.whatsappHref, external: true },
  { key: 'email', label: 'Email', value: contact.email, href: `mailto:${contact.email}?subject=${encodeURIComponent('Wedding enquiry')}` },
  { key: 'phone', label: 'Call', value: contact.phoneDisplay, href: contact.phoneHref },
] as const

const socials = [
  { label: 'Facebook', href: contact.facebook, icon: <path d="M27 42V26h5.5l.9-6.5H27v-4.2c0-1.9.6-3.2 3.3-3.2H34V6.3c-.6-.1-2.7-.3-5.1-.3-5.1 0-8.4 3.1-8.4 8.7v4.8H15V26h5.5v16" /> },
  { label: 'Instagram', href: contact.instagram, icon: <><rect x="8" y="8" width="32" height="32" rx="9" /><circle cx="24" cy="24" r="7.5" /><circle cx="33.5" cy="14.5" r="1.4" className="social__dot" /></> },
]

export function Contact() {
  return (
    <section className="contact" id="contact">
      <ShaderBox className="contact__shader">
        <MeshGradient
          {...LITE}
          style={{ width: '100%', height: '100%' }}
          colors={['#0B2A1D', '#14A672', '#F0C46C', '#1C7F5A']}
          distortion={1}
          swirl={0.8}
          speed={reduceMotion ? 0 : 0.55}
          grainOverlay={0.18}
        />
      </ShaderBox>
      <div className="contact__inner">
        <div className="contact__lead">
          <h2 className="contact__title">Is your date free?</h2>
          <p className="contact__intro">
            Send {contact.manager} your date and venue and she’ll let you know. She usually replies within 12 hours.
          </p>
          <div className="socials">
            <p className="socials__label">Or follow us</p>
            <ul className="socials__list">
              {socials.map((s) => (
                <li key={s.label}>
                  <a className="social" href={s.href} target="_blank" rel="noopener">
                    <svg viewBox="0 0 48 48" aria-hidden="true">{s.icon}</svg>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="ways">
          {ways.map((w) => (
            <li key={w.key}>
              <a
                className="way"
                href={w.href}
                {...('external' in w ? { target: '_blank', rel: 'noopener' } : {})}
              >
                <span className="way__icon">{icons[w.key]}</span>
                <span className="way__label">{w.label}</span>
                <span className="way__value">{w.value}</span>
                <span className="way__arrow" aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
