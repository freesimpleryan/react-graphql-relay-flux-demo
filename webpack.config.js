module.exports = {
    entry: "./src/app.js",
    output: {
        path: __dirname + "/public/js",
        filename: "bundle.js",
        pathinfo: true
    },
    module: {
      rules: [
          {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                  presets: ["react", "es2015", "stage-0"],
                  plugins: ['babel-relay-plugin-loader']
              }
          }
      ]
    }
};