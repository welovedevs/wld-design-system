import React from 'react';

import styles from './story_container_styles';
import withStyles from "@material-ui/styles/withStyles";

const StoryContainer = ({ children, classes }) => <div className={classes.container}>{children}</div>;

export default withStyles(styles)(StoryContainer);
