import {createStyles} from "@material-ui/core";

export const styles = createStyles({
    popperCard: {
        maxWidth: 600,
        border: 'none',
        '& > ul': {
            listStyleType: 'none',
            margin: 0,
            padding: 0,
        },
    },
    listItem: {
        borderRadius: 5,
    },
});
