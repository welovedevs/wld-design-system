import React from 'react';

import { createUseStyles } from 'react-jss';

import { Banner } from '../../src/components/banner/banner';
import { BANNER_DATA } from '../../src/components/banner/banner_data';

import { styles } from './banner_story_styles';

const useStyles = createUseStyles(styles);

const BannerStoryComponent = () => {
    const classes = useStyles();
    return Object.keys(BANNER_DATA).map(type => (
        <Banner
            key={`banner_${type}`}
            customClasses={{
                container: classes.banner
            }}
            {...{ type }}
        />
    ));
};

export default BannerStoryComponent;
