import React, { forwardRef, HTMLAttributes } from 'react';

import cn from 'classnames';

export const TextFieldIcon = forwardRef<
    HTMLDivElement,
    { className?: string; classes?: { container?: string } & HTMLAttributes<HTMLDivElement> }
>(({ className, classes, ...other }, ref) => {
    return (
        <div
            className={cn('ds-px-1 ds-py-2 ds-flex child-svg:ds-h-3 child-svg:ds-w-3', className, classes?.container)}
            {...{ ref }}
            {...other}
        />
    );
});
