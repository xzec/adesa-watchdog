import { build } from 'esbuild'
import fg from 'fast-glob'

await build({
  entryPoints: await fg('src/**/*.ts'),
  platform: 'node',
  target: 'node18',
  format: 'esm',
  outdir: './dist',
  logLevel: 'info',
  bundle: true,
  minify: true,
  sourcemap: false,
  keepNames: true,
  treeShaking: true,
  banner: {
    js: `
      import path from 'path';
      import { fileURLToPath } from 'url';
      import { createRequire as topLevelCreateRequire } from 'module';
      const require = topLevelCreateRequire(import.meta.url);
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      `,
  },
})
