import { flexUtils } from '../styles/utils/styles_utils';

const { center } = flexUtils;
import createStyles from '@mui/styles/createStyles';
import { CheckboxProps } from './checkbox';

type StylesKeys = 'container' | 'input';

export type Classes = {
    [key in StylesKeys]?: string;
};

export const baseClasses = {
    container:
        'ds-group ds-w-3 ds-h-3 ds-min-w-3 ds-min-h-3 ds-relative ds-margin-1 ds-p-1/2 ds cursor-pointer ds-overflow-hidden ds-m-1 ds-flex ds-items-center ds-justify-center',
    icon: 'ds-w-full ds-h-full ds-fill-current',
    input:
        'ds-h-full ds-w-full ds-absolute ds-top-0 ds-bottom-0 ds-right-0 ds-left-0 ds-cursor-[inherit] ds-p-0 ds-m-0 ds-z-10 ds-opacity-0',
    layer:
        'ds-w-full ds-w-full ds-absolute  ds-top-0 ds-bottom-0 ds-right-0 ds-left-0  ds-z-[5] ds-opacity-0 group-hover:ds-opacity-[.20] ds-transition-all',
};
export const variantClasses: { [key in Exclude<CheckboxProps['variant'], undefined>]: string } = {
    raised: 'ds-shadow-slim',
    outlined: 'ds-border ds-border-solid ds-border-current',
};
export const iconClasses: { [key in Exclude<CheckboxProps['variant'], undefined> | 'partial']: string } = {
    raised: 'ds-fill-[#fff] ',
    outlined: '',
    partial: 'ds-fill-current ',
};
export const layerClasses: { [key in Exclude<CheckboxProps['variant'], undefined>]: string } = {
    raised: 'ds-bg-[#fff]',
    outlined: 'ds-bg-current',
};
