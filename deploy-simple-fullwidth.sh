#!/bin/bash
# Deploy simplified full-width SEO section

echo "🎯 Deploying simplified full-width SEO section..."

# Show what's being deployed
echo "📊 Updated files:"
ls -la styles.0c54811cab2f.css script.34409f72034d.js

echo ""
echo "✨ Changes applied:"
echo "  ✅ Full-width container for ATLAS section only"
echo "  ✅ Reverted to original subtle colors and design"
echo "  ✅ Kept improved graph size (450px desktop, 280px mobile)"
echo "  ✅ Maintained clean, professional look"
echo "  ✅ Better space utilization for graphs"

# Git operations
echo ""
echo "📦 Staging simplified changes..."
git add .

echo ""
echo "💾 Creating commit..."
git commit -m "style: simplify SEO section with subtle full-width design

- Revert to original color scheme and styling
- Keep only full-width container for better graph visibility  
- Maintain subtle gradient background (#f8f9fa → #e9ecef)
- Preserve improved graph dimensions (450px height)
- Remove excessive visual contrasts
- Clean, professional appearance preserved

🎯 Simple full-width improvement without visual clutter
🚀 Generated with Claude Code"

echo ""
echo "🚀 Pushing to GitHub Pages..."
git push

echo ""
echo "✅ Simplified full-width section deployed!"
echo ""
echo "🎯 What you'll see:"
echo "  📐 ATLAS section extends full browser width"  
echo "  🎨 Original subtle design maintained"
echo "  📈 Graphs have more space but same clean style"
echo "  ✨ Professional, non-intrusive enhancement"
echo ""
echo "⏰ Changes live in 1-2 minutes:"
echo "🔗 https://cyril-wolfangel.com#seo"