import { useLanguage } from '../context/LanguageContext'
import Icon from './Icon'

export default function VideoCard({ item }) {
  const { language } = useLanguage()
  const watch = language === 'hi' ? 'वीडियो देखें' : 'Watch video'
  const unavailable = language === 'hi' ? 'वीडियो शीघ्र जोड़ा जाएगा' : 'Video coming soon'
  return (
    <article className="video-card">
      <div className={`video-thumbnail video-thumbnail--${item.platform}`}>
        <div className="video-pattern" aria-hidden="true" />
        <span className="platform-label">{item.platform}</span>
        <span className="play-button"><Icon name="play" size={38} /></span>
      </div>
      <div className="video-body">
        <span className="video-date">{item.date[language]}</span>
        <h3>{item.title[language]}</h3>
        <p>{item.description[language]}</p>
        {item.url ? <a href={item.url} target="_blank" rel="noreferrer" className="text-link">{watch}<Icon name="arrow" size={17} /></a> : <span className="text-link text-link--disabled">{unavailable}</span>}
      </div>
    </article>
  )
}
