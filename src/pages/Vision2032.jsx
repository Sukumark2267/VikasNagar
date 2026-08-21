import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { roadmap, visionPillars } from '../data/visionData'
import { visionStatement } from '../data/agendaData'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import VisionCard from '../components/VisionCard'
import CTASection from '../components/CTASection'
import Icon from '../components/Icon'

export default function Vision2032() {
  const { language, t } = useLanguage()
  const page = t.pages.vision
  usePageMeta(page.title, page.subtitle)
  return (
    <>
      <PageHero {...page}><div className="hero-note"><Icon name="check" size={18} />{page.roadmapNote}</div></PageHero>
      <section className="section section--tint">
        <div className="container"><SectionTitle eyebrow={language === 'hi' ? '8 PILLARS · ONE VISION' : '8 PILLARS · ONE VISION'} title={page.pillarsTitle} intro={page.pillarsIntro} align="center" /><div className="vision-grid">{visionPillars.map((item, index) => <VisionCard item={item} index={index} key={item.id} />)}</div></div>
      </section>
      <section className="section roadmap-section">
        <div className="container"><SectionTitle eyebrow="2027–32" title={page.roadmapTitle} intro={page.roadmapNote} />
          <div className="roadmap" role="list">
            {roadmap.map((step, index) => <article className="roadmap-item" key={step.year} role="listitem"><div className="roadmap-year">{step.year}</div><div className="roadmap-dot" aria-hidden="true"><span>{index + 1}</span></div><div className="roadmap-content"><h3>{step.title[language]}</h3><p>{step.text[language]}</p><span>{t.common.proposed}</span></div></article>)}
          </div>
        </div>
      </section>
      <section className="section section--dark"><div className="container vision-statement"><span>“</span><div><p>{visionStatement[language]}</p><small>{language === 'hi' ? 'विज़न विकास 2027–32 · प्रस्तावित विकास संकल्प' : 'VISION VIKAS 2027–32 · PROPOSED DEVELOPMENT RESOLUTION'}</small></div></div></section>
      <CTASection title={t.home.ctaTitle} text={t.home.ctaText} button={t.home.ctaButton} />
    </>
  )
}
