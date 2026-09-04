import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import Icon from './Icon'

export default function VideoCard({ item, autoPlay = false }) {
  const { language } = useLanguage()
  const videoRef = useRef(null)
  const watch = language === 'hi' ? 'वीडियो देखें' : 'Watch video'
  const unavailable = language === 'hi' ? 'वीडियो शीघ्र जोड़ा जाएगा' : 'Video coming soon'
  const videoLabel = language === 'hi' ? 'वीडियो' : 'Video'
  const meta = item.duration ? `${videoLabel} • ${item.duration}` : item.date?.[language]

  useEffect(() => {
    const video = videoRef.current
    if (!autoPlay || !video) return undefined

    video.muted = true
    const playVideo = () => video.play().catch(() => undefined)

    if (!('IntersectionObserver' in window)) {
      playVideo()
      return () => video.pause()
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) playVideo()
      else video.pause()
    }, { threshold: 0.45 })

    observer.observe(video)
    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [autoPlay, item.source])

  return (
    <article className="video-card">
      <div className={`video-thumbnail video-thumbnail--${item.platform}`}>
        {item.source ? (
          <video ref={videoRef} controls playsInline muted={autoPlay} preload={autoPlay ? 'auto' : 'metadata'} poster={item.poster} aria-label={item.title[language]}>
            <source src={item.source} type="video/mp4" />
            {unavailable}
          </video>
        ) : (
          <>
            <div className="video-pattern" aria-hidden="true" />
            <span className="platform-label">{item.platform}</span>
            <span className="play-button"><Icon name="play" size={38} /></span>
          </>
        )}
      </div>
      <div className="video-body">
        {meta && <span className="video-date">{meta}</span>}
        <h3>{item.title[language]}</h3>
        <p>{item.description[language]}</p>
        {!item.source && (item.url
          ? <a href={item.url} target="_blank" rel="noreferrer" className="text-link">{watch}<Icon name="arrow" size={17} /></a>
          : <span className="text-link text-link--disabled">{unavailable}</span>)}
      </div>
    </article>
  )
}
