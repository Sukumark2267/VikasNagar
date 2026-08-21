import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import PageHero from '../components/PageHero'
import SocialLinks from '../components/SocialLinks'
import CTASection from '../components/CTASection'
import Icon from '../components/Icon'

export default function Contact() {
  const { language, t } = useLanguage()
  const page = t.pages.contact
  usePageMeta(page.title, page.subtitle)
  const details = [
    { icon: 'pin', label: language === 'hi' ? 'पता' : 'Address', value: page.address },
    { icon: 'phone', label: language === 'hi' ? 'फोन' : 'Phone', value: page.phone },
    { icon: 'mail', label: language === 'hi' ? 'ईमेल' : 'Email', value: page.email, href: `mailto:${page.email}` },
  ]
  return (
    <>
      <PageHero {...page} />
      <section className="section"><div className="container contact-layout"><div><p className="eyebrow">CONTACT</p><h2>{page.detailsTitle}</h2><div className="contact-list">{details.map(({ icon, label, value, href }) => <div key={label}><span><Icon name={icon} /></span><div><h3>{label}</h3><p>{href ? <a href={href}>{value}</a> : value}</p></div></div>)}</div></div><div className="contact-social"><h2>{t.home.socialTitle}</h2><p>{t.home.socialText}</p><SocialLinks /><div className="content-note"><Icon name="check" size={18} /><p>{t.common.verified}</p></div></div></div></section>
      <CTASection title={page.ctaTitle} text={page.ctaText} button={t.nav.register} />
    </>
  )
}
