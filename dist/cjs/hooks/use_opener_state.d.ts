type Handlers = {
    onClick?: (...parameters: any) => void;
    onMouseEnter?: (...parameters: any) => void;
    onMouseLeave?: (...parameters: any) => void;
    onFocus?: (...parameters: any) => void;
    onBlur?: (...parameters: any) => void;
};
export declare const useOpenerState: ({ mobileWidth, useClickOnMobile, defaultHandlers, }?: {
    mobileWidth?: number | undefined;
    useClickOnMobile?: boolean | undefined;
    defaultHandlers?: {
        onClick?: (() => void) | undefined;
    } | undefined;
}) => [boolean, Handlers, {
    setOpened: () => void;
    setClosed: () => void;
    toggle: (value: boolean) => void;
}];
export {};
