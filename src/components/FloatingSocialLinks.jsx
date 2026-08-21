import SocialLinks from './SocialLinks'

export default function FloatingSocialLinks() {
  return (
    <aside className="floating-social-rail" aria-label="Social media links">
      <span className="floating-social-label" aria-hidden="true">FOLLOW</span>
      <SocialLinks compact />
    </aside>
  )
}
