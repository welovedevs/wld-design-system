import { ReactElement } from 'react';
import { TextFieldProps } from '../text_field/text_field';
import { PopperProps } from '@mui/material/Popper';
export interface SuggestionSelectedEventData<TSuggestion> {
    suggestion: TSuggestion;
    suggestionValue: string;
    suggestionIndex: number;
    sectionIndex: number | null;
    method: 'click' | 'enter';
}
interface Props<T> {
    multiple?: boolean;
    selectedSuggestions?: string[];
    placeholder?: string;
    suggestions: T[];
    onChange: (value: any) => void;
    onSelect: (data: SuggestionSelectedEventData<T>) => void;
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
    popperProps?: Partial<PopperProps>;
}
export declare const AutoComplete: <T extends unknown>({ multiple, ...other }: Omit<TextFieldProps, "onChange" | "onSelect" | "multiple"> & Props<T>) => import("react/jsx-runtime").JSX.Element;
export {};
