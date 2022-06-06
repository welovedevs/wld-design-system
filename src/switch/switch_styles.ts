import createStyles from '@mui/styles/createStyles';

type StylesKeys = 'container';

export type Classes = {
    [key in StylesKeys]?: string;
};

export const baseStyles = {
    container: 'ds-group ds-h-fit ds-relative ds-bg-current ds-rounded-full ds-flex ds-items-center ds-justify-center',
    disabled: 'ds-cursor-not-allowed',
    thumbContainer: 'ds-w-full ds-flex ds-items-center ds-absolute ds-transition-all',
    thumb: ' ds-m-1/2 ds-bg-[#f7f7f7] ds-rounded-full',
    input:
        'ds-w-full ds-h-full ds-top-0 ds-bottom-0 ds-right-0 ds-left-0 ds-m-0 ds-z-[2] ds-cursor-inherit ds-absolute ds-opacity-0',
    brightLayer : 'ds-w-full ds-h-full ds-absolute ds-z-[1] ds-bg-[#fff] ds-opacity-0 group-hover:ds-opacity-[0.30] ds-top-0 ds-bottom-0 ds-left-0 ds-right-0 ds-transition-all'
};
export const sizeStyles = {
    size_regular: 'ds-min-h-[30px] ds-w-[80px]',
    thumb_size_regular: 'ds-w-3 ds-h-3 ',
    size_small: 'ds-min-h-[20px] ds-w-[50px]',
    thumb_size_small: 'ds-w-1.5 ds-h-1.5',
} as const;

export const thumbPositionStyles = {
    regular: {
        left: 'ds-left-[2px]',
        right: 'ds-left-[calc(80px-28px-6px)]',
    },
    small: {
        left: 'ds-left-[2px]',
        right: 'ds-left-[calc(100%-20px-2px)]',
    },
};

export const styles = createStyles({
    container: {
        minHeight: 30,
        height: 'fit-content',
        width: 80,
        position: 'relative',
        backgroundColor: 'currentColor',
        borderRadius: 150,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    disabled: {
        cursor: 'not-allowed',
    },
    thumbContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    thumb: {
        height: 25,
        width: 25,
        margin: 6,
        backgroundColor: '#f7f7f7',
        boxShadow: '0 2px 8px rgba(0, 0, 0,.15)',
        borderRadius: '50%',
    },
    brightLayer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#fff',
        zIndex: 1,
    },
    input: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0,
        padding: 0,
        margin: 0,
        cursor: 'inherit',
        zIndex: 2,
    },
});
