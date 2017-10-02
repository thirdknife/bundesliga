// Webpack config for creating the production bundle.

var path = require('path');
var webpack = require('webpack');
var _ = require('underscore');
var fs = require('fs');
var writeStats = require('./utils/writeStats');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');

var relativeAssetsPath = '../static/dist';
var assetsPath = path.join(__dirname, relativeAssetsPath);

var entry = { Match : './src/client.js' };

const cleanOptions = {
  root : path.join(__dirname,'webpack'),
  verbose: true,
  dry : false
};

module.exports = {
    // devtool: 'source-map',
    context: path.resolve(__dirname, '..'),
    entry,
    output: {
        path: assetsPath,
        filename: '[hash].js',
        chunkFilename: '[hash].js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            { test: /\.(jpe?g|png|gif|svg)$/, loader: 'file' },
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel?presets[]=react&presets[]=es2015&presets[]=stage-0']},
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', ['css?modules&importLoaders=2!autoprefixer?browsers=last 2 version','sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true']) }
        ]
    },
    progress: true,
    resolve: {
        modulesDirectories: [
            '.',
            'src',
            'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx']
    },
    plugins: [
        new CleanPlugin([relativeAssetsPath], cleanOptions),

        // css files from the extract-text-plugin loader
        new ExtractTextPlugin('[hash].css', {allChunks: true}),
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: false,
            __DEVTOOLS__: false
        }),

        // ignore dev config
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

        // set global vars
        new webpack.DefinePlugin({
            'process.env': {
                // Useful to reduce the size of client-side libraries, e.g. react
                NODE_ENV: JSON.stringify('production')
            }
        }),

        // optimizations
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        function () {
            this.plugin('done', function(stats) {
                const hash = stats.hash;
                const rootPath = path.relative(__dirname, '.');

                const name = 'Match Table';
                const productionTemplatePath = 'IndexProductionTemplate.html';

                var template = _.template(fs.readFileSync(productionTemplatePath, "utf8"));
                const js = path.join('dist' + path.sep + hash + '.js');
                const css = path.join('dist' + path.sep + hash + '.css');
                template = template({ name, css, js });

                const indexFilePath = '.' + path.sep + 'static' + path.sep + 'index.html';
                fs.writeFileSync(indexFilePath, template);

                console.info("==> Successfully generated Index file for " + name + " 👌");
            });
        }
    ]
};
