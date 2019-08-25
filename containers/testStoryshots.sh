#!/bin/bash

apt-get update
apt-get install -y rsync
rsync -av /project /home/node --exclude node_modules --exclude .git --exclude .awcache
cd /home/node/project
yarn
yarn build:storybook
yarn jest test/storyshots
