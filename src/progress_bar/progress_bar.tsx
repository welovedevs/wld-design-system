import React from 'react';

import cn from 'classnames';

import { PaletteColors } from '../styles';

import { palette } from '../index';

interface Props {
    classes?: { container?: string; bar?: string };
    className?: string;
    value?: number;
    color?: PaletteColors;
}

export const ProgressBar: React.FC<Props> = ({
    value: progressValue = 0,
    color = 'primary',
    className,
    classes = {},
}) => (
    <div
        className={cn(
            className,
            classes?.container,
            'ds-w-full ds-h-[6px] ds-rounded-full ds-overflow-hidden ds-bg-lightGray ds-flex ds-items-center'
        )}
    >
        <div
            className={cn(`ds-block ds-h-full ds-rounded-full ds-bg-current ds-transition-all`, classes?.bar)}
            style={{ width: `${progressValue}%`, color: palette[color]?.[500] ?? palette.dark[200] }}
        />
    </div>
);
