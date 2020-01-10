import React from 'react';

import injectSheet from 'react-jss';

import styles from './story_container_styles';

const StoryContainer = ({ children, classes }) => <div className={classes.container}>{children}</div>;

export default injectSheet(styles)(StoryContainer);
