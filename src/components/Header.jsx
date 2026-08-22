import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from './LanguageToggle'
import logo from '../assets/images/logo.png'

export default function Header() {
  const { t } = useLanguage()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 36)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  const links = [
    ['/', t.nav.home], ['/about', t.nav.about], ['/vikasnagar', t.nav.vikasnagar],
    ['/vision-2027-32', t.nav.vision], ['/development', t.nav.development], ['/youth', t.nav.youth],
    ['/gallery', t.nav.gallery], ['/videos', t.nav.videos], ['/contact', t.nav.contact],
  ]

  const navigation = (
    <nav className={`main-nav${menuOpen ? ' main-nav--open' : ''}`} aria-label="Primary navigation">
      <div className="mobile-nav-top">
        <span className="mobile-nav-title">VISION VIKAS 2027–32</span>
        <button className="menu-button menu-button--close" type="button" onClick={() => setMenuOpen(false)} aria-label={t.nav.close}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="nav-links">
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>
        ))}
      </div>
      <div className="mobile-nav-actions">
        <LanguageToggle />
        <Link className="button button--primary button--full" to="/register">{t.nav.register}</Link>
      </div>
    </nav>
  )

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`site-header${compact ? ' site-header--compact' : ''}`}>
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="Kuldeep Kumar, Vision Vikas 2027–32 home">
            <span className="brand-logo" aria-hidden="true"><img src={logo} alt="" /></span>
            <span className="brand-copy"><strong>Kuldeep Kumar</strong><small>VISION VIKAS 2027–32</small></span>
          </Link>

          {!menuOpen && navigation}

          <div className="header-actions">
            <LanguageToggle />
            <Link className="button button--primary header-join" to="/register">{t.nav.register}</Link>
            <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-label={t.nav.menu}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
      {menuOpen && createPortal(
        <>
          {navigation}
          <button className="nav-backdrop" type="button" aria-label={t.nav.close} onClick={() => setMenuOpen(false)} />
        </>,
        document.body,
      )}
    </>
  )
}
