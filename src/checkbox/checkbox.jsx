import React, { forwardRef, useCallback, useEffect, useMemo } from 'react';

import cn from 'classnames';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { animated, config, useSpring } from 'react-spring';

import { getComponentColor, getHexFromTheme } from '../styles/utils/styles_utils';
import { dark } from '../styles/palettes';

import { styles } from './checkbox_styles';

const useStyles = makeStyles(styles);

const DEFAULT_BRIGHT_LAYER_SPRING_PROPS = {
    opacity: 0,
    config: config.stiff,
};

const CheckboxComponent = forwardRef(
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
            ...other
        },
        ref
    ) => {
        const theme = useTheme();
        const classes = useStyles();
        const hexColor = useMemo(() => getHexFromTheme(theme, color), [theme, color]);
        const defaultColor = useMemo(() => propsDefaultColor || getHexFromTheme(theme, 'dark', 500), [
            propsDefaultColor,
            theme,
        ]);

        const [brightLayerSpringProps, setBrightLayerSpringProps] = useSpring(() => DEFAULT_BRIGHT_LAYER_SPRING_PROPS);
        const { color: colorSpring } = useSpring({
            color: getComponentColor(checked, hexColor, disabled, defaultColor),
            config: config.stiff,
        });

        const handleChange = useCallback(
            (...parameters) => {
                if (disabled) {
                    return;
                }
                if (typeof onChange === 'function') {
                    onChange(...parameters);
                }
            },
            [disabled, onChange]
        );
        const showBrightLayer = useCallback(() =>
            setBrightLayerSpringProps(() => ({
                opacity: 0.3,
            }))
        );

        const dismissBrightLayer = useCallback(() =>
            setBrightLayerSpringProps(() => DEFAULT_BRIGHT_LAYER_SPRING_PROPS)
        );

        const handleMouseEnter = useCallback(
            (...parameters) => {
                if (typeof onMouseEnter === 'function') {
                    onMouseEnter(...parameters);
                }
                showBrightLayer();
            },
            [onMouseEnter]
        );

        const handleMouseLeave = useCallback(
            (...parameters) => {
                if (typeof onMouseLeave === 'function') {
                    onMouseLeave(...parameters);
                }
                dismissBrightLayer();
            },
            [onMouseLeave]
        );

        const handleFocus = useCallback(
            (...parameters) => {
                if (typeof onFocus === 'function') {
                    onFocus(...parameters);
                }
                showBrightLayer();
            },
            [onFocus]
        );

        const handleBlur = useCallback(
            (...parameters) => {
                if (typeof onBlur === 'function') {
                    onBlur(...parameters);
                }
                dismissBrightLayer();
            },
            [onBlur]
        );

        return (
            <Component
                className={cn(
                    className,
                    classes.container,
                    checked && classes.checked,
                    disabled && classes.disabled,
                    isRadio && classes.isRadio,
                    classes[variant]
                )}
                {...containerProps}
                style={{
                    color: colorSpring,
                    ...(containerProps && containerProps.style),
                }}
                {...{ ref }}
            >
                <CheckIcon {...{ checked, classes }} />
                <animated.div className={classes.brightLayer} style={brightLayerSpringProps} />
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

const CheckIcon = ({ checked, classes }) => {
    const [springProps, setSpringProps] = useSpring(() => DEFAULT_ICON_SPRING_PROPS);
    useEffect(() => {
        setSpringProps(() => (checked ? CHECKED_ICON_SPRING_PROPS : DEFAULT_ICON_SPRING_PROPS));
    }, [checked]);
    return (
        <animated.svg
            className={classes.checkIcon}
            viewBox="0 0 24 24"
            fill="#fff"
            style={{
                transform: springProps.scale.to((value) => `scale3d(${value}, ${value}, ${value})`),
                ...springProps,
            }}
        >
            <g>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </g>
        </animated.svg>
    );
};

const RaisedCheckbox = (props) => {
    const theme = useTheme();
    const { checked, color, disabled } = props;
    const springProps = useSpring({
        boxShadow: `0 ${checked ? 5 : 10}px ${checked ? 15 : 20}px 0 ${getComponentColor(
            checked,
            getHexFromTheme(theme, color, 200),
            disabled,
            '#d6d6d6'
        )}`,
        config: config.stiff,
    });
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

const WithVariantCheckbox = (props) => {
    const { variant = 'raised' } = props;
    if (variant === 'raised') {
        return <RaisedCheckbox {...{ variant }} {...props} />;
    }
    return <CheckboxComponent {...{ variant }} {...props} />;
};

export const Checkbox = WithVariantCheckbox;
