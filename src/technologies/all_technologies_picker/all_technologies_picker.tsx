import React, { useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {
    ALL_TECHNOLOGIES_TRANSITIONS_PROPS,
    SELECTED_ITEM_LAYER_TRANSITIONS_PROPS,
} from './all_technologies_picker_props';

import { Classes, styles } from './all_technologies_picker_styles';
import { DevTechnology, Technology } from '../technologies/technology';
import { makeStyles } from '@material-ui/core/styles';
import last from 'lodash/last';
import { useDebouncedValue } from '../../hooks/use_debounced_value';
import { TechnologiesPickerContext } from '../technologies_picker_context';
import cn from 'classnames';
import { Card, Checkbox, TextField, Typography } from '../../index';

const DEFAULT_SPRING_TYPE = {
    type: 'spring',
    damping: 18,
};

const useStyles = makeStyles(styles);

const TechnologyItem = ({
    item,
    selectedItems = [],
    onAdd,
    onDelete,
}: {
    selectedItems: Array<DevTechnology>;
    item: Technology;
    onAdd: (name: string) => void;
    onDelete: (name: string) => void;
}) => {
    const classes = useStyles();
    const { technologies } = useContext(TechnologiesPickerContext);
    const selectedItem = useMemo(() => selectedItems.find(({ name }) => name === item.name), [selectedItems, item]);

    const onClick = useCallback(() => {
        if (!selectedItem) {
            onAdd(item.name);
            return;
        }
        onDelete(selectedItem.name);
    }, [selectedItem, onAdd, onDelete]);

    const imgUrl = useMemo(() => {
        const matchingItem = technologies.find((techno) => techno.name === item.name);
        const handle = matchingItem?.handle;
        return `https://process.filestackapi.com/auto_image/${item?.handle ?? handle ?? '4A5N89okRPW50jRcmkuM'}`;
    }, [item, technologies]);

    return (
        <button className={classes.technologyItem} type="button" onClick={onClick}>
            <Card
                classes={{
                    container: classes.technologyImageContainer,
                }}
            >
                <img src={imgUrl} alt={item.name} className={classes.technologyImage} />
                <AnimatePresence>
                    {selectedItem && (
                        <motion.div
                            key={`selected_item_layer_${selectedItem?.name}`}
                            className={classes.selectedTechnologyLayer}
                            variants={SELECTED_ITEM_LAYER_TRANSITIONS_PROPS}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={DEFAULT_SPRING_TYPE}
                        >
                            <Typography color="light" variant="h3">
                                {selectedItem?.index + 1}
                            </Typography>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
            <Typography
                variant="body2"
                classes={{
                    container: classes.typography,
                }}
            >
                {item.name}
            </Typography>
        </button>
    );
};

interface Props {
    technologies: Technology[];
    onDelete: (name: string) => void;
    classes?: Classes;
    onAdd: (name: string) => void;
    selectedItems: Array<DevTechnology>;
    isMobile?: boolean;
    noResultsElement?: React.ReactElement | null;
}

export const AllTechnologiesPicker = ({
    selectedItems,
    onAdd,
    onDelete,
    classes: receivedClasses = {},
    isMobile,
    noResultsElement = null,
}: Props) => {
    const classes = useStyles({ classes: receivedClasses });
    const [onlySelected, setOnlySelected] = useState<boolean>();

    const [query, setQuery] = useState<string>('');
    const debouncedQuery = useDebouncedValue(query, 200);

    const { technologies, translations } = useContext(TechnologiesPickerContext);
    const displayedItems = useMemo(
        () =>
            technologies
                .filter(({ name }) => {
                    if (!onlySelected) {
                        return true;
                    }
                    return selectedItems.some(({ name: selectedName }) => selectedName === name);
                })
                .filter(({ name, tags }) =>
                    [...(tags ?? []), name].some((value) => value.toLowerCase().includes(debouncedQuery.toLowerCase()))
                )
                .sort(({ name: a }, { name: b }) => a.localeCompare(b)),
        [technologies, debouncedQuery, onlySelected]
    );

    const handleTextFieldChange = useCallback((event) => setQuery(event.target.value), []);

    const toggleOtherPerk = useCallback(() => {
        setOnlySelected(!onlySelected);
    }, [onlySelected]);

    return (
        <div className={classes.container}>
            <TextField
                classes={{
                    container: classes.textField,
                }}
                fullWidth={isMobile}
                variant="flat"
                value={query}
                onChange={handleTextFieldChange}
                placeholder="Mobile, Javascript, etc..."
            />
            {isMobile && (
                <button className={cn(classes.checkboxButton)} type="button" onClick={toggleOtherPerk}>
                    <Checkbox
                        className={classes.checkbox}
                        variant="outlined"
                        color="secondary"
                        checked={!!onlySelected}
                        onChange={toggleOtherPerk}
                    />
                    <Typography>{translations.checkboxLabel}</Typography>
                </button>
            )}
            <div className={classes.technologiesList}>
                {!displayedItems.length && noResultsElement}
                {displayedItems.map((item, index) => (
                    <motion.div key={`technology_${item?.name}`} variants={ALL_TECHNOLOGIES_TRANSITIONS_PROPS}>
                        <TechnologyItem
                            key={`technology_${item.name}_${index}`}
                            selectedItems={selectedItems}
                            item={item}
                            onAdd={onAdd}
                            onDelete={onDelete}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
