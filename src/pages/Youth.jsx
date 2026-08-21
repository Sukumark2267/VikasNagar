import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { youthFocus } from '../data/developmentData'
import { agendaItems } from '../data/agendaData'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import InfoCard from '../components/InfoCard'
import AgendaAccordion from '../components/AgendaAccordion'
import CTASection from '../components/CTASection'

export default function Youth() {
  const { language, t } = useLanguage()
  const page = t.pages.youth
  const youthAgenda = agendaItems.filter((item) => ['youth-migration', 'youth-council'].includes(item.id))
  usePageMeta(page.title, page.subtitle)
  return (
    <>
      <PageHero {...page}><div className="page-hero__tags"><span>#Skills</span><span>#Sports</span><span>#Careers</span><span>#Volunteering</span></div></PageHero>
      <section className="section"><div className="container"><SectionTitle eyebrow="YOUTH VIKASNAGAR" title={page.title2} intro={page.intro} align="center" /><div className="info-grid info-grid--youth">{youthFocus.map((item) => <InfoCard key={item.title.en} icon={item.icon} title={item.title[language]} text={item.text[language]} />)}</div></div></section>
      <section className="section section--tint"><div className="container"><SectionTitle eyebrow={language === 'hi' ? 'पढ़ें · काम करें · नेतृत्व करें' : 'STUDY · WORK · LEAD'} title={page.resolutionTitle} intro={page.resolutionIntro} /><AgendaAccordion items={youthAgenda} /></div></section>
      <section className="section youth-manifesto"><div className="container"><div className="youth-manifesto__mark">YV</div><div><p className="eyebrow eyebrow--light">LEARN · LEAD · CONTRIBUTE</p><h2>{language === 'hi' ? 'युवा सिर्फ भविष्य नहीं—आज के भागीदार हैं।' : 'Young people are not only the future—they are partners today.'}</h2><p>{language === 'hi' ? 'यह एक प्रस्तावित मंच है जहाँ युवा सीख सकें, अपने विचार रख सकें और समुदाय के लिए योगदान दे सकें।' : 'A proposed platform where young people can learn, share ideas and contribute to the community.'}</p></div></div></section>
      <CTASection title={page.ctaTitle} text={page.ctaText} button={page.ctaButton} />
    </>
  )
}
