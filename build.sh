#!/bin/bash
# Build script for GitHub Pages performance optimization
# This script creates versioned assets for better caching

echo "🚀 Building optimized version for GitHub Pages..."

# Clean previous versioned files
echo "🧹 Cleaning old versioned files..."
rm -f styles.*.css script.*.js

# Generate hashes for current files
echo "🔢 Generating file hashes..."
CSS_HASH=$(md5sum styles.css | cut -d' ' -f1 | cut -c1-12)
JS_HASH=$(md5sum script.js | cut -d' ' -f1 | cut -c1-12)

echo "  styles.css -> styles.${CSS_HASH}.css"
echo "  script.js -> script.${JS_HASH}.js"

# Create versioned files
cp styles.css "styles.${CSS_HASH}.css"
cp script.js "script.${JS_HASH}.js"

# Update references in HTML
echo "🔄 Updating HTML references..."
sed -i.bak \
    -e "s|/styles\.[a-f0-9]*.css|/styles.${CSS_HASH}.css|g" \
    -e "s|/script\.[a-f0-9]*.js|/script.${JS_HASH}.js|g" \
    index.html

# Remove backup
rm index.html.bak

echo "✅ Build complete!"
echo "📊 File sizes:"
echo "  styles.${CSS_HASH}.css: $(du -h styles.${CSS_HASH}.css | cut -f1)"
echo "  script.${JS_HASH}.js: $(du -h script.${JS_HASH}.js | cut -f1)"
echo ""
echo "🔧 Performance improvements applied:"
echo "  ✓ DNS prefetch for external domains"
echo "  ✓ Preconnect for critical resources"
echo "  ✓ File versioning for aggressive caching"
echo "  ✓ Optimized resource loading"
echo ""
echo "📡 Deploy with: git add . && git commit -m 'perf: optimize caching and resource loading' && git push"