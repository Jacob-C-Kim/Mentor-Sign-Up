#!/bin/bash

# Quick setup script for React version
echo "🚀 Setting up Asian Culture Society website locally..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Create new React project
echo "📦 Creating new React project..."
npm create vite@latest asian-culture-society -- --template react-ts

# Navigate to project directory
cd asian-culture-society

# Install dependencies
echo "📥 Installing dependencies..."
npm install
npm install tailwindcss @tailwindcss/typography

# Create tailwind config
echo "⚙️  Setting up Tailwind CSS..."
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# Create directory structure
mkdir -p src/components src/styles src/assets

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy your App.tsx and components/ to src/"
echo "2. Copy styles/globals.css to src/styles/"
echo "3. Update the logo import in InteractiveFrame22.tsx"
echo "4. Run 'npm run dev' to start the development server"
echo ""
echo "📁 Project created in: $(pwd)"