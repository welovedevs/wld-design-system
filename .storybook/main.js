module.exports = {
    stories: ['../stories/**/*.stories.@(tsx|jsx|mdx)'],
    addons: ['@storybook/addon-docs', '@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-viewport', '@storybook/addon-knobs'],
    babel: async (options) => ({
        ...options,
        plugins : ['@babel/plugin-proposal-export-default-from']
    }),
};
