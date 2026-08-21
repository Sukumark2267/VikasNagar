export default function SectionTitle({ eyebrow, title, intro, align = 'left', light = false }) {
  return (
    <div className={`section-title section-title--${align}${light ? ' section-title--light' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  )
}
