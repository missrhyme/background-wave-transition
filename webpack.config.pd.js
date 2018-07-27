const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: [
    './src/dev.tsx'
  ],
  output: {
    path: path.join(__dirname, './'),
    filename: 'bundle.js',
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  //   lodash: '_'
  // },
  plugins: [
    new CleanWebpackPlugin([`${path.join(__dirname, 'dist')}/*.*`]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'html/index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|mp4)$/,
        use: {
          loader: 'url-loader',
          query: {}
        }
      },
      {
        test: /\.woff|\.woff2|.eot|\.ttf/,
        use: {
          loader: 'url-loader',
          query: {}
        }
      }
    ]
  }
};
