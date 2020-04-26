import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
export default {
  input: './src/index.ts',
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNext'
        }
      }
    }),
    terser()
  ],
  output: [{
    format: 'cjs',
    file: 'dist/index.js',
    sourcemap: false
  }]
}
