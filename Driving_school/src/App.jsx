import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Notification from './components/Notification'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Booking from './pages/Booking'
import Curriculums from './pages/Curriculums'
import About from './pages/About'
import ContactPage from './pages/ContactPage'

import Trainers from './pages/Trainers'

function App() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleDarkMode = () => setIsDark((prev) => !prev)
  
  const location = useLocation()
  const navigate = useNavigate()
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    if (location.state?.bookingSuccess) {
      setNotification(`Your slot at ${location.state.bookingTime} booked successfully`)
      // Clear the state so it doesn't show again on refresh/back
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  return (
    <div className="bg-background dark:bg-slate-950 text-on-surface dark:text-slate-100 selection:bg-primary-container selection:text-on-primary-container transition-colors duration-300 min-h-screen">
      <Notification message={notification} onClose={() => setNotification(null)} />
      <Header toggleDarkMode={toggleDarkMode} isDark={isDark} />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/curriculums" element={<Curriculums />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
