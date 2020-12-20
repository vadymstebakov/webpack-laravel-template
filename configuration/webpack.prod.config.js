const { merge } = require('webpack-merge');
const webpackConfiguration = require('../webpack.config');

module.exports = merge(webpackConfiguration, {
    mode: 'production',
    devtool: false,
    performance: {
        maxEntrypointSize: 2048000,
        maxAssetSize: 2048000,
    },
    plugins: [],
});
