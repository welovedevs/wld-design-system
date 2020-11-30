import { CardVariant } from './card';

export const ELEVATION_SPRING_PROPS: { [key in CardVariant | 'regular']: any } = {
    regular: {
        0: {
            boxShadow: '0 2px 10px 0 rgba(0,0,0,0.1)',
        },
        1: {
            boxShadow:
                'rgba(0, 0, 0, 0.1) 0px -1px 1px 0px, rgba(0, 0, 0, 0.1) 1px 0px 1px 0px, rgba(0, 0, 0, 0.1) -1px 0px 1px 0px, rgba(0, 0, 0, 0.1) 0px 1px 1px 0px',
        },
        drawer: {
            boxShadow: '0 20px 67px 0 rgba(0,0,0,0.3)',
        },
    },
    flat: null,
};
