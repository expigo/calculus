# 🚀 Calculus for ML/DL/DS - React Edition

> **Production-grade interactive calculus learning platform powered by React, Vite, and modern web technologies**

## ✨ What's New in the React Version?

### 🎯 Major Improvements

1. **Component-Based Architecture**
   - Modular, reusable React components
   - Better code organization and maintainability
   - Easier to extend and customize

2. **Framer Motion Animations**
   - Stunning page transitions
   - Smooth scroll animations
   - Interactive hover effects
   - Staggered animations for lists

3. **State Management with Zustand**
   - Persistent progress tracking (saved to localStorage)
   - Real-time completion percentage
   - Bookmark system
   - Lightweight and fast

4. **Modern Styling with Tailwind CSS**
   - Utility-first CSS approach
   - Consistent design system
   - Responsive by default
   - Easy customization

5. **React Router**
   - Smooth client-side navigation
   - No page reloads
   - Better UX

6. **Enhanced Interactivity**
   - React state for quizzes
   - Real-time visualizations with React hooks
   - Better form handling
   - Optimized re-renders

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library with hooks and concurrent features |
| **Vite** | Lightning-fast dev server and build tool |
| **Tailwind CSS** | Utility-first CSS framework |
| **Framer Motion** | Production-ready animation library |
| **React Router** | Client-side routing |
| **Zustand** | Lightweight state management |
| **Plotly.js** | Interactive 2D/3D visualizations |
| **KaTeX** | Fast LaTeX math rendering |
| **Prism.js** | Syntax highlighting for code |
| **React Icons** | Beautiful icon library |

## 📦 Installation

### Prerequisites

- Node.js 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000` 🎉

## 📁 Project Structure

```
calculus/
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Navbar.jsx    # Navigation with progress tracker
│   │   ├── ProgressTracker.jsx  # Scroll progress indicator
│   │   └── ScrollToTop.jsx      # Auto-scroll on route change
│   ├── pages/            # Page components
│   │   ├── Home.jsx      # Landing page with animations
│   │   ├── Limits.jsx    # Limits & Continuity
│   │   ├── Derivatives.jsx
│   │   ├── Multivariable.jsx
│   │   ├── MLApplications.jsx
│   │   └── Resources.jsx
│   ├── store/            # Zustand state management
│   │   └── useStore.js   # Global app state
│   ├── hooks/            # Custom React hooks (future)
│   ├── utils/            # Utility functions (future)
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # React entry point
│   └── index.css         # Tailwind + custom styles
├── public/               # Static assets
├── index-react.html      # HTML entry point
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Key Features

### 1. **Progress Tracking**

Your learning progress is automatically saved to localStorage using Zustand:

```javascript
import useStore from './store/useStore'

// In your component
const progress = useStore((state) => state.progress)
const updateProgress = useStore((state) => state.updateProgress)

// Mark topic as completed
updateProgress('derivatives', { completed: true, quizScore: 95 })
```

### 2. **Framer Motion Animations**

Beautiful, performant animations throughout:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
>
  Content
</motion.div>
```

### 3. **Responsive Design**

Mobile-first approach with Tailwind breakpoints:
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

### 4. **Interactive Visualizations**

React hooks + Plotly for dynamic charts:

```jsx
import Plot from 'react-plotly.js'

<Plot
  data={[{
    x: xValues,
    y: yValues,
    type: 'scatter'
  }]}
  layout={{ title: 'Derivative Visualization' }}
/>
```

## 🔧 Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color',
      }
    }
  }
}
```

### Add New Pages

1. Create component in `src/pages/YourPage.jsx`
2. Add route in `src/App.jsx`:

```jsx
<Route path="/your-page" element={<YourPage />} />
```

3. Add link in `src/components/Navbar.jsx`

### Custom Animations

Use Framer Motion's powerful API:

```jsx
const variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  }
}

<motion.div variants={variants} initial="hidden" animate="visible">
  Content
</motion.div>
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag & drop 'dist' folder to Netlify
```

### GitHub Pages

```bash
# In vite.config.js, set base to your repo name
npm run build
npx gh-pages -d dist
```

## 🎯 Next Steps & Future Enhancements

### Planned Features

- [ ] **3D Visualizations** with React Three Fiber
- [ ] **User Accounts** with authentication
- [ ] **Cloud Progress Sync** across devices
- [ ] **Interactive Code Editor** (CodeMirror/Monaco)
- [ ] **Spaced Repetition System** for quizzes
- [ ] **Dark/Light Mode Toggle**
- [ ] **PDF Export** of notes
- [ ] **Social Features** (share progress, compare with friends)
- [ ] **AI Tutor** integration (GPT-4 for explanations)
- [ ] **Mobile App** (React Native)

### Component Ideas

Create these reusable components:

```
components/
├── Quiz/
│   ├── QuizCard.jsx
│   ├── QuizQuestion.jsx
│   └── QuizResults.jsx
├── Code/
│   ├── CodeBlock.jsx
│   └── CodeEditor.jsx
├── Math/
│   ├── Equation.jsx
│   └── Theorem.jsx
└── Visualization/
    ├── PlotlyChart.jsx
    ├── D3Visualization.jsx
    └── ThreeScene.jsx
```

## 📚 Learning Resources

### React
- [React Docs](https://react.dev/)
- [React Hooks](https://react.dev/reference/react)

### Framer Motion
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Animation Examples](https://www.framer.com/motion/examples/)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)

### Zustand
- [Zustand Docs](https://github.com/pmndrs/zustand)

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 Comparison: HTML vs React

| Feature | HTML Version | React Version |
|---------|-------------|---------------|
| **Bundle Size** | Smaller | Larger (but code-split) |
| **Initial Load** | Faster | Slightly slower |
| **Subsequent Navigation** | Full page reload | Instant (SPA) |
| **State Management** | localStorage + vanilla JS | Zustand (elegant) |
| **Animations** | CSS + vanilla JS | Framer Motion (powerful) |
| **Code Organization** | Separate HTML files | Component-based |
| **Maintainability** | Good | Excellent |
| **Developer Experience** | Basic | Outstanding |
| **Scalability** | Limited | Excellent |
| **Modern Features** | Manual implementation | Built-in (hooks, etc.) |

## ⚡ Performance Tips

1. **Lazy Loading**
```jsx
const Derivatives = lazy(() => import('./pages/Derivatives'))
```

2. **Memoization**
```jsx
const expensiveValue = useMemo(() => compute(), [deps])
```

3. **Code Splitting**
```jsx
// Vite automatically code-splits routes
```

4. **Image Optimization**
- Use WebP format
- Lazy load images
- Responsive images with `srcset`

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Change port in vite.config.js
server: {
  port: 3001
}
```

### Build Errors

```bash
# Clear cache
rm -rf node_modules dist
npm install
```

### Tailwind Not Working

```bash
# Rebuild Tailwind
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
```

## 📄 License

This project is open source and available for educational purposes.

---

**Built with ❤️ for aspiring ML researchers**

🚀 **Happy Learning!**
