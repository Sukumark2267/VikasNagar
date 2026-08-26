import { useMemo, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import Icon from './Icon'

export default function GalleryGrid({ items, filterable = false }) {
  const { language, t } = useLanguage()
  const [active, setActive] = useState('all')
  const filters = ['all', 'meetings', 'youth', 'development', 'community', 'events']
  const visible = useMemo(() => active === 'all' ? items : items.filter((item) => item.category === active), [active, items])

  return (
    <>
      {filterable && (
        <div className="gallery-filters" aria-label="Gallery filters">
          {filters.map((filter) => (
            <button type="button" key={filter} onClick={() => setActive(filter)} className={active === filter ? 'active' : ''} aria-pressed={active === filter}>
              {t.pages.gallery.filters[filter]}
            </button>
          ))}
        </div>
      )}
      <div className={`gallery-grid${filterable ? ' gallery-grid--full' : ''}`}>
        {visible.map((item, index) => (
          <article className={`gallery-card gallery-card--${(index % 3) + 1}${item.orientation ? ` gallery-card--${item.orientation}` : ''}`} key={item.id}>
            <img src={item.image} alt={`${item.title[language]} — ${item.caption[language]}`} loading="lazy" decoding="async" />
            <div className="gallery-overlay">
              <span className="gallery-category">{t.pages.gallery.filters[item.category]}</span>
              <h3>{item.title[language]}</h3>
              {(item.date || item.location) && (
                <div className="gallery-meta">
                  {item.date && <span><Icon name="calendar" size={14} />{item.date[language]}</span>}
                  {item.location && <span><Icon name="pin" size={14} />{item.location[language]}</span>}
                </div>
              )}
              <p>{item.caption[language]}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
