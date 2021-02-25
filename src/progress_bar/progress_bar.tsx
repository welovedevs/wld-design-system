import React, { useMemo } from 'react';

import cn from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { motion } from 'framer-motion';

import { getComponentColor, getHexFromTheme, PaletteColors } from '../styles';

import { Classes, styles } from './progress_bar_styles';

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
    const xValue = -100;
    const xMotion = xValue + progressValue;

    return (
        <div className={cn(className, classes.container)}>
            <motion.div
                className={classes.bar}
                style={{ color: getComponentColor(true, hexColor, false) as any }}
                initial={{ x: `${xValue}%` }}
                animate={{ x: `${xMotion}%` }}
                transition={{ type: 'tween' }}
            />
        </div>
    );
};
