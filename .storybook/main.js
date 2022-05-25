module.exports = {
    core: {
        builder: 'webpack5',
    },
    stories: ['../stories/**/*.stories.@(tsx|jsx|mdx)'],
    addons: ['@storybook/addon-docs', '@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-viewport', '@storybook/addon-knobs', {
        name: '@storybook/addon-postcss',
        options: {
            postcssLoaderOptions: {
                implementation: require('postcss'),
            },
        },
    }],
    babel: async (options) => ({
        ...options,
        plugins: ['@babel/plugin-proposal-export-default-from']
    }),
};
