import { CheckboxProps } from './checkbox';

export const baseClasses = {
    container:
        'ds-relative ds-margin-1 ds-cursor-pointer ds-overflow-hidden ds-m-1/2 ds-flex ds-items-center ds-justify-center ds-group',
    icon: 'ds-w-full ds-h-full ds-fill-current',
    input:
        'ds-h-full ds-w-full ds-absolute ds-top-0 ds-bottom-0 ds-right-0 ds-left-0 ds-cursor-[inherit] ds-p-0 ds-m-0 ds-z-10 ds-opacity-0',
    layer:
        'ds-w-full ds-w-full ds-absolute ds-top-0 ds-bottom-0 ds-right-0 ds-left-0 ds-z-[5] ds-opacity-0 group-hover:ds-opacity-[.20] ds-transition-all',
    size: {
        regular: 'ds-w-3 ds-h-3 ds-min-w-3 ds-min-h-3 ds-p-1/2 ds-rounded',
        small: 'ds-w-2 ds-h-2 ds-min-w-2 ds-min-h-2 ds-p-[1.5px] ds-rounded-sm',
    },
};
export const variantClasses: { [key in Exclude<CheckboxProps['variant'], undefined>]: string } = {
    contained: 'ds-border ds-border-solid ds-border-current',
    raised: 'ds-shadow-slim',
    outlined: 'ds-border ds-border-solid ds-border-current',
};
export const iconClasses: { [key in Exclude<CheckboxProps['variant'], undefined> | 'partial']: string } = {
    contained: 'ds-fill-[#fff]',
    raised: 'ds-fill-[#fff]',
    outlined: '',
    partial: 'ds-fill-current',
};
export const layerClasses: { [key in Exclude<CheckboxProps['variant'], undefined>]: string } = {
    contained: 'ds-bg-current',
    raised: 'ds-bg-[#fff]',
    outlined: 'ds-bg-current',
};

export const checkedLayerClasses: { [key in Exclude<CheckboxProps['variant'], undefined>]: string } = {
    contained: 'ds-bg-[#fff]',
    raised: 'ds-bg-[#fff]',
    outlined: 'ds-bg-current',
};
