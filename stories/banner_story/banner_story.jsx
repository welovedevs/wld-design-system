import React from 'react';

import {Banner} from '../../src/banner/banner';
import {BANNER_DATA} from '../../src/banner/banner_data';

import {styles} from './banner_story_styles';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(styles);

const BannerStoryComponent = () => {
    const classes = useStyles();
    return Object.keys(BANNER_DATA).map((type) => (
        <Banner
            key={`banner_${type}`}
            customClasses={{
                container: classes.banner,
            }}
            {...{type}}
        />
    ));
};

export default BannerStoryComponent;
