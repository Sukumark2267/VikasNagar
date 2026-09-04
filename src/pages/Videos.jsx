import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { videoItems } from '../data/videoData'
import PageHero from '../components/PageHero'
import VideoCard from '../components/VideoCard'
import CTASection from '../components/CTASection'
import Icon from '../components/Icon'

export default function Videos() {
  const { t } = useLanguage()
  const page = t.pages.videos
  usePageMeta(page.title, page.subtitle)
  return (
    <>
      <PageHero {...page} />
      <section className="section section--tint"><div className="container"><div className="content-note"><Icon name="play" size={20} /><p>{page.note}</p></div><div className="video-grid video-grid--page">{videoItems.map((item) => <VideoCard item={item} key={item.id} />)}</div></div></section>
      <CTASection title={t.home.socialTitle} text={t.home.socialText} button={t.nav.contact} to="/contact" />
    </>
  )
}
