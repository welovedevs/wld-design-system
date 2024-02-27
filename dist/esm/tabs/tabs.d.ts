import React from 'react';
interface TabsProps {
    tabs: {
        name: string;
        ref: string;
        current: boolean;
    }[];
    setActiveTab: (ref: string) => void;
    classes?: {
        container?: string;
        mobileContainer?: string;
        desktopContainer?: string;
        tab?: string;
        typography?: string;
    };
}
export declare const Tabs: React.FC<TabsProps>;
export {};
