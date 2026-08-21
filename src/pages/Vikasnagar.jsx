import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import InfoCard from '../components/InfoCard'
import CTASection from '../components/CTASection'
import Icon from '../components/Icon'

const icons = ['people', 'spark', 'leaf', 'book', 'road', 'tree']

export default function Vikasnagar() {
  const { language, t } = useLanguage()
  const page = t.pages.vikasnagar
  usePageMeta(page.title, page.subtitle)
  return (
    <>
      <PageHero {...page} />
      <section className="section">
        <div className="container intro-band">
          <div><SectionTitle eyebrow={language === 'hi' ? 'क्षेत्र परिचय' : 'Constituency Introduction'} title={page.introTitle} /><p className="lead-copy">{page.introText}</p></div>
          <div className="placeholder-box placeholder-box--vertical"><Icon name="pin" size={28} /><strong>{language === 'hi' ? 'विकासनगर विधानसभा क्षेत्र' : 'Vikasnagar Assembly Constituency'}</strong><p>{t.common.verified}</p></div>
        </div>
      </section>
      <section className="section section--tint"><div className="container"><SectionTitle eyebrow={language === 'hi' ? 'लोग और स्थान' : 'People & Place'} title={language === 'hi' ? 'विकासनगर के प्रमुख आयाम' : 'Key Dimensions of Vikasnagar'} align="center" /><div className="info-grid info-grid--three">{page.areas.map(([title, text], index) => <InfoCard key={title} icon={icons[index]} title={title} text={text} />)}</div></div></section>
      <section className="section"><div className="container opportunity-panel"><span className="big-index">2027–32</span><div><SectionTitle eyebrow={language === 'hi' ? 'आगे की दिशा' : 'The Way Forward'} title={page.opportunityTitle} /><p>{page.opportunityText}</p><p className="verification-note"><Icon name="check" size={18} />{t.common.proposed}</p></div></div></section>
      <CTASection title={language === 'hi' ? 'विकासनगर के विज़न को विस्तार से देखें' : 'Explore the Vision for Vikasnagar'} text={t.pages.vision.subtitle} button={t.nav.vision} to="/vision-2027-32" />
    </>
  )
}
