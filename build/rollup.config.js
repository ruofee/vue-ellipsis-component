import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import { name as packageName } from '../package.json';

const input = 'packages/index.ts';
const globals = {
  vue: 'Vue',
};
const external = Object.keys(globals);
const plugins = [
  nodeResolve(),
  vue(),
  typescript(),
  babel({
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
    extensions: ['.js', '.ts'],
    presets: ['@babel/preset-env'],
  }),
  commonjs(),
  postcss({
    extensions: ['.css'],
    extract: false,
  }),
  terser(),
];

export default [{
  input,
  output: {
    file: `lib/${packageName}.js`,
    name: packageName,
    format: 'umd',
    globals,
    exports: 'named',
  },
  external,
  plugins,
  onwarn: warning => {
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    console.error(warning.message);
  },
}, {
  input,
  output: {
    file: `lib/${packageName}.esm.js`,
    name: packageName,
    format: 'es',
    globals,
    exports: 'named',
  },
  external,
  plugins,
  onwarn: warning => {
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    console.error(warning.message);
  },
}];
