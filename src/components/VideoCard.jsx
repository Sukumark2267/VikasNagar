import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import Icon from './Icon'

export default function VideoCard({ item, autoPlay = false }) {
  const { language } = useLanguage()
  const videoRef = useRef(null)
  const userStartedRef = useRef(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [playbackError, setPlaybackError] = useState('')
  const watch = language === 'hi' ? 'वीडियो देखें' : 'Watch video'
  const unavailable = language === 'hi' ? 'वीडियो शीघ्र जोड़ा जाएगा' : 'Video coming soon'
  const playNow = language === 'hi' ? 'वीडियो चलाएँ' : 'Play video'
  const playbackFailed = language === 'hi'
    ? 'वीडियो नहीं चल सका। कृपया दोबारा प्रयास करें।'
    : 'The video could not play. Please try again.'
  const videoLabel = language === 'hi' ? 'वीडियो' : 'Video'
  const meta = item.duration ? `${videoLabel} • ${item.duration}` : item.date?.[language]

  const startVideo = () => {
    const video = videoRef.current
    if (!video) return

    userStartedRef.current = true
    video.muted = false
    setPlaybackError('')
    video.play().catch(() => setPlaybackError(playbackFailed))
  }

  useEffect(() => {
    const video = videoRef.current
    if (!autoPlay || !video) return undefined

    video.muted = true
    const playVideo = () => {
      if (userStartedRef.current) return
      video.muted = true
      video.play().catch(() => undefined)
    }

    if (!('IntersectionObserver' in window)) {
      playVideo()
      return () => video.pause()
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) playVideo()
      else if (!userStartedRef.current) video.pause()
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
          <>
            <video
              ref={videoRef}
              controls
              playsInline
              preload="metadata"
              poster={item.poster}
              aria-label={item.title[language]}
              onPlay={() => {
                setHasStarted(true)
                setPlaybackError('')
              }}
              onError={() => setPlaybackError(playbackFailed)}
            >
              <source src={item.source} type="video/mp4" />
              {unavailable}
            </video>
            {!hasStarted && (
              <button type="button" className="video-start-button" onClick={startVideo} aria-label={`${playNow}: ${item.title[language]}`}>
                {item.poster && <img src={item.poster} alt="" />}
                <span className="video-start-button__icon" aria-hidden="true"><Icon name="play" size={34} /></span>
                <span className="video-start-button__label">{playNow}</span>
              </button>
            )}
            {playbackError && <span className="video-playback-error" role="alert">{playbackError}</span>}
          </>
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
