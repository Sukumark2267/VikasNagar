import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import FloatingSocialLinks from './components/FloatingSocialLinks'
import WelcomeModal from './components/WelcomeModal'
import Home from './pages/Home'
import About from './pages/About'
import Vikasnagar from './pages/Vikasnagar'
import Vision2032 from './pages/Vision2032'
import Development from './pages/Development'
import Youth from './pages/Youth'
import Gallery from './pages/Gallery'
import Videos from './pages/Videos'
import Register from './pages/Register'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <WelcomeModal />
      <Header />
      <FloatingSocialLinks />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vikasnagar" element={<Vikasnagar />} />
          <Route path="/vision-2027-32" element={<Vision2032 />} />
          <Route path="/vision-2032" element={<Navigate to="/vision-2027-32" replace />} />
          <Route path="/development" element={<Development />} />
          <Route path="/youth" element={<Youth />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
