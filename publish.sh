
npm run build
npm run build:tailwind
rm -rf public
mkdir public
cp -R ./dist ./public/dist
cp ./readme.md ./public
node create-library-package-json.js
cd public
npm publish --access public
cd ..
