import React, {
    ElementType,
    forwardRef,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    FocusEvent,
    MouseEvent,
    ChangeEvent,
} from 'react';

import cn from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { animated, config, useSpring } from 'react-spring';

import { getComponentColor, getHexFromTheme } from '../styles/utils/styles_utils';
import { dark } from '../styles/palette';

import { Classes, styles } from './checkbox_styles';
import { Palette, PaletteColor } from '@material-ui/core/styles/createPalette';
import { ClassNameMap } from '@material-ui/styles';

const useStyles = makeStyles(styles);

const DEFAULT_BRIGHT_LAYER_SPRING_PROPS = {
    opacity: 0,
    config: config.stiff,
};

interface Props {
    component?: string | ElementType;
    checked: boolean;
    disabled?: boolean;
    color?: PaletteColor;
    defaultColor?: string;
    className?: string;
    inputClassName?: string;
    containerProps?: any;
    variant?: 'raised' | 'outlined';
    isRadio?: Boolean;
    classes?: Classes;
}

type CheckboxProps = PropsWithChildren<Omit<React.InputHTMLAttributes<any>, 'color'> & Props>;
type StyleKeys = ClassNameMap<
    'container' | 'input' | 'outlined' | 'brightLayer' | 'raised' | 'disabled' | 'isRadio' | 'checkIcon'
>;
const CheckboxComponent = forwardRef<any, CheckboxProps>(
    (
        {
            component: Component = animated.div,
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
            classes: receivedClasses = {},
            ...other
        },
        ref
    ) => {
        const theme = useTheme();
        const classes: StyleKeys = useStyles({ classes: receivedClasses });
        const hexColor = useMemo(() => getHexFromTheme(theme, color as any), [theme, color]);
        const defaultColor = useMemo(() => propsDefaultColor || getHexFromTheme(theme, 'dark', 500), [
            propsDefaultColor,
            theme,
        ]);

        const [brightLayerSpringProps, setBrightLayerSpringProps] = useSpring(() => DEFAULT_BRIGHT_LAYER_SPRING_PROPS);
        const { color: colorSpring } = useSpring({
            color: getComponentColor(checked, hexColor ?? null, disabled, defaultColor),
            config: config.stiff,
        } as any);

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
                setBrightLayerSpringProps({
                    opacity: 0.3,
                }),
            []
        );

        const dismissBrightLayer = useCallback(() => setBrightLayerSpringProps(DEFAULT_BRIGHT_LAYER_SPRING_PROPS), []);

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
                    color: colorSpring,
                    ...(containerProps && containerProps.style),
                }}
                {...{ ref }}
            >
                <CheckIcon {...{ checked, classes }} />
                <animated.div className={classes.brightLayer} style={brightLayerSpringProps as any} />
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

const DEFAULT_ICON_SPRING_PROPS = {
    scale: 0.5,
    opacity: 0,
    config: config.wobbly,
};

const CHECKED_ICON_SPRING_PROPS = {
    scale: 1,
    opacity: 1,
};

const CheckIcon: React.FC<{ checked: boolean; classes: StyleKeys }> = ({ checked, classes }) => {
    const [springProps, setSpringProps] = useSpring(() => DEFAULT_ICON_SPRING_PROPS);
    useEffect(() => {
        setSpringProps(checked ? CHECKED_ICON_SPRING_PROPS : DEFAULT_ICON_SPRING_PROPS);
    }, [checked]);
    return (
        <animated.svg
            className={classes.checkIcon}
            viewBox="0 0 24 24"
            fill="#fff"
            style={
                {
                    transform: springProps.scale.to((value) => `scale3d(${value}, ${value}, ${value})`),
                    ...springProps,
                } as any
            }
        >
            <g>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </g>
        </animated.svg>
    );
};

const RaisedCheckbox: React.FC<CheckboxProps> = (props) => {
    const theme = useTheme();
    const { checked, color, disabled } = props;
    const springProps = useSpring({
        boxShadow: `0 ${checked ? 5 : 10}px ${checked ? 15 : 20}px 0 ${getComponentColor(
            checked,
            getHexFromTheme(theme, color as any, 200),
            disabled,
            '#d6d6d6'
        )}`,
        config: config.stiff,
    } as any);
    return (
        <CheckboxComponent
            containerProps={{
                style: {
                    ...springProps,
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
