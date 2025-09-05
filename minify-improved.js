#!/usr/bin/env node

const fs = require('fs');

// Improved JS minifier that preserves string literals
function minifyJS(js) {
    // Step 1: Protect string literals
    const strings = [];
    let stringIndex = 0;
    
    // Replace all string literals with placeholders
    let protectedJs = js.replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, (match) => {
        const placeholder = `__STRING_${stringIndex++}__`;
        strings.push(match);
        return placeholder;
    });
    
    // Step 2: Remove comments (avoiding URL strings)
    protectedJs = protectedJs
        .replace(/\/\/[^\r\n]*/g, '') // Single line comments
        .replace(/\/\*[\s\S]*?\*\//g, ''); // Multi-line comments
    
    // Step 3: Minify whitespace but preserve critical spaces
    protectedJs = protectedJs
        .replace(/\s+/g, ' ') // Multiple spaces to single
        .replace(/\s*([=+\-*/%<>&|!^,;{}()[\]:])\s*/g, '$1') // Remove spaces around operators
        .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
        .trim();
    
    // Step 4: Restore string literals
    strings.forEach((str, index) => {
        protectedJs = protectedJs.replace(`__STRING_${index}__`, str);
    });
    
    return protectedJs;
}

// Improved CSS minifier
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
        // Remove leading/trailing whitespace
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

// Minify JS with improved algorithm
if (fs.existsSync('script.js')) {
    const js = fs.readFileSync('script.js', 'utf8');
    const minified = minifyJS(js);
    const originalSize = Buffer.byteLength(js, 'utf8');
    const minifiedSize = Buffer.byteLength(minified, 'utf8');
    
    fs.writeFileSync('script.min.js', minified);
    console.log(`✅ JS: ${originalSize} → ${minifiedSize} bytes (${Math.round((1 - minifiedSize/originalSize) * 100)}% reduction)`);
}