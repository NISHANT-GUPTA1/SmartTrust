# 🚀 GitHub Repository Setup Script for Windows
# Run this in PowerShell to create your GitHub repository and Codespace

Write-Host "🛒 Mega Mart GitHub Setup" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Green

# Check if GitHub CLI is installed
if (Get-Command gh -ErrorAction SilentlyContinue) {
    Write-Host "✅ GitHub CLI found!" -ForegroundColor Green
    
    # Login check
    $authStatus = gh auth status 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Already logged in to GitHub!" -ForegroundColor Green
    } else {
        Write-Host "🔐 Please login to GitHub..." -ForegroundColor Yellow
        gh auth login
    }
    
    # Create repository
    Write-Host "📁 Creating GitHub repository..." -ForegroundColor Blue
    gh repo create mega-mart-smart-grocery --public --description "🛒 AI-powered smart grocery platform with restock predictions and consumption analytics"
    
    if ($LASTEXITCODE -eq 0) {
        # Set remote and push
        Write-Host "🌐 Setting up remote origin..." -ForegroundColor Blue
        git remote add origin https://github.com/NISHANT-GUPTA123/mega-mart-smart-grocery.git
        
        Write-Host "📤 Pushing code to GitHub..." -ForegroundColor Blue
        git push -u origin master:main
        
        Write-Host "🎉 Repository created successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🌐 Repository URL: https://github.com/NISHANT-GUPTA123/mega-mart-smart-grocery" -ForegroundColor Cyan
        Write-Host "🚀 Codespace URL: https://codespaces.new/NISHANT-GUPTA123/mega-mart-smart-grocery" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "1. Visit your repository on GitHub" -ForegroundColor White
        Write-Host "2. Click the green 'Code' button" -ForegroundColor White
        Write-Host "3. Select 'Codespaces' tab" -ForegroundColor White
        Write-Host "4. Click 'Create codespace on main'" -ForegroundColor White
    } else {
        Write-Host "❌ Failed to create repository. It might already exist." -ForegroundColor Red
        Write-Host "Trying to add remote and push..." -ForegroundColor Yellow
        
        git remote add origin https://github.com/NISHANT-GUPTA123/mega-mart-smart-grocery.git 2>$null
        git push -u origin master:main
    }
    
} else {
    Write-Host "❌ GitHub CLI not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Option 1: Install GitHub CLI" -ForegroundColor Yellow
    Write-Host "winget install GitHub.cli" -ForegroundColor White
    Write-Host "Then run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Manual Setup" -ForegroundColor Yellow
    Write-Host "1. Go to https://github.com/new" -ForegroundColor White
    Write-Host "2. Repository name: mega-mart-smart-grocery" -ForegroundColor White
    Write-Host "3. Description: 🛒 AI-powered smart grocery platform" -ForegroundColor White
    Write-Host "4. Set to Public" -ForegroundColor White
    Write-Host "5. Don't initialize with README" -ForegroundColor White
    Write-Host "6. Create repository" -ForegroundColor White
    Write-Host ""
    Write-Host "Then run these commands:" -ForegroundColor Yellow
    Write-Host "git remote add origin https://github.com/NISHANT-GUPTA123/mega-mart-smart-grocery.git" -ForegroundColor White
    Write-Host "git push -u origin master:main" -ForegroundColor White
}

Write-Host ""
Write-Host "🎯 After repository is created, access your Codespace at:" -ForegroundColor Green
Write-Host "https://codespaces.new/NISHANT-GUPTA123/mega-mart-smart-grocery" -ForegroundColor Cyan
