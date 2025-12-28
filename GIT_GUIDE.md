# Git Commit Guide

This guide helps you create meaningful commits showing development progress.

## Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Project structure"
```

## Suggested Commit History

Follow this sequence to show clear development progress:

### 1. Project Setup
```bash
git add backend/package.json backend/.gitignore backend/.env
git commit -m "feat: Setup backend project with Express and dependencies"
```

### 2. Database Layer
```bash
git add backend/models/db.js backend/data/
git commit -m "feat: Implement JSON database with CRUD operations"
```

### 3. API Routes
```bash
git add backend/routes/articles.js backend/server.js
git commit -m "feat: Create RESTful CRUD APIs for articles"
```

### 4. Web Scraper (Phase 1)
```bash
git add backend/scripts/scraper.js
git commit -m "feat: Implement BeyondChats blog scraper with Puppeteer"
```

### 5. Article Update Script (Phase 2)
```bash
git add backend/scripts/updateArticles.js
git commit -m "feat: Add Google search and article scraping for references"

git commit -m "feat: Integrate OpenAI API for article rewriting"

git commit -m "feat: Complete Phase 2 - AI-powered article enhancement"
```

### 6. Frontend Setup (Phase 3)
```bash
git add frontend/package.json frontend/public/ frontend/src/index.js frontend/src/index.css
git commit -m "feat: Initialize React frontend application"
```

### 7. UI Components
```bash
git add frontend/src/App.js frontend/src/App.css
git commit -m "feat: Create article display UI with responsive design"

git commit -m "feat: Add filter toggles for original/updated articles"

git commit -m "feat: Implement read more/less functionality"
```

### 8. Documentation
```bash
git add README.md SETUP.md
git commit -m "docs: Add comprehensive README with architecture diagram"

git commit -m "docs: Add quick setup guide and troubleshooting"
```

### 9. Final Touches
```bash
git add .
git commit -m "chore: Final refinements and testing"
```

## Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `beyondchats-assignment`
3. Make it public
4. Don't initialize with README (we already have one)

## Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/beyondchats-assignment.git
git branch -M main
git push -u origin main
```

## Quick Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline

# View diff
git diff

# Amend last commit
git commit --amend -m "New message"

# Create branch
git checkout -b feature-name

# Push all commits
git push origin main
```

## Branch Strategy (Optional)

For better organization:

```bash
# Create feature branches
git checkout -b phase-1-scraper
git checkout -b phase-2-ai-enhancement
git checkout -b phase-3-frontend

# Merge to main
git checkout main
git merge phase-1-scraper
```

## Commit Message Convention

Format: `type: description`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, no code change
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

Examples:
```
feat: Add article scraping functionality
fix: Resolve CORS issue in API
docs: Update setup instructions
refactor: Simplify database queries
```

## Show Development Progress

To demonstrate your development process, make commits as you build:

1. Commit after each major feature
2. Write descriptive commit messages
3. Don't commit everything at once
4. Show problem-solving through commits
5. Document changes in commit messages

## Example Complete History

```
1. Initial commit: Project structure
2. feat: Setup backend with Express server
3. feat: Implement JSON database operations
4. feat: Create CRUD API endpoints
5. feat: Add web scraper for BeyondChats
6. feat: Implement Google search integration
7. feat: Add reference article scraping
8. feat: Integrate OpenAI for article rewriting
9. feat: Initialize React frontend
10. feat: Create article display components
11. feat: Add responsive UI styling
12. feat: Implement filter functionality
13. docs: Add comprehensive documentation
14. fix: Resolve API connection issues
15. chore: Final testing and cleanup
```

This shows a clear development journey!
