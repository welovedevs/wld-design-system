import React from 'react';

import cn from 'classnames';

export const PopperCardActions: React.FC<{ classes?: { container?: string } }> = ({ children, classes = {} }) => {
    return (
        <div className={cn('ds-w-full ds-flex ds-items-center ds-justify-end ds-p-1', classes?.container)}>
            {children}
        </div>
    );
};
