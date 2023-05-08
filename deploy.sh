#!/usr/bin/env sh

# abort on errors
set -e
cp ecosystem.config.js .output/
cd .output/


git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/Jozaguts/futzo.git master:web

cd -
rm -rf /output
