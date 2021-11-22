const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  output: {
    filename: 'scripts/[name]-[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/assets/', to: 'assets/' },
        { from: 'public/css/', to: 'css/' },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /^(?!.*\.spec)src\/.+\.ts/,
        use: {
          loader: 'swc-loader',
          options: {
            sourceMaps: true,
            module: {
              type: 'commonjs',
            },
            jsc: {
              target: 'es2020',
              parser: {
                syntax: 'typescript',
                tsx: false,
                decorators: false,
                dynamicImport: false,
              },
            },
          },
        },
      },
    ],
  },
};
