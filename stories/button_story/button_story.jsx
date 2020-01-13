import React, { useCallback } from 'react';

import injectSheet from 'react-jss';

import { Button } from '../../src/button/button';
import { Typography } from '../../src/typography/typography';

import styles from './button_story_styles';

const POSSIBLE_VARIANTS = {
    contained: 'Contained',
    text: 'Text',
    outlined: 'Outlined'
};

const POSSIBLE_SIZES = {
    normal: 'Normal',
    small: 'Small'
};

const EXAMPLE_COLORS = {
    default: 'Default',
    primary: 'Primary',
    secondary: 'Secondary'
};

const DISPLAYED_BUTTONS = {
    ...Object.entries(EXAMPLE_COLORS).reduce((acc, [color, colorLabel]) => {
        const accCopy = acc;
        acc[color] = {
            color,
            children: colorLabel
        };
        return accCopy;
    }, {}),
    disabled: {
        disabled: true,
        children: 'Disabled'
    }
};

console.log({ DISPLAYED_BUTTONS });

const ButtonStory = ({ classes }) => {
    const handleClick = useCallback(() => {
        alert(
            'Hello. Tu vas bien ? Moi ça va. Alors comme ça on essaie un bouton réalisé avec amour et passion ? Bien, très bien.'
        );
    });
    return (
        <div className={classes.variantsRowContainer}>
            {Object.entries(POSSIBLE_VARIANTS).map(([variant, variantLabel]) => (
                <div className={classes.variantRow}>
                    <Typography className={classes.variantLabel} variant="h2" component="h2">
                        {variantLabel}
                    </Typography>
                    <div className={classes.buttonsContainer}>
                        {Object.entries(POSSIBLE_SIZES).map(([size, sizeLabel]) =>
                            Object.entries(DISPLAYED_BUTTONS).map(([id, { children, ...otherProps }]) => (
                                <Button
                                    key={`button_${variant}_${size}_${id}`}
                                    className={classes.button}
                                    onClick={handleClick}
                                    {...{ variant, size }}
                                    {...otherProps}
                                >
                                    {`${sizeLabel} `}
                                    {children}
                                </Button>
                            )))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default injectSheet(styles)(ButtonStory);
