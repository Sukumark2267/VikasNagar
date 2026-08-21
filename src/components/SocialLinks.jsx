import { socialLinks } from '../data/socialLinks'

function SocialIcon({ type }) {
  if (type === 'facebook') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4.4c-.5-.1-2.2-.2-4.1-.2-4 0-6.7 2.4-6.7 6.9V15H2v4.9h4.2V24h5.1v-4.1h4.2L16.2 15h-4.9v-3.4c0-1.4.4-2.4 2.7-2.4V8Z" /></svg>
  if (type === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.7" r="1" className="social-icon-fill" /></svg>
  if (type === 'youtube') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.6 4.6 12 4.6 12 4.6s-5.6 0-7.5.5a3 3 0 0 0-2.1 2.1A31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.9.5 7.5.5 7.5.5s5.6 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8Z" /><path d="m10 15.2 5.2-3.2L10 8.8v6.4Z" className="social-icon-fill" /></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22H17l-4.9-6.4L6.6 22H3.5l7.2-8.3L3 2h6.4l4.4 5.8L18.9 2Zm-1.1 17.9h1.7L8.5 4H6.7l11.1 15.9Z" /></svg>
}

export default function SocialLinks({ compact = false }) {
  return (
    <div className={`social-links${compact ? ' social-links--compact' : ''}`}>
      {socialLinks.map((item) => item.url ? (
        <a key={item.key} href={item.url} target="_blank" rel="noreferrer" data-label={item.name} aria-label={`${item.name} (opens in a new tab)`}>
          <span aria-hidden="true"><SocialIcon type={item.key} /></span>{!compact && item.name}
        </a>
      ) : (
        <span key={item.key} className="social-link--disabled" data-label={item.name} aria-label={`${item.name} link to be added`} title={`${item.name} URL to be added`}>
          <span aria-hidden="true"><SocialIcon type={item.key} /></span>{!compact && item.name}
        </span>
      ))}
    </div>
  )
}
