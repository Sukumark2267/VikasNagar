import { useLanguage } from '../context/LanguageContext'
import Icon from './Icon'

export default function DevelopmentCard({ item }) {
  const { language, t } = useLanguage()
  return (
    <article className="development-card">
      <div className="card-icon card-icon--small"><Icon name={item.icon} size={22} /></div>
      <div>
        <span className="mini-label">{t.common.proposed}</span>
        <h3>{item.title[language]}</h3>
        <p>{item.text[language]}</p>
      </div>
    </article>
  )
}
