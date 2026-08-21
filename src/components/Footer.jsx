import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import SocialLinks from './SocialLinks'
import logo from '../assets/images/logo.png'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand brand--footer">
            <span className="brand-logo" aria-hidden="true"><img src={logo} alt="" /></span>
            <span className="brand-copy"><strong>Kuldeep Kumar</strong><small>VISION VIKAS 2027–32</small></span>
          </Link>
          <p>{t.footer.about}</p>
        </div>
        <div>
          <h2>{t.footer.quickLinks}</h2>
          <div className="footer-links">
            <Link to="/about">{t.nav.about}</Link>
            <Link to="/vision-2027-32">{t.nav.vision}</Link>
            <Link to="/development">{t.nav.development}</Link>
            <Link to="/gallery">{t.nav.gallery}</Link>
          </div>
        </div>
        <div>
          <h2>{t.footer.connect}</h2>
          <div className="footer-links">
            <Link to="/youth">{t.nav.youth}</Link>
            <Link to="/videos">{t.nav.videos}</Link>
            <Link to="/register">{t.nav.register}</Link>
            <Link to="/contact">{t.nav.contact}</Link>
          </div>
        </div>
        <div>
          <h2>{t.footer.contact}</h2>
          <a className="footer-email" href={`mailto:${t.footer.email}`}>{t.footer.email}</a>
          <SocialLinks compact />
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {year} Kuldeep Kumar — Vision Vikas 2027–32. {t.footer.rights}</p>
        <p>{t.common.publicCommunication}</p>
      </div>
    </footer>
  )
}
