const VIEWPORT_SPACING = 30;

export default {
    container: {
        minHeight: 80,
        minWidth: 400,
        backgroundColor: '#fff',
        position: 'fixed',
        borderRadius: 5,
        boxShadow: '0 5px 25px 10px rgba(0, 0, 0, .17)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        padding: 10
    },
    bottom: {
        top: 'unset',
        bottom: VIEWPORT_SPACING
    },
    bottomLeft: {
        extend: 'bottom',
        left: VIEWPORT_SPACING
    },
    bottomRight: {
        extend: 'bottom',
        right: VIEWPORT_SPACING
    },
    top: {
        bottom: 'unset',
        top: VIEWPORT_SPACING
    },
    topLeft: {
        extend: 'top'
    },
    topRight: {
        extend: 'top',
        right: VIEWPORT_SPACING
    }
};
