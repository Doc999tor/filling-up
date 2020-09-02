const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const alias = {
  'project-components': path.resolve('./components-lib'),
  'project-services': path.resolve('./services')
}
module.exports = {
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: process.env.NODE_ENV ? '[name].chunk.js' : '[name].[contenthash:6].chunk.js',
    filename: process.env.NODE_ENV === 'development' ? 'main.bundle.js' : 'main.[contenthash:6].bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true
            }
          },
          'css-loader', 'stylus-loader']
      },
      {
        test: /\.(img|png|svg)$/,
        use: 'url-loader'
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    stats: {
      version: false,
      modules: false,
      assets: false,
      hash: false
    },
    port: '3000'
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
  },
  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: process.env.NODE_ENV ? '[name].chunk.css' : '[name].[contenthash:6].chunk.css',
      filename: process.env.NODE_ENV === 'development' ? 'main.bundle.css' : 'main.[contenthash:6].bundle.min.css'
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new DynamicCdnWebpackPlugin({ env: 'production' }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: alias
  },
  devtool: 'source-map'
}
