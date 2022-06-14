import React, { useMemo } from 'react';

import { AllTechnologiesPicker } from './all_technologies_picker/all_technologies_picker';
import { SelectedTechnologies } from './selected_technologies/selected_technologies';
import { DevTechnology, Technology } from './technologies/technology';
import { ContextType, TechnologiesPickerContext } from './technologies_picker_context';

export interface TechnologiesPickerProps {
    classes?: { container?: string };
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
}

export const TechnologiesPicker: React.FC<TechnologiesPickerProps> = ({
    isMobile,
    selectedValues = [],
    onAddItem,
    onDeleteItem,
    onArrayChange,
    onArrayItemChange,
    technologies,
    classes = {},
    translations,
    content,
}) => {
    // const classes = useStyles({ classes: receivedClasses, isMobile });

    const technoPickerContext = useMemo(
        () => ({
            technologies,
            translations,
        }),
        [technologies, translations]
    );
    return (
        <TechnologiesPickerContext.Provider value={technoPickerContext}>
            <div className={`ds-flex ds-h-full ${classes?.container ?? ''}`}>
                <AllTechnologiesPicker
                    isMobile={isMobile}
                    technologies={technologies}
                    selectedItems={selectedValues}
                    onAdd={onAddItem}
                    onDelete={onDeleteItem}
                    noResultsElement={content?.noResults}
                    additionalInformations={content?.additionalInformations}
                    classes={{
                        container: `ds-flex-[125%] ${isMobile ? '' : 'ds-ml-2'} sm:ds-w-full`,
                        technologiesList: 'ds-scrollbar ds-overflow-x-hidden ds-overflow-y-auto',
                    }}
                />
                {!isMobile && <div className={'ds-bg-dark-100 ds-mr-2 ds-ml-4 '} />}
                {!isMobile && (
                    <div className={'ds-flex-auto ds-flex ds-flex-col'}>
                        {content?.additionalInformations}
                        <SelectedTechnologies
                            className={'ds-flex-1'}
                            items={selectedValues}
                            onDelete={onDeleteItem}
                            onChange={onArrayChange}
                            onItemChange={onArrayItemChange}
                        />
                    </div>
                )}
            </div>
        </TechnologiesPickerContext.Provider>
    );
};
