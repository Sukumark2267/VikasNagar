import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { hi } from '../data/hi'
import { en } from '../data/en'

const LanguageContext = createContext(null)
const translations = { hi, en }

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('vikas-language') || 'hi')

  useEffect(() => {
    localStorage.setItem('vikas-language', language)
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === 'hi' ? 'en' : 'hi')),
      t: translations[language],
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
