import React, { useMemo } from 'react';

import cn from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { animated, useSpring } from 'react-spring';

import { getComponentColor, getHexFromTheme } from '../styles';

import { Classes, styles } from './progress_bar_styles';
import { PaletteColors } from '../styles/palette';

const useStyles = makeStyles(styles);

interface Props {
    classes?: Classes;
    className?: string;
    value?: number;
    color?: PaletteColors;
}

export const ProgressBar: React.FC<Props> = ({
    value: progressValue = 0,
    color = 'primary',
    className,
    classes: receivedClasses = {},
}) => {
    const classes = useStyles({ classes: receivedClasses });
    const theme = useTheme();
    const hexColor = useMemo(() => getHexFromTheme(theme, color), [theme, color]);

    const { translation } = useSpring({
        from: {
            translation: -100,
        },
        to: {
            translation: -100 + progressValue,
        },
    });
    return (
        <div className={cn(className, classes.container)}>
            <animated.div
                className={classes.bar}
                style={{
                    color: getComponentColor(true, hexColor, false) as any,
                    transform: translation.to((value) => `translate3d(${value}%, 0, 0)`),
                }}
            />
        </div>
    );
};
