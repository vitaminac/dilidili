const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const {CheckerPlugin} = require("awesome-typescript-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const minify = require("html-minifier").minify;
const md5 = require("blueimp-md5");

const env = process.env.NODE_ENV.toString().toLowerCase();
console.log(env);

const envDetect = (specifier) => (env || false) && !(env.search(specifier) < 0);

const isBuildForProduction = envDetect("production");

const isBuildForDevelopment = envDetect("development");

const isBuildForCommon = envDetect("CommonJS");

const isForNode = envDetect("node");

const isForDesktop = envDetect("electron");

const isForMovil = envDetect("android");

console.log(isBuildForProduction, isBuildForDevelopment, isBuildForCommon, isForNode, isForDesktop, isForMovil);

const appName = "sited";
const projectPath = path.resolve(__dirname);
const srcPath = path.resolve(projectPath, "src");
const distPath = path.join(projectPath, "dist");
const outputPath = path.join(distPath, appName);
const reportPath = path.join(projectPath, "report");
const publicPath = `/static/${appName}/`;
const host = "127.0.0.1";
const filenameTemplate = isBuildForDevelopment ? "[name].js" : "[name].[chunkhash].js";
const sourceMapTemplate = filenameTemplate + ".map";
const deployStaticPath = path.join(projectPath, "../static/");
const deployTemplatesPath = path.join(projectPath, "../templates/");

const vendor = [
    "hoist-non-react-statics",
    "q",
    "cheerio",
    "redux",
    "react-redux",
    "react-router",
    "react-router-dom",
    "react-router-redux",
    "reselect",
    "history",
    "react-dnd",
    "react-dnd-html5-backend",
    "prop-types",
    "blueimp-md5",
    "classnames"
];

const externals = {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery",
    "react": "React",
    "react-dom": "ReactDOM",
    "rxjs": "Rx",
    "immutable": "Immutable"
};

const babelrc = {
    babelrc: false,
    presets: [[
        "env",
        {
            "targets": Object.assign({
                "browsers": [
                    "last 1 Chrome versions",
                    ...isBuildForProduction ? ["ie 6-8"] : []
                ],
                "uglify": isBuildForProduction
            }, isForNode ? {"node": "current"} : {}),
            "debug": true,
            "spec": isBuildForCommon,
            "modules": isBuildForDevelopment ? false : "commonjs"
        }
    ], "react", "stage-1", "stage-2"],
    plugins: [
        "transform-decorators-legacy",
        "transform-class-properties",
        ...isBuildForProduction ? [
            "transform-runtime",
            "transform-react-constant-elements"
        ] : []
    ],
    ignore: []
};

const UglifyJS2Config = {
    warnings: "verbose",
    parse: {},
    compress: {
        properties: true,
        dead_code: true,
        drop_debugger: true,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        toplevel: true,
        top_retain: [], // prevent specific toplevel functions and variables from unused removal (can be array, comma-separated, RegExp or function. Implies toplevel
        if_return: true,
        // inline: true,
        join_vars: true,
        cascade: true,
        collapse_vars: true, // Collapse single-use non-constant variables - side effects permitting.
        reduce_vars: true,
        warnings: true,
        negate_iife: true,
        pure_getters: true,
        pure_funcs: [], //  You can pass an array of names and UglifyJS will assume that those functions do not produce side effects. DANGER: will not check if the name is redefined in scope.
        drop_console: true,
        keep_fargs: false,
        keep_fnames: false,
        passes: 3,
        screw_ie8: true
    },
    mangle: {
        reserved: [], // Pass an array of identifiers that should be excluded from mangling
        toplevel: true,
        keep_fnames: false,
        eval: true,
        builtins: true,
        screw_ie8: true
    },
    beautify: false,
    comments: false
};

const extractSass = new ExtractTextPlugin({
    filename: "../css/" + filenameTemplate.replace("js", "css"),
    disable: isBuildForCommon
});

const htmlGenerator = new HtmlWebpackPlugin({
    filename: `../templates/${appName}/index.html`,
    title: appName,
    showErrors: true,
    inject: false,
    minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true
    },
    template: "template.js",
    scrpitTag: {
        defer: [appName]
    }
});

const commonChunk = [
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: function (module) {
            return module.context && module.context.indexOf("node_modules") !== -1;
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "react-dnd",
        minChunks(module, count) {
            let context = module.context;
            let targets = ["react-dnd", "react-dnd-html5-backend", "react-dnd-touch-backend", "dnd-core"];
            return context && context.indexOf("node_modules") >= 0 && targets.find(t => new RegExp("\\\\" + t + "\\\\", "i").test(context));
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        // (the commons chunk name)
        // name: "commons", // string, or
        name: "manifest", // string[],
        // The chunk name of the commons chunk. An existing chunk can be selected by passing a name of an existing chunk.
        // If an array of strings is passed this is equal to invoking the plugin multiple times for each chunk name.
        // If omitted and `options.async` or `options.children` is set all chunks are used,
        // otherwise `options.filename` is used as chunk name.

        // (the filename of the commons chunk)
        // filename: filenameTemplate,
        // The filename template for the commons chunk. Can contain the same placeholders as `output.filename`.
        // If omitted the original filename is not modified (usually `output.filename` or `output.chunkFilename`).

        // (Modules must be shared between 3 entries)
        minChunks: Infinity // number|Infinity|function(module, count) -> boolean,
        // The minimum number of chunks which need to contain a module before it's moved into the commons chunk.
        // The number must be greater than or equal 2 and lower than or equal to the number of chunks.
        // Passing `Infinity` just creates the commons chunk, but moves no modules into it.
        // By providing a `function` you can add custom logic. (Defaults to the number of chunks)

        // chunks: string[],
        // Select the source chunks by chunk names. The chunk must be a child of the commons chunk.
        // If omitted all entry chunks are selected.

        // (select all children of chosen chunks)
        // children: true,
        // If `true` all children of the commons chunk are selected

        // async: true
        // If `true` a new async commons chunk is created as child of `options.name` and sibling of `options.chunks`.
        // It is loaded in parallel with `options.chunks`. It is possible to change the name of the output file
        // by providing the desired string instead of `true`.

        // minSize:12,
        // Minimum size of all common module before a commons chunk is created.
    })
];

const plugin = [
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify(env)
        },
        "SERVICE_URL": JSON.stringify(md5(host))
    }),
    new CleanWebpackPlugin([distPath]),
    ...commonChunk,
    isBuildForDevelopment ? new webpack.NamedModulesPlugin() : new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(), // 'md5' is default value,
    htmlGenerator,
    /*    new ScriptExtHtmlWebpackPlugin({
     defer: [appName],
     defaultAttribute: "sync"
     }),*/
    new ChunkManifestPlugin({
        filename: appName + ".chunk-manifest.json",
        manifestVariable: "webpackManifest",
        inlineManifest: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CheckerPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    extractSass,
    new webpack.SourceMapDevToolPlugin({
        filename: sourceMapTemplate,
        exclude: [/^vendor\./, /^commons\./, /^manifest\./]
    }),
    new WebpackShellPlugin({
        onBuildEnd: [`node deploy-dist.js from=${distPath} to=${deployStaticPath} templates=${deployTemplatesPath}`]
    }),
    new BundleAnalyzerPlugin({
        // Can be `server`, `static` or `disabled`.
        // In `server` mode analyzer will start HTTP server to show bundle report.
        // In `static` mode single HTML file with bundle report will be generated.
        // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
        analyzerMode: "static",
        // Host that will be used in `server` mode to start HTTP server.
        analyzerHost: "127.0.0.1",
        // Port that will be used in `server` mode to start HTTP server.
        analyzerPort: 89897,
        // Path to bundle report file that will be generated in `static` mode.
        // Relative to bundles output directory.
        reportFilename: path.join(reportPath, "report.html"),
        // Module sizes to show in report by default.
        // Should be one of `stat`, `parsed` or `gzip`.
        // See "Definitions" section for more information.
        defaultSizes: "parsed",
        // Automatically open report in default browser
        openAnalyzer: false,
        // If `true`, Webpack Stats JSON file will be generated in bundles output directory
        generateStatsFile: true,
        // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
        // Relative to bundles output directory.
        statsFilename: path.join(reportPath, "bundleAnalyzerPluginStats.json"),
        // Options for `stats.toJson()` method.
        // For example you can exclude sources of your modules from stats file with `source: false` option.
        // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
        statsOptions: null,
        // Log level. Can be 'info', 'warn', 'error' or 'silent'.
        logLevel: "info"
    })
];

const cssLoader = {
    loader: "css-loader", // translates CSS into CommonJS
    options: {
        modules: true,
        localIdentName: "[name]__[local]___[hash:base64:5]",
        sourceMap: isBuildForDevelopment,
        importLoaders: 2,
        url: true,
        minimize: !isBuildForDevelopment
    }
};

const postcssLoader = {
    loader: "postcss-loader",
    options: {
        config: {
            ctx: {}
        },
        sourceMap: isBuildForDevelopment
    }
};

let config = {
    entry: {
        "vendor": vendor,
        [appName]: path.join(srcPath, "index.js")
    },
    externals: externals,
    output: {
        path: outputPath,
        filename: filenameTemplate,
        chunkFilename: filenameTemplate,
        publicPath: publicPath,
        sourceMapFilename: sourceMapTemplate
    },
    resolve: {
        extensions: [".ts", ".js", ".json", ".jsx", ".scss", ".css"],
        modules: [
            srcPath, "node_modules", "asset"
        ],
        alias: {StyleSheets: path.join(srcPath, "styles")}
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{
                    loader: "babel-loader",
                    options: babelrc
                }, "source-map-loader"],
                enforce: "pre",
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                exclude: [/\.(spec|e2e)\.ts$/],
                use: [
                    "awesome-typescript-loader",
                    "angular2-template-loader"
                ]
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: extractSass.extract({
                    use: [cssLoader, postcssLoader,
                        {
                            loader: "sass-loader",  // compiles Sass to CSS
                            options: {
                                sourceMap: isBuildForDevelopment
                            }
                        }],
                    // use style-loader in development
                    fallback: "style-loader"  // creates style nodes from JS strings
                })
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        useRelativePath: false,
                        name: "[md5:hash:hex:64].[ext]",
                        outputPath: "../asset/"
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 100000
                    }
                }
            }
        ]
    },
    plugins: plugin
};

if (isBuildForProduction) {
    config.plugins = config.plugins.concat([
        /*        new webpack.LoaderOptionsPlugin({
         minimize: true,
         debug: false
         }), */
        new webpack.optimize.UglifyJsPlugin(UglifyJS2Config)
    ]);
}

module.exports = config;
