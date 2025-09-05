#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple CSS minifier
function minifyCSS(css) {
    return css
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove unnecessary whitespace
        .replace(/\s+/g, ' ')
        // Remove spaces around specific characters
        .replace(/\s*([{}:;,>+~])\s*/g, '$1')
        // Remove trailing semicolon before }
        .replace(/;}/g, '}')
        // Remove empty rules
        .replace(/[^{}]+{\s*}/g, '')
        .trim();
}

// Simple JS minifier (basic)
function minifyJS(js) {
    return js
        // Remove single-line comments (but preserve URLs)
        .replace(/\/\/(?![^\r\n]*https?:)[^\r\n]*/g, '')
        // Remove multi-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove unnecessary whitespace
        .replace(/\s+/g, ' ')
        // Remove spaces around operators and punctuation
        .replace(/\s*([=+\-*/%<>&|!^,;{}()[\]])\s*/g, '$1')
        .trim();
}

// Minify CSS
if (fs.existsSync('styles.css')) {
    const css = fs.readFileSync('styles.css', 'utf8');
    const minified = minifyCSS(css);
    const originalSize = Buffer.byteLength(css, 'utf8');
    const minifiedSize = Buffer.byteLength(minified, 'utf8');
    
    fs.writeFileSync('styles.min.css', minified);
    console.log(`✅ CSS: ${originalSize} → ${minifiedSize} bytes (${Math.round((1 - minifiedSize/originalSize) * 100)}% reduction)`);
}

// Minify JS
if (fs.existsSync('script.js')) {
    const js = fs.readFileSync('script.js', 'utf8');
    const minified = minifyJS(js);
    const originalSize = Buffer.byteLength(js, 'utf8');
    const minifiedSize = Buffer.byteLength(minified, 'utf8');
    
    fs.writeFileSync('script.min.js', minified);
    console.log(`✅ JS: ${originalSize} → ${minifiedSize} bytes (${Math.round((1 - minifiedSize/originalSize) * 100)}% reduction)`);
}