import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { EsbuildPlugin } from "esbuild-loader";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/main.tsx",
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      exportsFields: ["exports"],
      importsFields: ["imports"],
      conditionNames: ["import", "require", "node", "default"],
      plugins:[
        new TsconfigPathsPlugin()
      ]
    },
    output: {
      path: resolve(__dirname, "dist"),
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "esbuild-loader",
            options: {
              target: "es2023",
            },
          },
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(mp3|wav|ogg|flac|aac)$/i,
          type: "asset/resource",
        },
        {
          test: /\.json$/,
          type: "json",
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      new EsbuildPlugin(),
    ],
    devServer: {
      port: 3000,
      static: {
        directory: join(__dirname, "public"),
      },
      compress: true,
      hot: true,
      historyApiFallback: true,
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    devtool: isProduction ? false : "source-map",
  };
};
