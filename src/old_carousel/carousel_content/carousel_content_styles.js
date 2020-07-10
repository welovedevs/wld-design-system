import { flexUtils } from '../../../../style/js';

const { center } = flexUtils;

export const styles = createStyles({
    container: {
        width: '100%',
        minHeight: 200,
        padding: 30,
        backgroundColor: ({ color }) => color,
        flexDirection: 'column',
        ...center,
    },
});
