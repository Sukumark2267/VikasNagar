import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { submitRegistration } from '../services/registrationService'
import Icon from './Icon'

const initialForm = {
  name: '', mobile: '', email: '', age: '', area: '', ward: '', occupation: '', participation: '', issue: '', consent: false, website: '',
}

export default function RegistrationForm() {
  const { language, t } = useLanguage()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const next = {}
    const normalizedMobile = form.mobile.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
    if (!form.name.trim()) next.name = t.form.errors.name
    if (!/^\d{10}$/.test(normalizedMobile)) next.mobile = t.form.errors.mobile
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t.form.errors.email
    if (!form.area.trim()) next.area = t.form.errors.area
    if (!form.participation) next.participation = t.form.errors.participation
    if (!form.consent) next.consent = t.form.errors.consent
    return next
  }

  const update = ({ target }) => {
    const { name, value, type, checked } = target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      setStatus({ type: '', message: '' })
      const firstInvalid = event.currentTarget.querySelector(`[name="${Object.keys(nextErrors)[0]}"]`)
      firstInvalid?.focus()
      return
    }

    setLoading(true)
    setStatus({ type: '', message: '' })
    try {
      const normalizedMobile = form.mobile.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
      await submitRegistration({ ...form, mobile: normalizedMobile, language })
      setForm(initialForm)
      setErrors({})
      setStatus({ type: 'success', message: t.form.success })
    } catch (error) {
      setStatus({ type: 'error', message: error.code === 'NOT_CONFIGURED' ? t.form.notConfigured : t.form.error })
    } finally {
      setLoading(false)
    }
  }

  const field = (name, label, props = {}) => {
    const { full, ...inputProps } = props
    return (
    <div className={`form-field${full ? ' form-field--full' : ''}`}>
      <label htmlFor={name}>{label}{props.required && <span aria-hidden="true"> *</span>}</label>
      <input
        id={name}
        name={name}
        value={form[name]}
        onChange={update}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        {...inputProps}
      />
      {errors[name] && <span className="field-error" id={`${name}-error`}>{errors[name]}</span>}
    </div>
    )
  }

  return (
    <form className="registration-form" onSubmit={onSubmit} noValidate>
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off" />
      </div>
      <div className="form-heading"><div><p className="eyebrow">VISION VIKAS 2027–32</p><h2>{t.form.title}</h2></div><span>{t.form.requiredNote}</span></div>
      <div className="form-grid">
        {field('name', t.form.name, { required: true, placeholder: t.form.namePlaceholder, autoComplete: 'name' })}
        {field('mobile', t.form.mobile, { required: true, placeholder: t.form.mobilePlaceholder, type: 'tel', inputMode: 'numeric', autoComplete: 'tel', maxLength: 14 })}
        {field('email', t.form.email, { placeholder: t.form.emailPlaceholder, type: 'email', autoComplete: 'email' })}
        {field('age', t.form.age, { placeholder: t.form.agePlaceholder, type: 'number', min: 16, max: 120, inputMode: 'numeric' })}
        {field('area', t.form.area, { required: true, placeholder: t.form.areaPlaceholder, autoComplete: 'address-level3' })}
        {field('ward', t.form.ward, { placeholder: t.form.wardPlaceholder })}
        {field('occupation', t.form.occupation, { placeholder: t.form.occupationPlaceholder })}
        <div className="form-field">
          <label htmlFor="participation">{t.form.participation}<span aria-hidden="true"> *</span></label>
          <select id="participation" name="participation" value={form.participation} onChange={update} aria-invalid={Boolean(errors.participation)} aria-describedby={errors.participation ? 'participation-error' : undefined}>
            <option value="">{t.form.choose}</option>
            {Object.entries(t.form.options).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
          </select>
          {errors.participation && <span className="field-error" id="participation-error">{errors.participation}</span>}
        </div>
        <div className="form-field form-field--full">
          <label htmlFor="issue">{t.form.issue}</label>
          <textarea id="issue" name="issue" rows="5" value={form.issue} onChange={update} placeholder={t.form.issuePlaceholder} />
        </div>
        <div className="form-field form-field--full consent-field">
          <label><input type="checkbox" name="consent" checked={form.consent} onChange={update} aria-invalid={Boolean(errors.consent)} /> <span>{t.form.consent}</span></label>
          {errors.consent && <span className="field-error" id="consent-error">{errors.consent}</span>}
        </div>
      </div>
      {status.message && <div className={`form-status form-status--${status.type}`} role="status"><Icon name={status.type === 'success' ? 'check' : 'spark'} size={20} /><span>{status.message}</span></div>}
      <button className="button button--accent form-submit" type="submit" disabled={loading}>{loading ? t.form.submitting : t.form.submit}<Icon name="arrow" size={18} /></button>
    </form>
  )
}
