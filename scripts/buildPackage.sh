#!/bin/bash

rm -rf package
cp -R src package
cp LICENSE package
cp package.json package
babel ./src -d ./package -s inline
