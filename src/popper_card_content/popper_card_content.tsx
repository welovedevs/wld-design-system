import React from 'react';

import cn from 'classnames';

export const PopperCardContent: React.FC<{ classes?: { container?: string } }> = ({ classes = {}, children }) => {
    return <div className={cn('ds-w-full ds-px-1 ds-py-3 ds-overflow-auto', classes?.container)}>{children}</div>;
};
