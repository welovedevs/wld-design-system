import React, { useCallback, useEffect, useRef } from 'react';

import cn from 'classnames';

import makeStyles from '@mui/styles/makeStyles';
import SlickCarousel from 'react-slick';
import { Twemoji } from 'react-emoji-render';
import { motion } from 'framer-motion';

import { Dialog, useMediaQuery } from '@mui/material';

import { Button } from '../button/button';
import { Typography } from '../typography/typography';

import { styles } from './carousel_styles';

import './override_nuka.scss';
import { SwipeIcon } from '../assets/icons/swipe_component';
import { ArrowIcon } from '../assets/icons/arrow_component';

const useStyles = makeStyles(styles);

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
      if (arrowRole === 'prev' && currentSlide === 0) {
        return null;
    }
    if (arrowRole === 'next' && currentSlide === slideCount - 1) {
        return null;
    }
    return (
        <motion.button
            onClick={onClick}
            className={cn(className, buttonClassName, classes.navigateButton, reverse && classes.reverseButton)}
            type="button"
            initial={{scale: 1}}
            whileHover={{scale: 0.9}}
        >
            <ArrowIcon />
        </motion.button>
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
