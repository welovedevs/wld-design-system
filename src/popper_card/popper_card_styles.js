import createStyles from "@material-ui/styles/createStyles";

export const styles = createStyles({
    popper: {
        zIndex: 100,
        '&[x-placement*="bottom"] $container': {
            top: 15,
        },
        '&[x-placement*="bottom"] $arrowContainer': {
            top: 0,
            '& > svg': {
                top: 1,
            },
        },
        '&[x-placement*="top"] $container': {
            bottom: 15,
        },
        '&[x-placement*="top"] $arrowContainer': {
            bottom: 0,
            '& > svg': {
                bottom: 1,
                transform: 'scaleY(-1)',
            },
        },
        '&[x-placement*="right"] $container': {
            left: 15,
        },
        '&[x-placement*="right"] $arrowContainer': {
            left: 0,
            width: 20,
            '& > svg': {
                left: 1,
                transform: 'rotate(-90deg)',
            },
        },
        '&[x-placement*="left"] $container': {
            right: 15,
        },
        '&[x-placement*="left"] $arrowContainer': {
            right: 0,
            width: 20,
            '& > svg': {
                right: 1,
                transform: 'rotate(90deg)',
            },
        },
    },
    closedPopper: {
        pointerEvents: 'none',
        top: 0,
        left: 0,
    },
    wrapper: {
        willChange: 'transform',
    },
    container: {
        position: 'relative',
        border: 'none',
    },
    structured: {
        padding: 0,
    },
    arrowContainer: {
        position: 'absolute',
        width: 'fit-content',
        display: 'flex',
        '& > svg': {
            height: 15,
            width: 30,
            position: 'relative',
            zIndex: 1,
            '& > g > path': {
                fill: '#fff',
            },
        },
    },
});
