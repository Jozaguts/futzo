#!/usr/bin/env sh
if [ -f .env.prod ]; then
    export $(cat .env.prod | grep -v '^#' | xargs)
fi

set -e
npm run build
cp ecosystem.config.cjs .output/
cd .output/

git init
git add -A
git commit -m 'deploy'

git push -f https://$GITHUB_TOKEN@github.com/Jozaguts/futzo.git master:web

cd -
rm -rf /.output