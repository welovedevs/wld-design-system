import React from 'react';
import { PopperProps } from '@mui/material';
import { PopperCustomClasses } from './popper_card_styles';
interface Props {
    className?: string;
    anchorElement: any;
    open?: boolean;
    onClose?: () => void;
    popperProps?: Omit<PopperProps, 'open' | 'children' | 'anchorElement'>;
    structured?: boolean;
    onClickAway?: () => void;
    dismissArrow?: boolean;
    classes?: PopperCustomClasses;
    customClasses?: PopperCustomClasses;
    containerProps?: any;
}
export declare const PopperCard: React.FC<Props>;
export {};
