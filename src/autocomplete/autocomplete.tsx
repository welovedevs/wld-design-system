import React, { useMemo } from 'react';

import { AutocompleteOwnerState, AutocompleteRenderOptionState, Box } from '@mui/material';
import Autocomplete, { AutocompleteProps, AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const AutoCompleteComponent = <T extends any>({
    options,
    className,
    classes,
    renderInput,
    getOptionLabel,
    renderOption,
    color = 'primary',
    ...props
}: Omit<AutocompleteProps<T, boolean | undefined, boolean | undefined, boolean | undefined, any>, 'renderInput'> & {
    renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
}) => {
    const renderOptionDefault = useMemo(
        () => (
            props: React.HTMLAttributes<HTMLLIElement>,
            option: T,
            state: AutocompleteRenderOptionState,
            ownerState: AutocompleteOwnerState<T, boolean, boolean, boolean, any>
        ) => (
            <Box component="li" key={state.index} {...props}>
                {getOptionLabel ? getOptionLabel(option) : (option as any).toString()}
            </Box>
        ),
        [getOptionLabel]
    );

    return (
        <Autocomplete
            {...props}
            options={options}
            className={`ds-bg-light-500 ds-h-full ds-min-w-[200px] sm:ds-min-w-full ${className}`}
            classes={{
                inputRoot: `!ds-py-0 !ds-px-1 !ds-h-full ${classes?.inputRoot}`,
                input: `!ds-ring-0 !ds-font-w3d ds-text-dark-400 !ds-h-full ${classes?.input}`,
                listbox: `!ds-custom-scrollbar ${classes?.listbox}`,
            }}
            color={color}
            renderInput={renderInput ?? ((params) => <TextField color={color as any} {...params} />)}
            getOptionLabel={getOptionLabel}
            renderOption={renderOption ?? renderOptionDefault}
        />
    );
};

export const AutoComplete = AutoCompleteComponent;
