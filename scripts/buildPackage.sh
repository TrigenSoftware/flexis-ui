#!/bin/bash

rm -rf package
cp -R src package
rimraf package/**/*.{ts,tsx}
cp LICENSE package
cp package.json package
tsc
babel ./package -d ./package -s inline
