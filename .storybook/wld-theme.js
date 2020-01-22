import { create, themes } from '@storybook/theming';

export const theme = create({
    base: 'light',

    colorPrimary: '#e91e63',
    colorSecondary: '#220bab',

    // Typography
    fontBase: '"Avenir Next", "Roboto", "open sans", "Raleway"',

    brandTitle: "WeLoveDevs' Storybook",
    brandUrl: 'https://welovedevs.com',
    brandImage: 'https://welovedevs.com/wp-content/uploads/2019/12/logo-menu-welovedevs-220bad.svg'
});

