const path = require('path');
const pathToInlineSvg = path.resolve(__dirname, '../src/assets/icons');

module.exports = {
    core: {
        builder: 'webpack5',
    },
    stories: ['../stories/**/*.stories.@(tsx|jsx|mdx)'],
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-viewport',
        '@storybook/addon-knobs',
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
            },
        },
    ],
    babel: async (options) => ({
        ...options,
        plugins: ['@babel/plugin-proposal-export-default-from'],
    }),
    webpackFinal: async (config, { configType }) => {
        const file_loader_rule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
        file_loader_rule.exclude = /svg$/;
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack', 'url-loader'],
        });

        return {
            ...config,
        };
    },
};
