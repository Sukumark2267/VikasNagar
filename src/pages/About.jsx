import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import candidatePhoto from '../assets/images/k1.jpeg'
import { galleryItems } from '../data/galleryData'
import { candidateDetails, organizationBackground } from '../data/candidateProfile'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import InfoCard from '../components/InfoCard'
import GalleryGrid from '../components/GalleryGrid'
import CTASection from '../components/CTASection'
import Icon from '../components/Icon'

export default function About() {
  const { language, t } = useLanguage()
  const page = t.pages.about
  usePageMeta(page.title, page.subtitle)
  const cards = [
    ['people', page.journeyTitle, page.journeyText], ['compass', page.philosophyTitle, page.philosophyText],
    ['pin', page.connectionTitle, page.connectionText], ['spark', page.visionTitle, page.visionText],
  ]
  const renderDetailValue = (detail) => {
    const value = detail.value[language]
    if (detail.type === 'phone') return <a href={`tel:${value}`}>{value}</a>
    if (detail.type === 'email') return <a href={`mailto:${value}`}>{value}</a>
    return value
  }
  return (
    <>
      <PageHero {...page} />
      <section className="section">
        <div className="container split-layout">
          <div className="portrait-card portrait-card--page"><img src={candidatePhoto} alt={t.hero.name} /></div>
          <div>
            <SectionTitle eyebrow={language === 'hi' ? 'प्रोफ़ाइल' : 'Profile'} title={page.profileTitle} />
            <p className="lead-copy">{page.profileText}</p>
            <h2 className="profile-details-title">{page.detailsTitle}</h2>
            <dl className="profile-details">
              {candidateDetails.map((detail) => (
                <div className={['email', 'address'].includes(detail.key) ? 'profile-detail profile-detail--wide' : 'profile-detail'} key={detail.key}>
                  <dt><Icon name={detail.icon} size={17} />{detail.label[language]}</dt>
                  <dd>{renderDetailValue(detail)}</dd>
                </div>
              ))}
            </dl>
            <p className="profile-source"><Icon name="check" size={17} />{page.profileSource}</p>
          </div>
        </div>
      </section>
      <section className="section section--tint organization-section">
        <div className="container">
          <SectionTitle eyebrow={page.trainingTitle} title={page.organizationTitle} intro={page.organizationIntro} />
          <div className="organization-training"><Icon name="book" size={22} /><strong>{organizationBackground.training[language]}</strong></div>
          <div className="organization-timeline">
            {organizationBackground.timeline.map((item, index) => (
              <article key={`${item.period}-${item.text.en}`}>
                <span className="organization-index">{String(index + 1).padStart(2, '0')}</span>
                <div><time>{language === 'en' && item.periodEn ? item.periodEn : item.period}</time><p>{item.text[language]}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section"><div className="container"><div className="info-grid">{cards.map(([icon, title, text]) => <InfoCard key={title} icon={icon} title={title} text={text} />)}</div></div></section>
      <section className="section"><div className="container"><SectionTitle eyebrow={language === 'hi' ? 'तस्वीरें' : 'In Pictures'} title={t.home.galleryTitle} intro={t.home.galleryIntro} /><GalleryGrid items={galleryItems.slice(0, 4)} /></div></section>
      <CTASection title={t.home.ctaTitle} text={t.home.ctaText} button={t.home.ctaButton} />
    </>
  )
}
