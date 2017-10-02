var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var WebpackDevServer = require('webpack-dev-server'),
    webpack = require('webpack'),
    config = require('./webpack.config'),
    //host = '0.0.0.0',
    host = process.env.HOST || 'localhost',
    port = parseInt(process.env.PORT) + 1 || 3013,
    serverOptions = {
        contentBase: 'http://' + host + ':' + port,
        quiet: true,
        noInfo: true,
        hot: true,
        inline: true,
        lazy: false,
        publicPath: config.output.publicPath,
        headers: {"Access-Control-Allow-Origin": "*"},
        stats: {colors: true}
    },
    compiler = webpack(config),
    webpackDevServer = new WebpackDevServer(compiler, serverOptions);

webpackDevServer.listen(port, host, function() {
    writeDevIndexFile();
    console.info("==> It's not who you are underneath but what you do defines you ! 💪");
    console.info('==> 🚧  Webpack development server listening on %s:%s', host, port, " 👍");
});

function writeDevIndexFile() {
    const name = 'main';
    const productionTemplatePath = 'IndexDevTemplate.html';
    var template = _.template(fs.readFileSync(productionTemplatePath, "utf8"));
    template = template({ name, host, port });
    const indexFilePath = '.' + path.sep + 'static' + path.sep + 'index.html';
    fs.writeFileSync(indexFilePath, template);
    console.info("==> Successfully generated Index file for " + name + " 👌");
}
