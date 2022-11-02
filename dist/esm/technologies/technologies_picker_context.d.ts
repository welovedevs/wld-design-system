/// <reference types="react" />
import { Technology } from './technologies/technology';
export interface ContextType {
    technologies: Technology[];
    translations: {
        checkboxLabel: string;
        deleteLabel: string;
    };
}
export declare const TechnologiesPickerContext: import("react").Context<ContextType>;
