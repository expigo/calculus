import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ProgressTracker() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 z-50"
      style={{ scaleX: scrollProgress / 100, transformOrigin: '0%' }}
      initial={{ scaleX: 0 }}
    />
  )
}
