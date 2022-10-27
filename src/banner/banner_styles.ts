const commonStyles = {
    container: 'ds-w-full ds-relative ds-flex ds-items-center ds-z-[1] children:ds-z-[1] ds-bg-light-500 ds-rounded-lg',
    iconContainer: 'ds-flex ds-items-center ds-justify-center ',
};

export const baseStyles = {
    container: {
        regular: `${commonStyles.container} ds-px-3 ds-py-4  md:ds-p-2 `,
        small: `${commonStyles.container} ds-p-2 `,
    },
    background: {
        regular:
            "before:ds-w-full before:ds-h-full before:ds-absolute before:ds-bg-current before:ds-top-0 before:ds-left-0 before:ds-opacity-20 before:ds-z-0 before:ds-content-[''] before:ds-rounded-md",
        small: null,
    },
};
export const iconStyles = {
    container: {
        regular: `${commonStyles.iconContainer} ds-mr-2  md:ds-absolute md:-ds-top-1.5 md:ds-p-[4px] md:ds-shadow-slim md:-ds-left-1.5 md:ds-rounded-full md:ds-bg-light-500`,
        small: `${commonStyles.iconContainer}  ds-absolute -ds-top-1.5 ds-p-[4px] ds-shadow-slim -ds-left-1.5 ds-rounded-full ds-bg-light-500 ds-p-2 ds-z-[1] children:ds-z-[1] ds-bg-light-500 ds-rounded-lg`,
    },
    icon: {
        regular: 'ds-w-6 ds-h-6 md:ds-w-2 md:ds-h-2 ',
        small: 'ds-w-2 ds-h-2 ',
    },
};
