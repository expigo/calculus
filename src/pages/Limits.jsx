import { useState } from 'react'
import { motion } from 'framer-motion'
import Section from '../components/Section'
import CodeBlock from '../components/CodeBlock'
import MathBlock from '../components/MathBlock'
import InteractivePlot from '../components/InteractivePlot'
import Quiz from '../components/Quiz'
import useStore from '../store/useStore'

export default function Limits() {
  const [approachPoint, setApproachPoint] = useState(2)
  const [epsilon, setEpsilon] = useState(0.5)
  const updateProgress = useStore((state) => state.updateProgress)

  // Generate limit visualization data
  const generateLimitData = () => {
    const x = []
    const y = []
    const a = approachPoint

    // Function: f(x) = (x² - 4)/(x - 2) for x ≠ 2, undefined at x = 2
    for (let i = -1; i <= 5; i += 0.05) {
      if (Math.abs(i - 2) > 0.01) {  // Skip near the discontinuity
        x.push(i)
        y.push((i * i - 4) / (i - 2))  // Simplifies to x + 2 when x ≠ 2
      }
    }

    return [
      {
        x: x,
        y: y,
        type: 'scatter',
        mode: 'lines',
        name: 'f(x) = (x²-4)/(x-2)',
        line: { color: '#667eea', width: 3 },
      },
      {
        x: [2],
        y: [4],
        type: 'scatter',
        mode: 'markers',
        name: 'Limit point',
        marker: {
          color: '#ef4444',
          size: 15,
          symbol: 'circle-open',
          line: { width: 3 }
        },
      },
    ]
  }

  // Epsilon-delta visualization
  const generateEpsilonDeltaData = () => {
    const x = []
    const y = []
    const a = 2  // approaching x = 2
    const L = 4  // limit is 4

    for (let i = 0; i <= 4; i += 0.05) {
      x.push(i)
      y.push(i + 2)  // f(x) = x + 2 (simplified form)
    }

    // Calculate delta for given epsilon
    const delta = epsilon

    return [
      {
        x: x,
        y: y,
        type: 'scatter',
        mode: 'lines',
        name: 'f(x) = x + 2',
        line: { color: '#667eea', width: 3 },
      },
      // Horizontal epsilon band
      {
        x: [0, 4],
        y: [L + epsilon, L + epsilon],
        type: 'scatter',
        mode: 'lines',
        name: 'L + ε',
        line: { color: '#10b981', width: 2, dash: 'dash' },
      },
      {
        x: [0, 4],
        y: [L - epsilon, L - epsilon],
        type: 'scatter',
        mode: 'lines',
        name: 'L - ε',
        line: { color: '#10b981', width: 2, dash: 'dash' },
      },
      // Vertical delta band
      {
        x: [a - delta, a - delta],
        y: [0, 8],
        type: 'scatter',
        mode: 'lines',
        name: 'a - δ',
        line: { color: '#f59e0b', width: 2, dash: 'dot' },
      },
      {
        x: [a + delta, a + delta],
        y: [0, 8],
        type: 'scatter',
        mode: 'lines',
        name: 'a + δ',
        line: { color: '#f59e0b', width: 2, dash: 'dot' },
      },
      // Limit point
      {
        x: [a],
        y: [L],
        type: 'scatter',
        mode: 'markers',
        name: 'Limit (a, L)',
        marker: { color: '#ef4444', size: 12 },
      },
    ]
  }

  // Asymptote visualization
  const generateAsymptoteData = () => {
    const x1 = [], y1 = []
    const x2 = [], y2 = []

    // 1/x has vertical asymptote at x=0 and horizontal asymptote at y=0
    for (let i = 0.1; i <= 5; i += 0.1) {
      x1.push(i)
      y1.push(1/i)
      x2.push(-i)
      y2.push(1/(-i))
    }

    return [
      {
        x: x1,
        y: y1,
        type: 'scatter',
        mode: 'lines',
        name: 'f(x) = 1/x (x > 0)',
        line: { color: '#667eea', width: 3 },
      },
      {
        x: x2,
        y: y2,
        type: 'scatter',
        mode: 'lines',
        name: 'f(x) = 1/x (x < 0)',
        line: { color: '#764ba2', width: 3 },
      },
      // Vertical asymptote
      {
        x: [0, 0],
        y: [-5, 5],
        type: 'scatter',
        mode: 'lines',
        name: 'Vertical asymptote x=0',
        line: { color: '#ef4444', width: 2, dash: 'dash' },
      },
      // Horizontal asymptote
      {
        x: [-5, 5],
        y: [0, 0],
        type: 'scatter',
        mode: 'lines',
        name: 'Horizontal asymptote y=0',
        line: { color: '#10b981', width: 2, dash: 'dash' },
      },
    ]
  }

  const quizQuestions = [
    {
      question: "What is lim(x→2) [(x²-4)/(x-2)]?",
      options: ["0", "2", "4", "Undefined"],
      correct: 2,
      explanation: "Factor: (x²-4)/(x-2) = (x-2)(x+2)/(x-2) = x+2 for x≠2. As x→2, limit = 2+2 = 4. The function is undefined at x=2, but the limit exists.",
    },
    {
      question: "In gradient descent, what does convergence mean in terms of limits?",
      options: [
        "The loss function equals zero",
        "The limit of the loss as iterations approach infinity exists and is minimal",
        "The learning rate approaches zero",
        "The gradients become undefined",
      ],
      correct: 1,
      explanation: "Convergence means lim(n→∞) L(θₙ) = L*, where L* is a local minimum. The loss function approaches a stable minimum value.",
    },
    {
      question: "What is lim(x→∞) (3x² + 2x) / (x² - 1)?",
      options: ["0", "3", "∞", "Undefined"],
      correct: 1,
      explanation: "Divide numerator and denominator by x²: lim(x→∞) (3 + 2/x) / (1 - 1/x²) = 3/1 = 3. Terms with x in denominator vanish.",
    },
    {
      question: "What does the epsilon-delta definition formalize?",
      options: [
        "The derivative of a function",
        "The rigorous meaning of a limit",
        "The continuity of a function",
        "The integral of a function",
      ],
      correct: 1,
      explanation: "ε-δ formalizes 'arbitrarily close': For every ε>0, exists δ>0 such that |f(x)-L|<ε whenever 0<|x-a|<δ.",
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
            Limits
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The foundation of calculus. Understand convergence, continuity, and the behavior of functions
            - essential concepts for understanding optimization algorithms in machine learning.
          </p>
        </motion.div>

        {/* Introduction */}
        <Section title="What is a Limit?" icon="🎯">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed">
              A limit describes the behavior of a function as its input approaches a particular value.
              It answers: "What value does f(x) get close to as x gets close to a?"
              Limits are fundamental to derivatives, integrals, and understanding convergence in ML algorithms.
            </p>
          </div>

          <MathBlock
            math="\lim_{x \to a} f(x) = L"
            label="f(x) approaches L as x approaches a"
          />

          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6">
            <h4 className="text-lg font-semibold mb-3 text-blue-300">💡 Intuition</h4>
            <p className="text-gray-300">
              Think of limit as a prediction: "If I could get arbitrarily close to x=a (but not equal),
              where would f(x) be heading?" In ML, we use limits to understand if gradient descent
              converges: does lim(n→∞) Loss(θₙ) exist and equal a minimum?
            </p>
          </div>
        </Section>

        {/* Interactive Limit Visualization */}
        <Section title="Interactive: Removable Discontinuity" icon="🔍">
          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-gray-300">
              Consider f(x) = (x²-4)/(x-2). This function is undefined at x=2 (division by zero),
              but the limit as x→2 exists! The function approaches 4 from both sides.
            </p>
          </div>

          <InteractivePlot
            data={generateLimitData()}
            layout={{
              title: 'f(x) = (x²-4)/(x-2): Limit exists despite discontinuity',
              xaxis: { title: 'x', range: [-1, 5] },
              yaxis: { title: 'f(x)', range: [-1, 8] },
            }}
          />

          <div className="mt-6 p-6 bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-2xl">
            <h4 className="text-lg font-semibold mb-3 text-green-300">🎓 Key Observation</h4>
            <p className="text-gray-300 mb-3">
              Notice the hollow circle at (2, 4). The function is undefined there, but both sides
              approach y=4. We can simplify:
            </p>
            <MathBlock math="\frac{x^2-4}{x-2} = \frac{(x-2)(x+2)}{x-2} = x+2 \text{ for } x \neq 2" />
            <p className="text-gray-300">
              So lim(x→2) f(x) = 4, even though f(2) is undefined.
            </p>
          </div>
        </Section>

        {/* Epsilon-Delta Definition */}
        <Section title="Rigorous Definition: Epsilon-Delta (ε-δ)" icon="📏">
          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              The ε-δ definition makes "arbitrarily close" precise. It's the gold standard for
              mathematical rigor and understanding convergence proofs in optimization theory.
            </p>
          </div>

          <MathBlock
            math="\lim_{x \to a} f(x) = L \iff \forall \varepsilon > 0, \exists \delta > 0 : 0 < |x-a| < \delta \implies |f(x)-L| < \varepsilon"
            label="Epsilon-Delta Definition"
          />

          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
            <h4 className="text-lg font-semibold mb-3 text-white">Translation to English:</h4>
            <p className="text-gray-300">
              "For any desired accuracy ε (how close to L), we can find a range δ around a
              such that staying within δ of a (but not at a) guarantees f(x) stays within ε of L."
            </p>
          </div>

          <div className="mb-6 grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Epsilon (ε): Vertical tolerance
              </label>
              <input
                type="range"
                min="0.1"
                max="1.5"
                step="0.1"
                value={epsilon}
                onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-center mt-2 text-white font-mono">ε = {epsilon.toFixed(1)}</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-sm text-gray-300">
                  For ε = {epsilon.toFixed(1)}, we need δ = {epsilon.toFixed(1)}<br/>
                  (for this simple linear function)
                </p>
              </div>
            </div>
          </div>

          <InteractivePlot
            data={generateEpsilonDeltaData()}
            layout={{
              title: 'Epsilon-Delta Visualization',
              xaxis: { title: 'x', range: [0, 4] },
              yaxis: { title: 'f(x)', range: [0, 8] },
            }}
          />

          <div className="mt-6 p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl">
            <h4 className="text-lg font-semibold mb-3 text-purple-300">🔬 Why This Matters in ML</h4>
            <p className="text-gray-300">
              Convergence proofs for gradient descent use ε-δ style arguments. We show that for any
              desired accuracy ε, there exists an iteration N such that for all n>N, |L(θₙ) - L*| &lt; ε.
              This proves the algorithm converges to the optimal loss L*.
            </p>
          </div>
        </Section>

        {/* Types of Limits */}
        <Section title="Types of Limits" icon="📊">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold mb-4 text-primary-400">One-Sided Limits</h4>
              <MathBlock math="\lim_{x \to a^+} f(x) \quad \text{and} \quad \lim_{x \to a^-} f(x)" />
              <p className="text-sm text-gray-300">
                Approach from right (+) or left (-). Limit exists if both one-sided limits exist and are equal.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold mb-4 text-secondary-400">Infinite Limits</h4>
              <MathBlock math="\lim_{x \to a} f(x) = \infty" />
              <p className="text-sm text-gray-300">
                Function grows without bound. Indicates vertical asymptote at x=a.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold mb-4 text-accent-400">Limits at Infinity</h4>
              <MathBlock math="\lim_{x \to \infty} f(x) = L" />
              <p className="text-sm text-gray-300">
                Behavior as x grows large. Determines horizontal asymptotes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold mb-4 text-primary-400">Indeterminate Forms</h4>
              <MathBlock math="\frac{0}{0}, \frac{\infty}{\infty}, 0 \cdot \infty, \infty - \infty" />
              <p className="text-sm text-gray-300">
                Require techniques like L'Hôpital's rule or algebraic manipulation.
              </p>
            </div>
          </div>
        </Section>

        {/* Asymptotes */}
        <Section title="Asymptotes and Infinite Behavior" icon="♾️">
          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              Asymptotes describe limiting behavior. Understanding them helps analyze neural network
              activations (e.g., sigmoid → 0 as x → -∞, sigmoid → 1 as x → +∞).
            </p>
          </div>

          <InteractivePlot
            data={generateAsymptoteData()}
            layout={{
              title: 'f(x) = 1/x: Vertical and Horizontal Asymptotes',
              xaxis: { title: 'x', range: [-5, 5] },
              yaxis: { title: 'f(x)', range: [-5, 5] },
            }}
          />

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-6">
              <h4 className="text-lg font-semibold mb-3 text-red-300">Vertical Asymptote at x=0</h4>
              <MathBlock math="\lim_{x \to 0^+} \frac{1}{x} = +\infty \quad \lim_{x \to 0^-} \frac{1}{x} = -\infty" />
              <p className="text-sm text-gray-300">Function explodes as x approaches 0</p>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-2xl p-6">
              <h4 className="text-lg font-semibold mb-3 text-green-300">Horizontal Asymptote at y=0</h4>
              <MathBlock math="\lim_{x \to \pm\infty} \frac{1}{x} = 0" />
              <p className="text-sm text-gray-300">Function approaches 0 as x grows large</p>
            </div>
          </div>
        </Section>

        {/* Python Implementation */}
        <Section title="Computing Limits in Python" icon="🐍">
          <CodeBlock
            title="Numerical Limit Computation"
            language="python"
            code={`import numpy as np

def compute_limit(f, a, direction='both', h=1e-6):
    """
    Numerically compute limit of f as x approaches a.

    direction: 'left', 'right', or 'both'
    h: step size (smaller = more accurate, but watch for numerical errors)
    """
    if direction == 'left' or direction == 'both':
        left_limit = f(a - h)

    if direction == 'right' or direction == 'both':
        right_limit = f(a + h)

    if direction == 'both':
        if abs(left_limit - right_limit) < 1e-6:
            return right_limit
        else:
            return f"Left: {left_limit}, Right: {right_limit} (Different!)"
    elif direction == 'left':
        return left_limit
    else:
        return right_limit

# Example: lim(x→2) (x²-4)/(x-2)
f = lambda x: (x**2 - 4) / (x - 2)

limit = compute_limit(f, 2)
print(f"Numerical limit: {limit}")  # Should be ≈ 4

# Analytical: (x²-4)/(x-2) = (x-2)(x+2)/(x-2) = x+2
analytical = 2 + 2
print(f"Analytical limit: {analytical}")`}
          />

          <CodeBlock
            title="Symbolic Limits with SymPy"
            language="python"
            code={`import sympy as sp

x = sp.Symbol('x')

# Example 1: (x²-4)/(x-2) as x→2
f1 = (x**2 - 4) / (x - 2)
limit1 = sp.limit(f1, x, 2)
print(f"lim(x→2) (x²-4)/(x-2) = {limit1}")  # 4

# Example 2: sin(x)/x as x→0 (famous limit!)
f2 = sp.sin(x) / x
limit2 = sp.limit(f2, x, 0)
print(f"lim(x→0) sin(x)/x = {limit2}")  # 1

# Example 3: Limit at infinity
f3 = (3*x**2 + 2*x) / (x**2 - 1)
limit3 = sp.limit(f3, x, sp.oo)
print(f"lim(x→∞) (3x²+2x)/(x²-1) = {limit3}")  # 3

# Example 4: One-sided limit
f4 = 1 / x
left_limit = sp.limit(f4, x, 0, '-')
right_limit = sp.limit(f4, x, 0, '+')
print(f"lim(x→0⁻) 1/x = {left_limit}")  # -∞
print(f"lim(x→0⁺) 1/x = {right_limit}")  # +∞`}
          />

          <CodeBlock
            title="Convergence in Gradient Descent"
            language="python"
            code={`import numpy as np
import matplotlib.pyplot as plt

# Loss function: L(θ) = (θ - 3)²
def loss(theta):
    return (theta - 3)**2

# Gradient descent with convergence check
def gradient_descent_with_convergence(theta_init, lr, tolerance=1e-6, max_iter=1000):
    """
    Check if lim(n→∞) θₙ converges to optimal value.
    """
    theta = theta_init
    history = [theta]

    for i in range(max_iter):
        # Gradient: dL/dθ = 2(θ - 3)
        grad = 2 * (theta - 3)

        # Update
        theta_new = theta - lr * grad
        history.append(theta_new)

        # Check convergence: |θₙ₊₁ - θₙ| < ε
        if abs(theta_new - theta) < tolerance:
            print(f"Converged after {i+1} iterations!")
            print(f"lim(n→∞) θₙ ≈ {theta_new:.6f}")
            print(f"Optimal θ = 3.0")
            return theta_new, history

        theta = theta_new

    print(f"Did not converge within {max_iter} iterations")
    return theta, history

# Run gradient descent
theta_final, history = gradient_descent_with_convergence(
    theta_init=0.0,
    lr=0.1,
    tolerance=1e-6
)

# Verify: does the limit exist?
print(f"\\nFinal loss: {loss(theta_final):.8f}")
print(f"Optimal loss: {loss(3.0):.8f}")`}
          />
        </Section>

        {/* ML Applications */}
        <Section title="Applications in Machine Learning" icon="🤖">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-4 text-primary-400">1. Convergence Analysis</h4>
              <p className="text-gray-300 mb-3">
                Proving gradient descent converges means showing lim(n→∞) L(θₙ) = L* exists.
              </p>
              <MathBlock math="\lim_{n \to \infty} \|\nabla L(\theta_n)\| = 0" />
              <p className="text-sm text-gray-400">
                Convergence criterion: gradient vanishes at optimum
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-4 text-secondary-400">2. Activation Functions</h4>
              <p className="text-gray-300 mb-3">
                Sigmoid and tanh have well-defined limits at infinity, crucial for network stability.
              </p>
              <div className="space-y-2 text-sm">
                <MathBlock math="\lim_{x \to \infty} \sigma(x) = 1, \quad \lim_{x \to -\infty} \sigma(x) = 0" />
                <MathBlock math="\lim_{x \to \pm\infty} \tanh(x) = \pm 1" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-4 text-accent-400">3. Learning Rate Schedules</h4>
              <p className="text-gray-300 mb-3">
                Adaptive learning rates often decay such that Σηₜ = ∞ but Σηₜ² &lt; ∞, ensuring convergence.
              </p>
              <MathBlock math="\lim_{t \to \infty} \eta_t = 0 \quad \text{(decay to zero)}" />
            </div>
          </div>
        </Section>

        {/* Quiz */}
        <Section title="Test Your Understanding" icon="🎯">
          <Quiz topic="limits" questions={quizQuestions} />
        </Section>

        {/* Exercises */}
        <Section title="Practice Exercises" icon="✏️">
          <div className="space-y-4">
            {[
              {
                difficulty: 'Easy',
                color: 'green',
                problem: 'Compute lim(x→3) (x² - 9)/(x - 3)',
              },
              {
                difficulty: 'Easy',
                color: 'green',
                problem: 'Find lim(x→∞) (5x + 3)/(2x - 1)',
              },
              {
                difficulty: 'Medium',
                color: 'yellow',
                problem: 'Evaluate lim(x→0) sin(3x)/x',
              },
              {
                difficulty: 'Medium',
                color: 'yellow',
                problem: 'Use ε-δ to prove lim(x→2) (3x + 1) = 7',
              },
              {
                difficulty: 'Hard',
                color: 'red',
                problem: 'Prove that gradient descent with lr=0.01 converges for L(θ)=(θ-5)²',
              },
            ].map((exercise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl border border-white/10"
              >
                <span
                  className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                    exercise.color === 'green'
                      ? 'bg-green-500/20 text-green-400'
                      : exercise.color === 'yellow'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {exercise.difficulty}
                </span>
                <p className="flex-1 text-gray-300">{exercise.problem}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Resources */}
        <Section title="Further Resources" icon="📚">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: '3Blue1Brown: Essence of Calculus Ch1', url: 'https://www.youtube.com/watch?v=WUvTyaaNkzM' },
              { title: 'Khan Academy: Limits and Continuity', url: 'https://www.khanacademy.org/math/ap-calculus-ab/ab-limits-new' },
              { title: 'Convergence Analysis in Optimization', url: 'https://stanford.edu/~boyd/cvxbook/' },
              { title: 'Paul\'s Online Math Notes: Limits', url: 'https://tutorial.math.lamar.edu/classes/calci/limitsintro.aspx' },
            ].map((resource, index) => (
              <motion.a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-4 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl border border-white/10 hover:border-primary-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔗</span>
                  <span className="text-white font-medium">{resource.title}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </Section>

        {/* Mark as Complete */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => updateProgress('limits', { completed: true })}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Mark as Complete ✓
          </button>
        </motion.div>
      </div>
    </div>
  )
}
