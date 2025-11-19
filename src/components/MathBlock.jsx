import { motion } from 'framer-motion'
import 'katex/dist/katex.min.css'
import { BlockMath, InlineMath } from 'react-katex'

export function MathBlock({ math, label = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-6 p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl border border-white/10"
    >
      <div className="overflow-x-auto">
        <BlockMath math={math} />
      </div>
      {label && (
        <p className="text-center text-sm text-gray-400 mt-3 font-medium">
          {label}
        </p>
      )}
    </motion.div>
  )
}

export function InlineMathComponent({ math }) {
  return <InlineMath math={math} />
}

export default MathBlock
