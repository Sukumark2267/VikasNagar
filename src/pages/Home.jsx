import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { visionPillars } from '../data/visionData'
import { developmentPriorities, youthFocus } from '../data/developmentData'
import { galleryItems } from '../data/galleryData'
import { videoItems } from '../data/videoData'
import candidatePhoto from '../assets/images/k1.jpeg'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import VisionCard from '../components/VisionCard'
import DevelopmentCard from '../components/DevelopmentCard'
import GalleryGrid from '../components/GalleryGrid'
import VideoCard from '../components/VideoCard'
import SocialLinks from '../components/SocialLinks'
import CTASection from '../components/CTASection'
import Icon from '../components/Icon'

export default function Home() {
  const { language, t } = useLanguage()
  usePageMeta(language === 'hi' ? 'होम' : 'Home', t.hero.description)
  const homePriorities = developmentPriorities.filter(({ id }) => !['electricity', 'services'].includes(id))

  return (
    <>
      <Hero />

      <section className="section section--about-home">
        <div className="container split-layout">
          <div className="portrait-card">
            <img src={candidatePhoto} alt={t.hero.name} />
            <div className="portrait-accent" aria-hidden="true">KK</div>
          </div>
          <div className="about-home-copy">
            <SectionTitle eyebrow={t.home.aboutEyebrow} title={t.home.aboutTitle} />
            <p className="lead-copy">{t.home.aboutText}</p>
            <blockquote>“{t.home.philosophy}”</blockquote>
            <p className="verification-note"><Icon name="check" size={18} />{t.common.verified}</p>
            <Link to="/about" className="text-link">{t.common.readMore}<Icon name="arrow" size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="title-row"><SectionTitle eyebrow={t.home.galleryEyebrow} title={t.home.galleryTitle} intro={t.home.galleryIntro} /><Link className="text-link title-link" to="/gallery">{language === 'hi' ? 'सभी फोटो देखें' : 'View All Photos'}<Icon name="arrow" size={18} /></Link></div>
          <GalleryGrid items={galleryItems.slice(0, 4)} />
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionTitle eyebrow={t.home.visionEyebrow} title={t.home.visionTitle} intro={t.home.visionIntro} align="center" />
          <div className="vision-grid">{visionPillars.map((item, index) => <VisionCard item={item} index={index} key={item.id} />)}</div>
          <div className="section-action"><Link className="button button--primary" to="/vision-2027-32">{t.hero.primary}<Icon name="arrow" size={18} /></Link></div>
        </div>
      </section>

      <section className="section action-section">
        <div className="container">
          <SectionTitle eyebrow={t.home.actionEyebrow} title={t.home.actionTitle} intro={t.home.actionIntro} align="center" />
          <div className="action-cards">
            {t.home.actions.map((action, index) => (
              <article key={action.title} className="action-card">
                <span className="action-step">0{index + 1}</span>
                <div className="card-icon"><Icon name={action.icon} /></div>
                <h3>{action.title}</h3><p>{action.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark priorities-section">
        <div className="container">
          <SectionTitle eyebrow={t.home.priorityEyebrow} title={t.home.priorityTitle} intro={t.home.priorityIntro} light />
          <div className="development-grid">{homePriorities.map((item) => <DevelopmentCard item={item} key={item.id} />)}</div>
          <div className="section-action section-action--left"><Link className="button button--accent" to="/development">{t.common.learnMore}<Icon name="arrow" size={18} /></Link></div>
        </div>
      </section>

      <section className="section youth-home">
        <div className="container split-layout split-layout--wide">
          <div>
            <SectionTitle eyebrow={t.home.youthEyebrow} title={t.home.youthTitle} intro={t.home.youthText} />
            <div className="focus-tags">
              {youthFocus.slice(0, 8).map((item) => <span key={item.title.en}><Icon name={item.icon} size={17} />{item.title[language]}</span>)}
            </div>
            <Link className="button button--primary" to="/register">{t.home.youthCta}<Icon name="arrow" size={18} /></Link>
          </div>
          <div className="youth-visual" aria-hidden="true">
            <div className="youth-orbit youth-orbit--one" /><div className="youth-orbit youth-orbit--two" />
            <div className="youth-number">Y<span>V</span></div><p>YOUTH<br />VIKASNAGAR</p>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container feature-duo">
          <article className="feature-panel feature-panel--women">
            <div className="card-icon"><Icon name="women" /></div><h2>{t.home.womenTitle}</h2><p>{t.home.womenText}</p>
            <div className="bullet-cloud"><span>{language === 'hi' ? 'कौशल विकास' : 'Skills'}</span><span>{language === 'hi' ? 'स्वास्थ्य जागरूकता' : 'Health awareness'}</span><span>{language === 'hi' ? 'सामुदायिक नेतृत्व' : 'Community leadership'}</span></div>
          </article>
          <article className="feature-panel feature-panel--farmers">
            <div className="card-icon"><Icon name="leaf" /></div><h2>{t.home.farmerTitle}</h2><p>{t.home.farmerText}</p>
            <div className="bullet-cloud"><span>{language === 'hi' ? 'योजना जानकारी' : 'Scheme information'}</span><span>{language === 'hi' ? 'बाजार संपर्क' : 'Market links'}</span><span>{language === 'hi' ? 'कृषि विकास' : 'Agricultural development'}</span></div>
          </article>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="title-row"><SectionTitle eyebrow={t.home.videosEyebrow} title={t.home.videosTitle} /><Link className="text-link title-link" to="/videos">{language === 'hi' ? 'सभी वीडियो देखें' : 'View All Videos'}<Icon name="arrow" size={18} /></Link></div>
          <div className="video-grid">{videoItems.slice(0, 3).map((item) => <VideoCard item={item} key={item.id} />)}</div>
        </div>
      </section>

      <section className="section social-section">
        <div className="container social-panel">
          <div><span className="eyebrow">FOLLOW THE JOURNEY</span><h2>{t.home.socialTitle}</h2><p>{t.home.socialText}</p></div>
          <SocialLinks />
        </div>
      </section>

      <CTASection title={t.home.ctaTitle} text={t.home.ctaText} button={t.home.ctaButton} />
    </>
  )
}
