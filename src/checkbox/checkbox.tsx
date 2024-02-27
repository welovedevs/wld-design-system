import React, { ChangeEvent, ElementType, forwardRef, PropsWithChildren, useCallback } from 'react';

import cn from 'classnames';

import { PaletteColors } from '../styles';

import { palette } from '../index';
import { baseClasses, checkedLayerClasses, iconClasses, layerClasses, variantClasses } from './checkbox_styles';

interface Props {
    component?: string | ElementType;
    checked: boolean;
    partialCheck?: boolean;
    disabled?: boolean;
    color?: PaletteColors;
    defaultColor?: string;
    className?: string;
    inputClassName?: string;
    containerProps?: any;
    variant?: 'contained' | 'raised' | 'outlined';
    isRadio?: Boolean;
    size?: 'regular' | 'small';
    classes?: {
        container?: string;
        input?: string;
    };
}

export type CheckboxProps = PropsWithChildren<Omit<React.InputHTMLAttributes<any>, 'color' | 'size'> & Props>;
const CheckboxComponent = forwardRef<any, CheckboxProps>(
    (
        {
            component: Component = 'div',
            checked,
            disabled,
            color,
            defaultColor: propsDefaultColor = palette?.primary[400],
            className,
            inputClassName,
            containerProps,
            onChange,
            variant = 'contained',
            isRadio,
            classes = {},
            partialCheck,
            size = 'regular',
            ...other
        },
        ref
    ) => {
        const handleChange = useCallback(
            (event: ChangeEvent) => {
                if (disabled) {
                    return;
                }
                if (typeof onChange === 'function') {
                    onChange(event);
                }
            },
            [disabled, onChange]
        );

        return (
            <Component
                className={cn(
                    baseClasses.size[size as 'regular' | 'small'],
                    baseClasses.container,
                    isRadio && '!ds-rounded-full',
                    disabled && 'ds-cursor-not-allowed ds-bg-dark-50/[0.75]',
                    checked && !disabled && variant !== 'outlined' && 'ds-bg-current',
                    variant && variantClasses[variant],
                    className
                )}
                style={{
                    color: disabled ? palette?.dark[200] : (color && palette?.[color]?.[500]) ?? propsDefaultColor,
                }}
                {...containerProps}
                {...{ ref }}
            >
                <CheckIcon
                    {...{ checked, partialCheck: !!partialCheck }}
                    classes={{
                        checkIcon: cn(
                            baseClasses.icon,
                            checked && variant && !disabled && iconClasses[variant],
                            partialCheck && iconClasses['partial']
                        ),
                    }}
                />
                <div
                    className={cn(
                        baseClasses.layer,
                        variant && checked && checkedLayerClasses[variant],
                        variant && !checked && layerClasses[variant]
                    )}
                />
                <input
                    className={cn(baseClasses.input, inputClassName)}
                    type="checkbox"
                    onChange={handleChange}
                    {...{ checked }}
                    {...other}
                />
            </Component>
        );
    }
);

const CheckIcon: React.FC<{ checked: boolean; partialCheck: boolean; classes: { checkIcon: string } }> = ({
    checked: propsChecked,
    partialCheck,
    classes,
}) => {
    return (
        <svg className={classes.checkIcon} viewBox="0 0 24 24" fill="#fff">
            <g>
                {propsChecked && <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />}
                {!propsChecked && partialCheck && <rect x="4" y="11" width="17" height="2" />}
            </g>
        </svg>
    );
};

export const Checkbox = CheckboxComponent;
