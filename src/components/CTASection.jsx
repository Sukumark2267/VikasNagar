import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function CTASection({ title, text, button, to = '/register' }) {
  return (
    <section className="section section--cta">
      <div className="container cta-panel">
        <div>
          <span className="cta-kicker">VISION VIKAS 2027–32</span>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <Link to={to} className="button button--light">{button}<Icon name="arrow" size={19} /></Link>
      </div>
    </section>
  )
}
