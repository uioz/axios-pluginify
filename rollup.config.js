import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: './src/index.ts',
    plugins: [
      typescript({
        lib: ['es5'],
        target: 'es5',
      }),
    ],
    output: {
      format: 'umd',
      name: 'AxiosPluginify',
      file: 'dist/axios-pluginify.js',
      sourcemap: true,
    },
  },
  {
    input: './src/index.ts',
    plugins: [typescript()],
    output: [
      {
        format: 'cjs',
        file: 'dist/axios-pluginify.cjs.js',
        sourcemap: true,
      },
      {
        format: 'es',
        file: 'dist/axios-pluginify.esm.js',
        sourcemap: true,
      },
    ],
  },
];
