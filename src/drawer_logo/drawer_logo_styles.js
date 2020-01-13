import { flexUtils } from '../../../style/js';

const { center } = flexUtils;

export default {
    container: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        '& > svg': {
            height: 25,
            width: 'auto',
            stroke: '#fff',
            filter: 'drop-shadow(0 0px 4px #a0a0a0)',
            '& > g': {
                stroke: 'inherit',
                boxShadow: '0 20px 67px 0 rgba(0,0,0,.3)'
            }
        },
        ...center
    },
    drawerAnchoredRightContainer: {
        left: 30,
        right: 'unset'
    }
};
