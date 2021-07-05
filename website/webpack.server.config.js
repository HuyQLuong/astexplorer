const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const DEV = process.env.NODE_ENV !== 'production';

module.exports = {
    plugins:[
      new webpack.NormalModuleReplacementPlugin(
        /\.\.\/data/,
        module => {
          if (/css-tree/.test(module.context)) {
            module.request += '/index.js';
          }
        }
      ),
      new MiniCssExtractPlugin({
        filename: DEV ? '[name].css' : `[name]-[contenthash]-${CACHE_BREAKER}.css`,
        allChunks: true,
      }),
    ],
    entry: {
        server: './src/server.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    target: 'node',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
    },
    // externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
        noParse: [
            /traceur\/bin/,
            /typescript\/lib/,
            /esprima\/dist\/esprima\.js/,
            /esprima-fb\/esprima\.js/,
            // /glsl/,
            // This is necessary because flow is trying to load the 'fs' module, but
            // dynamically. Without this webpack will throw an error at runtime.
            // I assume the `require(...)` call "succeeds" because 'fs' is shimmed to
            // be empty below.
            /flow-parser\/flow_parser\.js/,
        ],
        rules: [
          {
            test: /\.txt$/,
            exclude: /node_modules/,
            loader: 'raw-loader',
          },
          {
            test: /\.(sass|less|css)$/,
            loaders: ['style-loader', 'css-loader', 'less-loader']
          },
            {
                test: /\.(jsx?|mjs)$/,
                type: 'javascript/auto',
                include: [
                    // To transpile our version of acorn as well as the one that
                    // espree uses (somewhere in its dependency tree)
                    /\/acorn.es.js$/,
                    /\/acorn.mjs$/,
                    /\/acorn-loose.mjs$/,
                    path.join(__dirname, 'node_modules', '@glimmer', 'compiler', 'dist'),
                    path.join(__dirname, 'node_modules', '@glimmer', 'syntax', 'dist'),
                    path.join(__dirname, 'node_modules', '@glimmer', 'util', 'dist'),
                    path.join(__dirname, 'node_modules', '@glimmer', 'wire-format', 'dist'),
                    path.join(__dirname, 'node_modules', 'ast-types'),
                    path.join(__dirname, 'node_modules', '@babel/eslint-parser'),
                    path.join(__dirname, 'node_modules', 'babel-eslint'),
                    path.join(__dirname, 'node_modules', 'babel-eslint8'),
                    path.join(__dirname, 'node_modules', 'jsesc'),
                    path.join(__dirname, 'node_modules', 'eslint-visitor-keys'),
                    path.join(__dirname, 'node_modules', 'babel7'),
                    path.join(__dirname, 'node_modules', 'babel-plugin-macros'),
                    path.join(__dirname, 'node_modules', 'json-parse-better-errors'),
                    path.join(__dirname, 'node_modules', 'babylon7'),
                    path.join(__dirname, 'node_modules', 'eslint', 'lib'),
                    path.join(__dirname, 'node_modules', 'eslint-scope'),
                    path.join(__dirname, 'node_modules', 'eslint-visitor-keys'),
                    path.join(__dirname, 'node_modules', 'eslint3'),
                    path.join(__dirname, 'node_modules', 'eslint4'),
                    path.join(__dirname, 'node_modules', 'jscodeshift', 'src'),
                    path.join(__dirname, 'node_modules', 'lodash-es'),
                    path.join(__dirname, 'node_modules', 'prettier'),
                    path.join(__dirname, 'node_modules', 'react-redux', 'es'),
                    path.join(__dirname, 'node_modules', 'recast'),
                    path.join(__dirname, 'node_modules', 'redux', 'es'),
                    path.join(__dirname, 'node_modules', 'regexp-tree'),
                    path.join(__dirname, 'node_modules', 'regjsparser'),
                    path.join(__dirname, 'node_modules', 'regexpp'),
                    path.join(__dirname, 'node_modules', 'simple-html-tokenizer'),
                    path.join(__dirname, 'node_modules', 'symbol-observable', 'es'),
                    path.join(__dirname, 'node_modules', 'typescript-eslint-parser'),
                    path.join(__dirname, 'node_modules', 'webidl2'),
                    path.join(__dirname, 'node_modules', 'tslint'),
                    path.join(__dirname, 'node_modules', 'tslib'),
                    path.join(__dirname, 'node_modules', 'svelte'),
                    // path.join(__dirname, 'src'),
                    /src\/server.js/,
                    /src\/parsers/,
                ],
                exclude:[
                    // /src\/parsers\/glsl/,
                ],
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: [
                        [
                            require.resolve('@babel/preset-env'),
                            {
                                targets: {
                                    browsers: ['defaults'],
                                },
                                modules: 'commonjs',
                            },
                        ],
                        require.resolve('@babel/preset-react'),
                    ],
                    plugins: [
                        require.resolve('@babel/plugin-transform-runtime'),
                    ],
                },
            },
        ]
    }
}