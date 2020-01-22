import React from 'react';

import { createUseStyles } from 'react-jss';

import { styles } from './carousel_styles';

const useStyles = createUseStyles(styles);

const CarouselComponent = () => {
    const classes = useStyles();
    return (
        'coucou'
    );
}

export const Carousel = CarouselComponent;
