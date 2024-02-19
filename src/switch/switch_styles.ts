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
        'ds-w-full ds-h-full ds-top-0 ds-bottom-0 ds-right-0 ds-left-0 ds-m-0 ds-z-20 ds-cursor-inherit ds-absolute ds-opacity-0',
    brightLayer : 'ds-w-full ds-h-full ds-absolute ds-z-10 ds-bg-[#fff] ds-opacity-0 group-hover:ds-opacity-[0.30] ds-top-0 ds-bottom-0 ds-left-0 ds-right-0 ds-transition-all'
};
export const sizeStyles = {
    size_regular: 'ds-min-h-[20px] ds-w-[40px]',
    thumb_size_regular: 'ds-w-[12px] ds-h-[12px] ',
    size_small: 'ds-min-h-[16px] ds-w-[32px]',
    thumb_size_small: 'ds-w-[10px] ds-h-[10px]',
} as const;

export const thumbPositionStyles = {
    regular: {
        left: 'ds-left-[1px]',
        right: 'ds-left-[calc(40px-12px-6px-2px)]',
    },
    small: {
        left: 'ds-left-[0px]',
        right: 'ds-left-[calc(32px-10px-5px-2px)]',
    },
};

