/* Enquiry form, sent through Web3Forms (free, no server needed). Submissions are emailed to the
   inbox the access key was created with; replying to that email goes straight to the enquirer.
   Until an access key is set in content.ts the form runs in preview mode and sends nothing. */
import { useId, useState, type FormEvent } from 'react'
import { contact } from '../content'

type Fields = { name: string; email: string; phone: string; type: string; date: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
const EMPTY: Fields = { name: '', email: '', phone: '', type: '', date: '', message: '' }
const TYPES = ['Wedding', 'Corporate', 'Other']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (!f.name.trim()) e.name = 'Please tell us your name.'
  if (!f.email.trim()) e.email = 'We need an email address to reply to.'
  else if (!EMAIL.test(f.email.trim())) e.email = 'That email address doesn’t look quite right.'
  if (f.phone && !/^[\d\s()+-]{7,}$/.test(f.phone.trim())) e.phone = 'Please check the phone number.'
  if (!f.message.trim()) e.message = 'Add a short message: your venue, timings, anything useful.'
  return e
}

const today = () => new Date().toISOString().slice(0, 10)
const prettyDate = (iso: string) =>
  iso ? new Date(iso + 'T12:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : ''

export function EnquiryForm() {
  const id = useId()
  const [f, setF] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')
  const preview = !contact.formAccessKey

  const set = (k: keyof Fields) => (v: string) => {
    setF((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const found = validate(f)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) { form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return }
    // spam trap: people never see or fill this box, bots usually do
    if ((form.elements.namedItem('botcheck') as HTMLInputElement)?.checked) return

    setStatus('sending')
    if (preview) { await new Promise((r) => setTimeout(r, 900)); setStatus('sent'); return }
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contact.formAccessKey,
          subject: `New ${f.type ? f.type.toLowerCase() + ' ' : ''}enquiry from ${f.name.trim()}`,
          from_name: 'The Consummates website',
          replyto: f.email.trim(),
          Name: f.name.trim(),
          Email: f.email.trim(),
          Phone: f.phone.trim() || 'Not given',
          'Type of booking': f.type || 'Not given',
          'Date of event': prettyDate(f.date) || 'Not given',
          Message: f.message.trim(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      setStatus(res.ok && data.success !== false ? 'sent' : 'failed')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div className="enquiry enquiry--sent" role="status">
        <svg className="enquiry__tick" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" /><path d="M15 24.5l6 6 12-13" /></svg>
        <h3 className="enquiry__title">Thanks, {f.name.trim().split(' ')[0]}.</h3>
        <p>Your message is with {contact.manager}. She usually replies within 12 hours, so keep an eye on your inbox (and your junk folder, just in case).</p>
        {preview && <p className="enquiry__preview">Preview only: this form isn’t connected yet, so nothing was sent.</p>}
        <button type="button" className="enquiry__again" onClick={() => { setF(EMPTY); setStatus('idle') }}>Send another message</button>
      </div>
    )
  }

  const field = (k: keyof Fields) => ({
    id: `${id}-${k}`, name: k, value: f[k],
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${id}-${k}-err` : undefined,
    onChange: (e: { target: { value: string } }) => set(k)(e.target.value),
  })
  const err = (k: keyof Fields) => errors[k] && <p className="enquiry__error" id={`${id}-${k}-err`}>{errors[k]}</p>

  return (
    <form className="enquiry" onSubmit={submit} noValidate aria-labelledby={`${id}-title`}>
      <h3 className="enquiry__title" id={`${id}-title`}>Send an enquiry</h3>

      <div className="enquiry__row">
        <div className="enquiry__field">
          <label htmlFor={`${id}-name`}>Name</label>
          <input {...field('name')} type="text" autoComplete="name" required />
          {err('name')}
        </div>
        <div className="enquiry__field">
          <label htmlFor={`${id}-email`}>Email</label>
          <input {...field('email')} type="email" autoComplete="email" inputMode="email" required />
          {err('email')}
        </div>
      </div>

      <div className="enquiry__row">
        <div className="enquiry__field">
          <label htmlFor={`${id}-phone`}>Phone <span>optional</span></label>
          <input {...field('phone')} type="tel" autoComplete="tel" inputMode="tel" />
          {err('phone')}
        </div>
        <div className="enquiry__field">
          <label htmlFor={`${id}-date`}>Date of event <span>optional</span></label>
          <input {...field('date')} type="date" min={today()} />
        </div>
      </div>

      <fieldset className="enquiry__field enquiry__types">
        <legend>Type of booking <span>optional</span></legend>
        <div className="enquiry__chips">
          {TYPES.map((t) => (
            <label key={t} className={`enquiry__chip${f.type === t ? ' is-on' : ''}`}>
              <input type="radio" name="type" value={t} checked={f.type === t}
                onChange={() => set('type')(t)} onClick={() => f.type === t && set('type')('')} />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="enquiry__field">
        <label htmlFor={`${id}-message`}>Message</label>
        <textarea {...field('message')} rows={5} required placeholder="Your venue, rough timings, anything we should know." />
        {err('message')}
      </div>

      <input type="checkbox" name="botcheck" className="enquiry__trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="enquiry__foot">
        <button className="btn enquiry__send" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </button>
        <p className="enquiry__note">{contact.manager} usually replies within 12 hours.</p>
      </div>
      {status === 'failed' && (
        <p className="enquiry__error enquiry__error--form" role="alert">
          Sorry, that didn’t send. Please try again, or message {contact.manager} on WhatsApp.
        </p>
      )}
    </form>
  )
}
