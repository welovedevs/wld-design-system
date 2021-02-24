import React, {
    ChangeEvent,
    ElementType,
    FocusEvent,
    forwardRef,
    MouseEvent,
    PropsWithChildren,
    useCallback,
    useMemo, useState,
} from 'react';

import cn from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { motion } from 'framer-motion';

import { getComponentColor, getHexFromTheme, PaletteColors } from '../styles';

import { Classes, styles } from './checkbox_styles';
import { ClassNameMap } from '@material-ui/styles';
import merge from 'lodash/merge';

const useStyles = makeStyles(styles);

const DEFAULT_BRIGHT_LAYER_MOTION_PROPS = {
    opacity: 0,
};

interface Props {
    component?: string | ElementType;
    checked: boolean;
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
            onFocus,
            onBlur,
            onMouseEnter,
            onMouseLeave,
            variant,
            isRadio,
            customClasses: oldCustomClasses = {},
            classes: receivedClasses = {},

            ...other
        },
        ref
    ) => {
        const theme = useTheme();
        const mergedClasses = useMemo(() => merge({}, oldCustomClasses, receivedClasses), [
        JSON.stringify(oldCustomClasses),
        JSON.stringify(receivedClasses),
    ]);
    const classes = useStyles({ classes: mergedClasses });const hexColor = useMemo(() => getHexFromTheme(theme, color as any), [theme, color]);
        const defaultColor = useMemo(() => propsDefaultColor || getHexFromTheme(theme, 'dark', 500), [
            propsDefaultColor,
            theme,
        ]);

        const [brightLayerMotionProps, setBrightLayerMotionProps] = useState(DEFAULT_BRIGHT_LAYER_MOTION_PROPS);
        const { color: colorMotion } = {
            color: getComponentColor(checked, hexColor ?? null, disabled, defaultColor),
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
        const showBrightLayer = useCallback(
            () =>
                setBrightLayerMotionProps({
                    opacity: 0.3,
                }),
            []
        );

        const dismissBrightLayer = useCallback(() => setBrightLayerMotionProps(DEFAULT_BRIGHT_LAYER_MOTION_PROPS), []);

        const handleMouseEnter = useCallback(
            (event: MouseEvent<any>) => {
                if (typeof onMouseEnter === 'function') {
                    onMouseEnter(event);
                }
                showBrightLayer();
            },
            [onMouseEnter]
        );

        const handleMouseLeave = useCallback(
            (event: MouseEvent<any>) => {
                if (typeof onMouseLeave === 'function') {
                    onMouseLeave(event);
                }
                dismissBrightLayer();
            },
            [onMouseLeave]
        );

        const handleFocus = useCallback(
            (event: FocusEvent<any>) => {
                if (typeof onFocus === 'function') {
                    onFocus(event);
                }
                showBrightLayer();
            },
            [onFocus]
        );

        const handleBlur = useCallback(
            (event: FocusEvent<any>) => {
                if (typeof onBlur === 'function') {
                    onBlur(event);
                }
                dismissBrightLayer();
            },
            [onBlur]
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
                    color: colorMotion,
                    ...(containerProps && containerProps.style),
                }}
                {...{ ref }}
            >
                <CheckIcon {...{ checked, classes }} />
                <motion.div className={classes.brightLayer} animate={brightLayerMotionProps}/>
                <input
                    className={cn(classes.input, inputClassName)}
                    type="checkbox"
                    onChange={handleChange}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
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

const CheckIcon: React.FC<{ checked: boolean; classes: StyleKeys }> = ({ checked, classes }) => {
    return (
        <motion.svg
            className={classes.checkIcon}
            viewBox="0 0 24 24"
            fill="#fff"
            animate={checked ? CHECKED_ICON_PROPS : DEFAULT_ICON_PROPS}
            transition={{type: "spring", bounce: 0.6}}
        >
            <g>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </g>
        </motion.svg>
    );
};

const RaisedCheckbox: React.FC<CheckboxProps> = (props) => {
    const theme = useTheme();
    const { checked, color, disabled } = props;
    const motionProps = {
        boxShadow: `0 ${checked ? 5 : 10}px ${checked ? 15 : 20}px 0 ${getComponentColor(
            checked,
            getHexFromTheme(theme, color as any, 200),
            disabled,
            '#d6d6d6'
        )}`,
    } as any;
    return (
        <CheckboxComponent
            containerProps={{
                style: {
                    ...motionProps,
                },
            }}
            defaultColor="#fff"
            {...props}
        />
    );
};

const WithVariantCheckbox: React.FC<CheckboxProps> = (props) => {
    const { variant = 'raised' } = props;
    if (variant === 'raised') {
        return <RaisedCheckbox {...{ variant }} {...props} />;
    }
    return <CheckboxComponent {...{ variant }} {...props} />;
};

export const Checkbox = WithVariantCheckbox;
