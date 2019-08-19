#!/bin/bash

set -e

rm -rf package
cp -R src package
tsc --rootDir src --outDir package
del 'package/**/*.{ts,tsx}' '!package/**/*.d.ts'
find package -name "*.js" -exec bash -c 'cp "$1" "${1%.js}".es.js' - '{}' \;
find package -name "*.jsx" -exec bash -c 'cp "$1" "${1%.jsx}".es.js' - '{}' \;
find package -name "*.jsx" -exec bash -c 'mv "$1" "${1%.jsx}".js' - '{}' \;
NODE_ENV=production babel ./package -d ./package -s inline --keep-file-extension
del 'package/**/*.jsx' 'package/stylable/**/*.mjs'
cp LICENSE package
cp package.json package
cp README.md package
