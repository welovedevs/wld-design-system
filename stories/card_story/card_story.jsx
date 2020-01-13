import React from 'react';

import injectSheet from 'react-jss';
import { select } from '@storybook/addon-knobs';

import { Card } from '../../src/components/card/card';
import { ELEVATION_SPRING_PROPS } from '../../src/components/card/card_elevation_spring_props';

import styles from './card_story_styles';

const ELEVATIONS_KEYS = Object.keys(ELEVATION_SPRING_PROPS);

const CardStory = ({ classes }) => {
    const elevation = select(
        'Elevation',
        ELEVATIONS_KEYS.reduce((acc, key) => {
            const accCopy = acc;
            accCopy[key] = key;
            return accCopy;
        }, {}),
        Object.keys(ELEVATION_SPRING_PROPS)[0]
    );
    console.log({ elevation })
    return <Card className={classes.container} {...{ elevation }} />;
};

export default injectSheet(styles)(CardStory);
