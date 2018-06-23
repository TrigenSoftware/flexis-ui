#!/bin/bash

rm -rf package
mkdir package
tsc --rootDir src --outDir package
cp -R src/ package/
del 'package/**/*.stories.js' 'package/**/*.stories.d.ts'
del 'package/**/*.{ts,tsx}' '!package/**/*.d.ts'
babel ./package -d ./package -s inline
cp LICENSE package
cp package.json package
