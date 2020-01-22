import { flexUtils } from '../../../../style/js';

const { center } = flexUtils;

export const styles = {
    container: ({ color }) => ({
        height: 350,
        backgroundColor: color,
        ...center
    })
};
