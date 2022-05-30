import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {
    ALL_TECHNOLOGIES_TRANSITIONS_PROPS,
    SELECTED_ITEM_LAYER_TRANSITIONS_PROPS,
} from './all_technologies_picker_props';

import { Classes, styles, technoCardsSizes } from './all_technologies_picker_styles';
import { DevTechnology, Technology } from '../technologies/technology';
import makeStyles from '@mui/styles/makeStyles';
import last from 'lodash/last';
import { useDebouncedValue } from '../../hooks/use_debounced_value';
import { TechnologiesPickerContext } from '../technologies_picker_context';
import cn from 'classnames';
import { Card, Checkbox, TextField, Typography } from '../../index';
import InfiniteScroll from 'react-infinite-scroll-component';

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
    isMobile,
}: {
    selectedItems: Array<DevTechnology>;
    item: Technology;
    onAdd: (name: string) => void;
    onDelete: (name: string) => void;
    isMobile?: boolean;
}) => {
    const classes = useStyles({ isMobile });
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
        if (matchingItem?.handle) {
            return `https://process.filestackapi.com/auto_image/${matchingItem?.handle ?? '4A5N89okRPW50jRcmkuM'}`;
        }
        const handle = last(matchingItem?.url.split('/'));
        return `https://process.filestackapi.com/auto_image/${handle ?? '4A5N89okRPW50jRcmkuM'}`;
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
    additionalInformations?: React.ReactElement | null;
}

const DISPLAYED_ITEMS = 30;
export const AllTechnologiesPicker = ({
    selectedItems,
    onAdd,
    onDelete,
    classes: receivedClasses = {},
    isMobile,
    noResultsElement = null,
    additionalInformations = null,
}: Props) => {
    const classes = useStyles({ classes: receivedClasses, isMobile } as any);
    const [onlySelected, setOnlySelected] = useState<boolean>();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [query, setQuery] = useState<string>('');
    const debouncedQuery = useDebouncedValue(query, 200);

    const { technologies, translations } = useContext(TechnologiesPickerContext);
    const [shownItems, setShownItems] = useState<number>(DISPLAYED_ITEMS);

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
    const slicedItems = useMemo(() => displayedItems.slice(0, shownItems), [displayedItems, shownItems]);
    const handleTextFieldChange = useCallback((event) => setQuery(event.target.value), []);
    useEffect(() => {
        const { clientWidth: width, clientHeight: height } = containerRef?.current || {};
        if (!width || !height) {
            return;
        }

        const sizes = isMobile ? technoCardsSizes['mobile'] : technoCardsSizes['other'];
        const itemsPerRow = Math.floor(width / sizes.width);
        const rowsCount = Math.floor(height / sizes.height);

        let itemsCount = Math.round(itemsPerRow * rowsCount);
        console.log({ width, height, itemsPerRow, rowsCount, itemsCount });
        setShownItems(itemsCount);
    }, [containerRef.current]);

    const toggleOtherPerk = useCallback(() => {
        setOnlySelected(!onlySelected);
    }, [onlySelected]);

    return (
        <div className={classes.container} ref={containerRef}>
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
            {isMobile && additionalInformations}
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
            {!displayedItems.length && noResultsElement}
            <div id="allTechnologiesPicker" className={classes.technologiesListWrapper}>
                <InfiniteScroll
                    className={classes.technologiesList}
                    dataLength={slicedItems.length}
                    next={() => {
                        setShownItems(shownItems + DISPLAYED_ITEMS);
                    }}
                    hasMore={displayedItems.length > shownItems}
                    loader={null}
                    scrollableTarget="allTechnologiesPicker"
                >
                    {slicedItems.map((item, index) => (
                        <TechnologyItem
                            key={`technology_${item.name}_${index}`}
                            selectedItems={selectedItems}
                            item={item}
                            onAdd={onAdd}
                            onDelete={onDelete}
                            isMobile={isMobile}
                        />
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
};
