import React, { ExoticComponent, HTMLAttributes } from 'react';
interface Props {
    component?: string | ExoticComponent;
    className?: string;
    typographyClassName?: string;
    button?: boolean;
    classes?: {
        button?: string;
        container?: string;
        typography?: string;
    };
    style?: any;
}
export declare const ListItem: React.FC<Props & HTMLAttributes<HTMLLIElement>>;
export {};
