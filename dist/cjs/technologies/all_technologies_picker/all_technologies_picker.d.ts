import React from 'react';
import { DevTechnology, Technology } from '../technologies/technology';
interface Props {
    technologies: Technology[];
    onDelete: (name: string) => void;
    classes?: {
        container?: string;
        technologiesList?: string;
    };
    onAdd: (name: string) => void;
    selectedItems: Array<DevTechnology>;
    isMobile?: boolean;
    noResultsElement?: React.ReactElement | null;
    additionalInformations?: React.ReactElement | null;
}
export declare const AllTechnologiesPicker: ({ selectedItems, onAdd, onDelete, classes, isMobile, noResultsElement, additionalInformations, }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
