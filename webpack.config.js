const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'client', 'src', 'index.jsx'),
    output: {
        filename: 'bundle.js',
        path: __dirname + '/client/dist',
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,

          use: {
              loader: "babel-loader",
          }
        }, 
        {
          test: /\.css$/,
          loaders: [
            'style-loader', 'css-loader?sourceMap',
          ],
        }
      ],
    }
}