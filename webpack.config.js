const webpack = require("webpack");
const dotenv = require("dotenv");
const fs = require("fs"); // to check if the file exists
const path = require("path");

module.exports = (env) => {
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname);

  // Create the fallback path (the production .env)
  const basePath = currentPath + "/icast/.env";

  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + "." + env.ENVIRONMENT;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    entry: "./icast/frontend/src/index.js",
    output: {
      path: path.resolve(__dirname, "icast/frontend/static"),
      filename: "main.js",
      //publicPath: './licensepivot/frontend/static/'
    },
    plugins: [new webpack.DefinePlugin(envKeys)],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(ttf|eot|svg)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "[hash].[ext]",
              outputPath: "./css/fonts/",
              publicPath: "static/css/fonts/",
            },
          },
        },
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: "url-loader",
            options: {
              name: "[hash].[ext]",
              outputPath: "./css/fonts/",
              publicPath: "static/css/fonts/",
              limit: 5000,
              mimetype: "application/font-woff",
            },
          },
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true, // webpack@2.x and newer
              },
            },
          ],
        }
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".scss"],
    },
  };
};
