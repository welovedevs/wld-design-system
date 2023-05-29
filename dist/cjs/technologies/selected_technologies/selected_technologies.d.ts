import React from 'react';
import { DevTechnology } from '../technologies/technology';
interface Props {
    items: Array<DevTechnology>;
    onChange: (newArrayValue: Array<DevTechnology>) => void;
    onDelete: (id: string) => void;
    className?: string;
    onItemChange: (technology: DevTechnology) => void;
    classes?: {
        container?: string;
    };
    hideSlider?: boolean;
}
export declare const SelectedTechnologies: React.FC<Props>;
export {};
