import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Limits from './pages/Limits'
import Derivatives from './pages/Derivatives'
import Multivariable from './pages/Multivariable'
import MLApplications from './pages/MLApplications'
import Resources from './pages/Resources'
import ProgressTracker from './components/ProgressTracker'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <ProgressTracker />
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/limits" element={<Limits />} />
          <Route path="/derivatives" element={<Derivatives />} />
          <Route path="/multivariable" element={<Multivariable />} />
          <Route path="/ml-applications" element={<MLApplications />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
