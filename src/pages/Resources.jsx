import { motion } from 'framer-motion'
import Section from '../components/Section'
import useStore from '../store/useStore'

export default function Resources() {
  const updateProgress = useStore((state) => state.updateProgress)

  const resources = {
    videos: [
      { title: '3Blue1Brown: Essence of Calculus', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr', desc: 'Beautiful visual explanations of calculus concepts' },
      { title: '3Blue1Brown: Essence of Linear Algebra', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', desc: 'Essential for understanding multivariable calculus' },
      { title: 'StatQuest: Gradient Descent', url: 'https://www.youtube.com/watch?v=sDv4f4s2SB8', desc: 'Clear explanation of gradient descent for ML' },
      { title: 'Andrej Karpathy: Neural Networks Zero to Hero', url: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ', desc: 'Build neural networks from scratch with deep understanding' },
      { title: 'MIT 18.01: Single Variable Calculus', url: 'https://ocw.mit.edu/courses/mathematics/18-01-single-variable-calculus-fall-2006/', desc: 'Complete MIT course on single variable calculus' },
      { title: 'MIT 18.02: Multivariable Calculus', url: 'https://ocw.mit.edu/courses/mathematics/18-02sc-multivariable-calculus-fall-2010/', desc: 'Complete MIT course on multivariable calculus' },
    ],
    courses: [
      { title: 'Stanford CS231n: CNNs for Visual Recognition', url: 'https://cs231n.github.io/', desc: 'Comprehensive deep learning course with calculus foundations' },
      { title: 'fast.ai: Practical Deep Learning', url: 'https://www.fast.ai/', desc: 'Top-down approach to deep learning' },
      { title: 'deeplearning.ai: Deep Learning Specialization', url: 'https://www.deeplearning.ai/courses/deep-learning-specialization/', desc: 'Andrew Ng\'s comprehensive DL course' },
      { title: 'Khan Academy: Calculus', url: 'https://www.khanacademy.org/math/calculus-1', desc: 'Free, comprehensive calculus course from basics' },
    ],
    books: [
      { title: 'Deep Learning Book (Goodfellow et al.)', url: 'https://www.deeplearningbook.org/', desc: 'Free online book - the deep learning bible' },
      { title: 'Mathematics for Machine Learning', url: 'https://mml-book.github.io/', desc: 'Free book covering linear algebra, calculus, probability' },
      { title: 'Calculus by Michael Spivak', url: 'https://www.amazon.com/Calculus-4th-Michael-Spivak/dp/0914098918', desc: 'Rigorous treatment of single-variable calculus' },
      { title: 'Vector Calculus by Susan Colley', url: 'https://www.pearson.com/en-us/subject-catalog/p/vector-calculus/P200000006185', desc: 'Excellent multivariable calculus textbook' },
      { title: 'Pattern Recognition and Machine Learning (Bishop)', url: 'https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/', desc: 'Mathematical foundations of ML' },
    ],
    interactive: [
      { title: 'Desmos Graphing Calculator', url: 'https://www.desmos.com/calculator', desc: 'Best online graphing calculator for visualizing functions' },
      { title: 'GeoGebra', url: 'https://www.geogebra.org/', desc: 'Interactive geometry, algebra, calculus visualizations' },
      { title: 'Wolfram Alpha', url: 'https://www.wolframalpha.com/', desc: 'Computational knowledge engine for calculus' },
      { title: 'TensorFlow Playground', url: 'https://playground.tensorflow.org/', desc: 'Visualize neural networks in browser' },
      { title: 'Seeing Theory', url: 'https://seeing-theory.brown.edu/', desc: 'Visual introduction to probability and statistics' },
    ],
    documentation: [
      { title: 'PyTorch Documentation', url: 'https://pytorch.org/docs/stable/index.html', desc: 'Official PyTorch docs with autograd tutorials' },
      { title: 'TensorFlow Documentation', url: 'https://www.tensorflow.org/api_docs', desc: 'Official TensorFlow docs and guides' },
      { title: 'NumPy Documentation', url: 'https://numpy.org/doc/', desc: 'Essential for numerical computing in Python' },
      { title: 'SciPy Documentation', url: 'https://docs.scipy.org/doc/scipy/', desc: 'Scientific computing including optimization' },
    ],
    articles: [
      { title: 'The Matrix Calculus You Need For Deep Learning', url: 'https://explained.ai/matrix-calculus/', desc: 'Practical matrix calculus for DL practitioners' },
      { title: 'Calculus on Computational Graphs: Backpropagation', url: 'https://colah.github.io/posts/2015-08-Backprop/', desc: 'Chris Olah\'s excellent backpropagation explanation' },
      { title: 'Understanding LSTM Networks', url: 'https://colah.github.io/posts/2015-08-Understanding-LSTMs/', desc: 'How gradients flow through recurrent networks' },
      { title: 'An Overview of Gradient Descent Optimization Algorithms', url: 'https://ruder.io/optimizing-gradient-descent/', desc: 'Comprehensive overview of optimization algorithms' },
    ],
    practice: [
      { title: 'LeetCode', url: 'https://leetcode.com/', desc: 'Coding practice for ML engineering interviews' },
      { title: 'Project Euler', url: 'https://projecteuler.net/', desc: 'Mathematical programming challenges' },
      { title: 'Kaggle', url: 'https://www.kaggle.com/', desc: 'Machine learning competitions and datasets' },
      { title: 'Paul\'s Online Math Notes', url: 'https://tutorial.math.lamar.edu/', desc: 'Excellent calculus practice problems with solutions' },
    ],
  }

  const CategorySection = ({ title, items, icon }) => (
    <Section title={title} icon={icon}>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <motion.a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="group p-5 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl border border-white/10 hover:border-primary-500/50 transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl group-hover:scale-110 transition-transform">🔗</span>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  )

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
            Learning Resources
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Curated collection of the best calculus and machine learning resources. Videos, courses,
            books, interactive tools, and more to accelerate your learning journey.
          </p>
        </motion.div>

        {/* Resource Categories */}
        <CategorySection title="Video Lectures & Series" items={resources.videos} icon="🎥" />
        <CategorySection title="Online Courses" items={resources.courses} icon="🎓" />
        <CategorySection title="Books & Textbooks" items={resources.books} icon="📚" />
        <CategorySection title="Interactive Tools" items={resources.interactive} icon="🛠️" />
        <CategorySection title="Documentation & APIs" items={resources.documentation} icon="📖" />
        <CategorySection title="Articles & Tutorials" items={resources.articles} icon="📝" />
        <CategorySection title="Practice Problems" items={resources.practice} icon="💪" />

        {/* Study Tips */}
        <Section title="Study Tips" icon="💡">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-blue-300">1. Build Intuition First</h4>
                <p className="text-gray-300">
                  Watch 3Blue1Brown videos before diving into rigorous proofs. Visual understanding
                  makes formal mathematics much easier to grasp.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3 text-purple-300">2. Code Alongside Theory</h4>
                <p className="text-gray-300">
                  Implement concepts in Python/PyTorch as you learn them. Computing derivatives numerically
                  and comparing with analytical solutions builds deep understanding.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3 text-pink-300">3. Start with Simple Examples</h4>
                <p className="text-gray-300">
                  Master single-variable calculus before multivariable. Understand gradient descent on
                  simple functions before tackling neural networks.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3 text-indigo-300">4. Practice, Practice, Practice</h4>
                <p className="text-gray-300">
                  Work through exercises. Implement backpropagation from scratch. Train simple models.
                  Active practice beats passive reading every time.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3 text-teal-300">5. Connect to Applications</h4>
                <p className="text-gray-300">
                  Always ask: "How is this used in ML/DL?" Understanding motivation makes abstract
                  concepts concrete and memorable.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Recommended Learning Path */}
        <Section title="Recommended Learning Path" icon="🗺️">
          <div className="space-y-4">
            {[
              { stage: 'Foundations', topics: ['Limits', 'Derivatives', 'Chain Rule'], duration: '2-3 weeks' },
              { stage: 'Single Variable', topics: ['Optimization', 'Taylor Series', 'Integration'], duration: '3-4 weeks' },
              { stage: 'Multivariable', topics: ['Partial Derivatives', 'Gradients', 'Jacobians'], duration: '4-5 weeks' },
              { stage: 'Linear Algebra', topics: ['Vectors', 'Matrices', 'Eigenvalues'], duration: '3-4 weeks' },
              { stage: 'ML Foundations', topics: ['Gradient Descent', 'Backpropagation', 'Loss Functions'], duration: '4-5 weeks' },
              { stage: 'Deep Learning', topics: ['Neural Networks', 'CNNs', 'RNNs', 'Transformers'], duration: 'Ongoing' },
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-6 p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl border border-white/10"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white font-bold text-xl shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-1">{phase.stage}</h4>
                  <p className="text-sm text-gray-400">{phase.topics.join(' • ')}</p>
                </div>
                <div className="text-sm text-gray-500 shrink-0">{phase.duration}</div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Mark Complete */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => updateProgress('resources', { completed: true })}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Mark as Complete ✓
          </button>
        </motion.div>
      </div>
    </div>
  )
}
