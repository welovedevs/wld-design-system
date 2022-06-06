import React, {useCallback} from 'react';

import { Button } from "../../../src";

import { BUTTON_EXAMPLE_COLORS, BUTTON_POSSIBLE_SIZES } from "../helpers/button_sizes_colors";


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

    const handleClick = useCallback(() => alert('Button clicked!'));

    return Object.entries(BUTTON_POSSIBLE_SIZES).map(([size, sizeLabel]) =>
        Object.entries(COLORS_DISABLED).map(([id, { children, ...otherProps }]) => (
            <Button
                key={`button_${variant}_${size}_${id}`}
                className={""}
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
