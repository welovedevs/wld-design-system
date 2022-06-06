import React from 'react';

import cn from 'classnames';
export const List: React.FC<{ className?: string; classes?: { container?: string } }> = ({
    className,
    classes,
    ...other
}) => {
    return <ul className={cn(classes?.container,'ds-p-0 ds-m-0 ds-list-none', className)} {...other} />;
};
