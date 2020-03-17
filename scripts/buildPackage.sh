#!/bin/bash

# Enable errors checking
set -e

# Prepare directory
rm -rf package
cp -R src package

# Compile TS to JS
tsc --rootDir src --outDir package
del 'package/**/*.{ts,tsx}' '!package/**/*.d.ts'

# Copy sources for ES modules
find package -name "*.js" -exec bash -c 'cp "$1" "${1%.js}".es.js' - '{}' \;
find package -name "*.jsx" -exec bash -c 'cp "$1" "${1%.jsx}".es.js' - '{}' \;

# Copy sources for Babel modules
find package -name "*.es.js" -exec bash -c 'cp "$1" "${1%.es.js}".babel.js' - '{}' \;

# Rename .jsx to .js
find package -name "*.jsx" -exec bash -c 'mv "$1" "${1%.jsx}".js' - '{}' \;

# Transpile JS
NODE_ENV=production babel ./package -d ./package -s inline --keep-file-extension
del 'package/**/*.jsx' 'package/stylable/**/*.{es,babel}.js'

# Copy package files
cp LICENSE package
cp package.json package
cp README.md package
