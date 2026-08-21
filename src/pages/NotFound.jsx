import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  const { t } = useLanguage()
  const page = t.pages.notFound
  usePageMeta(page.title, page.text)
  return <section className="not-found"><div><span>404</span><h1>{page.title}</h1><p>{page.text}</p><Link className="button button--primary" to="/">{page.button}</Link></div></section>
}
