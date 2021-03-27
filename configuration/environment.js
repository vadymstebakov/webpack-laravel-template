const path = require('path');
const portFinderSync = require('portfinder-sync');

const port = portFinderSync.getPort(8000);

module.exports = {
    paths: {
        source: path.resolve(__dirname, '../src/'),
        output: path.resolve(__dirname, '../dist/'),
        views: path.resolve(__dirname, '../../resources/views/'),
        images: path.resolve(__dirname, '../src/images/'),
        fonts: path.resolve(__dirname, '../src/fonts/'),
        assetsPath: process.env.ASSET_PATH || '/public/dist/',
    },
    server: {
        proxy: 'http://hostName',
        host: 'hostName',
        port,
    },
};
