import React from 'react';
import { Typography } from '../typography/typography';

interface TabsProps {
    tabs: { name: string; ref: string; current: boolean }[];
    setActiveTab: (ref: string) => void;
    classes?: {
        mobileContainer?: string;
        desktopContainer?: string;
        tab?: string;
        typography?: string;
    };
}

export const Tabs: React.FC<TabsProps> = ({ tabs, setActiveTab, classes }) => {
    return (
        <div>
            <div className={`ds-hidden xs:ds-block ${classes?.mobileContainer}`}>
                <label htmlFor="tabs" className="ds-sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="ds-block ds-w-full ds-rounded-md ds-border-gray-300 focus:ds-border-indigo-500 focus:ds-ring-indigo-500"
                    defaultValue={tabs.find((tab) => tab.current)?.name}
                    onChange={(e) => setActiveTab(e.target.value)}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name} className={classes?.typography}>
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={`ds-block xs:ds-hidden ${classes?.desktopContainer}`}>
                <nav
                    className="ds-isolate ds-flex ds-divide-x ds-divide-gray-200 ds-rounded-lg ds-shadow"
                    aria-label="Tabs"
                >
                    {tabs.map((tab, tabIdx) => (
                        <div
                            key={tab.name}
                            className={`
                                    ${tab.current ? 'ds-text-gray-900' : 'ds-text-gray-500 hover:ds-text-gray-700'}
                                    ${tabIdx === 0 ? 'ds-rounded-l-lg' : ''}
                                    ${tabIdx === tabs.length - 1 ? 'ds-rounded-r-lg' : ''}
                                    ds-group ds-relative ds-min-w-0 ds-flex-1 ds-overflow-hidden ds-bg-white ds-py-2 ds-px-4 ds-text-center ds-text-sm ds-cursor-pointer ds-font-medium hover:ds-bg-gray-50 focus:ds-z-10
                                    ${classes?.tab}
                                `}
                            aria-current={tab.current ? 'page' : undefined}
                            onClick={() => setActiveTab(tab.ref)}
                        >
                            <Typography className={`ds-whitespace-nowrap ${classes?.typography}`}>
                                {tab.name}
                            </Typography>
                            <span
                                aria-hidden="true"
                                className={`${
                                    tab.current ? 'ds-bg-indigo-500' : 'ds-bg-transparent'
                                } ds-absolute ds-inset-x-0 ds-bottom-0 ds-h-0.5`}
                            />
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
};
