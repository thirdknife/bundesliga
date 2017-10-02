var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var webpack = require('webpack');
var writeStats = require('./utils/writeStats');
var notifyStats = require('./utils/notifyStats');
var assetsPath = path.resolve(__dirname, '../static/dist');
var host = 'localhost';
var port = parseInt(process.env.PORT) + 1 || 3013;

var entry = [
        'webpack-dev-server/client?http://' + host + ':' + port,
        'webpack/hot/dev-server',
        './src/client.js'
];

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname, '..'),
    entry,
    output: {
     path: assetsPath,
     // filename: '[name]-[hash].js',
     filename: '[name].js',
     chunkFilename: '[name]-[chunkhash].js',
     publicPath: 'http://' + host + ':' + port + '/dist/'
    },
     module: {
         noParse: [
                 /aws\-sdk/,
         ],
       loaders: [
       { test: /\.css$/, loader: "style-loader!css-loader" },
       { test: /\.(jpe?g|png|gif|svg)$/, loader: 'file' },
       { test: /\.jsx?$/, include: /src/, loaders: ['babel?presets[]=react&presets[]=es2015&presets[]=stage-0']},
       { test: /\.json$/, loader: 'json-loader' },
       { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true' }
     ]
    },
    progress: true,
    resolve: {
       modulesDirectories: [
           './',
           'src',
           'node_modules'
       ],
     extensions: ['', '.json', '.js', '.jsx']
    },
    plugins: [
     // hot reload
     new webpack.HotModuleReplacementPlugin(),
     new webpack.WatchIgnorePlugin([/\.json$/]),
     new webpack.NoErrorsPlugin(),
     new webpack.DefinePlugin({
       __CLIENT__: true,
       __SERVER__: false,
       __DEVELOPMENT__: true,
       __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
     }),

     // stats
     function () {
       this.plugin('done', notifyStats);
     },
     function () {
         this.plugin('done', function(stats) {


       });
     }
    ]
 };
