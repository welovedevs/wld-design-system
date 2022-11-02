import React from 'react';
import { BannerType } from './banner_data';
interface Props {
    type?: BannerType;
    icon?: any;
    className?: string;
    classes?: {
        container?: string;
    };
    size?: 'small';
}
export declare const Banner: React.FC<Props>;
export {};
