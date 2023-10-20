export type TextFieldVariants = 'flat' | 'raised' | 'underlined';
type TextFieldDisabledVariants = `${TextFieldVariants}Disabled`;

export const baseStyles = {
    container:
        'ds-w-fit ds-rounded-md ds-flex ds-items-center ds-p-0 ds-overflow-hidden ds-border ds-border-solid ds-border-dark-100 focus-within:ds-border-indigo-500 focus-within:ds-ring-2',
    multilineContainer: '',
    input:
        'ds-bg-transparent ds-w-full  ds-border-0 ds-font-w3d ds-text-dark-400 ds-flex ds-items-center focus-visible:ds-outline-none focus-visible:ds-ring-0 focus-visible:ds-border-0',
    multilineInput: 'ds-px-2 ds-py-1 ds-scrollbar',
    disabled: 'ds-cursor-not-allowed ',
};

export const sizeStyles = {
    small: 'ds-px-1 ds-py-1/2 ds-min-h-3 ds-leading-[16px] ds-text-[12px]',
    regular: 'ds-px-1.5 ds-py-1.5 ds-min-h-[40px] ds-text-[16px] ds-leading-[24px] ',
};

export const variantStyles: { [key in TextFieldVariants | TextFieldDisabledVariants]: string } = {
    flat: 'ds-border ds-border-solid ds-border-dark-100 ds-bg-[#f9f9f9]',
    raised: 'ds-bg-light-500 ds-shadow-md hover:ds-shadow-lg',
    underlined: 'ds-bg-transparent ds-border-0 ds-border-b-2 ds-border-solid ds-border-[#e8e8e8] ds-rounded-none',
    flatDisabled: `ds-bg-[#f9f9f9] ds-text-dark-200`,
    raisedDisabled: ``,
    underlinedDisabled: ``,
};

export const inputStyles: { [key in TextFieldVariants | TextFieldDisabledVariants | 'disabled']: string } = {
    flat: '',
    raised: '',
    underlined: 'ds-pb-1',
    disabled: `${baseStyles.disabled}  ds-text-dark-300`,
    flatDisabled: `${baseStyles.disabled}  ds-text-dark-200`,
    raisedDisabled: ``,
    underlinedDisabled: ``,
};
