const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    entry: "./src/ts/script.ts",
    output: {
        filename: "js/script.js",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "src/html/index.html",
                    to: "index.html"
                },
                {
                    from: "src/css/style.css",
                    to: "css/style.css"
                }
            ]
        })
    ]
};