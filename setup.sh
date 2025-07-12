#!/bin/bash

# 🚀 Mega Mart Smart Grocery Platform Setup Script
# This script sets up the development environment for GitHub Codespaces

echo "🛒 Welcome to Mega Mart Smart Grocery Platform!"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📦 Installing Node.js dependencies...${NC}"
npm install

echo -e "${BLUE}🔧 Setting up development environment...${NC}"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Creating environment configuration...${NC}"
    cat > .env << EOL
# Mega Mart Environment Configuration
VITE_APP_NAME="Mega Mart Smart Grocery"
VITE_APP_VERSION="1.0.0"
VITE_API_URL="http://localhost:5000"
VITE_ENVIRONMENT="development"

# AI Features
VITE_ENABLE_AI_PREDICTIONS=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEMO_DATA=true

# Backend Configuration (Future)
# FLASK_ENV=development
# DATABASE_URL=sqlite:///megamart.db
# SECRET_KEY=your-secret-key-here
EOL
    echo -e "${GREEN}✅ Environment file created!${NC}"
else
    echo -e "${GREEN}✅ Environment file already exists!${NC}"
fi

# Check if Python backend exists and set it up
if [ -d "backend" ]; then
    echo -e "${BLUE}🐍 Setting up Python backend...${NC}"
    cd backend
    
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        python3 -m venv venv
        echo -e "${GREEN}✅ Python virtual environment created!${NC}"
    fi
    
    # Activate virtual environment and install dependencies
    source venv/bin/activate
    pip install -r requirements.txt
    echo -e "${GREEN}✅ Python dependencies installed!${NC}"
    
    cd ..
fi

echo -e "${BLUE}🧪 Running quick health check...${NC}"

# Check if npm build works
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend build successful!${NC}"
else
    echo -e "${RED}❌ Frontend build failed. Please check dependencies.${NC}"
fi

# Check if TypeScript compiles
if npm run type-check > /dev/null 2>&1; then
    echo -e "${GREEN}✅ TypeScript compilation successful!${NC}"
else
    echo -e "${YELLOW}⚠️  TypeScript check had warnings. Please review.${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "=================================================="
echo -e "${BLUE}🚀 Quick Start Commands:${NC}"
echo "  npm run dev          # Start development server"
echo "  npm run build        # Build for production"
echo "  npm run preview      # Preview production build"
echo "  npm run lint         # Run linting"
echo ""
echo -e "${BLUE}📍 Development URLs:${NC}"
echo "  Frontend: http://localhost:8080"
echo "  Backend:  http://localhost:5000 (when available)"
echo ""
echo -e "${BLUE}🛠️  Useful Commands:${NC}"
echo "  code .               # Open in VS Code"
echo "  git status           # Check git status"
echo "  npm run type-check   # Check TypeScript"
echo ""
echo -e "${YELLOW}💡 Tip: Navigate to AI Assistant page and load demo data to test Smart Restock features!${NC}"
echo ""
echo -e "${GREEN}Happy coding! 🛒✨${NC}"
