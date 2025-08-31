# Asian Culture Society Website - HTML/CSS/JavaScript Version

This is the standalone HTML/CSS/JavaScript version of your Asian Culture Society website, converted from the original React/Tailwind implementation.

## Files Included

- `index.html` - Main HTML structure
- `styles.css` - All styling (converted from Tailwind)
- `script.js` - Interactive functionality (converted from React)
- `README.md` - This instruction file

## Setup Instructions

1. **Download all files** to a folder on your computer
2. **Replace the placeholder logo** in `index.html`:
   - Line 26 has a placeholder image URL
   - Replace `https://via.placeholder.com/61x61/cccccc/000000?text=LOGO` with your actual logo URL
   - Or save your logo as `logo.png` in the same folder and change the src to `"logo.png"`

## Local Development

To view the website locally:

1. Open `index.html` in any modern web browser
2. Or use a local server (recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
3. Navigate to `http://localhost:8000` in your browser

## Deployment Options

### 1. Static Hosting (Recommended)
Upload all files to any static hosting service:
- **Netlify**: Drag and drop the folder to netlify.com/drop
- **Vercel**: Connect to a GitHub repo or drag and drop
- **GitHub Pages**: Push to a GitHub repo and enable Pages
- **Surge.sh**: Use `surge` command line tool

### 2. Traditional Web Hosting
Upload files via FTP to any web hosting provider:
- cPanel hosting
- Shared hosting providers
- Your own server

### 3. CDN/Cloud Storage
Upload to cloud storage with static hosting:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps

## Customization

### Colors
To change the color scheme, modify the CSS variables in `styles.css`:
- Button colors: `.events-button` background-color and hover states
- Text colors: Update color properties in various classes
- Hover effects: Modify `:hover` pseudo-classes

### Content
- Update text in `index.html`
- Add more navigation items by duplicating `.nav-item` elements
- Modify the description in the `.description` section

### Functionality
- Add more interactive features in `script.js`
- Implement actual page routing by adding content sections
- Connect to APIs or forms as needed

## Browser Support

This website supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance

The website is optimized for performance:
- Minimal CSS and JavaScript
- Responsive design
- Fast loading times
- No external dependencies except Google Fonts

## Next Steps

Consider adding:
- Individual pages for each navigation section
- Contact forms
- Event listings with dynamic content
- Image galleries
- Social media integration
- Analytics tracking

## Fonts

The website uses Google Fonts (Lexend). If you need to work offline or want faster loading:
1. Download the font files
2. Update the `@font-face` declarations in `styles.css`
3. Remove the Google Fonts link from `index.html`

---

For any questions or issues, refer to the original React implementation or web development documentation.