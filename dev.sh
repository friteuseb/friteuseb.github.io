#!/bin/bash
# Development helper script

echo "🚀 Cyril Wolfangel Website - Development Tools"
echo ""

case "$1" in
    "build")
        echo "📦 Building optimized assets..."
        npm run build
        ;;
    "watch")
        echo "👀 Starting development mode (auto-rebuild on file changes)..."
        npm run dev
        ;;
    "deploy")
        echo "🚀 Building and deploying to GitHub Pages..."
        npm run deploy
        ;;
    "clean")
        echo "🧹 Cleaning generated files..."
        rm -f styles.*.css script.*.js
        echo "✅ Cleaned generated assets"
        ;;
    "status")
        echo "📊 Current project status:"
        echo ""
        echo "📁 Source files:"
        ls -la styles.css script.js index.html 2>/dev/null | tail -n +2
        echo ""
        echo "⚡ Generated assets:"
        ls -la styles.*.css script.*.js 2>/dev/null | tail -n +2 || echo "   No generated assets found"
        echo ""
        echo "📈 File sizes:"
        if [ -f "styles.css" ]; then
            original_css=$(stat -c%s styles.css)
            echo "   styles.css: $((original_css/1024))KB"
        fi
        if [ -f "script.js" ]; then
            original_js=$(stat -c%s script.js)
            echo "   script.js: $((original_js/1024))KB"
        fi
        
        for file in styles.*.css; do
            if [ -f "$file" ]; then
                size=$(stat -c%s "$file")
                echo "   $file: $((size/1024))KB (minified)"
            fi
        done
        
        for file in script.*.js; do
            if [ -f "$file" ]; then
                size=$(stat -c%s "$file")
                echo "   $file: $((size/1024))KB (minified)"
            fi
        done
        ;;
    *)
        echo "Usage: ./dev.sh [command]"
        echo ""
        echo "Commands:"
        echo "  build   - Build optimized CSS/JS files"
        echo "  watch   - Start development mode (auto-rebuild)"
        echo "  deploy  - Build and deploy to GitHub Pages"
        echo "  clean   - Remove generated files"
        echo "  status  - Show current project status"
        echo ""
        echo "Examples:"
        echo "  ./dev.sh build     # One-time build"
        echo "  ./dev.sh watch     # Development with auto-rebuild"
        echo "  ./dev.sh deploy    # Build and push to GitHub"
        ;;
esac