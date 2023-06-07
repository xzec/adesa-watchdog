import {
  build,
  context,
} from 'esbuild'
import fg from 'fast-glob'

const options = {
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
      import { createRequire as topLevelCreateRequire } from 'module';
      import { fileURLToPath } from 'url';
      import path from 'path';
      const require = topLevelCreateRequire(import.meta.url);
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      `,
  },
}

if (process.argv[2] === '-w') {
  const ctx = await context(options)
  await ctx.watch()
}
else
  await build(options)
