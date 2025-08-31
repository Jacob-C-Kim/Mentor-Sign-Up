@echo off
echo 🚀 Setting up Asian Culture Society website locally...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Create new React project
echo 📦 Creating new React project...
call npm create vite@latest asian-culture-society -- --template react-ts

REM Navigate to project directory
cd asian-culture-society

REM Install dependencies
echo 📥 Installing dependencies...
call npm install
call npm install tailwindcss @tailwindcss/typography

REM Create tailwind config
echo ⚙️ Setting up Tailwind CSS...
(
echo /** @type {import('tailwindcss'^).Config} */
echo export default {
echo   content: [
echo     "./index.html",
echo     "./src/**/*.{js,ts,jsx,tsx}",
echo   ],
echo   theme: {
echo     extend: {},
echo   },
echo   plugins: [],
echo }
) > tailwind.config.js

REM Create directory structure
mkdir src\components 2>nul
mkdir src\styles 2>nul
mkdir src\assets 2>nul

echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Copy your App.tsx and components\ to src\
echo 2. Copy styles\globals.css to src\styles\
echo 3. Update the logo import in InteractiveFrame22.tsx
echo 4. Run 'npm run dev' to start the development server
echo.
echo 📁 Project created in: %cd%
pause