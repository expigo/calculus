import { useState } from 'react'
import { motion } from 'framer-motion'
import Section from '../components/Section'
import CodeBlock from '../components/CodeBlock'
import MathBlock, { InlineMathComponent as InlineMath } from '../components/MathBlock'
import InteractivePlot from '../components/InteractivePlot'
import Quiz from '../components/Quiz'
import useStore from '../store/useStore'

export default function Derivatives() {
  const [derivativePoint, setDerivativePoint] = useState(2)
  const updateProgress = useStore((state) => state.updateProgress)

  // Generate data for derivative visualization
  const generateDerivativeData = () => {
    const x = []
    const y = []
    const tangentX = []
    const tangentY = []

    for (let i = -1; i <= 5; i += 0.1) {
      x.push(i)
      y.push(i * i) // f(x) = x²
    }

    // Tangent line: f'(a) = 2a, so y - f(a) = f'(a)(x - a)
    const a = derivativePoint
    const fa = a * a
    const fPrimeA = 2 * a

    for (let i = a - 1.5; i <= a + 1.5; i += 0.1) {
      tangentX.push(i)
      tangentY.push(fa + fPrimeA * (i - a))
    }

    return [
      {
        x: x,
        y: y,
        type: 'scatter',
        mode: 'lines',
        name: 'f(x) = x²',
        line: { color: '#667eea', width: 3 },
      },
      {
        x: tangentX,
        y: tangentY,
        type: 'scatter',
        mode: 'lines',
        name: `Tangent at x=${a}`,
        line: { color: '#f59e0b', width: 3, dash: 'dash' },
      },
      {
        x: [a],
        y: [fa],
        type: 'scatter',
        mode: 'markers',
        name: 'Point',
        marker: { color: '#ef4444', size: 12 },
      },
    ]
  }

  // Chain rule visualization
  const generateChainRuleData = () => {
    const x = []
    const inner = []
    const outer = []
    const composite = []

    for (let i = 0; i <= 6; i += 0.1) {
      x.push(i)
      const u = 2 * i // inner function u = 2x
      inner.push(u)
      outer.push(Math.sin(i)) // outer would be sin(u)
      composite.push(Math.sin(2 * i)) // sin(2x)
    }

    return [
      {
        x: x,
        y: inner,
        type: 'scatter',
        mode: 'lines',
        name: 'u = 2x (inner)',
        line: { color: '#10b981', width: 2 },
      },
      {
        x: x,
        y: composite,
        type: 'scatter',
        mode: 'lines',
        name: 'sin(2x) (composite)',
        line: { color: '#667eea', width: 3 },
      },
    ]
  }

  const quizQuestions = [
    {
      question: "What is the derivative of f(x) = x³ + 2x² - 5x + 1?",
      options: [
        "3x² + 4x - 5",
        "x⁴ + 2x³ - 5x² + x",
        "3x² + 2x - 5",
        "3x² + 4x - 5x",
      ],
      correct: 0,
      explanation: "Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹. So f'(x) = 3x² + 4x - 5.",
    },
    {
      question: "In machine learning, what does the gradient tell us?",
      options: [
        "The minimum value of the loss function",
        "The direction of steepest ascent of the function",
        "The second derivative of the cost function",
        "The learning rate to use",
      ],
      correct: 1,
      explanation: "The gradient points in the direction of steepest ascent. In gradient descent, we move in the opposite direction (steepest descent) to minimize the loss.",
    },
    {
      question: "What is d/dx[sin(2x)] using the chain rule?",
      options: [
        "cos(2x)",
        "2cos(2x)",
        "2sin(2x)",
        "-2sin(2x)",
      ],
      correct: 1,
      explanation: "Using chain rule: f'(g(x))·g'(x). Here f(u)=sin(u), g(x)=2x. So f'(u)=cos(u), g'(x)=2. Result: cos(2x)·2 = 2cos(2x).",
    },
    {
      question: "In backpropagation, why do we need derivatives?",
      options: [
        "To calculate the forward pass",
        "To compute how each weight contributes to the error",
        "To initialize the network weights",
        "To normalize the input data",
      ],
      correct: 1,
      explanation: "Backpropagation uses the chain rule to compute gradients, showing how each weight affects the loss. This allows us to update weights to minimize error.",
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
            Derivatives
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master the foundation of calculus and machine learning. Understand rates of change,
            optimization, and the mathematics behind neural networks.
          </p>
        </motion.div>

        {/* Introduction */}
        <Section title="What is a Derivative?" icon="📊">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed">
              A derivative measures how a function changes as its input changes. It's the instantaneous
              rate of change - the slope of the tangent line at any point. In machine learning, derivatives
              are fundamental to optimization algorithms like gradient descent.
            </p>
          </div>

          <MathBlock
            math="\frac{df}{dx} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}"
            label="Definition of the Derivative"
          />

          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6">
            <h4 className="text-lg font-semibold mb-3 text-blue-300">💡 Intuition</h4>
            <p className="text-gray-300">
              Think of driving a car: your position is the function, and the derivative is your speedometer.
              It tells you how fast your position is changing at each moment. In ML, the derivative tells us
              how fast the loss changes as we adjust our model parameters.
            </p>
          </div>
        </Section>

        {/* Interactive Visualization */}
        <Section title="Interactive: Tangent Line" icon="🎯">
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
            <label className="block text-sm font-semibold mb-3 text-gray-300">
              Move the point along f(x) = x²
            </label>
            <input
              type="range"
              min="-1"
              max="5"
              step="0.1"
              value={derivativePoint}
              onChange={(e) => setDerivativePoint(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
            <div className="mt-3 text-center">
              <p className="text-white font-mono">
                At x = {derivativePoint.toFixed(1)}: f(x) = {(derivativePoint ** 2).toFixed(2)},
                f'(x) = {(2 * derivativePoint).toFixed(2)}
              </p>
            </div>
          </div>

          <InteractivePlot
            data={generateDerivativeData()}
            layout={{
              title: 'Derivative as Slope of Tangent Line',
              xaxis: { title: 'x' },
              yaxis: { title: 'f(x)' },
            }}
          />

          <div className="mt-6 p-6 bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-2xl">
            <h4 className="text-lg font-semibold mb-3 text-green-300">🎓 Observation</h4>
            <p className="text-gray-300">
              Notice how the tangent line's slope changes as you move the point. The derivative
              f'(x) = 2x means the slope increases linearly. At x=0, the slope is 0 (horizontal tangent).
              At x=2, the slope is 4 (steep upward).
            </p>
          </div>
        </Section>

        {/* Derivative Rules */}
        <Section title="Essential Derivative Rules" icon="📐">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold mb-4 text-primary-400">Power Rule</h4>
              <MathBlock math="\frac{d}{dx}[x^n] = nx^{n-1}" />
              <p className="text-sm text-gray-400">Example: d/dx[x³] = 3x²</p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold mb-4 text-secondary-400">Product Rule</h4>
              <MathBlock math="\frac{d}{dx}[f \cdot g] = f' \cdot g + f \cdot g'" />
              <p className="text-sm text-gray-400">For products of functions</p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold mb-4 text-accent-400">Quotient Rule</h4>
              <MathBlock math="\frac{d}{dx}\left[\frac{f}{g}\right] = \frac{f' \cdot g - f \cdot g'}{g^2}" />
              <p className="text-sm text-gray-400">For ratios of functions</p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold mb-4 text-primary-400">Chain Rule</h4>
              <MathBlock math="\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)" />
              <p className="text-sm text-gray-400">Critical for neural networks!</p>
            </div>
          </div>
        </Section>

        {/* Chain Rule Deep Dive */}
        <Section title="The Chain Rule: Heart of Backpropagation" icon="🔗">
          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              The chain rule is the most important derivative rule for machine learning. It allows us to
              compute derivatives of composite functions - exactly what neural networks are!
            </p>
          </div>

          <MathBlock
            math="\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}"
            label="Chain Rule: Break complex derivatives into simple parts"
          />

          <InteractivePlot
            data={generateChainRuleData()}
            layout={{
              title: 'Chain Rule Example: f(x) = sin(2x)',
              xaxis: { title: 'x' },
              yaxis: { title: 'y' },
            }}
          />

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6 mt-6">
            <h4 className="text-lg font-semibold mb-3 text-purple-300">🧠 Machine Learning Connection</h4>
            <p className="text-gray-300 mb-3">
              In a neural network, the output is a composition of many functions (layers). The chain rule
              lets us compute how the final output depends on each weight by multiplying derivatives
              backward through the network - this is backpropagation!
            </p>
            <MathBlock
              math="\frac{\partial L}{\partial w_1} = \frac{\partial L}{\partial a_3} \cdot \frac{\partial a_3}{\partial a_2} \cdot \frac{\partial a_2}{\partial a_1} \cdot \frac{\partial a_1}{\partial w_1}"
            />
          </div>
        </Section>

        {/* Python Implementation */}
        <Section title="Computing Derivatives in Python" icon="🐍">
          <p className="text-lg text-gray-300 mb-6">
            Let's implement automatic differentiation - the foundation of modern deep learning frameworks.
          </p>

          <CodeBlock
            title="Numerical Derivative (Finite Differences)"
            language="python"
            code={`import numpy as np

def numerical_derivative(f, x, h=1e-5):
    """
    Compute derivative using finite differences.
    This is how computers approximate derivatives.
    """
    return (f(x + h) - f(x)) / h

# Example: f(x) = x²
f = lambda x: x**2
x = 2.0

# Analytical derivative: f'(x) = 2x = 4.0
analytical = 2 * x
# Numerical approximation
numerical = numerical_derivative(f, x)

print(f"Analytical: {analytical}")
print(f"Numerical: {numerical}")
print(f"Error: {abs(analytical - numerical)}")`}
          />

          <CodeBlock
            title="Automatic Differentiation with PyTorch"
            language="python"
            code={`import torch

# Create tensor with gradient tracking
x = torch.tensor(2.0, requires_grad=True)

# Define function
y = x**2

# Compute gradient automatically
y.backward()

print(f"x = {x.item()}")
print(f"y = x² = {y.item()}")
print(f"dy/dx = {x.grad.item()}")  # Should be 2x = 4.0`}
          />

          <CodeBlock
            title="Chain Rule in Action: Backpropagation"
            language="python"
            code={`import torch
import torch.nn as nn

# Simple neural network
class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.layer1 = nn.Linear(1, 10)
        self.layer2 = nn.Linear(10, 1)

    def forward(self, x):
        x = torch.relu(self.layer1(x))  # ReLU activation
        x = self.layer2(x)
        return x

model = SimpleNet()
x = torch.tensor([[2.0]])
y_true = torch.tensor([[4.0]])

# Forward pass
y_pred = model(x)

# Compute loss
loss = (y_pred - y_true)**2

# Backward pass - chain rule in action!
loss.backward()

# Now all weights have gradients
for name, param in model.named_parameters():
    print(f"{name} gradient: {param.grad.shape}")`}
          />

          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6 mt-6">
            <h4 className="text-lg font-semibold mb-3 text-yellow-300">⚡ Key Insight</h4>
            <p className="text-gray-300">
              PyTorch and TensorFlow automatically compute derivatives using the chain rule. When you call
              <code className="px-2 py-1 bg-black/30 rounded mx-1">backward()</code>, they traverse the
              computational graph backward, multiplying Jacobians at each step. This is automatic differentiation!
            </p>
          </div>
        </Section>

        {/* ML Applications */}
        <Section title="Applications in Machine Learning" icon="🤖">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-4 text-primary-400">1. Gradient Descent</h4>
              <p className="text-gray-300 mb-4">
                The workhorse optimization algorithm. Move in the direction opposite to the gradient to minimize loss.
              </p>
              <MathBlock math="w_{new} = w_{old} - \alpha \frac{\partial L}{\partial w}" />
              <p className="text-sm text-gray-400">
                where α is the learning rate and ∂L/∂w is the derivative of loss with respect to weights
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-4 text-secondary-400">2. Backpropagation</h4>
              <p className="text-gray-300 mb-4">
                Efficiently compute gradients in neural networks using the chain rule, layer by layer.
              </p>
              <MathBlock math="\frac{\partial L}{\partial w^{(l)}} = \frac{\partial L}{\partial a^{(l+1)}} \cdot \frac{\partial a^{(l+1)}}{\partial z^{(l+1)}} \cdot \frac{\partial z^{(l+1)}}{\partial w^{(l)}}" />
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-4 text-accent-400">3. Activation Functions</h4>
              <p className="text-gray-300 mb-4">
                Non-linear functions and their derivatives enable neural networks to learn complex patterns.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg">
                  <span>ReLU: σ(x) = max(0, x)</span>
                  <span className="text-primary-400">σ'(x) = 1 if x &gt; 0, else 0</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg">
                  <span>Sigmoid: σ(x) = 1/(1+e⁻ˣ)</span>
                  <span className="text-secondary-400">σ'(x) = σ(x)(1-σ(x))</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg">
                  <span>tanh: σ(x) = tanh(x)</span>
                  <span className="text-accent-400">σ'(x) = 1 - tanh²(x)</span>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock
            title="Implementing Gradient Descent from Scratch"
            language="python"
            code={`import numpy as np
import matplotlib.pyplot as plt

# Loss function: L(w) = (w - 3)²
def loss(w):
    return (w - 3)**2

# Derivative: dL/dw = 2(w - 3)
def gradient(w):
    return 2 * (w - 3)

# Gradient descent
def gradient_descent(w_init, learning_rate, num_iterations):
    w = w_init
    history = [w]

    for i in range(num_iterations):
        # Compute gradient
        grad = gradient(w)

        # Update weight
        w = w - learning_rate * grad
        history.append(w)

        if i % 10 == 0:
            print(f"Iteration {i}: w = {w:.4f}, loss = {loss(w):.4f}")

    return w, history

# Run gradient descent
w_init = 0.0
learning_rate = 0.1
num_iterations = 50

final_w, history = gradient_descent(w_init, learning_rate, num_iterations)

print(f"\\nFinal weight: {final_w:.4f}")
print(f"Optimal weight: 3.0000")
print(f"Final loss: {loss(final_w):.6f}")`}
          />
        </Section>

        {/* Quiz */}
        <Section title="Test Your Understanding" icon="🎯">
          <Quiz topic="derivatives" questions={quizQuestions} />
        </Section>

        {/* Exercises */}
        <Section title="Practice Exercises" icon="✏️">
          <div className="space-y-4">
            {[
              {
                difficulty: 'Easy',
                color: 'green',
                problem: 'Compute the derivative of f(x) = 3x⁴ - 2x² + 7x - 1',
              },
              {
                difficulty: 'Medium',
                color: 'yellow',
                problem: 'Find dy/dx if y = (2x + 1)³ using the chain rule',
              },
              {
                difficulty: 'Medium',
                color: 'yellow',
                problem: 'Compute the derivative of f(x) = x²·sin(x) using the product rule',
              },
              {
                difficulty: 'Hard',
                color: 'red',
                problem: 'Implement backpropagation for a 2-layer network with sigmoid activation',
              },
              {
                difficulty: 'Hard',
                color: 'red',
                problem: 'Derive the gradient update rule for linear regression with L2 regularization',
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

        {/* Further Resources */}
        <Section title="Further Resources" icon="📚">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: '3Blue1Brown: Essence of Calculus', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr' },
              { title: 'MIT OCW: Single Variable Calculus', url: 'https://ocw.mit.edu/courses/mathematics/18-01-single-variable-calculus-fall-2006/' },
              { title: 'Calculus for Machine Learning', url: 'https://mml-book.github.io/' },
              { title: 'Automatic Differentiation Tutorial', url: 'https://pytorch.org/tutorials/beginner/blitz/autograd_tutorial.html' },
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

        {/* Mark as Complete Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => updateProgress('derivatives', { completed: true })}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Mark as Complete ✓
          </button>
        </motion.div>
      </div>
    </div>
  )
}
