import { useLanguage } from '../context/LanguageContext'
import Icon from './Icon'

export default function VisionCard({ item, index }) {
  const { language, t } = useLanguage()
  return (
    <article className="vision-card">
      <div className="card-icon"><Icon name={item.icon} /></div>
      {index !== undefined && <span className="card-number">0{index + 1}</span>}
      <h3>{item.title[language]}</h3>
      <p>{item.description[language]}</p>
      <span className="card-label">{t.common.proposed}</span>
    </article>
  )
}
