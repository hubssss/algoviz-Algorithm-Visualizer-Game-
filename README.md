# AlgoViz - Interactive Algorithm Visualizer 🧠

An interactive, visually stunning platform for exploring and learning data science algorithms through step-by-step visualizations and hands-on experimentation.

## ✨ Features

### 🌌 Constellation Map Navigation
- Unique "Google Earth-style" algorithm exploration
- Algorithms displayed as connected nodes in an interactive star map
- Visual connections show relationships between algorithms
- Hover effects and smooth animations

### 📊 Comprehensive Algorithm Coverage
- **Supervised Learning**: Linear Regression, Logistic Regression, Decision Trees, Random Forest, Neural Networks
- **Unsupervised Learning**: K-Means, PCA, DBSCAN, Hierarchical Clustering
- **Optimization**: Gradient Descent, Genetic Algorithms, Simulated Annealing
- **Search & Graph**: BFS, DFS, Dijkstra's, A*, PageRank
- **Statistical Methods**: Bayes Theorem, Hypothesis Testing

### 🎮 Interactive Visualizations
- Step-by-step algorithm execution with animations
- Real-time parameter adjustment (sliders for K, learning rate, etc.)
- Playback controls (play, pause, next, previous, speed control)
- Canvas-based rendering for smooth performance

### 💡 Learning Tools
- Side-by-side code comparison (Python & JavaScript)
- Mathematical explanations
- Real-world use cases for each algorithm
- Time and space complexity analysis
- Progress tracking and badge system

### 🎨 Modern UI/UX
- Dark/Light mode toggle
- Glassmorphism design elements
- Smooth Framer Motion animations
- Responsive design for all devices
- Custom scrollbars and accessibility features

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
algorithm-visualizer/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage with constellation map
│   ├── algorithm/[id]/    # Dynamic algorithm pages
│   ├── playground/        # Playground for custom data
│   └── badges/            # Achievement badges
├── components/
│   ├── layout/            # Header, ThemeProvider
│   ├── ui/                # AlgorithmCard, ConstellationMap
│   ├── algorithm/         # ControlPanel
│   └── visualizations/    # Algorithm-specific visualizations
├── lib/
│   ├── algorithms/        # Algorithm implementations
│   ├── store/             # Zustand state management
│   └── utils/             # Utility functions
├── data/
│   ├── algorithms.ts      # Algorithm metadata
│   └── badges.ts          # Badge definitions
└── types/
    └── index.ts           # TypeScript definitions
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Visualization**: Canvas API, Recharts, D3.js
- **ML**: TensorFlow.js

## 📖 Usage

### Exploring Algorithms

1. **Constellation View**: Click on any algorithm node in the star map to zoom into its details
2. **Grid View**: Toggle to see all algorithms in a card layout
3. **Filter by Category**: Use category buttons to filter algorithms

### Visualizing Algorithms

1. Navigate to an algorithm page
2. Adjust parameters using sliders (e.g., K for K-Means)
3. Click "New Data" to generate random data
4. Use playback controls to step through the algorithm
5. Toggle between Python and JavaScript code examples

### Using the Playground

1. Go to Playground page
2. Upload custom CSV/JSON datasets
3. Adjust algorithm parameters
4. Run algorithms on your own data
5. Try example datasets

### Earning Badges

1. Visit Badges page
2. Complete algorithms to unlock achievements
3. Track your progress
4. Unlock 20+ unique badges

## 🎯 Current Implementation Status

### ✅ Completed
- Project setup with Next.js 15 + TypeScript
- Homepage with constellation map and grid view
- Dark/light theme toggle
- K-Means clustering full implementation
- Step-by-step visualization engine
- Interactive controls and parameter adjustment
- Code preview (Python/JavaScript)
- Playground with custom data upload
- Badge achievement system (20+ badges)
- Progress tracking system

### 🚧 To Be Implemented
- Additional algorithm implementations (Linear Regression, BFS, DFS, etc.)
- Quiz system
- Mobile-optimized controls
- Algorithm comparison mode

## 🤝 Contributing

Contributions are welcome! To add a new algorithm:

1. Add metadata to `data/algorithms.ts`
2. Implement algorithm logic in `lib/algorithms/[name].ts`
3. Create visualization component in `components/visualizations/`
4. Update algorithm page to include new visualization

See [CLAUDE.md](../CLAUDE.md) for detailed development guidelines.

## 🎓 Educational Use

This project is perfect for:
- Computer Science students learning algorithms
- Data Science bootcamps and courses
- Self-learners exploring machine learning
- Teachers demonstrating algorithms visually
- Interview preparation and algorithm practice

---

**Built with [Claude Code](https://claude.com/claude-code)** 🤖
