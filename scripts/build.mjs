import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const assetPath = './assets';

mkdirSync('dist/assets', { recursive: true });
copyFileSync('src/styles.css', 'dist/assets/styles.css');

const html = readFileSync('index.html', 'utf8')
  .replace('<script type="module" src="/src/main.tsx"></script>', `<script type="module" src="${assetPath}/main.js"></script>`)
  .replace('<script type="module" src="/src/main.ts"></script>', `<script type="module" src="${assetPath}/main.js"></script>`)
  .replace('</head>', `  <link rel="stylesheet" href="${assetPath}/styles.css" />\n  </head>`);

writeFileSync('dist/index.html', html);
writeFileSync('dist/.nojekyll', '');
rmSync('dist/assets/styles.css.map', { force: true });
console.log('Build generado en dist/.');
