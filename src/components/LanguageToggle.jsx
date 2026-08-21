import { useLanguage } from '../context/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  return (
    <div className="language-toggle" role="group" aria-label="Website language">
      <button type="button" className={language === 'hi' ? 'active' : ''} onClick={() => setLanguage('hi')} aria-pressed={language === 'hi'}>हिंदी</button>
      <span aria-hidden="true">|</span>
      <button type="button" className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>English</button>
    </div>
  )
}
