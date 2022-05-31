import React, { useMemo } from 'react';
import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Classes, styles } from './tooltip_styles';
import { PopperProps } from '@mui/material';
import merge from 'lodash/merge';

const useStyles = makeStyles(styles);


interface W3DTooltipProps {
    title: TooltipProps['title'];
    children: TooltipProps['children'];
    placement?: PopperProps['placement'];
    classes?: Classes;
    customClasses?: Classes;
}
const TooltipComponent: React.FC<W3DTooltipProps> = ({
                                                      title,
                                                      children,
                                                      customClasses: oldCustomClasses = {},
                                                      classes: receivedClasses = {},
                                                  }) => {
    const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    const classes = useStyles({ classes: mergedClasses });

    return <MuiTooltip classes={classes} title={title} children={children} />;
};


export const Tooltip = TooltipComponent;
