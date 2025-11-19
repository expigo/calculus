import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useStore from '../store/useStore'

const features = [
  {
    icon: '📊',
    title: 'Interactive Visualizations',
    description: 'Manipulate 2D and 3D plots powered by React and Plotly'
  },
  {
    icon: '🐍',
    title: 'Python Implementation',
    description: 'Complete implementations from scratch with syntax highlighting'
  },
  {
    icon: '🧠',
    title: 'ML/DL Focus',
    description: 'Direct connections to gradient descent and backpropagation'
  },
  {
    icon: '✏️',
    title: 'Interactive Quizzes',
    description: 'React-powered quizzes with instant feedback and state persistence'
  },
  {
    icon: '📐',
    title: 'Rigorous Theory',
    description: 'LaTeX-rendered math with formal definitions and proofs'
  },
  {
    icon: '🚀',
    title: 'Progress Tracking',
    description: 'Your progress is automatically saved using Zustand'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

export default function Home() {
  const completionPercentage = useStore((state) => state.getCompletionPercentage())

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative px-4 py-20 md:py-32 overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Master <span className="gradient-text">Calculus</span>
            <br />
            for Machine Learning
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto"
          >
            A production-grade React platform with interactive visualizations,
            Python code, and direct connections to backpropagation, gradient descent,
            and modern AI.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {[
              { number: '7', label: 'Topics' },
              { number: '50+', label: 'Visualizations' },
              { number: '100+', label: 'Code Examples' },
              { number: `${completionPercentage}%`, label: 'Your Progress' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold gradient-text">{stat.number}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/derivatives" className="btn-primary">
              Start Learning
            </Link>
            <Link to="/ml-applications" className="btn-secondary">
              ML Applications
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="px-4 py-20 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Why This <span className="gradient-text">React-Powered</span> Platform?
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="glass-card p-8 group hover:border-primary-500/50 transition-all"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="text-5xl mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-2 gradient-text">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card p-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your <span className="gradient-text">ML Understanding</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Start with the fundamentals or jump straight to applications
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/limits" className="btn-primary">
              Begin with Limits
            </Link>
            <Link to="/derivatives" className="btn-primary">
              Jump to Derivatives
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
