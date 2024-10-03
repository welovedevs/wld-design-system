import React, { HTMLAttributes } from 'react';

import cn from 'classnames';
export const List: React.FC<{ classes?: { container?: string } } & HTMLAttributes<HTMLUListElement>> = ({
    className,
    classes,
    ...other
}) => {
    return <ul className={cn(classes?.container, 'ds-p-0 ds-m-0 ds-list-none', className)} {...other} />;
};
