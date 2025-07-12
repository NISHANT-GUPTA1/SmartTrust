# 🚀 GitHub Codespace Setup Guide

## Step 1: Create GitHub Repository

### Option A: GitHub CLI (Recommended)
```bash
# Install GitHub CLI if not installed
winget install GitHub.cli

# Login to GitHub
gh auth login

# Create repository
gh repo create mega-mart-smart-grocery --public --description "🛒 AI-powered smart grocery platform with restock predictions and consumption analytics"

# Set remote origin
git remote add origin https://github.com/NISHANT-GUPTA123/mega-mart-smart-grocery.git

# Push code
git push -u origin main
```

### Option B: Manual GitHub Setup
1. Go to [GitHub.com](https://github.com)
2. Click "New Repository" 
3. Repository name: `mega-mart-smart-grocery`
4. Description: `🛒 AI-powered smart grocery platform with restock predictions and consumption analytics`
5. Set to **Public**
6. **Don't** initialize with README (we already have files)
7. Click "Create Repository"

Then run:
```bash
git remote add origin https://github.com/NISHANT-GUPTA123/mega-mart-smart-grocery.git
git push -u origin main
```

## Step 2: Enable Codespaces

### Method 1: From GitHub Repository
1. Go to your repository on GitHub
2. Click green **"Code"** button
3. Click **"Codespaces"** tab
4. Click **"Create codespace on main"**
5. Wait for environment to build (2-3 minutes)

### Method 2: Direct Link
Use this URL (replace username):
```
https://codespaces.new/NISHANT-GUPTA123/mega-mart-smart-grocery?quickstart=1
```

### Method 3: VS Code Extension
1. Install [GitHub Codespaces extension](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces)
2. `Ctrl+Shift+P` → "Codespaces: Create New Codespace"
3. Select your repository

## Step 3: Post-Setup (In Codespace)

Once your Codespace loads:

```bash
# Install dependencies (should auto-run)
npm install

# Start development server
npm run dev

# The app will be available at the forwarded port (usually 8080)
```

## Step 4: Testing the Features

1. **Navigate to AI Assistant page**
2. **Scroll to Demo Data Generator**
3. **Select timeframe and load demo data**
4. **Explore Smart Restock Suggestions**
5. **Check Analytics tab for insights**

## 🎯 Codespace Configuration

Your `.devcontainer/devcontainer.json` includes:

- **Node.js 18** environment
- **VS Code extensions** for React/TypeScript development
- **Port forwarding** for development server
- **Auto-installation** of dependencies
- **Tailwind CSS** IntelliSense

## 🔧 Available Commands in Codespace

```bash
# Development
npm run dev          # Start dev server (port 8080)
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # ESLint checking
npm run type-check   # TypeScript validation

# Setup
chmod +x setup.sh    # Make setup script executable
./setup.sh           # Run full setup script
```

## 🌐 Accessing Your App

- **Development**: `https://<codespace-name>-8080.app.github.dev`
- **Preview**: Port forwarding will be automatically configured
- **Sharing**: You can make ports public for sharing

## 🛠️ Troubleshooting

### If dependencies don't install automatically:
```bash
npm install
```

### If ports aren't forwarded:
1. Go to "Ports" tab in terminal panel
2. Add port 8080
3. Set visibility to public if needed

### If TypeScript errors:
```bash
npm run type-check
```

### If build fails:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 🎉 Success!

You now have a fully functional GitHub Codespace for Mega Mart Smart Grocery Platform!

The environment includes:
- ✅ AI-powered restock predictions
- ✅ Purchase analytics dashboard  
- ✅ Demo data generator
- ✅ Full TypeScript support
- ✅ Tailwind CSS styling
- ✅ Hot module reloading
- ✅ CI/CD pipeline ready
