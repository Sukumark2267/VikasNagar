import Icon from './Icon'

export default function InfoCard({ icon = 'spark', title, text }) {
  return (
    <article className="info-card">
      <div className="card-icon card-icon--small"><Icon name={icon} size={22} /></div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}
