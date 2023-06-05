import React, { ReactElement } from 'react';
import { SuggestionSelectedEventData } from 'react-autosuggest';
import { TextFieldProps } from '../text_field/text_field';
import { PopperProps } from '@mui/material/Popper';
interface Props {
    multiple?: boolean;
    selectedSuggestions?: string[];
    placeholder?: string;
    suggestions: any[];
    onChange: (value: any) => void;
    onSelect: (data: SuggestionSelectedEventData<any>) => void;
    getSuggestionValue: (value: any) => any;
    renderSuggestion?: (value: any) => 'string' | ReactElement | JSX.Element;
    renderSuggestionsContainer?: (value: any) => 'string' | ReactElement | JSX.Element;
    renderInputComponent?: (value: any) => 'string' | ReactElement | JSX.Element;
    filterFunction?: (input: string) => (value: any) => boolean;
    renderNoSuggestion?: (...attibutes: any[]) => 'string' | ReactElement | JSX.Element;
    maxLength?: number;
    value: string;
    id?: string;
    name?: string;
    transformSuggestionValue?: (value: any) => any;
    classes?: {
        popper?: string;
        field?: string;
    };
    popperPlacement?: PopperProps['placement'];
}
export declare const AutoComplete: React.FC<Omit<TextFieldProps, "onChange" | "onSelect" | "multiple"> & Props>;
export {};
