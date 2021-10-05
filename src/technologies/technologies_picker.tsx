import React, { useMemo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Classes, styles } from './technologies_picker_styles';
import { AllTechnologiesPicker } from './all_technologies_picker/all_technologies_picker';
import { SelectedTechnologies } from './selected_technologies/selected_technologies';
import { DevTechnology, Technology } from './technologies/technology';
import { ContextType, TechnologiesPickerContext } from './technologies_picker_context';

const useStyles = makeStyles(styles);

export interface TechnologiesPickerProps {
    classes?: Classes;
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
    classes: receivedClasses = {},
    translations,
    content,
}) => {
    const classes = useStyles({ classes: receivedClasses, isMobile });

    const technoPickerContext = useMemo(
        () => ({
            technologies,
            translations,
        }),
        [technologies, translations]
    );
    return (
        <TechnologiesPickerContext.Provider value={technoPickerContext}>
            <div className={classes.container}>
                <AllTechnologiesPicker  
                    isMobile={isMobile}
                    technologies={technologies}
                    selectedItems={selectedValues}
                    onAdd={onAddItem}
                    onDelete={onDeleteItem}
                    noResultsElement={content?.noResults}
                    additionalInformations={content?.additionalInformations}
                    classes={{
                        container: classes.allTechnologies,
                        technologiesList: classes.technologiesList,
                    }}
                />
                {!isMobile && <div className={classes.divider} />}
                {!isMobile && (
                    <div className={classes.column}>
                        {content?.additionalInformations}
                        <SelectedTechnologies
                            className={classes.selectedTechnologies}
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
