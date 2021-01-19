const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');
const slsw = require("serverless-webpack");
const stage = slsw.lib.options.stage;
const isNotProd = stage != "prod";
console.log("packing stage " + stage);

const config = {
	target: "node",
	entry: slsw.lib.entries,
	mode: slsw.lib.webpack.isLocal ? "development" : "production",
	resolve: {
		extensions: [".js", ".json", ".ts", ".tsx"],
		alias: {
			"@": path.join(__dirname, "src")
		}
	},
	watchOptions: {
		aggregateTimeout: 500,
		ignored: ['.webpack/**/*.js', '.serverless/**/*.js', '__tests__']
	},
	optimization: {
		minimize: !slsw.lib.webpack.isLocal,
		minimizer: [
			new TerserPlugin({
				exclude: /node_modules/,
				// parallel: true,
				sourceMap: isNotProd,
				terserOptions: {
					keep_classnames: true
				}
			})
		]
	},
	externals: {
		// Ensure this is not bundled
    'aws-sdk': 'aws-sdk'
  },
	module: {
		rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
		]
	}
};

if (slsw.lib.webpack.isLocal) {
	// config.devtool = 'inline-source-map';
	config.devtool = "cheap-module-eval-source-map";
} else {
	config.devtool = "source-map";
}

module.exports = config;