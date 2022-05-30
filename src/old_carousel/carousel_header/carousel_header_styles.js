import { flexUtils } from '../../../../style/js';
import createStyles from "@mui/styles/createStyles";

const { center } = flexUtils;

export const styles = createStyles({
    container: ({ color }) => ({
        height: 350,
        backgroundColor: color,
        ...center,
    }),
});
