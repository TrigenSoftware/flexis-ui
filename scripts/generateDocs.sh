#!/bin/bash

rm -rf docs
npm run build:storybook
mv storybook-build docs
touch docs/.nojekyll
typedoc ./src --out ./docs/docs --ignoreCompilerErrors --excludeExternals --mode modules
