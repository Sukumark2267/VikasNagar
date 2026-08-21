import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { galleryItems } from '../data/galleryData'
import PageHero from '../components/PageHero'
import GalleryGrid from '../components/GalleryGrid'
import CTASection from '../components/CTASection'
import Icon from '../components/Icon'

export default function Gallery() {
  const { t } = useLanguage()
  const page = t.pages.gallery
  usePageMeta(page.title, page.subtitle)
  return (
    <>
      <PageHero {...page} />
      <section className="section"><div className="container"><div className="content-note"><Icon name="check" size={19} /><p>{page.note}</p></div><GalleryGrid items={galleryItems} filterable /></div></section>
      <CTASection title={t.home.ctaTitle} text={t.home.ctaText} button={t.home.ctaButton} />
    </>
  )
}
