var path = require('path');
const webpack = require('webpack');

module.exports = {
   entry: {
      app: ['./src/index.js']
   },
   module: {
      preLoaders: [
      ],
      loaders: [
         {test: /\.svg/, loader: 'svg-url-loader'},
         {test: /.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['es2015']}},
         {
            test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
            exclude: /node_modules/,
            loader: 'url-loader?importLoaders=1&limit=100000'
         },
         {test: /\.(ttf|woff)$|\.eot$/, loader: 'file', query: {name: 'fonts/[name].[ext]'},},
         {test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap']},
         {test: /\.html/, loader: 'html-loader'},
         {test: /\.json$/, loader: 'json'}]
   },
   devtool: 'source-map',
   output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'http://localhost:8080/',
      filename: 'js/[name].js'
   },
   devServer: {
      contentBase: './dist'
   },
   sassLoader: {
      includePaths: [path.resolve(__dirname, './src/scss')]
   },
   resolve: {
      extensions: ['', '.js', '.json', '.scss']
   }
};