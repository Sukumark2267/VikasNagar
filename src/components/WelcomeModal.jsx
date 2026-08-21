import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import Icon from './Icon'

export default function WelcomeModal() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(true)
  const dialogRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const previouslyFocused = document.activeElement
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        return
      }

      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll('a[href], button:not([disabled])')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.body.classList.add('modal-open')
    document.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()

    return () => {
      document.body.classList.remove('modal-open')
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="join-modal-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && setIsOpen(false)}
      role="presentation"
    >
      <section
        ref={dialogRef}
        className="join-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-modal-title"
        aria-describedby="join-modal-description"
      >
        <button
          ref={closeRef}
          className="join-modal__close"
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label={t.welcomeModal.close}
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="join-modal__visual" aria-hidden="true">
          <div className="join-modal__orbit join-modal__orbit--one" />
          <div className="join-modal__orbit join-modal__orbit--two" />
          <div className="join-modal__mark"><Icon name="people" size={38} /></div>
          <span className="join-modal__year">2027–32</span>
        </div>

        <div className="join-modal__content">
          <p className="eyebrow">VISION VIKAS 2027–32</p>
          <h2 id="join-modal-title">{t.welcomeModal.title}</h2>
          <p id="join-modal-description">{t.welcomeModal.text}</p>
          <Link className="button button--accent join-modal__cta" to="/register" onClick={() => setIsOpen(false)}>
            {t.welcomeModal.button}<Icon name="arrow" size={18} />
          </Link>
          <button className="join-modal__later" type="button" onClick={() => setIsOpen(false)}>
            {t.welcomeModal.later}
          </button>
        </div>
      </section>
    </div>
  )
}
