#!/bin/bash
# Check if deployment is working

echo "🔍 Checking deployment status..."
echo ""

echo "📡 Testing JS file availability..."
if curl -s -I "https://cyril-wolfangel.com/script.34409f72034d.js" | grep -q "200 OK"; then
    echo "✅ script.34409f72034d.js - Available"
else 
    echo "❌ script.34409f72034d.js - Not found (may take 1-2 minutes)"
fi

echo ""
echo "📡 Testing CSS file availability..."
if curl -s -I "https://cyril-wolfangel.com/styles.4f24bb2a3035.css" | grep -q "200 OK"; then
    echo "✅ styles.4f24bb2a3035.css - Available"
else 
    echo "❌ styles.4f24bb2a3035.css - Not found (may take 1-2 minutes)"
fi

echo ""
echo "📊 File sizes deployed:"
echo "  Local script.34409f72034d.js: $(du -h script.34409f72034d.js | cut -f1)"
echo "  Local styles.4f24bb2a3035.css: $(du -h styles.4f24bb2a3035.css | cut -f1)"

echo ""
echo "⏰ GitHub Pages typically takes 1-5 minutes to update"
echo "🔗 Test your site: https://cyril-wolfangel.com"
echo ""
echo "🎯 What should be working:"
echo "  ✅ Sticky menu appears when scrolling down"
echo "  ✅ Avatar chatbot icon in bottom right"
echo "  ✅ No JS console errors"
echo "  ✅ All animations and interactions"