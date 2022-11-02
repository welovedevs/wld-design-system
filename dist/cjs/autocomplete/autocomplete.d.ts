import { ReactElement } from 'react';
import { SuggestionSelectedEventData } from 'react-autosuggest';
import { TextFieldProps } from '../text_field/text_field';
import { PopperProps } from '@mui/material/Popper';
interface Props {
    placeholder?: string;
    suggestions: any[];
    onChange: (value: any) => void;
    onSelect: (data: SuggestionSelectedEventData<any>) => void;
    getSuggestionValue: (value: any) => any;
    renderSuggestion: (value: any) => 'string' | ReactElement | JSX.Element;
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
export declare function AutoComplete({ placeholder, suggestions, onChange, onSelect, getSuggestionValue, renderSuggestion: renderSuggestionProps, filterFunction, renderNoSuggestion, maxLength, value: propsValue, id, name, transformSuggestionValue, classes, popperPlacement, ...other }: Omit<TextFieldProps, 'onSelect' | 'onChange'> & Props): JSX.Element;
export {};
