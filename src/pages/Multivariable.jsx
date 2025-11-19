import { useState } from 'react'
import { motion } from 'framer-motion'
import Section from '../components/Section'
import CodeBlock from '../components/CodeBlock'
import MathBlock from '../components/MathBlock'
import InteractivePlot from '../components/InteractivePlot'
import Quiz from '../components/Quiz'
import useStore from '../store/useStore'

export default function Multivariable() {
  const updateProgress = useStore((state) => state.updateProgress)

  // Generate 3D surface plot
  const generate3DSurfaceData = () => {
    const x = [], y = [], z = []

    for (let i = -3; i <= 3; i += 0.2) {
      const xRow = [], yRow = [], zRow = []
      for (let j = -3; j <= 3; j += 0.2) {
        xRow.push(i)
        yRow.push(j)
        // f(x,y) = x² + y²
        zRow.push(i*i + j*j)
      }
      x.push(xRow)
      y.push(yRow)
      z.push(zRow)
    }

    return [{
      type: 'surface',
      x: x,
      y: y,
      z: z,
      colorscale: 'Viridis',
      showscale: true,
    }]
  }

  // Generate gradient field
  const generateGradientFieldData = () => {
    const x = [], y = [], u = [], v = []

    for (let i = -2; i <= 2; i += 0.4) {
      for (let j = -2; j <= 2; j += 0.4) {
        x.push(i)
        y.push(j)
        // Gradient of f(x,y) = x² + y² is (2x, 2y)
        u.push(2 * i * 0.2)  // Scale for visibility
        v.push(2 * j * 0.2)
      }
    }

    return [
      {
        type: 'scatter',
        mode: 'markers',
        x: x,
        y: y,
        marker: {
          color: 'rgba(102, 126, 234, 0.6)',
          size: 4,
        },
        showlegend: false,
      },
      {
        type: 'scatter',
        mode: 'lines',
        x: x.flatMap((xi, i) => [xi, xi + u[i], null]),
        y: y.flatMap((yi, i) => [yi, yi + v[i], null]),
        line: {
          color: '#667eea',
          width: 2,
        },
        showlegend: false,
      }
    ]
  }

  // Contour plot
  const generateContourData = () => {
    const x = [], y = [], z = []

    for (let i = -3; i <= 3; i += 0.1) {
      const row = []
      for (let j = -3; j <= 3; j += 0.1) {
        row.push(i*i + j*j)
      }
      z.push(row)
    }

    for (let i = -3; i <= 3; i += 0.1) {
      x.push(i)
      y.push(i)
    }

    return [{
      type: 'contour',
      x: x,
      y: y,
      z: z,
      colorscale: 'Jet',
      contours: {
        coloring: 'heatmap',
      },
      showscale: true,
    }]
  }

  const quizQuestions = [
    {
      question: "What is the gradient ∇f of f(x,y) = 3x² + 2xy + y²?",
      options: [
        "(6x + 2y, 2x + 2y)",
        "(3x + 2y, 2x + y)",
        "(6x, 2y)",
        "(3x² + 2xy, 2xy + y²)",
      ],
      correct: 0,
      explanation: "∇f = (∂f/∂x, ∂f/∂y) = (6x + 2y, 2x + 2y). Take partial derivatives with respect to each variable.",
    },
    {
      question: "What does the gradient vector ∇f point toward?",
      options: [
        "The direction of steepest descent",
        "The direction of steepest ascent",
        "Parallel to the level curves",
        "The minimum of the function",
      ],
      correct: 1,
      explanation: "The gradient points in the direction of steepest ascent. That's why gradient descent moves in the opposite direction (-∇f) to minimize the function.",
    },
    {
      question: "What is the Hessian matrix used for in neural networks?",
      options: [
        "Computing the forward pass",
        "Second-order optimization methods like Newton's method",
        "Initializing weights",
        "Batch normalization",
      ],
      correct: 1,
      explanation: "The Hessian (matrix of second derivatives) is used in second-order optimization methods. It provides curvature information, allowing faster convergence than gradient descent.",
    },
    {
      question: "If ∇f(p) = 0, what can we conclude about point p?",
      options: [
        "p is definitely a global minimum",
        "p is a critical point (could be min, max, or saddle)",
        "The function is undefined at p",
        "p is definitely a local maximum",
      ],
      correct: 1,
      explanation: "Zero gradient indicates a critical point, but we need the Hessian to determine if it's a minimum, maximum, or saddle point. This is crucial in training neural networks!",
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
            Multivariable Calculus
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Functions of many variables, gradients, and optimization. The mathematical foundation
            of neural networks, where we optimize over millions of parameters simultaneously.
          </p>
        </motion.div>

        {/* Introduction */}
        <Section title="From One to Many Variables" icon="🌐">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed">
              Neural networks are functions of millions of variables (weights and biases). Understanding
              multivariable calculus is essential to grasp how backpropagation computes gradients and
              how optimizers navigate high-dimensional loss landscapes.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6">
            <h4 className="text-lg font-semibold mb-3 text-blue-300">💡 Key Transition</h4>
            <div className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-400 mb-1">Single Variable:</p>
                  <MathBlock math="f(x) = x^2" />
                  <MathBlock math="f'(x) = 2x" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400 mb-1">Multiple Variables:</p>
                  <MathBlock math="f(x, y) = x^2 + y^2" />
                  <MathBlock math="\nabla f = (2x, 2y)" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 3D Visualization */}
        <Section title="Visualizing Multivariable Functions" icon="🗻">
          <p className="text-gray-300 mb-6">
            The function f(x,y) = x² + y² creates a paraboloid surface. At each point, the gradient
            vector points uphill - the direction of steepest ascent.
          </p>

          <InteractivePlot
            data={generate3DSurfaceData()}
            layout={{
              title: '3D Surface: f(x,y) = x² + y²',
              scene: {
                xaxis: { title: 'x' },
                yaxis: { title: 'y' },
                zaxis: { title: 'f(x,y)' },
              },
              autosize: true,
              height: 500,
            }}
          />

          <div className="mt-6 p-6 bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-2xl">
            <h4 className="text-lg font-semibold mb-3 text-green-300">🎓 Observation</h4>
            <p className="text-gray-300">
              This bowl-shaped surface has a global minimum at (0,0,0). In machine learning, our loss
              function might have millions of dimensions, but the principle is the same: we follow the
              gradient downhill to find minima.
            </p>
          </div>
        </Section>

        {/* Partial Derivatives */}
        <Section title="Partial Derivatives" icon="∂">
          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              A partial derivative measures how a function changes with respect to one variable,
              holding all others constant. It's the foundation of backpropagation.
            </p>
          </div>

          <MathBlock
            math="\frac{\partial f}{\partial x} = \lim_{h \to 0} \frac{f(x+h, y) - f(x, y)}{h}"
            label="Partial derivative with respect to x"
          />

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold mb-4 text-primary-400">Example Calculation</h4>
              <p className="text-sm text-gray-300 mb-3">Given: f(x,y) = x²y + 3xy²</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-400">Partial w.r.t. x (treat y as constant):</p>
                  <MathBlock math="\frac{\partial f}{\partial x} = 2xy + 3y^2" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Partial w.r.t. y (treat x as constant):</p>
                  <MathBlock math="\frac{\partial f}{\partial y} = x^2 + 6xy" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold mb-4 text-secondary-400">Notation Variations</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Partial derivative:</span>
                  <span className="text-white">∂f/∂x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Alternative:</span>
                  <span className="text-white">f_x or ∂_x f</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Evaluated at point:</span>
                  <span className="text-white">∂f/∂x|(a,b)</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* The Gradient */}
        <Section title="The Gradient Vector ∇f" icon="⬆️">
          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              The gradient is a vector of all partial derivatives. It's the single most important
              concept in machine learning optimization.
            </p>
          </div>

          <MathBlock
            math="\nabla f = \left( \frac{\partial f}{\partial x_1}, \frac{\partial f}{\partial x_2}, \ldots, \frac{\partial f}{\partial x_n} \right)"
            label="Gradient in n dimensions"
          />

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Gradient Field Visualization</h4>
              <InteractivePlot
                data={generateGradientFieldData()}
                layout={{
                  title: 'Gradient vectors of f(x,y) = x² + y²',
                  xaxis: { title: 'x', range: [-2.5, 2.5] },
                  yaxis: { title: 'y', range: [-2.5, 2.5] },
                  height: 400,
                }}
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contour Plot</h4>
              <InteractivePlot
                data={generateContourData()}
                layout={{
                  title: 'Level curves of f(x,y) = x² + y²',
                  xaxis: { title: 'x' },
                  yaxis: { title: 'y' },
                  height: 400,
                }}
              />
            </div>
          </div>

          <div className="mt-6 p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl">
            <h4 className="text-lg font-semibold mb-3 text-purple-300">🔑 Key Properties</h4>
            <ul className="space-y-2 text-gray-300">
              <li>• ∇f points in the direction of steepest ascent</li>
              <li>• -∇f points in the direction of steepest descent (gradient descent!)</li>
              <li>• ∇f is perpendicular to level curves/surfaces</li>
              <li>• ||∇f|| (gradient magnitude) tells us how steep the slope is</li>
            </ul>
          </div>
        </Section>

        {/* Jacobian and Hessian */}
        <Section title="Jacobian and Hessian Matrices" icon="📐">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-4 text-primary-400">Jacobian Matrix</h4>
              <p className="text-gray-300 mb-4">
                For vector-valued functions F: ℝⁿ → ℝᵐ, the Jacobian is the matrix of all first partial derivatives.
              </p>
              <MathBlock math="J = \begin{bmatrix} \frac{\partial f_1}{\partial x_1} & \cdots & \frac{\partial f_1}{\partial x_n} \\ \vdots & \ddots & \vdots \\ \frac{\partial f_m}{\partial x_1} & \cdots & \frac{\partial f_m}{\partial x_n} \end{bmatrix}" />
              <p className="text-sm text-gray-400 mt-3">
                Critical for backpropagation through layers in neural networks
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-4 text-secondary-400">Hessian Matrix</h4>
              <p className="text-gray-300 mb-4">
                Matrix of second partial derivatives. Describes the curvature of the function.
              </p>
              <MathBlock math="H = \begin{bmatrix} \frac{\partial^2 f}{\partial x_1^2} & \frac{\partial^2 f}{\partial x_1 \partial x_2} \\ \frac{\partial^2 f}{\partial x_2 \partial x_1} & \frac{\partial^2 f}{\partial x_2^2} \end{bmatrix}" />
              <p className="text-sm text-gray-400 mt-3">
                Used in second-order optimization (Newton's method, L-BFGS)
              </p>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6">
            <h4 className="text-lg font-semibold mb-3 text-yellow-300">🧠 Deep Learning Connection</h4>
            <p className="text-gray-300 mb-3">
              In a neural network with loss L and weights W:
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• <strong>Gradient ∇L:</strong> Used in gradient descent (first-order method)</li>
              <li>• <strong>Jacobian:</strong> Chain rule for backprop through layers</li>
              <li>• <strong>Hessian H:</strong> Curvature info for advanced optimizers</li>
              <li>• <strong>Hessian is expensive:</strong> n×n matrix for n parameters (millions!)</li>
            </ul>
          </div>
        </Section>

        {/* Directional Derivatives */}
        <Section title="Directional Derivatives" icon="➡️">
          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              The directional derivative tells us the rate of change of f in any direction u.
            </p>
          </div>

          <MathBlock
            math="D_{\mathbf{u}}f = \nabla f \cdot \mathbf{u} = \|\nabla f\| \|\mathbf{u}\| \cos\theta"
            label="Directional derivative (u must be a unit vector)"
          />

          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mt-6">
            <h4 className="text-lg font-semibold mb-4 text-white">Important Cases:</h4>
            <div className="space-y-4">
              <div className="p-4 bg-black/20 rounded-lg">
                <p className="text-sm font-semibold text-primary-400 mb-2">Maximum rate of increase:</p>
                <p className="text-gray-300">Direction u = ∇f/||∇f|| (gradient direction)</p>
                <p className="text-gray-400 text-sm">Rate: ||∇f||</p>
              </div>
              <div className="p-4 bg-black/20 rounded-lg">
                <p className="text-sm font-semibold text-secondary-400 mb-2">Maximum rate of decrease:</p>
                <p className="text-gray-300">Direction u = -∇f/||∇f|| (negative gradient)</p>
                <p className="text-gray-400 text-sm">Rate: -||∇f|| (this is gradient descent!)</p>
              </div>
              <div className="p-4 bg-black/20 rounded-lg">
                <p className="text-sm font-semibold text-accent-400 mb-2">No change:</p>
                <p className="text-gray-300">Direction perpendicular to ∇f</p>
                <p className="text-gray-400 text-sm">Rate: 0 (along level curves)</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Python Implementation */}
        <Section title="Computing Gradients in Python" icon="🐍">
          <CodeBlock
            title="Numerical Gradient Computation"
            language="python"
            code={`import numpy as np

def numerical_gradient(f, x, h=1e-5):
    """
    Compute gradient numerically using finite differences.
    f: function R^n -> R
    x: point (numpy array)
    h: step size
    """
    n = len(x)
    grad = np.zeros(n)

    for i in range(n):
        x_plus = x.copy()
        x_plus[i] += h

        x_minus = x.copy()
        x_minus[i] -= h

        # Central difference
        grad[i] = (f(x_plus) - f(x_minus)) / (2 * h)

    return grad

# Example: f(x,y) = x² + y²
def f(x):
    return x[0]**2 + x[1]**2

point = np.array([3.0, 4.0])
grad_numerical = numerical_gradient(f, point)
grad_analytical = 2 * point  # ∇f = (2x, 2y)

print(f"Numerical gradient: {grad_numerical}")
print(f"Analytical gradient: {grad_analytical}")
print(f"Error: {np.linalg.norm(grad_numerical - grad_analytical)}")`}
          />

          <CodeBlock
            title="Automatic Differentiation: Multivariate Functions"
            language="python"
            code={`import torch

# Define function f(x, y) = x²y + xy²
x = torch.tensor(2.0, requires_grad=True)
y = torch.tensor(3.0, requires_grad=True)

# Compute function
f = x**2 * y + x * y**2

# Compute gradients
f.backward()

print(f"f({x.item()}, {y.item()}) = {f.item()}")
print(f"∂f/∂x = {x.grad.item()}")  # Should be 2xy + y²
print(f"∂f/∂y = {y.grad.item()}")  # Should be x² + 2xy

# Analytical verification
analytical_dx = 2*x.item()*y.item() + y.item()**2
analytical_dy = x.item()**2 + 2*x.item()*y.item()
print(f"\\nAnalytical ∂f/∂x = {analytical_dx}")
print(f"Analytical ∂f/∂y = {analytical_dy}")`}
          />

          <CodeBlock
            title="Gradient Descent in High Dimensions"
            language="python"
            code={`import numpy as np

def gradient_descent_multivariate(f, grad_f, x_init, lr=0.01, max_iter=1000, tol=1e-6):
    """
    Gradient descent for multivariable functions.

    f: objective function
    grad_f: gradient function
    x_init: starting point (numpy array)
    """
    x = x_init.copy()
    history = [x.copy()]

    for i in range(max_iter):
        # Compute gradient
        grad = grad_f(x)

        # Check convergence
        if np.linalg.norm(grad) < tol:
            print(f"Converged in {i} iterations!")
            break

        # Update
        x = x - lr * grad
        history.append(x.copy())

        if i % 100 == 0:
            print(f"Iter {i}: f(x) = {f(x):.6f}, ||∇f|| = {np.linalg.norm(grad):.6f}")

    return x, np.array(history)

# Example: Minimize f(x,y) = (x-1)² + (y-2)²
def f(x):
    return (x[0] - 1)**2 + (x[1] - 2)**2

def grad_f(x):
    return np.array([
        2*(x[0] - 1),
        2*(x[1] - 2)
    ])

# Start far from optimum
x_init = np.array([10.0, -5.0])
x_opt, history = gradient_descent_multivariate(f, grad_f, x_init, lr=0.1)

print(f"\\nOptimal point: {x_opt}")
print(f"Optimal value: {f(x_opt):.8f}")
print(f"True optimum: [1, 2]")`}
          />

          <CodeBlock
            title="Computing Hessian for Second-Order Methods"
            language="python"
            code={`import torch

def compute_hessian(f, x):
    """
    Compute Hessian matrix using PyTorch autograd.
    """
    n = x.shape[0]
    hessian = torch.zeros(n, n)

    # Compute gradient
    grad = torch.autograd.grad(f, x, create_graph=True)[0]

    # Compute second derivatives
    for i in range(n):
        grad2 = torch.autograd.grad(grad[i], x, retain_graph=True)[0]
        hessian[i] = grad2

    return hessian

# Example: f(x,y) = x² + xy + y²
x = torch.tensor([1.0, 2.0], requires_grad=True)
f = x[0]**2 + x[0]*x[1] + x[1]**2

hessian = compute_hessian(f, x)
print("Hessian matrix:")
print(hessian)

# Analytical Hessian:
# H = [[2, 1],
#      [1, 2]]
print("\\nAnalytical Hessian:")
print("[[2, 1],")
print(" [1, 2]]")`}
          />
        </Section>

        {/* Quiz */}
        <Section title="Test Your Understanding" icon="🎯">
          <Quiz topic="multivariable" questions={quizQuestions} />
        </Section>

        {/* Exercises */}
        <Section title="Practice Exercises" icon="✏️">
          <div className="space-y-4">
            {[
              {
                difficulty: 'Easy',
                color: 'green',
                problem: 'Find ∇f for f(x,y) = 2x² + 3y² - 4xy',
              },
              {
                difficulty: 'Easy',
                color: 'green',
                problem: 'Compute the directional derivative of f(x,y) = xy at (1,2) in direction (1,1)',
              },
              {
                difficulty: 'Medium',
                color: 'yellow',
                problem: 'Find the Hessian matrix of f(x,y) = x³ + y³ - 3xy',
              },
              {
                difficulty: 'Medium',
                color: 'yellow',
                problem: 'Prove that the gradient is perpendicular to level curves',
              },
              {
                difficulty: 'Hard',
                color: 'red',
                problem: 'Implement gradient descent to minimize f(x,y,z) = x² + y² + z² - 2xy + 3z',
              },
              {
                difficulty: 'Hard',
                color: 'red',
                problem: 'Derive backpropagation using the Jacobian for a 3-layer network',
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
              { title: '3Blue1Brown: Multivariable Calculus', url: 'https://www.youtube.com/watch?v=TrcCbdWwCBc' },
              { title: 'MIT OCW: Multivariable Calculus', url: 'https://ocw.mit.edu/courses/mathematics/18-02sc-multivariable-calculus-fall-2010/' },
              { title: 'Matrix Calculus for Deep Learning', url: 'https://explained.ai/matrix-calculus/' },
              { title: 'Stanford CS231n: Gradients', url: 'https://cs231n.github.io/optimization-1/' },
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
            onClick={() => updateProgress('multivariable', { completed: true })}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Mark as Complete ✓
          </button>
        </motion.div>
      </div>
    </div>
  )
}
