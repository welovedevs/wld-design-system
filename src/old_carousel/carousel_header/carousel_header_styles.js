import { flexUtils } from '../../../../style/js';
import createStyles from "@material-ui/styles/createStyles";

const { center } = flexUtils;

export const styles = createStyles({
    container: ({ color }) => ({
        height: 350,
        backgroundColor: color,
        ...center,
    }),
});
