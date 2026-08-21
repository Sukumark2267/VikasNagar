import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import PageHero from '../components/PageHero'
import RegistrationForm from '../components/RegistrationForm'
import Icon from '../components/Icon'

export default function Register() {
  const { language, t } = useLanguage()
  const page = t.pages.register
  usePageMeta(page.title, page.subtitle)
  const benefits = language === 'hi' ? ['स्थानीय गतिविधियों की जानकारी', 'स्वयंसेवा और टीम अवसर', 'अपने क्षेत्र की प्राथमिकता साझा करें'] : ['Updates about local activities', 'Volunteer and team opportunities', "Share your area's priority"]
  return (
    <>
      <PageHero {...page} />
      <section className="section register-section"><div className="container register-layout"><aside className="register-aside"><p className="eyebrow">JOIN THE MOVEMENT</p><h2>{language === 'hi' ? 'आपकी भागीदारी क्यों महत्वपूर्ण है?' : 'Why does your participation matter?'}</h2><p>{page.subtitle}</p><ul>{benefits.map((item) => <li key={item}><Icon name="check" size={18} />{item}</li>)}</ul><div className="privacy-note"><Icon name="services" size={22} /><p>{page.privacy}</p></div></aside><RegistrationForm /></div></section>
    </>
  )
}
