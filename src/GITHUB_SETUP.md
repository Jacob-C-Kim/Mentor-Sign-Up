# How to Push Your Asian Culture Society Website to GitHub

## Prerequisites

1. **Install Git** (if not already installed):
   - Windows: Download from [git-scm.com](https://git-scm.com/)
   - Mac: Install via Homebrew `brew install git` or download from git-scm.com
   - Linux: `sudo apt install git` (Ubuntu/Debian) or `sudo yum install git` (CentOS/RHEL)

2. **Create a GitHub account** at [github.com](https://github.com) if you don't have one

## Step-by-Step Instructions

### 1. Prepare Your Project Files

First, create these essential files for your React project:

**Create `package.json`:**
```json
{
  "name": "asian-culture-society-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@typescript-eslint/eslint-plugin": "^7.2.0",
    "@typescript-eslint/parser": "^7.2.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.2.2",
    "vite": "^5.2.0"
  }
}
```

**Create `vite.config.ts`:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

**Create `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Create `tsconfig.node.json`:**
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### 2. Create a .gitignore File

```gitignore
# Dependencies
node_modules/

# Build outputs
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE/Editor files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/
```

### 3. Initialize Git Repository

Open terminal/command prompt in your project folder and run:

```bash
# Initialize a new Git repository
git init

# Add all files to staging
git add .

# Create your first commit
git commit -m "Initial commit: Asian Culture Society website"
```

### 4. Create Repository on GitHub

1. Go to [github.com](https://github.com)
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository: `asian-culture-society-website`
5. Add description: `Official website for the Asian Culture Society at RIT`
6. Keep it Public (or Private if you prefer)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

### 5. Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/asian-culture-society-website.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 6. Organize Your Project Structure

Move your files into the correct structure for a React project:

```
your-project/
├── public/
│   └── vite.svg (optional)
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── components/
│   │   ├── EventsSection.tsx
│   │   ├── Footer.tsx
│   │   ├── InteractiveFrame22.tsx
│   │   └── figma/
│   │       └── ImageWithFallback.tsx
│   ├── styles/
│   │   └── globals.css
│   └── imports/
│       ├── svg-61ju42v1aq.ts
│       └── svg-onqcmwzw98.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── .gitignore
└── README.md
```

**Create `src/main.tsx`:**
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 7. Update Your Component Imports

After restructuring, update your imports in `src/App.tsx`:

```typescript
import InteractiveFrame22 from "./components/InteractiveFrame22";
import EventsSection from "./components/EventsSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <InteractiveFrame22 />
      <EventsSection />
      <Footer />
    </div>
  );
}
```

### 8. Handle Figma Assets

Since Figma assets won't work outside of Figma Make, you'll need to:

1. **Replace Figma asset imports** with placeholder images or actual images:

```typescript
// Instead of:
// import imgTransparentLogo11 from "figma:asset/cf24fa2e75050490ba08976eeb14a37355b03c67.png";

// Use:
const imgTransparentLogo11 = "https://via.placeholder.com/61x61/cccccc/000000?text=LOGO";
// Or save your actual logo in public/ folder and use:
// const imgTransparentLogo11 = "/logo.png";
```

### 9. Commit and Push Changes

```bash
# Add all changes
git add .

# Commit changes
git commit -m "Project restructure and setup for React development"

# Push to GitHub
git push origin main
```

### 10. Deploy Your Website (Optional)

You can deploy your website for free using:

**Netlify:**
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`

**Vercel:**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect it's a Vite project

**GitHub Pages:**
1. Go to your repository settings
2. Scroll to "Pages" section
3. Select source as "GitHub Actions"
4. Use the Vite deployment action

## Common Git Commands for Future Updates

```bash
# Check status
git status

# Add specific files
git add filename.tsx

# Add all changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main

# Create new branch
git checkout -b feature-branch-name

# Switch branches
git checkout main
```

## Troubleshooting

**If you get authentication errors:**
- Use GitHub's personal access tokens instead of passwords
- Or set up SSH keys for easier authentication

**If git push fails:**
- Make sure you're in the correct directory
- Check that the remote URL is correct: `git remote -v`
- Try `git pull origin main` first, then push

**File too large errors:**
- Add large files to `.gitignore`
- Use Git LFS for large assets if needed

---

Your Asian Culture Society website will now be available on GitHub and ready for collaboration or deployment!