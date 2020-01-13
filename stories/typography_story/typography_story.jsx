import React from 'react';

import injectSheet from 'react-jss';
import { Twemoji } from 'react-emoji-render';
import { text } from '@storybook/addon-knobs';

import { Typography } from '../../src/typography/typography';

import styles from './typography_story_styles';

const TYPOGRAPHIES = Object.freeze({
    h1: {
        component: 'h1',
        variant: 'h1',
        children: 'h1. Heading'
    },
    h2: {
        component: 'h2',
        variant: 'h2',
        children: 'h2. Heading'
    },
    h3: {
        component: 'h3',
        variant: 'h3',
        children: 'h3. Heading'
    },
    h4: {
        component: 'h4',
        variant: 'h4',
        children: 'h4. Heading'
    },
    h5: {
        component: 'h5',
        variant: 'h5',
        children: 'h5. Heading'
    },
    h6: {
        component: 'h6',
        variant: 'h6',
        children: 'h6. Heading'
    },
    body1: {
        variant: 'body1',
        children: 'body1. Le gentil Damien présente son Business Model aux très nombreux investisseurs.'
    },
    body2: {
        variant: 'body2',
        children: 'body2. Le gentil Damien présente son Business Model aux très nombreux investisseurs.'
    },
    buttonText: {
        variant: 'button',
        children: 'Button Text'
    },
    tag: {
        variant: 'tag',
        children: 'Tag Text'
    },
    withCustomEmojis: {
        variant: 'body1',
        component: ({ children, ...other }) => <Twemoji svg text={children} {...other} />,
        children: 'Le gentil 🐰 ❤️ les emojis custom.'
    },
    wld1: {
        color: 'primary',
        variant: 'wld1',
        children: 'wld1. The biggest one.'
    },
    wld1Secondary: {
        color: 'secondary',
        variant: 'wld1',
        children: 'wld1. The biggest one.'
    },
    wld1Tertiary: {
        color: 'tertiary',
        variant: 'wld1',
        children: 'wld1. The biggest one.'
    },
    wld2: {
        color: 'primary',
        variant: 'wld2',
        children: 'wld2. Quite large too'
    },
    wld2Secondary: {
        color: 'secondary',
        variant: 'wld2',
        children: 'wld2. Quite large too'
    },
    wld2Tertiary: {
        color: 'tertiary',
        variant: 'wld2',
        children: 'wld2. Quite large too'
    },
    wld3: {
        color: 'primary',
        variant: 'wld3',
        children: 'wld3. Medium sized!'
    },
    wld3Secondary: {
        color: 'secondary',
        variant: 'wld3',
        children: 'wld3. Medium sized!'
    },
    wld3Thirdary: {
        color: 'thirdary',
        variant: 'wld3',
        children: 'wld3. Medium sized!'
    },
    wld4: {
        color: 'primary',
        variant: 'wld4',
        children: 'wld4. Could be used anywhere.'
    },
    wld4Secondary: {
        color: 'secondary',
        variant: 'wld4',
        children: 'wld4. Could be used anywhere.'
    },
    wld4Thirdary: {
        color: 'thirdary',
        variant: 'wld4',
        children: 'wld4. Could be used anywhere.'
    },
    wld5: {
        color: 'primary',
        variant: 'wld5',
        children: "wld5. Pretty cute isn't it?"
    },
    wld5Secondary: {
        color: 'secondary',
        variant: 'wld5',
        children: "wld5. Pretty cute isn't it?"
    },
    wld5Thirdary: {
        color: 'thirdary',
        variant: 'wld5',
        children: "wld5. Pretty cute isn't it?"
    },
    wld6: {
        color: 'primary',
        variant: 'wld6',
        children: 'wld6. The smallest of them all'
    },
    wld6Secondary: {
        color: 'secondary',
        variant: 'wld6',
        children: 'wld6. The smallest of them all'
    },
    wld6Tertiary: {
        color: 'tertiary',
        variant: 'wld6',
        children: 'wld6. The smallest of them all'
    }
});

const TypographyStory = ({ classes }) => {
    const input = text('Example text', '');
    return (
        <div className={classes.container}>
            {Object.entries(TYPOGRAPHIES).map(([id, { children, ...other }]) => (
                <Typography key={`typography_${id}`} className={classes.typography} {...other}>
                    {input || children}
                </Typography>
            ))}
        </div>
    );
};

export default injectSheet(styles)(TypographyStory);
