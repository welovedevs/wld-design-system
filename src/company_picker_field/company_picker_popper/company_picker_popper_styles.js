import { dark} from "../../styles/palettes";

export default {
    popper: {
        zIndex: 9999
    },
    list: {
        maxWidth: 325,
        padding: [0, 10],
        maxHeight: '85vh',
        overflow: 'auto',
        '&::-webkit-scrollbar-track': {
            border: 0
        },
        '&::-webkit-scrollbar': {
            width: 4
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: dark[200],
            borderRadius: 100
        }
    },
    listItem: {
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        height: 50,
        width: 50,
        minHeight: 50,
        minWidth: 50,
        borderRadius: '50%',
        backgroundColor: dark[50],
        marginRight: 20,
        overflow: 'hidden'
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: '50%',
        objectFit: 'scale-down'
    },
    '@media screen and (max-width: 650px)': {
        list: {
            maxHeight: 200
        }
    }
};
