import { getBabelOutputPlugin } from '@rollup/plugin-babel';
const config = {
  plugins: [getBabelOutputPlugin({
    presets: [['@babel/env', { modules: 'umd' }]],
    plugins: ['@babel/plugin-proposal-class-properties']
  })]
};

export default config;
