#!/usr/bin/env sh

# abort on errors
set -e
cp ecosystem.config.js .output/
cd .output/


git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/Jozaguts/futzo.git main:web

cd -
rm -rf /output
