import React from 'react';
import { DevTechnology, Technology } from './technologies/technology';
import { ContextType } from './technologies_picker_context';
export interface TechnologiesPickerProps {
    classes?: {
        container?: string;
    };
    isMobile?: boolean;
    selectedValues: Array<DevTechnology>;
    onAddItem: (technoName: string) => void;
    onDeleteItem: (technoName: string) => void;
    onArrayChange: (newArray: Array<DevTechnology>) => void;
    onArrayItemChange: (item: DevTechnology) => void;
    technologies: Technology[];
    translations: ContextType['translations'];
    content?: {
        noResults?: React.ReactElement;
        additionalInformations?: React.ReactElement;
    };
    hideSlider?: boolean;
}
export declare const TechnologiesPicker: React.FC<TechnologiesPickerProps>;
