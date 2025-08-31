# Running Your Asian Culture Society Website Locally

You have two versions of your website that you can run locally:

## Option 1: React Version (Current - Recommended)

This is your current React/Tailwind implementation in Figma Make.

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup Steps

1. **Create a new React project with Vite:**
   ```bash
   npm create vite@latest asian-culture-society -- --template react-ts
   cd asian-culture-society
   npm install
   ```

2. **Install required dependencies:**
   ```bash
   npm install tailwindcss @tailwindcss/typography
   npm install -D @types/react @types/react-dom
   ```

3. **Setup Tailwind CSS:**
   
   Create `tailwind.config.js`:
   ```javascript
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
   ```

4. **Copy your files:**
   - Copy `App.tsx` to `src/App.tsx`
   - Copy `components/` folder to `src/components/`
   - Copy `styles/globals.css` to `src/styles/globals.css`
   - Copy the logo image file (if available) to `src/assets/`

5. **Update the main.tsx file:**
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

6. **Handle the Figma asset import:**
   
   In `src/components/InteractiveFrame22.tsx`, replace:
   ```typescript
   import imgTransparentLogo11 from "figma:asset/cf24fa2e75050490ba08976eeb14a37355b03c67.png";
   ```
   
   With:
   ```typescript
   // Option A: Use a placeholder
   const imgTransparentLogo11 = "https://via.placeholder.com/61x61/cccccc/000000?text=LOGO";
   
   // Option B: Use a local image (if you have the logo file)
   // import imgTransparentLogo11 from "../assets/logo.png";
   ```

7. **Run the development server:**
   ```bash
   npm run dev
   ```

8. **Open your browser:**
   Go to `http://localhost:5173` (or the URL shown in terminal)

---

## Option 2: Standalone HTML Version (Simple)

This uses the HTML/CSS/JS files I created earlier.

### Quick Start (No Installation Required)

1. **Use the existing files in your project:**
   - `index.html`
   - `styles.css` 
   - `script.js`

2. **Run locally:**
   
   **Method A - Double-click:**
   Simply double-click `index.html` to open in your browser
   
   **Method B - Local server (recommended):**
   ```bash
   # If you have Python installed
   python -m http.server 8000
   
   # If you have Node.js installed
   npx serve .
   
   # If you have PHP installed
   php -S localhost:8000
   ```

3. **Open your browser:**
   Go to `http://localhost:8000` (or just open the HTML file directly)

### Customize the HTML Version

1. **Replace the placeholder logo:**
   In `index.html`, line 26, replace:
   ```html
   <img src="https://via.placeholder.com/61x61/cccccc/000000?text=LOGO" alt="Asian Culture Society Logo" class="logo-image">
   ```
   
   With your actual logo:
   ```html
   <img src="path/to/your/logo.png" alt="Asian Culture Society Logo" class="logo-image">
   ```

2. **Modify content:**
   Edit the text directly in `index.html`

3. **Change styling:**
   Edit `styles.css` to customize colors, fonts, or layout

---

## Which Option Should You Choose?

### Choose React Version (Option 1) if:
- You want to continue developing with modern tools
- You plan to add more interactive features
- You want to integrate with APIs or backend services
- You're comfortable with React development

### Choose HTML Version (Option 2) if:
- You want something simple and quick
- You don't need complex interactivity
- You want to deploy to basic web hosting
- You prefer working with traditional web technologies

---

## Troubleshooting

### React Version Issues:
- **Import errors:** Make sure all file paths are correct relative to `src/`
- **Tailwind not working:** Ensure `globals.css` is imported in `main.tsx`
- **Logo not showing:** Replace the Figma asset import with a local image or placeholder

### HTML Version Issues:
- **Fonts not loading:** Check internet connection (uses Google Fonts)
- **Logo not showing:** Update the image path in `index.html`
- **Styling issues:** Ensure all CSS files are in the same directory

---

## Next Steps

Once you have it running locally, you can:
- Add more pages/sections
- Implement real navigation between pages  
- Add contact forms or event listings
- Deploy to hosting services like Netlify, Vercel, or traditional web hosting