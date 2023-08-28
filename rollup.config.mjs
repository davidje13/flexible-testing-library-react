import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'build/index.js',
      format: 'cjs', // TODO: switch to esm / mjs
    },
    external: [/node_modules/],
    plugins: [
      nodeResolve(),
      typescript({
        declaration: true,
        declarationDir: 'build',
        include: ['src/**'],
      }),
    ],
  },
  {
    input: 'src/extend-expect/index.ts',
    output: {
      file: 'extend-expect/index.js',
      format: 'cjs', // TODO: switch to esm / mjs
    },
    external: [/node_modules/],
    plugins: [nodeResolve(), typescript()],
  },
];
