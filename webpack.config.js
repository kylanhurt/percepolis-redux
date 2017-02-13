const webpack = require('webpack');  
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {  
  context: __dirname,
  entry: './src/index.js',
  devtool: 'eval-source-map',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    devtoolLineToLine: true    
  },
  module: {
    rules: [{
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'        
      }]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env':{ 'NODE_ENV': JSON.stringify('production') } }),
    //new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: {comments: false },
      mangle: false,
      sourceMap: true,
      minimize: true,
      mangle: { except: ['$super', '$', 'exports', 'require', '$q', '$ocLazyLoad'] }
    })    
  ]
};

module.exports = config;
