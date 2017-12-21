const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const alias = {
  'project-components': path.resolve('./components-lib'),
  'project-services': path.resolve('./services')
}
module.exports = env => {
  let outputJSCK = './dist/[id].bundle.js'
  let outputCSS = './dist/main.bundle.css'
  let outputJS = './dist/main.bundle.js'
  let devtool = 'source-map'
  if (env === 'production-p') {
    outputJSCK = './dist/[id].bundle.min.js'
    outputCSS = './dist/main.bundle.min.css'
    outputJS = './dist/main.bundle.min.js'
    devtool = false
  }
  return ({
    entry: './app/main.js',
    output: {
      chunkFilename: outputJSCK,
      filename: outputJS
    },
    devtool: devtool,
    module: {
      rules: [
        {
          test: /\.(js|jsx?)$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['env', {'modules': false}], 'stage-0', 'react']
              }
            }
          ]
        },
        {
          test: /\.styl$/,
          use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'stylus-loader']
          }))
        },
        {
          test: /\.css/,
          use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          }))
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
    plugins: [
      new ExtractTextPlugin(outputCSS)
    ],
    resolve: {
      alias: alias
    }
  })
}
