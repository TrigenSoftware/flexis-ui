#!/bin/bash

rm -rf docs
npm run build:storybook
mv storybook-build docs
touch docs/.nojekyll
trigen-scripts build:docs --out ./docs/docs
