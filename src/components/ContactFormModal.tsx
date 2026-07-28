import { useState, useRef, type FormEvent } from 'react'
import { Send, CheckCircle, AlertCircle, Mail } from 'lucide-react'
import Modal from './Modal'
import type { ContactRoute } from '../data/contactRoutes'

/**
 * Where submissions go.
 *
 * With `VITE_CONTACT_ENDPOINT` set (a Formspree/Web3Forms URL, or our own
 * serverless function), the form POSTs JSON and the visitor never leaves the
 * page. Without it there is no server to receive anything, so we fall back to
 * composing the message into the visitor's mail client — everything they typed
 * is carried across, they just press send.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

type Values = Record<string, string>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function ContactFormModal({
  route,
  onClose,
}: {
  route: ContactRoute
  onClose: () => void
}) {
  const fields = [...route.fields]
  const [values, setValues] = useState<Values>(() =>
    Object.fromEntries(fields.map((f) => [f.name, ''])),
  )
  const [errors, setErrors] = useState<Values>({})
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle')
  const [failure, setFailure] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  /** Bot trap — real people never see or fill this. */
  const [honey, setHoney] = useState('')

  const set = (name: string, v: string) => {
    setValues((p) => ({ ...p, [name]: v }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const validate = () => {
    const next: Values = {}
    for (const f of fields) {
      const v = values[f.name]?.trim() ?? ''
      if (f.required && !v) next[f.name] = `${f.label} is required`
      else if (f.type === 'email' && v && !EMAIL_RE.test(v))
        next[f.name] = 'Enter a valid email address'
    }
    if (!consent) next.consent = 'Please confirm before sending'
    setErrors(next)
    return next
  }

  const composeBody = () =>
    fields
      .map((f) => `${f.label}: ${values[f.name]?.trim() || '—'}`)
      .join('\n')
      .concat(`\n\nSent from hydrgel.com — ${route.title}`)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (honey) return // silently drop bots

    const found = validate()
    if (Object.keys(found).length > 0) {
      const first = fields.find((f) => found[f.name])
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first.name}"]`)?.focus()
      return
    }

    const body = composeBody()

    if (!ENDPOINT) {
      window.location.href = `mailto:${route.email}?subject=${encodeURIComponent(
        route.subject,
      )}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...values,
          _enquiry: route.title,
          _subject: route.subject,
          _to: route.email,
        }),
      })
      if (!res.ok) throw new Error(`Server responded ${res.status}`)
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setFailure(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  // ---------------------------------------------------------------- success
  if (status === 'sent' || status === 'mailto') {
    return (
      <Modal onClose={onClose} labelledBy="contact-form-title" accent={route.accent} size="md">
        <div className="px-6 py-10 text-center">
          <CheckCircle className="h-12 w-12 text-green-700 mx-auto" />
          <h2 id="contact-form-title" className="mt-4 text-xl font-bold text-blue-500">
            {status === 'sent' ? 'Message sent' : 'Your email is ready to send'}
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed max-w-measure mx-auto">
            {status === 'sent' ? (
              <>
                Thanks — this has reached {route.email}. We answer deployment and partnership
                enquiries first, usually within two working days.
              </>
            ) : (
              <>
                We have opened your email app with everything filled in. Press send there to
                complete it. If nothing opened, email us directly at{' '}
                <a href={`mailto:${route.email}`} className="text-blue-600 underline">
                  {route.email}
                </a>
                .
              </>
            )}
          </p>
          <button
            onClick={onClose}
            className="mt-8 font-display font-semibold bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </Modal>
    )
  }

  // ------------------------------------------------------------------- form
  return (
    <Modal onClose={onClose} labelledBy="contact-form-title" accent={route.accent}>
      <div className="overflow-y-auto px-6 py-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
          {route.who}
        </p>
        <h2 id="contact-form-title" className="mt-2 text-2xl font-bold text-blue-500 pr-8">
          {route.title}
        </h2>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">{route.formIntro}</p>

        <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
          <input
            type="text"
            name="_company_website"
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          {fields.map((f) => {
            const id = `cf-${f.name}`
            const err = errors[f.name]
            return (
              <div key={f.name}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-900 mb-1.5">
                  {f.label}
                  {!f.required && <span className="text-gray-500 font-normal"> (optional)</span>}
                </label>

                {f.type === 'textarea' ? (
                  <textarea
                    id={id}
                    name={f.name}
                    rows={4}
                    value={values[f.name]}
                    onChange={(e) => set(f.name, e.target.value)}
                    placeholder={f.placeholder}
                    aria-invalid={!!err}
                    aria-describedby={err ? `${id}-err` : undefined}
                    className={`w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      err ? 'border-red-600' : 'border-gray-300'
                    }`}
                  />
                ) : (
                  <input
                    id={id}
                    name={f.name}
                    type={f.type ?? 'text'}
                    value={values[f.name]}
                    onChange={(e) => set(f.name, e.target.value)}
                    placeholder={f.placeholder}
                    autoComplete={f.autoComplete}
                    aria-invalid={!!err}
                    aria-describedby={err ? `${id}-err` : undefined}
                    className={`w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      err ? 'border-red-600' : 'border-gray-300'
                    }`}
                  />
                )}

                {err && (
                  <p id={`${id}-err`} className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                    {err}
                  </p>
                )}
              </div>
            )
          })}

          <div>
            <label className="flex items-start gap-2.5 text-sm text-gray-600">
              <input
                type="checkbox"
                name="consent"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked)
                  if (errors.consent) setErrors((p) => ({ ...p, consent: '' }))
                }}
                aria-invalid={!!errors.consent}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>
                I&rsquo;m happy for HYDRGEL to use these details to reply to this enquiry.
              </span>
            </label>
            {errors.consent && (
              <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                {errors.consent}
              </p>
            )}
          </div>

          {status === 'error' && (
            <div role="alert" className="rounded-md bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-800 font-medium">That didn&rsquo;t send.</p>
              <p className="mt-1 text-xs text-red-700">
                {failure}. Email{' '}
                <a href={`mailto:${route.email}`} className="underline">
                  {route.email}
                </a>{' '}
                directly and we&rsquo;ll pick it up.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full inline-flex items-center justify-center gap-2 font-display font-semibold bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? (
              'Sending…'
            ) : ENDPOINT ? (
              <>
                <Send className="h-4 w-4" />
                Send message
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" />
                Compose this email
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Goes to {route.email}. We don&rsquo;t share your details with anyone.
          </p>
        </form>
      </div>
    </Modal>
  )
}
