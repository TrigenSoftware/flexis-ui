#!/bin/bash

# typedoc ./src --out ./docs --excludeExternals --mode modules
rm -rf docs
npm run build:storybook
mv storybook-build docs
touch docs/.nojekyll
