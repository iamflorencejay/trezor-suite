const path = require('path');
const webpack = require('webpack');
const withTranspileModules = require('next-transpile-modules')([
    '@trezor',
    '../packages/suite/src', // issue: https://github.com/zeit/next.js/issues/5666
]);
const withOptimizedImages = require('next-optimized-images');
const withVideos = require('next-videos');
// Get Suite App version from the root package.json
import { version } from '../../package.json';

module.exports = withTranspileModules(
    withVideos(
        withOptimizedImages({
            optimizeImages: false, // TODO: install optimization plugin and enable https://github.com/cyrilwanner/next-optimized-images#optimization-packages
            typescript: {
                ignoreDevErrors: true,
            },
            inlineImageLimit: 0,
            babelConfigFile: path.resolve('babel.config.js'),
            // https://github.com/zeit/next.js/issues/6219
            // target: 'serverless',

            trailingSlash: true,
            assetPrefix: process.env.assetPrefix || '',
            webpack: (config, options) => {
                config.plugins.push(
                    new webpack.DefinePlugin({
                        'process.env.VERSION': version,
                    }),
                );

                return config;
            },
        }),
    ),
);
