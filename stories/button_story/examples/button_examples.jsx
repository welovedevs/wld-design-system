import React, {useCallback} from 'react';

import makeStyles from '@mui/styles/makeStyles';

import { Button } from "../../../src";

import { BUTTON_EXAMPLE_COLORS, BUTTON_POSSIBLE_SIZES } from "../helpers/button_sizes_colors";

import { styles } from './button_examples_styles';

const useStyles = makeStyles(styles);

const COLORS_DISABLED = {
    ...Object.entries(BUTTON_EXAMPLE_COLORS).reduce((acc, [color, colorLabel]) => {
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

const ButtonExamplesComponent = ({ variant }) => {
    const classes = useStyles();

    const handleClick = useCallback(() => alert('Button clicked!'));

    return Object.entries(BUTTON_POSSIBLE_SIZES).map(([size, sizeLabel]) =>
        Object.entries(COLORS_DISABLED).map(([id, { children, ...otherProps }]) => (
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
        )))
};

export const ButtonExamples = ButtonExamplesComponent;
