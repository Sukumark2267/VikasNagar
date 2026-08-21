import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import candidatePhoto from '../assets/images/k1.jpeg'
import Icon from './Icon'

export default function Hero() {
  const { t } = useLanguage()
  return (
    <section className="hero">
      <div className="hero-grid-pattern" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow eyebrow--light">{t.hero.eyebrow}</p>
          <h1>{t.hero.name}</h1>
          <p className="hero-title">{t.hero.title}</p>
          <p className="hero-tagline">{t.hero.tagline}</p>
          <p className="hero-description">{t.hero.description}</p>
          <div className="hero-actions">
            <Link to="/vision-2027-32" className="button button--accent">{t.hero.primary}<Icon name="arrow" size={19} /></Link>
            <Link to="/register" className="button button--outline-light">{t.hero.secondary}</Link>
          </div>
          <div className="hero-principles" aria-label="Vision principles">
            <span>LISTEN</span><i /> <span>ACT</span><i /> <span>SHOW RESULTS</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-frame">
            <img src={candidatePhoto} alt={t.hero.name} />
          </div>
          <div className="hero-badge"><strong>2027–32</strong><span>VISION<br />VIKASNAGAR</span></div>
        </div>
      </div>
    </section>
  )
}
