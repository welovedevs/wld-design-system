import {createStyles} from "@material-ui/core";

export const styles = createStyles({
    container: ({ value, spacing }) => ({
        height: spacing * value
    })
});
