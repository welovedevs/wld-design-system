import { secondary } from '../../app/palettes';
import { flexUtils } from '../../../style/js';

export const styles = {
    heading: {
        height: 340,
        maxHeight: '40vh',
        position: 'relative',
        ...flexUtils.center
    },
    video: {
        zIndex: 2,
        width: '100%',
        height: '100%'
    },
    frontImage: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        zIndex: 2,
        padding: 10
    },
    backgroundBlur: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        objectFit: 'cover'
    },
    body: {
        maxHeight: '40vh',
        minHeight: 180,
        flex: 1,
        overflowY: 'auto',
        backgroundColor: 'white',
        margin: [20, 20, 30, 20]
    },
    bodyWrapper: {
        ...flexUtils.center,
        justifyContent: 'space-around',
        flexDirection: 'column'
    },
    buttons: {
        display: 'flex',
        alignItems: 'center'
    },
    dialogPaper: {
        width: '100%',
        maxWidth: 600,
        overflow: 'visible',
        '& .slick-dots': {
            bottom: -50
        }
    },
    swipeIcon: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        animation: 'swipe-icon-movement 1s ease-in-out infinite alternate',
        transformOrigin: 'bottom center'
    },
    iNeedHelp: {
        cursor: 'pointer',
        position: 'absolute',
        bottom: 5,
        right: 5,
        fontStyle: 'italic',
        fontSize: 12
    },
    carousel: {
        flex: 1
    },
    title: {
        padding: [0, 20],
        marginBottom: 20
    },
    reverseButton: {
        '& > svg': {
            transform: 'scale(-1)'
        }
    },
    nextButton: {
        right: -80
    },
    previousButton: {
        left: -80
    },
    navigateButton: {
        top: 'calc(50% - 25px)',
        position: 'absolute',
        backgroundColor: secondary[500],
        height: 50,
        width: 50,
        boxShadow: '0 20px 67px 0 rgba(0,0,0,.3)',
        cursor: 'pointer',
        borderRadius: '50%',
        ...flexUtils.center,
        '& > svg': {
            height: 20,
            width: 'auto'
        }
    },
    carouselStep: {
        position: 'relative',
        minWidth: 300,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden'
    },
    carouselStepFullScreen: {
        borderRadius: 0,
        height: '100vh'
    }
};
