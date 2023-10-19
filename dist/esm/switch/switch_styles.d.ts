type StylesKeys = 'container';
export type Classes = {
    [key in StylesKeys]?: string;
};
export declare const baseStyles: {
    container: string;
    disabled: string;
    thumbContainer: string;
    thumb: string;
    input: string;
    brightLayer: string;
};
export declare const sizeStyles: {
    readonly size_regular: "ds-min-h-[30px] ds-w-[80px]";
    readonly thumb_size_regular: "ds-w-3 ds-h-3 ";
    readonly size_small: "ds-min-h-[20px] ds-w-[50px]";
    readonly thumb_size_small: "ds-w-1.5 ds-h-1.5";
};
export declare const thumbPositionStyles: {
    regular: {
        left: string;
        right: string;
    };
    small: {
        left: string;
        right: string;
    };
};
export {};
