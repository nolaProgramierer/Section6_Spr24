const path = require('path');

module.exports = {
  // Set location of the source JS file and where the bundled output will be
    entry: './piano_inventory/front_end/piano_inventory/index.js',
    output: {
        filename: 'indexBundle.js',
        path: path.resolve(__dirname, './piano_inventory/static/piano_inventory'),
    },
    module: {
      // Use Babel's 'env' and 'react' presets to compile files that aren't in node_modules
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
          },
        ]
      }  
}