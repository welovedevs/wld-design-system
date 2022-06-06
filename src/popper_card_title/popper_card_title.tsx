import React from 'react';

import cn from 'classnames';

import { Typography } from '../typography/typography';

export const PopperCardTitle: React.FC<{ classes?: { container?: string } }> = ({ classes = {}, children }) => {
    return (
        <Typography
            className={cn(
                'ds-w-full ds-p-3 !ds-text-[20px] !ds-leading-[1.6] ds-font-medium ds-tracking-[unset]',
                classes?.container
            )}
            variant="body1"
            component="h2"
            color="dark"
        >
            {children}
        </Typography>
    );
};
