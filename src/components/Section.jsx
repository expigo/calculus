import { motion } from 'framer-motion'

export default function Section({ children, title, icon, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      className="mb-16"
    >
      {title && (
        <div className="flex items-center gap-3 mb-8">
          {icon && <span className="text-3xl">{icon}</span>}
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
      )}
      <div className="space-y-6">
        {children}
      </div>
    </motion.section>
  )
}
