export default function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className="page-hero">
      <div className="page-hero__orb" aria-hidden="true" />
      <div className="container page-hero__content">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {children}
      </div>
    </section>
  )
}
