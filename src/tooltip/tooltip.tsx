import React, { forwardRef } from 'react';
import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material';

export const Tooltip: React.FC<TooltipProps> = forwardRef(({ children, classes, ...other }, ref) => {
    return (
        <MuiTooltip
            ref={ref}
            {...other}
            classes={{
                ...classes,
                tooltip: `${
                    classes?.tooltip ?? ''
                } ds-leading-[1.5] ds-text-[13px] ds-px-[12px] ds-py-2 ds-bg-[black]/[0.85] ds-text-light-500 ds-font-medium ds-max-w-[375px]`,
                popper: `${classes?.popper ?? ''} z-[10000]`,
            }}
        >
            {children}
        </MuiTooltip>
    );
});
