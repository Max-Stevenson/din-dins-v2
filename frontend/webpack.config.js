module.exports = {
  entry: "./src/App.jsx",
  output: {
    path: `${__dirname}/frontend/public`,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$|jsx/,
        exclude: /node_modules/
      }
    ]
  }
};
