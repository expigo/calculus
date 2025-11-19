import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'

export default function Quiz({ topic, questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)

  const updateProgress = useStore((state) => state.updateProgress)

  const handleAnswerSelect = (index) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(index)
    setShowExplanation(true)

    if (index === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      const finalScore = Math.round((score / questions.length) * 100)
      updateProgress(topic, { quizScore: finalScore })
      setQuizComplete(true)
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizComplete(false)
  }

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100)
    const isPerfect = percentage === 100
    const isGood = percentage >= 70

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="text-6xl mb-4"
          >
            {isPerfect ? '🎉' : isGood ? '🎊' : '📚'}
          </motion.div>
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Quiz Complete!
          </h3>
          <div className="text-5xl font-bold mb-4 text-white">
            {score}/{questions.length}
          </div>
          <div className="text-xl mb-6 text-gray-300">
            {percentage}% - {isPerfect ? 'Perfect Score!' : isGood ? 'Great Job!' : 'Keep Learning!'}
          </div>
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
    >
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-semibold text-gray-400">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <span className="text-sm font-semibold text-primary-400">
          Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}
        </span>
      </div>

      <div className="h-2 bg-white/5 rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <h4 className="text-xl font-semibold mb-6 text-white">{question.question}</h4>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrect = index === question.correct
          const showResult = selectedAnswer !== null

          return (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              whileHover={selectedAnswer === null ? { scale: 1.02, x: 4 } : {}}
              whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                showResult
                  ? isCorrect
                    ? 'border-green-500 bg-green-500/20'
                    : isSelected
                    ? 'border-red-500 bg-red-500/20'
                    : 'border-white/10 bg-white/5'
                  : isSelected
                  ? 'border-primary-500 bg-primary-500/20'
                  : 'border-white/10 bg-white/5 hover:border-primary-500/50 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white">{option}</span>
                {showResult && (
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="text-2xl"
                  >
                    {isCorrect ? '✓' : isSelected ? '✗' : ''}
                  </motion.span>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl"
          >
            <div className="flex items-start gap-2">
              <span className="text-2xl">💡</span>
              <div>
                <p className="text-sm font-semibold text-blue-300 mb-1">Explanation</p>
                <p className="text-sm text-gray-300">{question.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedAnswer !== null && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleNext}
          className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 transform hover:scale-[1.02]"
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </motion.button>
      )}
    </motion.div>
  )
}
