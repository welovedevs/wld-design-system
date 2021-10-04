import { Technology } from './technologies/technology';
import { createContext } from 'react';

export interface ContextType {
    technologies: Technology[];
    translations: {
        checkboxLabel: string;
        deleteLabel: string;
    };
};
export const TechnologiesPickerContext = createContext<ContextType>({ technologies: [], translations: {} as any });
