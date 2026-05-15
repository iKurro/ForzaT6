import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

mkdirSync('dist/assets', { recursive: true });
copyFileSync('src/styles.css', 'dist/assets/styles.css');
const html = readFileSync('index.html', 'utf8')
  .replace('<script type="module" src="/src/main.tsx"></script>', '<script type="module" src="/assets/main.js"></script>')
  .replace('<script type="module" src="/src/main.ts"></script>', '<script type="module" src="/assets/main.js"></script>')
  .replace('</head>', '  <link rel="stylesheet" href="/assets/styles.css" />\n  </head>');
writeFileSync('dist/index.html', html);
rmSync('dist/assets/styles.css.map', { force: true });
console.log('Build generado en dist/.');
