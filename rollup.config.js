import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
export default {
  input: './src/index.ts',
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNext',
        },
      },
    }),
    terser(),
  ],
  output: [
    {
      name: 'PicGo_I18n',
      format: 'umd',
      file: 'dist/i18n_umd.js',
      sourcemap: false,
    },
  ],
};
