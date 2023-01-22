import { build } from 'esbuild';
import glob from 'glob';

const entryPoints = glob.sync('src/**/*.ts').filter(file => !file.includes('/types/'));
console.log(entryPoints);

await build({ entryPoints,  format: 'esm', outdir: 'dist', minify: true });
