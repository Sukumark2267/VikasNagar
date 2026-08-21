import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

export function usePageMeta(title, description) {
  const { language } = useLanguage()

  useEffect(() => {
    document.title = `${title} | Kuldeep Kumar — Vision Vikas 2027–32`
    const meta = document.querySelector('meta[name="description"]')
    if (meta && description) meta.setAttribute('content', description)
  }, [description, language, title])
}
