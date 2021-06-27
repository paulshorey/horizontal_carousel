import { getBabelOutputPlugin } from '@rollup/plugin-babel';
const config = {
  plugins: [getBabelOutputPlugin({
    presets: [['@babel/env', { modules: 'umd' }]],
  })]
};

export default config;
