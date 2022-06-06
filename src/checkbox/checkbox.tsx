import React, { ChangeEvent, ElementType, forwardRef, PropsWithChildren, useCallback, useMemo } from 'react';

import cn from 'classnames';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

import { getComponentColor, getHexFromTheme, PaletteColors } from '../styles';

import { baseClasses, iconClasses, layerClasses, variantClasses } from './checkbox_styles';
import { palette } from '../index';

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
    variant?: 'raised' | 'outlined';
    isRadio?: Boolean;
    classes?: {
        container?: string;
        input?: string;
    };
}

export type CheckboxProps = PropsWithChildren<Omit<React.InputHTMLAttributes<any>, 'color'> & Props>;
const CheckboxComponent = forwardRef<any, CheckboxProps>(
    (
        {
            component: Component = motion.div,
            checked,
            disabled,
            color,
            defaultColor: propsDefaultColor = palette?.primary[50],
            className,
            inputClassName,
            containerProps,
            onChange,
            variant,
            isRadio,
            classes = {},
            partialCheck,
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
                    baseClasses.container,
                    disabled && 'ds-cursor-not-allowed ds-bg-dark-100',
                    isRadio ? 'ds-rounded-full' : 'ds-rounded-md',
                    checked && !disabled && variant === 'raised' && 'ds-bg-current',
                    variant && variantClasses[variant],
                    className
                )}
                style={{
                    color: disabled ? '' : (color && palette?.[color]?.[500]) ?? propsDefaultColor,
                }}
                {...containerProps}
                {...{ ref }}
            >
                <CheckIcon
                    {...{ checked, partialCheck: !!partialCheck }}
                    classes={{
                        checkIcon: cn(
                            baseClasses.icon,
                            checked && variant && iconClasses[variant],
                            partialCheck && iconClasses['partial']
                        ),
                    }}
                />
                <div className={cn(baseClasses.layer, variant && layerClasses[variant])} />
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

const DEFAULT_ICON_PROPS = {
    scale: 0.5,
    opacity: 0,
};

const CHECKED_ICON_PROPS = {
    scale: 1,
    opacity: 1,
};

const CheckIcon: React.FC<{ checked: boolean; partialCheck: boolean; classes: { checkIcon: string } }> = ({
    checked: propsChecked,
    partialCheck,
    classes,
}) => {
    const checked = propsChecked || partialCheck;
    const spring = useMemo(() => (checked ? CHECKED_ICON_PROPS : DEFAULT_ICON_PROPS), [checked]);
    return (
        <motion.svg
            className={classes.checkIcon}
            viewBox="0 0 24 24"
            fill="#fff"
            animate={spring}
            transition={{ type: 'spring', bounce: 0.6 }}
        >
            <g>
                {propsChecked && <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />}
                {!propsChecked && partialCheck && <rect x="4" y="11" width="17" height="2" />}
            </g>
        </motion.svg>
    );
};

export const Checkbox = CheckboxComponent;
