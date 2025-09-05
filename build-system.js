#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const CONFIG = {
    sourceFiles: {
        css: 'styles.css',
        js: 'script.js',
        html: 'index.html'
    },
    outputDir: '.',
    watch: process.argv.includes('--watch')
};

// Utilities
function log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const colors = {
        info: '\x1b[36m',  // cyan
        success: '\x1b[32m', // green
        error: '\x1b[31m',   // red
        warning: '\x1b[33m'  // yellow
    };
    console.log(`${colors[type]}[${timestamp}] ${message}\x1b[0m`);
}

function generateHash(content) {
    return crypto.createHash('md5').update(content).digest('hex').substring(0, 12);
}

// Safe minifiers
function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ')             // Multiple spaces to single
        .replace(/\s*([{}:;,>+~])\s*/g, '$1') // Remove spaces around operators
        .replace(/;}/g, '}')              // Remove unnecessary semicolons
        .replace(/[^{}]+{\s*}/g, '')      // Remove empty rules
        .trim();
}

function minifyJS(js) {
    return js
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
        .replace(/\/\/[^\r\n]*/g, '')     // Remove line comments (safe)
        .replace(/\s+/g, ' ')             // Multiple spaces to single
        .trim();
}

// Build functions
function buildAssets() {
    log('🚀 Starting build process...');
    
    try {
        // Clean old versioned files
        const files = fs.readdirSync(CONFIG.outputDir);
        files.forEach(file => {
            if (/^(styles|script)\.[a-f0-9]{12}\.(css|js)$/.test(file)) {
                fs.unlinkSync(path.join(CONFIG.outputDir, file));
                log(`🗑️  Removed old file: ${file}`);
            }
        });

        // Build CSS
        const cssContent = fs.readFileSync(CONFIG.sourceFiles.css, 'utf8');
        const minifiedCSS = minifyCSS(cssContent);
        const cssHash = generateHash(minifiedCSS);
        const cssFileName = `styles.${cssHash}.css`;
        
        fs.writeFileSync(cssFileName, minifiedCSS);
        log(`✅ CSS built: ${cssFileName} (${Math.round(minifiedCSS.length/1024)}KB, -${Math.round((1-minifiedCSS.length/cssContent.length)*100)}%)`, 'success');

        // Build JS
        const jsContent = fs.readFileSync(CONFIG.sourceFiles.js, 'utf8');
        const minifiedJS = minifyJS(jsContent);
        const jsHash = generateHash(minifiedJS);
        const jsFileName = `script.${jsHash}.js`;
        
        fs.writeFileSync(jsFileName, minifiedJS);
        log(`✅ JS built: ${jsFileName} (${Math.round(minifiedJS.length/1024)}KB, -${Math.round((1-minifiedJS.length/jsContent.length)*100)}%)`, 'success');

        // Update HTML references
        let htmlContent = fs.readFileSync(CONFIG.sourceFiles.html, 'utf8');
        
        // Update CSS reference
        htmlContent = htmlContent.replace(
            /href="\/styles\.[a-f0-9]{12}\.css"/g,
            `href="/${cssFileName}"`
        );
        
        // Update JS reference  
        htmlContent = htmlContent.replace(
            /src="\/script\.[a-f0-9]{12}\.js"/g,
            `src="/${jsFileName}"`
        );
        
        fs.writeFileSync(CONFIG.sourceFiles.html, htmlContent);
        log(`✅ HTML updated with new asset references`, 'success');

        log(`🎉 Build completed successfully!`, 'success');
        return { cssFileName, jsFileName };
        
    } catch (error) {
        log(`❌ Build failed: ${error.message}`, 'error');
        throw error;
    }
}

// File watcher
function watchFiles() {
    log('👀 Watching files for changes...', 'info');
    
    const filesToWatch = [CONFIG.sourceFiles.css, CONFIG.sourceFiles.js];
    
    filesToWatch.forEach(file => {
        fs.watchFile(file, { interval: 1000 }, (curr, prev) => {
            if (curr.mtime !== prev.mtime) {
                log(`📝 ${file} changed, rebuilding...`, 'warning');
                try {
                    buildAssets();
                } catch (error) {
                    log(`❌ Rebuild failed: ${error.message}`, 'error');
                }
            }
        });
    });
    
    log('✨ Watch mode active. Press Ctrl+C to stop.', 'info');
}

// Main execution
if (require.main === module) {
    try {
        const result = buildAssets();
        
        if (CONFIG.watch) {
            watchFiles();
            // Keep the process running
            process.stdin.resume();
        } else {
            log('📊 Build summary:', 'info');
            log(`   CSS: /${result.cssFileName}`, 'info');
            log(`   JS:  /${result.jsFileName}`, 'info');
            log('💡 Tip: Use "npm run dev" to watch for changes', 'info');
        }
        
    } catch (error) {
        process.exit(1);
    }
}

module.exports = { buildAssets, minifyCSS, minifyJS };