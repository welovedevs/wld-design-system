import React, {
    ChangeEvent,
    ElementType,
    FocusEvent,
    forwardRef,
    MouseEvent,
    PropsWithChildren,
    useCallback,
    useMemo,
    useState,
} from 'react';

import cn from 'classnames';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { motion } from 'framer-motion';

import { getComponentColor, getHexFromTheme, PaletteColors } from '../styles';

import { Classes, styles } from './checkbox_styles';
import { ClassNameMap } from '@mui/styles';
import merge from 'lodash/merge';

const useStyles = makeStyles(styles);

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
    classes?: Classes;
    customClasses?: Classes;
}

type CheckboxProps = PropsWithChildren<Omit<React.InputHTMLAttributes<any>, 'color'> & Props>;
type StyleKeys = ClassNameMap<
    'container' | 'input' | 'outlined' | 'brightLayer' | 'raised' | 'disabled' | 'isRadio' | 'checkIcon'
>;
const CheckboxComponent = forwardRef<any, CheckboxProps>(
    (
        {
            component: Component = motion.div,
            checked,
            disabled,
            color,
            defaultColor: propsDefaultColor,
            className,
            inputClassName,
            containerProps,
            onChange,
            variant,
            isRadio,
            customClasses: oldCustomClasses = {},
            classes: receivedClasses = {},
            partialCheck,
            ...other
        },
        ref
    ) => {
        const theme = useTheme();
        const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
            JSON.stringify(oldCustomClasses),
            JSON.stringify(receivedClasses),
        ]);
        const classes = useStyles({ classes: mergedClasses });
        const hexColor = useMemo(() => getHexFromTheme(theme, color as any), [theme, color]);
        const defaultColor = useMemo(
            () => propsDefaultColor || (variant === 'raised' && '#fff') || getHexFromTheme(theme, 'dark', 500),
            [propsDefaultColor, theme]
        );

        const { color: colorMotion } = {
            color: getComponentColor(checked ?? partialCheck, hexColor ?? null, disabled, defaultColor),
        } as any;

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
                    classes.container,
                    disabled && classes.disabled,
                    isRadio && classes.isRadio,
                    variant && classes[variant],
                    className
                )}
                {...containerProps}
                style={{
                    ...(containerProps && containerProps.style),
                }}
                animate={{ color: colorMotion }}
                initial="initial"
                whileHover="hover"
                {...{ ref }}
            >
                <CheckIcon {...{ checked, partialCheck: !!partialCheck, classes }} />
                <motion.div
                    className={classes.brightLayer}
                    variants={{ initial: { opacity: 0 }, hover: { opacity: 0.3 } }}
                />
                <input
                    className={cn(classes.input, inputClassName)}
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

const CheckIcon: React.FC<{ checked: boolean; partialCheck: boolean; classes: StyleKeys }> = ({
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
