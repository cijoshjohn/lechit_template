import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import dts from 'vite-plugin-dts';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';

// https://vitejs.dev/config/
// https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma

/**
 * The name of the package. This is what consuming apps will import.
 * Changes to the package name should also be made in:
 * - `package.json`
 * - `tsconfig.app.json`
 */
const packageName = '@ods/cucumber';

/**
 * List of submodules paths which have their own index.js.
 * When adding/removing submodules, remember to also add/remove entries from:
 * - `tsconfig.app.json` under 'compilerOptions.paths'.
 * - `package.json` under 'exports'.
 */
const subModules = ['assets', 'components'];

/**
 * If true, rolls up all generated JS files into one index.js file per module.
 */
const minimalBundle = true;

export default defineConfig({
  resolve: {
    // Alias to point library imports to its original source under './lib' instead of its compiled output under './dist'.
    // This allows Vite's hot-module-reload to work.
    alias: {
      packageName: path.resolve(__dirname, 'lib'),
      ...Object.fromEntries(subModules.map((s) => [`${packageName}/${s}`, path.resolve(__dirname, `lib/${s}`)])),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'), // Primary entry point.
      formats: ['es'],
    },
    rollupOptions: {
      // Packages and imports to externalise and exclude from being bundled into this library code.
      external: [
        'react',
        'react/jsx-runtime',
        /^react-.*/,
        /^@types\/.*/,
        /^@mui.*/,
        /^@emotion.*/,
        /^material-ui-popup-state.*/,
        'deepmerge-ts',
      ],
      input: getEntryPoints(),
      output: {
        preserveModules: !minimalBundle,
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
        chunkFileNames: 'chunks/chunk-[hash].js',
        globals: {
          react: 'React',
        },
      },
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({ svgrOptions: {} }),
    dts({
      tsconfigPath: path.resolve(__dirname, 'tsconfig.lib.json'),
      staticImport: true,
      // .d.ts rollup cannot be used with multiple-entry point libraries.
      // This is a limitation of api-extractor used by vite-plugin-dts.
      // https://api-extractor.com/pages/overview/demo_rollup/
      rollupTypes: false,
    }),
  ],
  server: {
    port: 3000,
  },
});

/**
 * When building a minimal bundle, the only entry points are the index files in each module.
 * Otherwise, we can treat all .ts and .tsx files as entry points, and each will get their own generated .js file.
 */
function getEntryPoints() {
  if (minimalBundle) {
    return {
      index: 'lib/index.ts',
      // submoduleA/index becomes lib/submoduleA/index.ts
      ...Object.fromEntries(subModules.map((s) => [`${s}/index`, `lib/${s}/index.ts`])),
    };
  }

  return Object.fromEntries(
    glob
      .sync('lib/**/*.{ts,tsx}', {
        ignore: ['lib/**/*.d.ts'],
      })
      .map((file) => [
        // The name of the entry point
        // lib/nested/foo.ts becomes nested/foo
        path.relative('lib', file.slice(0, file.length - path.extname(file).length)),
        // The absolute path to the entry file
        // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
        fileURLToPath(new URL(file, import.meta.url)),
      ]),
  );
}
