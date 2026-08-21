import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { developmentPriorities } from '../data/developmentData'
import { agendaIntro, agendaItems } from '../data/agendaData'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import DevelopmentCard from '../components/DevelopmentCard'
import AgendaAccordion from '../components/AgendaAccordion'
import CTASection from '../components/CTASection'
import Icon from '../components/Icon'

export default function Development() {
  const { language, t } = useLanguage()
  const page = t.pages.development
  usePageMeta(page.title, page.subtitle)
  return (
    <>
      <PageHero {...page} />
      <section className="section section--tint agenda-section">
        <div className="container">
          <div className="agenda-header">
            <SectionTitle eyebrow="VISION VIKAS 2027–32" title={agendaIntro.title[language]} intro={`${agendaIntro.tagline[language]} — ${agendaIntro.description[language]}`} />
            <div className="agenda-count" aria-label={`${agendaItems.length} development themes`}><strong>{agendaItems.length}</strong><span>{language === 'hi' ? 'विकास विषय' : 'DEVELOPMENT THEMES'}</span></div>
          </div>
          <AgendaAccordion items={agendaItems} />
        </div>
      </section>
      <section className="section">
        <div className="container"><SectionTitle eyebrow={language === 'hi' ? 'स्थानीय प्राथमिकताएँ' : 'Local Priorities'} title={page.title2} intro={page.intro} align="center" /><div className="development-grid development-grid--light">{developmentPriorities.map((item) => <DevelopmentCard item={item} key={item.id} />)}</div></div>
      </section>
      <section className="section section--tint"><div className="container process-row">
        {[['ear', language === 'hi' ? 'स्थानीय बात सुनना' : 'Listen Locally'], ['compass', language === 'hi' ? 'साझा प्राथमिकता बनाना' : 'Set Shared Priorities'], ['chart', language === 'hi' ? 'प्रगति साझा करना' : 'Share Progress']].map(([icon, title], index) => <article key={title}><span>0{index + 1}</span><Icon name={icon} /><h3>{title}</h3><p>{language === 'hi' ? 'जन-संवाद पर आधारित प्रस्तावित प्रक्रिया।' : 'A proposed process grounded in public dialogue.'}</p></article>)}
      </div></section>
      <CTASection title={language === 'hi' ? 'अपने क्षेत्र की प्राथमिकता साझा करें' : "Share Your Area's Priority"} text={language === 'hi' ? 'रजिस्ट्रेशन फॉर्म में स्थानीय मुद्दा या सुझाव लिखें।' : 'Use the registration form to describe a local issue or idea.'} button={t.nav.register} />
    </>
  )
}
