# Deployment Guide for VNLI Prototype

## Overview
This guide covers deploying the VMware VNLI prototype to GitHub Pages and other hosting platforms.

## Prerequisites

### Required Tools
- **Git**: Version control
- **Node.js**: >= 16.0.0 (for development)
- **npm**: >= 8.0.0 (for dependencies)
- **GitHub Account**: For hosting

### Optional Tools
- **GitHub CLI**: For easier GitHub operations
- **VS Code**: Recommended editor
- **Live Server**: For local development

## GitHub Pages Deployment

### Method 1: Automatic Deployment (Recommended)

1. **Create GitHub Repository**
   ```bash
   # Initialize git repository
   git init
   
   # Add all files
   git add .
   
   # Initial commit
   git commit -m "Initial commit: VNLI Prototype"
   
   # Add remote origin (replace with your repository URL)
   git remote add origin https://github.com/yourusername/vnli-prototype.git
   
   # Push to main branch
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Select "/ (root)" folder
   - Click Save

3. **Automatic Deployment**
   - The GitHub Actions workflow will automatically deploy
   - Check Actions tab for deployment status
   - Site will be available at: `https://yourusername.github.io/vnli-prototype`

### Method 2: Manual Deployment

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

3. **Verify Deployment**
   - Check the gh-pages branch
   - Visit your GitHub Pages URL

## Local Development

### Quick Start
```bash
# Clone repository
git clone https://github.com/yourusername/vnli-prototype.git
cd vnli-prototype

# Install dependencies
npm install

# Start development server
npm run dev
```

### Alternative Development Servers

#### Python Server
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Node.js Server
```bash
# Using serve package
npx serve . -p 8000

# Using http-server
npx http-server . -p 8000
```

#### PHP Server
```bash
php -S localhost:8000
```

## Environment Configuration

### Development Environment
```bash
# Set development mode
export NODE_ENV=development

# Enable debug logging
export DEBUG=true
```

### Production Environment
```bash
# Set production mode
export NODE_ENV=production

# Disable debug logging
export DEBUG=false
```

## Custom Domain Setup

### 1. Configure Custom Domain
1. Add `CNAME` file to repository root:
   ```
   yourdomain.com
   ```

2. Update GitHub Pages settings:
   - Go to repository Settings > Pages
   - Enter custom domain
   - Enable "Enforce HTTPS"

### 2. DNS Configuration
Add DNS records:
```
Type: CNAME
Name: www
Value: yourusername.github.io

Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

## Performance Optimization

### Build Optimization
```bash
# Minify CSS (if using build process)
npm run build:css

# Minify JavaScript
npm run build:js

# Optimize images
npm run optimize:images
```

### CDN Configuration
```html
<!-- Use CDN for external resources -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Caching Strategy
```html
<!-- Add cache headers -->
<meta http-equiv="Cache-Control" content="public, max-age=31536000">
```

## Security Configuration

### HTTPS Enforcement
```html
<!-- Force HTTPS -->
<meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains">
```

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;">
```

### Security Headers
```html
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-XSS-Protection" content="1; mode=block">
```

## Monitoring and Analytics

### Google Analytics
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Performance Monitoring
```javascript
// Web Vitals monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Troubleshooting

### Common Issues

#### 1. GitHub Pages Not Updating
```bash
# Check deployment status
gh run list

# Re-run deployment
gh run rerun [RUN_ID]
```

#### 2. CSS Not Loading
- Check file paths are correct
- Ensure files are committed to repository
- Verify GitHub Pages is serving from correct branch

#### 3. JavaScript Errors
- Check browser console for errors
- Verify all dependencies are loaded
- Test in different browsers

#### 4. Images Not Displaying
- Check image paths
- Ensure images are committed to repository
- Verify file permissions

### Debug Mode
```javascript
// Enable debug logging
localStorage.setItem('debug', 'true');

// Check console for debug messages
console.log('Debug mode enabled');
```

## Backup and Recovery

### Repository Backup
```bash
# Create backup branch
git checkout -b backup-$(date +%Y%m%d)
git push origin backup-$(date +%Y%m%d)
```

### Local Backup
```bash
# Create archive
tar -czf vnli-prototype-backup-$(date +%Y%m%d).tar.gz .

# Restore from backup
tar -xzf vnli-prototype-backup-YYYYMMDD.tar.gz
```

## Maintenance

### Regular Updates
1. **Dependencies**: Update npm packages monthly
2. **Security**: Check for security vulnerabilities
3. **Performance**: Monitor site performance
4. **Content**: Update content as needed

### Version Control
```bash
# Tag releases
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Create release notes
gh release create v1.0.0 --notes "Initial release of VNLI Prototype"
```

## Support

### Getting Help
- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check this guide and README
- **Community**: VMware community forums

### Contact Information
- **Email**: your-email@vmware.com
- **GitHub**: @yourusername
- **LinkedIn**: Your LinkedIn Profile

## Changelog

### Version 1.0.0
- Initial release
- 8-screen prototype
- Glassmorphic design system
- Responsive design
- GitHub Pages deployment
