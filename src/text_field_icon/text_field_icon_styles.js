import { dark } from '../styles/palettes';

export default {
    container: {
        padding: [5, 20],
        display: 'flex',
        '& > svg': {
            maxHeight: 22,
            maxWidth: 22,
            fill: dark[400]
        }
    }
};
