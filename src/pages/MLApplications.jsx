import { motion } from 'framer-motion'
import Section from '../components/Section'
import CodeBlock from '../components/CodeBlock'
import MathBlock from '../components/MathBlock'
import Quiz from '../components/Quiz'
import useStore from '../store/useStore'

export default function MLApplications() {
  const updateProgress = useStore((state) => state.updateProgress)

  const quizQuestions = [
    {
      question: "What does backpropagation compute?",
      options: [
        "The forward pass output",
        "The gradient of the loss with respect to all parameters",
        "The optimal learning rate",
        "The activation function outputs",
      ],
      correct: 1,
      explanation: "Backpropagation computes ∂L/∂w for all weights using the chain rule, allowing us to update parameters with gradient descent.",
    },
    {
      question: "Why do we use mini-batch gradient descent instead of full-batch?",
      options: [
        "It's more accurate",
        "It's faster to converge and provides regularization through noise",
        "It requires less memory only",
        "It always finds the global minimum",
      ],
      correct: 1,
      explanation: "Mini-batch adds noise that helps escape local minima, converges faster than full-batch, and is more memory-efficient than processing all data at once.",
    },
    {
      question: "What does Adam optimizer combine?",
      options: [
        "SGD and Newton's method",
        "Momentum and RMSprop (adaptive learning rates)",
        "Gradient descent and genetic algorithms",
        "L1 and L2 regularization",
      ],
      correct: 1,
      explanation: "Adam combines momentum (first moment) and RMSprop (second moment/adaptive learning rates) for efficient optimization.",
    },
    {
      question: "What does vanishing gradient problem mean?",
      options: [
        "Gradients become too large",
        "Gradients approach zero in early layers, preventing learning",
        "Loss function is not convex",
        "Learning rate is too small",
      ],
      correct: 1,
      explanation: "In deep networks, gradients can become exponentially small as they backpropagate, making early layers learn very slowly. ReLU and careful initialization help address this.",
    },
  ]

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
            Machine Learning Applications
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Where calculus meets artificial intelligence. See how derivatives, gradients, and
            optimization power modern neural networks and deep learning.
          </p>
        </motion.div>

        {/* Backpropagation */}
        <Section title="Backpropagation: The Chain Rule in Action" icon="🔄">
          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              Backpropagation is the algorithm that makes deep learning possible. It efficiently
              computes gradients by applying the chain rule backward through the network.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6 mb-6">
            <h4 className="text-lg font-semibold mb-3 text-blue-300">🧠 The Big Picture</h4>
            <MathBlock math="\frac{\partial L}{\partial w^{(1)}} = \frac{\partial L}{\partial a^{(3)}} \cdot \frac{\partial a^{(3)}}{\partial z^{(3)}} \cdot \frac{\partial z^{(3)}}{\partial a^{(2)}} \cdot \frac{\partial a^{(2)}}{\partial z^{(2)}} \cdot \frac{\partial z^{(2)}}{\partial a^{(1)}} \cdot \frac{\partial a^{(1)}}{\partial z^{(1)}} \cdot \frac{\partial z^{(1)}}{\partial w^{(1)}}" />
            <p className="text-gray-300 mt-3">
              This chain of derivatives lets us compute how the loss depends on weights in the first layer,
              even though many nonlinear transformations separate them.
            </p>
          </div>

          <CodeBlock
            title="Backpropagation from Scratch (2-Layer Network)"
            language="python"
            code={`import numpy as np

class NeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size):
        # Initialize weights with Xavier initialization
        self.W1 = np.random.randn(input_size, hidden_size) * np.sqrt(2/input_size)
        self.b1 = np.zeros((1, hidden_size))
        self.W2 = np.random.randn(hidden_size, output_size) * np.sqrt(2/hidden_size)
        self.b2 = np.zeros((1, output_size))

    def sigmoid(self, z):
        return 1 / (1 + np.exp(-z))

    def sigmoid_derivative(self, a):
        return a * (1 - a)

    def forward(self, X):
        """Forward pass - store activations for backprop"""
        self.z1 = X @ self.W1 + self.b1
        self.a1 = self.sigmoid(self.z1)
        self.z2 = self.a1 @ self.W2 + self.b2
        self.a2 = self.sigmoid(self.z2)
        return self.a2

    def backward(self, X, y, output):
        """Backpropagation - compute all gradients using chain rule"""
        m = X.shape[0]

        # Output layer gradients
        # dL/da2 * da2/dz2
        dz2 = output - y  # For binary cross-entropy + sigmoid

        # dL/dW2 = a1^T @ dz2 (using matrix calculus)
        dW2 = (self.a1.T @ dz2) / m
        db2 = np.sum(dz2, axis=0, keepdims=True) / m

        # Hidden layer gradients (chain rule!)
        # dL/da1 = dz2 @ W2^T
        da1 = dz2 @ self.W2.T
        # dL/dz1 = dL/da1 * da1/dz1
        dz1 = da1 * self.sigmoid_derivative(self.a1)

        # dL/dW1
        dW1 = (X.T @ dz1) / m
        db1 = np.sum(dz1, axis=0, keepdims=True) / m

        return dW1, db1, dW2, db2

    def train(self, X, y, epochs=1000, learning_rate=0.1):
        losses = []

        for epoch in range(epochs):
            # Forward pass
            output = self.forward(X)

            # Compute loss (binary cross-entropy)
            loss = -np.mean(y * np.log(output + 1e-8) + (1 - y) * np.log(1 - output + 1e-8))
            losses.append(loss)

            # Backward pass (backpropagation!)
            dW1, db1, dW2, db2 = self.backward(X, y, output)

            # Gradient descent update
            self.W1 -= learning_rate * dW1
            self.b1 -= learning_rate * db1
            self.W2 -= learning_rate * dW2
            self.b2 -= learning_rate * db2

            if epoch % 100 == 0:
                print(f"Epoch {epoch}, Loss: {loss:.4f}")

        return losses

# Example: XOR problem
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([[0], [1], [1], [0]])

nn = NeuralNetwork(input_size=2, hidden_size=4, output_size=1)
losses = nn.train(X, y, epochs=5000, learning_rate=1.0)

print("\\nPredictions:")
predictions = nn.forward(X)
print(predictions.round(3))`}
          />
        </Section>

        {/* Optimization Algorithms */}
        <Section title="Optimization Algorithms" icon="⚡">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-4 text-primary-400">Stochastic Gradient Descent (SGD)</h4>
              <MathBlock math="w_{t+1} = w_t - \eta \nabla L(w_t; x_i, y_i)" />
              <p className="text-sm text-gray-300 mt-3">
                Updates weights using gradient from single example or mini-batch. Noisy but fast.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-4 text-secondary-400">SGD with Momentum</h4>
              <MathBlock math="v_{t+1} = \beta v_t + (1-\beta)\nabla L(w_t)" />
              <MathBlock math="w_{t+1} = w_t - \eta v_{t+1}" />
              <p className="text-sm text-gray-300">
                Accumulates velocity to dampen oscillations and accelerate convergence.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-4 text-accent-400">RMSprop</h4>
              <MathBlock math="s_{t+1} = \beta s_t + (1-\beta)(\nabla L(w_t))^2" />
              <MathBlock math="w_{t+1} = w_t - \frac{\eta}{\sqrt{s_{t+1} + \epsilon}}\nabla L(w_t)" />
              <p className="text-sm text-gray-300">
                Adaptive learning rates per parameter based on recent gradient magnitudes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-4 text-primary-400">Adam (Adaptive Moment)</h4>
              <MathBlock math="m_t = \beta_1 m_{t-1} + (1-\beta_1)\nabla L" />
              <MathBlock math="v_t = \beta_2 v_{t-1} + (1-\beta_2)(\nabla L)^2" />
              <MathBlock math="w_t = w_{t-1} - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}" />
              <p className="text-sm text-gray-300">
                Combines momentum + RMSprop. Most popular optimizer for deep learning!
              </p>
            </div>
          </div>

          <CodeBlock
            title="Implementing Optimizers in PyTorch"
            language="python"
            code={`import torch
import torch.nn as nn
import torch.optim as optim

# Define a simple neural network
class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(10, 50)
        self.fc2 = nn.Linear(50, 1)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

model = SimpleNet()

# Different optimizers - uncomment to try each
optimizer = optim.SGD(model.parameters(), lr=0.01)
# optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
# optimizer = optim.RMSprop(model.parameters(), lr=0.001)
# optimizer = optim.Adam(model.parameters(), lr=0.001, betas=(0.9, 0.999))

# Training loop
for epoch in range(100):
    # Forward pass
    X = torch.randn(32, 10)  # Batch of 32 samples
    y = torch.randn(32, 1)
    output = model(X)
    loss = nn.MSELoss()(output, y)

    # Backward pass
    optimizer.zero_grad()  # Clear previous gradients
    loss.backward()        # Compute gradients (backprop!)

    # Update weights
    optimizer.step()       # Apply optimizer update rule

    if epoch % 10 == 0:
        print(f"Epoch {epoch}, Loss: {loss.item():.4f}")`}
          />
        </Section>

        {/* Loss Functions */}
        <Section title="Loss Functions and Their Derivatives" icon="📉">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-4 text-primary-400">Mean Squared Error (MSE) - Regression</h4>
              <MathBlock math="L = \frac{1}{n}\sum_{i=1}^n (y_i - \hat{y}_i)^2" />
              <MathBlock math="\frac{\partial L}{\partial \hat{y}_i} = \frac{2}{n}(\hat{y}_i - y_i)" />
              <p className="text-sm text-gray-300">Used for regression tasks. Penalizes large errors heavily.</p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-4 text-secondary-400">Binary Cross-Entropy - Binary Classification</h4>
              <MathBlock math="L = -\frac{1}{n}\sum_{i=1}^n [y_i \log(\hat{y}_i) + (1-y_i)\log(1-\hat{y}_i)]" />
              <MathBlock math="\frac{\partial L}{\partial \hat{y}_i} = \frac{\hat{y}_i - y_i}{\hat{y}_i(1-\hat{y}_i)}" />
              <p className="text-sm text-gray-300">With sigmoid output, gradient simplifies beautifully!</p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-4 text-accent-400">Cross-Entropy - Multi-class Classification</h4>
              <MathBlock math="L = -\sum_{i=1}^n \sum_{j=1}^C y_{ij} \log(\hat{y}_{ij})" />
              <p className="text-sm text-gray-300">Used with softmax for multi-class problems. C is number of classes.</p>
            </div>
          </div>

          <CodeBlock
            title="Computing Loss and Gradients"
            language="python"
            code={`import torch
import torch.nn.functional as F

# Regression: MSE Loss
y_true_reg = torch.tensor([1.0, 2.0, 3.0], requires_grad=False)
y_pred_reg = torch.tensor([1.1, 2.3, 2.8], requires_grad=True)

mse_loss = F.mse_loss(y_pred_reg, y_true_reg)
mse_loss.backward()
print(f"MSE Loss: {mse_loss.item():.4f}")
print(f"Gradient: {y_pred_reg.grad}")

# Binary Classification: BCE Loss
y_true_bin = torch.tensor([0.0, 1.0, 1.0, 0.0])
y_pred_bin = torch.tensor([0.1, 0.9, 0.7, 0.2], requires_grad=True)

bce_loss = F.binary_cross_entropy(y_pred_bin, y_true_bin)
bce_loss.backward()
print(f"\\nBCE Loss: {bce_loss.item():.4f}")
print(f"Gradient: {y_pred_bin.grad}")

# Multi-class Classification: Cross-Entropy
y_true_multi = torch.tensor([0, 2, 1])  # Class indices
y_pred_logits = torch.randn(3, 3, requires_grad=True)  # Logits for 3 classes

ce_loss = F.cross_entropy(y_pred_logits, y_true_multi)
ce_loss.backward()
print(f"\\nCross-Entropy Loss: {ce_loss.item():.4f}")
print(f"Gradient shape: {y_pred_logits.grad.shape}")`}
          />
        </Section>

        {/* Complete Example */}
        <Section title="Complete Example: Training MNIST Classifier" icon="🎯">
          <CodeBlock
            language="python"
            code={`import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

# 1. Define Network Architecture
class MNISTNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, 10)
        self.dropout = nn.Dropout(0.2)

    def forward(self, x):
        x = x.view(-1, 784)  # Flatten
        x = torch.relu(self.fc1(x))
        x = self.dropout(x)
        x = torch.relu(self.fc2(x))
        x = self.dropout(x)
        x = self.fc3(x)  # Logits
        return x

# 2. Prepare Data
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])

train_dataset = datasets.MNIST('./data', train=True, download=True, transform=transform)
test_dataset = datasets.MNIST('./data', train=False, transform=transform)

train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=1000)

# 3. Initialize Model, Loss, Optimizer
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = MNISTNet().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 4. Training Loop
def train(epoch):
    model.train()
    for batch_idx, (data, target) in enumerate(train_loader):
        data, target = data.to(device), target.to(device)

        # Forward pass
        output = model(data)
        loss = criterion(output, target)

        # Backward pass (backpropagation!)
        optimizer.zero_grad()
        loss.backward()

        # Update weights (gradient descent!)
        optimizer.step()

        if batch_idx % 100 == 0:
            print(f'Epoch {epoch} [{batch_idx * len(data)}/{len(train_loader.dataset)}]'
                  f' Loss: {loss.item():.6f}')

# 5. Evaluation
def test():
    model.eval()
    test_loss = 0
    correct = 0

    with torch.no_grad():  # No gradients needed for evaluation
        for data, target in test_loader:
            data, target = data.to(device), target.to(device)
            output = model(data)
            test_loss += criterion(output, target).item()
            pred = output.argmax(dim=1, keepdim=True)
            correct += pred.eq(target.view_as(pred)).sum().item()

    test_loss /= len(test_loader)
    accuracy = 100. * correct / len(test_loader.dataset)

    print(f'\\nTest set: Average loss: {test_loss:.4f}, '
          f'Accuracy: {correct}/{len(test_loader.dataset)} ({accuracy:.2f}%)\\n')

# 6. Train for multiple epochs
for epoch in range(1, 6):
    train(epoch)
    test()

print("Training complete! Calculus in action: backpropagation + gradient descent = trained neural network!")`}
          />
        </Section>

        {/* Advanced Topics */}
        <Section title="Advanced Topics" icon="🚀">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold mb-3 text-primary-400">Batch Normalization</h4>
              <p className="text-sm text-gray-300 mb-3">
                Normalizes layer inputs using mean/variance, reducing internal covariate shift.
                Requires computing gradients through normalization statistics.
              </p>
              <MathBlock math="\hat{x} = \frac{x - \mu}{\sqrt{\sigma^2 + \epsilon}}" />
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold mb-3 text-secondary-400">Dropout Regularization</h4>
              <p className="text-sm text-gray-300 mb-3">
                Randomly zeros activations during training. Gradients only flow through active neurons.
                Prevents overfitting by forcing network robustness.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold mb-3 text-accent-400">Learning Rate Schedules</h4>
              <p className="text-sm text-gray-300 mb-3">
                Decay learning rate over time for fine-tuning. Common: step decay, exponential decay,
                cosine annealing. Critical for convergence.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold mb-3 text-primary-400">Gradient Clipping</h4>
              <p className="text-sm text-gray-300 mb-3">
                Prevents exploding gradients by capping gradient norm. Essential for RNNs and
                training stability in deep networks.
              </p>
              <MathBlock math="g \leftarrow \min\left(1, \frac{\text{threshold}}{\|g\|}\right) \cdot g" />
            </div>
          </div>
        </Section>

        {/* Quiz */}
        <Section title="Test Your Understanding" icon="🎯">
          <Quiz topic="ml-applications" questions={quizQuestions} />
        </Section>

        {/* Resources */}
        <Section title="Further Resources" icon="📚">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Stanford CS231n: CNNs for Visual Recognition', url: 'https://cs231n.github.io/' },
              { title: 'Deep Learning Book (Goodfellow et al.)', url: 'https://www.deeplearningbook.org/' },
              { title: 'PyTorch Tutorials', url: 'https://pytorch.org/tutorials/' },
              { title: 'Andrej Karpathy: Neural Networks Zero to Hero', url: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ' },
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

        {/* Mark Complete */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => updateProgress('mlApplications', { completed: true })}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Mark as Complete ✓
          </button>
        </motion.div>
      </div>
    </div>
  )
}
