import React, { CSSProperties } from 'react';
export declare type CardVariant = 'flat';
interface Props {
    component?: string;
    className?: string;
    containerRef?: any;
    elevation?: 0 | 1 | 'drawer';
    style?: CSSProperties;
    classes?: {
        container?: string;
    };
    customClasses?: {
        container?: string;
    };
    variant?: CardVariant;
}
export declare const Card: React.ForwardRefExoticComponent<React.HTMLAttributes<any> & Props & React.RefAttributes<any>>;
export {};
