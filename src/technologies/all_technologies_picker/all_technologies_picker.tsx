import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { SELECTED_ITEM_LAYER_TRANSITIONS_PROPS } from './all_technologies_picker_props';

import { DevTechnology, Technology } from '../technologies/technology';
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
const technoCardsSizes = {
    mobile: {
        width: 56 + 2 * 1 * 8,
        height: 80 + 2 * 1 * 8,
    },
    other: {
        width: 80 + 2 * 1.5 * 8,
        height: 120 + 2 * 1.5 * 8,
    },
} as const;

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
        <button
            className={`${
                isMobile ? 'ds-w-7 ds-max-w-7 ds-m-1' : 'ds-w-10 ds-max-w-10 ds-m-1.5'
            } ds-flex ds-flex-col ds-items-center`}
            type="button"
            onClick={onClick}
        >
            <Card
                classes={{
                    container: `${
                        isMobile ? ' ds-h-7 ds-max-h-7 !ds-p-1 ' : 'ds-h-10 ds-max-h-10 !ds-p-2'
                    } ds-w-full ds-overflow-hidden ds-mb-2 ds-relative`,
                }}
            >
                <img src={imgUrl} alt={item.name} className={`ds-w-full ds-h-full ds-object-contain`} />
                <AnimatePresence>
                    {selectedItem && (
                        <motion.div
                            key={`selected_item_layer_${selectedItem?.name}`}
                            className={
                                'ds-z-[2] ds-absolute ds-top-0 ds-left-0 ds-w-full ds-h-full ds-bg-primary-500 ds-text-light-500 ds-text-center ds-flex ds-items-center ds-justify-center'
                            }
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
                variant="body3"
                classes={{
                    container: 'ds-text-center ds-break-all',
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

const DISPLAYED_ITEMS = 30;
export const AllTechnologiesPicker = ({
    selectedItems,
    onAdd,
    onDelete,
    classes = {},
    isMobile,
    noResultsElement = null,
    additionalInformations = null,
}: Props) => {
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
        const rowsCount = Math.ceil(height / sizes.height);

        let itemsCount = Math.round(itemsPerRow * rowsCount);
        setShownItems(itemsCount);
    }, [containerRef.current]);

    const toggleOtherPerk = useCallback(() => {
        setOnlySelected(!onlySelected);
    }, [onlySelected]);

    return (
        <div className={`${classes?.container ?? ''} ds-overflow-hidden ds-flex ds-flex-col`} ref={containerRef}>
            <TextField
                classes={{
                    container: 'ds-mb-3 ds-w-[400px] sm:ds-w-[unset] ds-min-h-[60px]',
                }}
                fullWidth={isMobile}
                variant="flat"
                value={query}
                onChange={handleTextFieldChange}
                placeholder="Mobile, Javascript, etc..."
            />
            {isMobile && additionalInformations}
            {isMobile && (
                <button className={cn('ds-flex ds-items-center ds-text-left')} type="button" onClick={toggleOtherPerk}>
                    <Checkbox
                        variant="outlined"
                        color="secondary"
                        checked={!!onlySelected}
                        onChange={toggleOtherPerk}
                        className={'ds-mr-1'}
                    />
                    <Typography variant="body2">{translations.checkboxLabel}</Typography>
                </button>
            )}
            {!displayedItems.length && noResultsElement}
            <div id="allTechnologiesPicker" className={'ds-w-full ds-overflow-auto ds-scrollbar'}>
                <InfiniteScroll
                    className={`ds-pr-0 ds-flex ds-justify-center ds-flex-wrap sm:ds-ml-[unset]  ${
                        classes?.technologiesList ?? ''
                    }`}
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
