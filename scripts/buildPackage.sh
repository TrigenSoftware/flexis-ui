#!/bin/bash

rm -rf package
mkdir package
tsc --rootDir src --outDir package
cp -R src/ package/
NODE_ENV=production babel ./package -d ./package -s inline
del 'package/**/*.stories.jsx' 'package/**/*.stories.d.ts' 'package/**/*.stories.d.ts.map'
del 'package/**/*.{ts,tsx,jsx}' '!package/**/*.d.ts'
cp LICENSE package
cp package.json package
cp README.md package
