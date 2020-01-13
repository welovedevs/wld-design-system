import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import injectSheet from 'react-jss';
import { FormattedMessage, useIntl } from 'react-intl';
import { animated, useSpring } from 'react-spring';

import { useMediaQuery } from '@material-ui/core';
import { Info as InformationIcon } from '@material-ui/icons';

import { DEFAULT_ERROR_CODES_MESSAGES } from './default_error_codes_messages';

import { Button } from '../button/button';
import { Typography } from '../typography/typography';
import { PopperCard } from '../popper_card/popper_card';
import { Tooltip } from '../tooltip/tooltip';
import { getRandomPreconfiguredAvatar } from '../../../utils/avatars/avatars_utils';
import { W3DDevAvatar } from '../../developer/smallviews/avatar/avatar';

import styles from './error_code_styles';

const getTypographyVariants = ({ isMedium, isSmall, isExtraSmall }) => {
    if (isExtraSmall) {
        return {
            code: 'wld3',
            shortMessage: 'wld5'
        };
    }
    if (isSmall) {
        return {
            code: 'wld2',
            shortMessage: 'wld4'
        };
    }
    if (isMedium) {
        return {
            code: 'wld3',
            shortMessage: 'wld5'
        };
    }
    return {
        code: 'wld1',
        shortMessage: 'wld3'
    };
};

const ErrorCodeComponent = ({ code = 'unknown', classes }) => {
    const { formatMessage } = useIntl();
    const { shortMessage, longMessage } = DEFAULT_ERROR_CODES_MESSAGES[code] || DEFAULT_ERROR_CODES_MESSAGES.unknown;
    const mouthElementReference = useRef();
    const containerReference = useRef();
    const timeoutReference = useRef();
    const [openPopper, setPopperOpenState] = useState(false);
    const avatar = useMemo(() => getRandomPreconfiguredAvatar(), []);
    const springProps = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 }
    });
    const isMedium = useMediaQuery('(max-width: 750px)');
    const isSmall = useMediaQuery('(max-width: 550px)');
    const isExtraSmall = useMediaQuery('(max-width: 420px)');
    useEffect(() => {
        if (!containerReference.current) {
            return null;
        }
        timeoutReference.current = setTimeout(() => {
            const mouthsElements = containerReference.current.querySelectorAll(
                `.${classes.avatar} #${isExtraSmall ? 'Avataaar' : 'Mouth\\/Disbelief'}`
            );
            if (mouthsElements) {
                [mouthElementReference.current] = mouthsElements;
            }
            setPopperOpenState(true);
            timeoutReference.current = null;
        }, 500);
        return () => {
            clearTimeout(timeoutReference.current);
            timeoutReference.current = null;
            setPopperOpenState(false);
        };
    }, [containerReference.current, isExtraSmall]);
    const { code: codeVariant, shortMessage: shortMessageVariant } = useMemo(
        () =>
            getTypographyVariants({
                isMedium,
                isSmall,
                isExtraSmall
            }),
        [isMedium, isSmall, isExtraSmall]
    );
    return (
        <animated.div
            ref={containerReference}
            style={springProps}
            className={cn(
                classes.container,
                isMedium && classes.isMedium,
                isSmall && classes.isSmall,
                isExtraSmall && classes.isExtraSmall
            )}
        >
            <W3DDevAvatar
                className={classes.avatar}
                config={{
                    ...avatar,
                    mouthType: 'Disbelief'
                }}
            />
            <div className={classes.texts}>
                <Typography className={classes.code} color="secondary" variant={codeVariant}>
                    {code}
                </Typography>
                <Typography className={classes.shortMessage} color="thirdary" variant={shortMessageVariant}>
                    {formatMessage(shortMessage)}
                    <Tooltip title={formatMessage(longMessage)}>
                        <button type="button" className={classes.informationIconButton}>
                            <InformationIcon className={classes.informationIcon} />
                        </button>
                    </Tooltip>
                </Typography>
            </div>
            <PopperCard
                className={classes.popperCard}
                customClasses={{
                    popper: cn(classes.popper, isExtraSmall && classes.withMarginPopper)
                }}
                open={openPopper}
                anchorElement={mouthElementReference.current}
                popperProps={{
                    placement: isExtraSmall ? 'top' : 'right',
                    modifiers: {
                        preventOverflow: {
                            boundariesElement: 'viewport'
                        }
                    }
                }}
            >
                <GoHomeButton {...{ classes }} />
                <ContactUsButton {...{ classes }} />
            </PopperCard>
        </animated.div>
    );
};

const GoHomeButton = ({ classes }) => (
    <Link className={classes.link} to="/">
        <Button className={classes.button} color="primary" variant="outlined" size="small">
            <FormattedMessage id="Main.lang.home" defaultMessage="Retour à l'accueil" />
        </Button>
    </Link>
);

const ContactUsButton = ({ classes }) => {
    const handleClick = useCallback(() => {
        if (talkus) {
            talkus('open');
        }
    }, []);
    return (
        <Button className={classes.button} onClick={handleClick} color="secondary" variant="outlined" size="small">
            <FormattedMessage id="Main.lang.contactUs" defaultMessage="Nous contacter" />
        </Button>
    );
};

export const ErrorCode = injectSheet(styles)(memo(ErrorCodeComponent));
