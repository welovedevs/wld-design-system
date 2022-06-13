export const baseStyles = {
    container: 'ds-font-avenir ds-text-dark-500',
    heading: 'ds-font-avenir ds-text-dark-500',
    wld:
        'ds-width-fit ds-rounded-lg ds-text-center ds-uppercase ds-font-black ds-bg-light ds-skew-y-[-5deg] ds-origin-bottom-left',
};

export const headingStyles = {
    h1: `${baseStyles.heading} ds-text-3xl ds-font-black`,
    h2: `${baseStyles.heading} ds-text-2xl ds-font-bold`,
    h3: `${baseStyles.heading} ds-text-xl ds-font-medium`,
    h4: `${baseStyles.heading} ds-text-lg ds-font-normal`,
    h5: `${baseStyles.heading} ds-font-normal`,
    h6: `${baseStyles.heading} ds-font-normal`,
};

export const bodyStyles = {
    body1: 'text-base',
    body2: 'text-sm',
    body3: 'text-xs',
};

export const componentStyles = {
    tag: 'ds-text-[11px] ds-uppercase ds-font-bold ds-tracking-[0.8px]',
    button: 'ds-text-[12px] ds-uppercase ds-font-medium ds-tracking-[0.8px]',
    helper: 'ds-text-[13px] ds-mt-2',
    label: `${bodyStyles.body2} ds-mb-1`,
};
export const wldStyles = {
    wld1: `${baseStyles.wld} ds-text-[54px] ds-leading-[62px] ds-py-[12px] ds-px-[28px]`,
    wld2: `${baseStyles.wld} ds-text-[40px] ds-leading-[50px] ds-py-[12px] ds-px-[24px]`,
    wld3: `${baseStyles.wld} ds-text-[30px] ds-leading-[44px] ds-py-[11px] ds-px-[22px]`,
    wld4: `${baseStyles.wld} ds-text-[22px] ds-leading-[38px] ds-py-[10px] ds-px-[20px]`,
    wld5: `${baseStyles.wld} ds-text-[16px] ds-leading-[30px] ds-py-[9px] ds-px-[18px]`,
    wld6: `${baseStyles.wld} ds-text-[13px] ds-leading-[26px] ds-py-1 ds-px-2`,
    wld: `${baseStyles.wld} ds-py-1 ds-px-2`,
};

export const VariantStyles = {
    ...headingStyles,
    ...bodyStyles,
    ...componentStyles,
    ...wldStyles,
} as const;

export type TypographyVariants = keyof typeof VariantStyles;
