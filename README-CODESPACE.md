# 🛒 Mega Mart - Smart Grocery Platform

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/NISHANT-GUPTA123/mega-mart-smart-grocery?quickstart=1)
[![Deploy Status](https://img.shields.io/badge/Deploy-Ready-green.svg)](https://github.com/NISHANT-GUPTA123/mega-mart-smart-grocery)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **An intelligent grocery shopping platform with AI-powered restock predictions, consumption analytics, and personalized shopping experiences.**

## 🚀 Quick Start with GitHub Codespaces

### Option 1: One-Click Launch
Click the **"Open in GitHub Codespaces"** badge above to instantly launch a fully configured development environment.

### Option 2: Manual Setup
1. Go to your GitHub repository
2. Click the green **"Code"** button
3. Select **"Codespaces"** tab
4. Click **"Create codespace on main"**

### Option 3: VS Code Extension
1. Install the [GitHub Codespaces](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces) extension
2. Use `Ctrl+Shift+P` → "Codespaces: Create New Codespace"
3. Select this repository

## ✨ Features

### 🤖 Smart Restock Predictions
- **AI-Powered Analytics**: Machine learning algorithms analyze your purchase patterns
- **Consumption Tracking**: Learn from your actual usage vs predictions
- **Priority Levels**: Urgent, weekly, and monthly restock suggestions
- **Confidence Scoring**: See how confident the AI is about each prediction

### 📊 Purchase Analytics Dashboard
- **Historical Insights**: View your grocery shopping patterns over time
- **Consumption Feedback**: Help AI learn your actual consumption rates
- **Product Analytics**: Deep dive into specific product usage patterns
- **Timeframe Filtering**: Analyze data for 7 days, 30 days, or 90 days

### 🎯 Personalized Experience
- **Smart Cart Suggestions**: AI recommends products based on your history
- **Budget Planning**: Intelligent budgeting with spending insights
- **Community Features**: Reviews, Q&A, and social shopping experiences
- **Demo Data Generator**: Test with realistic sample data

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Zustand** for state management
- **React Router** for navigation

### Backend (Future)
- **Python Flask** REST API
- **SQLite/PostgreSQL** database
- **ML Models** for predictions
- **Authentication** system

### Development Tools
- **ESLint** for code linting
- **Prettier** for code formatting
- **GitHub Actions** for CI/CD
- **Codespaces** for cloud development

## 🏗️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development
```bash
# Clone the repository
git clone https://github.com/NISHANT-GUPTA123/mega-mart-smart-grocery.git
cd mega-mart-smart-grocery

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:8080
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 📱 Usage Guide

### 1. Demo Data
- Navigate to **AI Assistant** page
- Scroll to **Demo Data Generator**
- Select timeframe (7/30/90 days)
- Click **"Load Demo Data"** to populate with sample purchases

### 2. Smart Restock
- View predictions in **Smart Restock Suggestions**
- Check **Urgent** tab for items running out soon
- Use **Analytics** tab for detailed insights
- Provide feedback to improve AI accuracy

### 3. Shopping Experience
- Browse products with **trust scores** and **sustainability ratings**
- Use **AI Assistant** for personalized recommendations
- Join **Community Hub** for reviews and discussions
- Track spending with **Smart Budgeting**

## 🎨 Project Structure

```
mega-mart-smart-grocery/
├── 📁 .devcontainer/          # GitHub Codespaces configuration
│   └── devcontainer.json      # Development environment setup
├── 📁 .github/                # GitHub workflows and templates
│   └── workflows/
│       └── ci-cd.yml          # Continuous Integration/Deployment
├── 📁 src/
│   ├── 📁 components/         # React components
│   │   ├── 📄 SmartRestockSuggestions.tsx
│   │   ├── 📄 PurchaseAnalytics.tsx
│   │   ├── 📄 AIAssistantDashboard.tsx
│   │   └── 📁 ui/             # shadcn/ui components
│   ├── 📁 store/              # Zustand state management
│   │   ├── 📄 restockStore.ts # AI predictions & analytics
│   │   ├── 📄 cartStore.ts    # Shopping cart
│   │   └── 📄 productStore.ts # Product catalog
│   ├── 📁 utils/              # Utility functions
│   │   ├── 📄 demoDataUtils.ts # Sample data generation
│   │   └── 📄 demoData.tsx    # Demo UI component
│   └── 📁 types/              # TypeScript definitions
├── 📁 backend/                # Python Flask API (Future)
├── 📄 package.json            # Dependencies and scripts
├── 📄 tailwind.config.ts      # Tailwind CSS configuration
├── 📄 vite.config.ts          # Vite build configuration
└── 📄 README.md               # Project documentation
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Submit** a Pull Request

### Coding Standards
- Use **TypeScript** for type safety
- Follow **ESLint** and **Prettier** configurations
- Write **descriptive commit messages**
- Add **JSDoc comments** for complex functions
- Ensure **responsive design** with Tailwind CSS

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful components
- **Tailwind CSS** for utility-first styling
- **Zustand** for simple state management
- **Vite** for fast development experience
- **GitHub Codespaces** for cloud development

## 📞 Support

- 📧 **Email**: [support@megamart.com](mailto:support@megamart.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/NISHANT-GUPTA123/mega-mart-smart-grocery/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/NISHANT-GUPTA123/mega-mart-smart-grocery/discussions)

---

Made with ❤️ by [Nishant Gupta](https://github.com/NISHANT-GUPTA123)

**Happy Shopping! 🛒✨**
