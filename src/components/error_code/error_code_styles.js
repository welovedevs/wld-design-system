export default {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '90%'
    },
    avatar: {
        height: 180,
        width: 180,
        '& svg': {
            height: 180,
            width: 180
        }
    },
    texts: {
        marginTop: -8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    code: {
        zIndex: 2
    },
    shortMessage: {
        display: 'flex',
        alignItems: 'center'
    },
    popperCard: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10
    },
    button: {
        width: 'auto',
        margin: 5
    },
    popper: {
        marginLeft: 6
    },
    withMarginPopper: {
        marginLeft: 0
    },
    informationIconButton: {
        marginLeft: 15,
        cursor: 'pointer',
        display: 'flex'
    },
    tooltip: {
        fontSize: 13,
        padding: [8, 12]
    },
    isMedium: {
        '& $avatar': {
            height: 150,
            width: 150,
            '& svg': {
                height: 150,
                width: 150
            }
        }
    },
    isSmall: {
        '& $avatar': {
            height: 120,
            width: 120,
            '& svg': {
                height: 120,
                width: 120
            }
        }
    },
    link: {
        extend: 'button',
        display: 'flex',
        '& > $button': {
            width: '100%',
            margin: 0
        }
    }
};
