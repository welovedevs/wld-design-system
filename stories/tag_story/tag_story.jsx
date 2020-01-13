import React from 'react';

import injectSheet from 'react-jss';

import { Tag } from '../../src/components/tag/tag';
import { Typography } from '../../src/components/typography/typography';

import styles from './tag_story_styles';

const TAGS = Object.freeze({
    primary: {
        color: 'primary',
        label: 'Primary'
    },
    secondary: {
        color: 'secondary',
        label: 'Secondary'
    }
});

const TagStory = ({ classes }) => (
    <div className={classes.container}>
        {Object.entries(TAGS).map(([id, { label, ...other }]) => (
            <Tag key={`tag_${id}`} {...other}>
                <Typography variant="tag" color="#fff">
                    {label}
                </Typography>
            </Tag>
        ))}
    </div>
);

export default injectSheet(styles)(TagStory);
