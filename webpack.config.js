const TerserPlugin = require("terser-webpack-plugin");
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
		// alias: {
			// "~": path.join(__dirname, "src")
		// }
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
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				use: [
					{
						loader: "ts-loader"
					}
				]
			}
		]
	}
};

if (slsw.lib.webpack.isLocal) {
	// config.devtool = 'inline-source-map';
	config.devtool = "cheap-module-eval-source-map";
} else {
	
}

module.exports = config;