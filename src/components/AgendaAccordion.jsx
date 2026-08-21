import { useLanguage } from '../context/LanguageContext'
import Icon from './Icon'

export default function AgendaAccordion({ items }) {
  const { language } = useLanguage()
  const labels = language === 'hi'
    ? { focus: 'यह किस आवश्यकता को संबोधित करता है', actions: 'प्रस्तावित कार्य', outcome: 'अपेक्षित परिणाम', indicator: 'प्रगति के संकेतक' }
    : { focus: 'What this addresses', actions: 'Proposed actions', outcome: 'Intended outcome', indicator: 'Progress indicators' }

  return (
    <div className="agenda-accordion">
      {items.map((item, index) => (
        <details className="agenda-item" key={item.id} open={index === 0}>
          <summary>
            <span className="agenda-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="agenda-icon"><Icon name={item.icon} size={22} /></span>
            <span className="agenda-summary-copy"><strong>{item.title[language]}</strong><small>{item.outcome[language]}</small></span>
            <span className="agenda-toggle" aria-hidden="true">+</span>
          </summary>
          <div className="agenda-content">
            <div className="agenda-focus"><span>{labels.focus}</span><p>{item.focus[language]}</p></div>
            <div className="agenda-actions">
              <h3>{labels.actions}</h3>
              <ul>{item.actions.map((action) => <li key={action.en}><Icon name="check" size={16} />{action[language]}</li>)}</ul>
            </div>
            <div className="agenda-result"><div><span>{labels.outcome}</span><p>{item.outcome[language]}</p></div><div><span>{labels.indicator}</span><p>{item.indicator[language]}</p></div></div>
          </div>
        </details>
      ))}
    </div>
  )
}
