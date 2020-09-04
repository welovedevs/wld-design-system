import React, { useCallback, useEffect, useRef } from 'react';

import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import SlickCarousel from 'react-slick';
import { Twemoji } from 'react-emoji-render';
import { animated, config, useSpring } from 'react-spring';

import { Dialog, useMediaQuery } from '@material-ui/core';

import { Button } from '../button/button';
import { Typography } from '../typography/typography';

const SwipeIcon = require('../assets/icons/swipe.svg');
const ArrowIcon = require('../assets/icons/arrow.svg');

import { styles } from './carousel_styles';

import './override_nuka.scss';

const useStyles = makeStyles(styles);

const DEFAULT_ARROW_SPRING_PROPS = Object.freeze({
    scale: 1,
});

const NavigateButton = ({
    className,
    classes,
    reverse,
    onClick,
    buttonProps: { className: buttonClassName },
    currentSlide,
    slideCount,
    arrowRole,
}) => {
    const [springProps, setSpringProps] = useSpring(() => DEFAULT_ARROW_SPRING_PROPS);
    const handleMouseDown = useCallback(() => {
        setSpringProps(() => ({
            scale: 0.9,
        }));
    }, [setSpringProps]);
    const handleMouseUp = useCallback(() => {
        setSpringProps(() => DEFAULT_ARROW_SPRING_PROPS);
    }, [setSpringProps]);
    if (arrowRole === 'prev' && currentSlide === 0) {
        return null;
    }
    if (arrowRole === 'next' && currentSlide === slideCount - 1) {
        return null;
    }
    return (
        <animated.button
            onClick={onClick}
            className={cn(className, buttonClassName, classes.navigateButton, reverse && classes.reverseButton)}
            type="button"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onFocus={handleMouseDown}
            onBlur={handleMouseUp}
            style={{
                transform: springProps.scale.to((value) => `scale3d(${value}, ${value}, ${value})`),
            }}
        >
            <ArrowIcon />
        </animated.button>
    );
};

const CarouselStep = ({ fullScreen, freelyStructuredSteps, step, onAction, onDismiss, classes }) => (
    <div className={cn(classes.carouselStep, fullScreen && classes.carouselStepFullScreen)}>
        <StepContent
            {...{
                fullScreen,
                freelyStructuredSteps,
                step,
                onAction,
                onDismiss,
                classes,
            }}
        />
    </div>
);

const StepContent = ({ freelyStructuredSteps, fullScreen, step, onAction, onDismiss, classes }) => {
    const isMobile = useMediaQuery('(max-width: 500px)');

    if (freelyStructuredSteps) {
        return step({ onAction, isMobile, fullScreen });
    }
    return <StructuredStep {...{ onAction, step, isMobile, onDismiss, classes }} />;
};

const StructuredStep = ({ onAction, step, isMobile, onDismiss, classes }) => {
    const { formatMessage, formatHTMLMessage } = useIntl();

    const { imgHandle, videoLink, subtitle, title, dismissButtonText, buttonText, dismissable, onClickPayload } = step;

    const helpClicked = useCallback(() => {
        talkus('sendMessage', formatMessage(translations.talkusNeedHelp));
    }, [formatMessage]);

    const handleAction = useCallback(() => {
        onAction(onClickPayload);
    }, [onAction, onClickPayload]);

    return (
        <>
            <div className={classes.heading}>
                <FilestackImage
                    className={classes.backgroundBlur}
                    handle="PghPn9c7QeuQeZXiyrOM"
                    additionalTasks="resize=width:600,height:340,fit:clip"
                    quality={90}
                />
                {videoLink && (
                    <ReactPlayer
                        className={classes.video}
                        playing
                        loop
                        url={videoLink}
                        autoPlay
                        width="100%"
                        height="100%"
                    />
                )}
                {imgHandle && (
                    <>
                        <FilestackImage
                            className={classes.frontImage}
                            handle={imgHandle}
                            additionalTasks="resize=width:600,height:340,fit:clip"
                            quality={90}
                        />
                    </>
                )}
            </div>
            <div className={classes.body}>
                <div className={classes.bodyWrapper}>
                    {title && (
                        <Typography
                            className={classes.title}
                            variant="h3"
                            component={({ children, ...other }) => (
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: typeof title === 'string' ? title : formatHTMLMessage(title),
                                    }}
                                    {...other}
                                />
                            )}
                        />
                    )}
                    {subtitle && (
                        <Typography
                            className={classes.title}
                            component={({ children, ...other }) => (
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: typeof subtitle === 'string' ? subtitle : formatHTMLMessage(subtitle),
                                    }}
                                    {...other}
                                />
                            )}
                        />
                    )}
                    <div className={classes.buttons}>
                        {dismissable && (
                            <Button onClick={onDismiss} variant="contained" style={{ color: 'white' }}>
                                <Twemoji svg text={formatMessage(dismissButtonText || translations.noThanks)} />
                            </Button>
                        )}
                        {onClickPayload && (
                            <Button
                                variant="contained"
                                size={isMobile && 'small'}
                                color="primary"
                                onClick={handleAction}
                            >
                                <Twemoji svg text={formatMessage(buttonText || translations.ok)} />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            {isMobile && <SwipeIcon className={classes.swipeIcon} />}
            <Typography
                className={classes.iNeedHelp}
                onClick={helpClicked}
                component={({ children, ...other }) => <Twemoji svg text={children} {...other} />}
            >
                {formatMessage(translations.needHelp)}
            </Typography>
        </>
    );
};

const CarouselComponent = ({
    open,
    onCarouselEnd,
    onClick,
    onDismiss,
    onClose,
    steps,
    fullScreen,
    children,
    customClasses = {},
}) => {
    const classes = useStyles(styles);
    const carouselRef = useRef();

    const handleAction = useCallback(
        ({ action }) => {
            if (action === CAROUSEL_ACTIONS.STEP_END) {
                onCarouselEnd();
            } else if (action === CAROUSEL_ACTIONS.NEXT) {
                carouselRef.current.slickNext();
            } else if (action === CAROUSEL_ACTIONS.PREV) {
                carouselRef.current.slickPrev();
            }
        },
        [carouselRef.current, onCarouselEnd]
    );

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.slickGoTo(0);
        }
    }, [steps]);

    return (
        <Dialog
            classes={{ paper: cn(classes.dialogPaper, customClasses.dialogPaper) }}
            {...{ open, onClose, fullScreen }}
        >
            <SlickCarousel
                ref={carouselRef}
                dots
                infinite={false}
                prevArrow={
                    <NavigateButton
                        {...{ classes }}
                        arrowRole="prev"
                        buttonProps={{ className: classes.previousButton }}
                    />
                }
                nextArrow={
                    <NavigateButton
                        {...{ classes }}
                        arrowRole="next"
                        buttonProps={{ className: classes.nextButton }}
                        reverse
                    />
                }
            >
                {steps.map((step, stepIndex) => (
                    <CarouselStep
                        key={`carousel_step_${stepIndex}`}
                        onAction={handleAction}
                        {...{
                            fullScreen,
                            classes,
                            onDismiss,
                            step,
                            onClick,
                        }}
                    />
                ))}
            </SlickCarousel>
            {children}
        </Dialog>
    );
};

export const Carousel = CarouselComponent;
