#!/bin/bash
# Quick fix for JS 404 and sticky menu issues

echo "🔧 Quick fix: Deploying corrected files..."

# Show current status
echo "📊 Current files to be deployed:"
ls -la script.34409f72034d.js styles.4f24bb2a3035.css

# Check git status
echo ""
echo "📋 Git status:"
git status --porcelain

# Add all changes
echo ""
echo "📦 Adding files to git..."
git add .

# Create descriptive commit
echo ""
echo "💾 Creating commit..."
git commit -m "fix: resolve JS 404 error and restore sticky menu functionality

- Fix script.34409f72034d.js 404 error by including file in deploy
- Restore sticky navigation functionality with proper minification
- Update HTML references to use optimized assets
- Preserve all interactive features (menu, avatar widget, animations)

🚀 Generated with Claude Code"

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub Pages..."
git push

echo ""
echo "✅ Quick fix deployed!"
echo ""
echo "📈 Expected results in 1-2 minutes:"
echo "  ✅ JS 404 error resolved"
echo "  ✅ Sticky menu working again" 
echo "  ✅ Avatar chatbot functional"
echo "  ✅ All optimizations preserved"
echo ""
echo "🔗 Check your site: https://cyril-wolfangel.com"