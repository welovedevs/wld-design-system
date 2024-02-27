const commonStyles = {
    container: 'ds-w-full ds-relative ds-flex ds-items-center ds-z-10 children:ds-z-10 ds-bg-light-500 ds-rounded-md',
    iconContainer: 'ds-flex ds-items-center ds-justify-center',
};

export const baseStyles = {
    container: {
        regular: `${commonStyles.container} ds-px-2.5 ds-py-1.5 md:ds-px-2 md:ds-p-1 md:ds-text-sm`,
        small: `${commonStyles.container} ds-px-2 ds-py-1 ds-text-sm`,
    },
    background: {
        regular:
            "before:ds-w-full before:ds-h-full before:ds-absolute before:ds-bg-current before:ds-top-0 before:ds-left-0 before:ds-opacity-20 before:ds-z-0 before:ds-content-[''] before:ds-rounded-md",
        small: null,
    },
};
export const iconStyles = {
    container: {
        regular: `${commonStyles.iconContainer} ds-mr-1.5 md:ds-w-3 md:ds-h-3 md:ds-absolute md:-ds-top-1 md:-ds-left-1 md:ds-p-1/2 md:ds-shadow-slim md:ds-rounded-full md:ds-bg-light-500`,
        small: `${commonStyles.iconContainer} ds-w-3 ds-h-3 ds-absolute -ds-top-1 -ds-left-1 ds-p-1/2 ds-shadow-slim ds-rounded-full ds-bg-light-500 ds-z-10 children:ds-z-10`,
    },
    icon: {
        regular: 'ds-w-4 ds-h-4 md:!ds-w-2 md:!ds-h-2',
        small: '!ds-w-2 !ds-h-2',
    },
};
