import React, { useCallback, useContext, useMemo } from 'react';

// @ts-ignore
import cn from 'classnames';

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import last from 'lodash/last';
import { DevTechnology } from '../technologies/technology';
import { TechnologiesPickerContext } from '../technologies_picker_context';
import { Card, Slider, Tooltip, Typography } from '../../index';
import { TrashIcon } from '../../assets/icons/trash';
import { MoveIcon } from '../../assets/icons/move';

const TechnologyRow = ({
    id,
    item,
    onDelete: onRemove,
    onChange,
    itemsLength,
    technologyIndex,
    hideSlider
}: {
    id: string;
    item: DevTechnology;
    onDelete: (name: string) => void;
    onChange: (id: DevTechnology) => void;
    technologyIndex: number;
    itemsLength: number;
    hideSlider?: boolean;
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const { technologies, translations } = useContext(TechnologiesPickerContext);

    const sliderChange = useCallback(
        (e) => {
            onChange({ ...item, value: Number(e.target.value) });
        },
        [item, onChange]
    );
    const imgUrl = useMemo(() => {
        const matchingItem = technologies.find((techno) => techno.name === item.name);
        if (matchingItem?.handle) {
            return `https://process.filestackapi.com/auto_image/${matchingItem?.handle ?? '4A5N89okRPW50jRcmkuM'}`;
        }
        const handle = last(matchingItem?.url.split('/'));
        return `https://process.filestackapi.com/auto_image/${handle ?? '4A5N89okRPW50jRcmkuM'}`;
    }, [item, technologies]);

    let divider = <div className="ds-bg-dark-50 ds-w-[1px] ds-h-6 ds-mx-2" />;
    return (
        <div
            ref={setNodeRef}
            className={'ds flex ds-flex ds-items-center ds-w-full ds-p-0 ds-my-2 ds-relative ds-z-[1400]'}
            style={{ ...style, zIndex: itemsLength - technologyIndex }}
        >
            <button {...attributes} {...listeners} className="ds-flex" type="button">
                <MoveIcon className="ds-w-2.5 ds-h-2.5" />
            </button>
            {divider}
            <Tooltip title={translations.deleteLabel}>
                <button className="ds-flex" type="button" onClick={() => onRemove(item.name)}>
                    <TrashIcon className="ds-fill-danger-500 ds-w-3 ds-h-3" />
                </button>
            </Tooltip>
            {divider}
            <Card className="ds-w-5 ds-h-5 !ds-p-1 ds-mx-1">
                <img className={'ds-object-contain ds-w-full ds-h-full'} alt={item.name} src={imgUrl} />
            </Card>
            <div className="ds-flex-1">
                <Typography color="dark" variant="label">
                    {item.name}
                </Typography>
                {!hideSlider && (
                <div className="ds-flex ds-items-center">
                    <Typography
                        classes={{
                            container: 'ds-w-5 ds-mb-0',
                        }}
                        color="dark"
                        variant="body3"
                    >
                        <span className="ds-font-medium">{item.value}</span>%
                    </Typography>
                        <Slider
                            color="primary"
                            name={`skill_value_${item.name}`}
                            value={item.value}
                            onChange={sliderChange}
                            min={0}
                            max={100}
                            step={5}
                            classes={{ container: 'ds-w-12 ds-mr-1' }}
                            popperCardProps={{
                                classes: {
                                    popper: 'ds-z-[1302]',
                                },
                            }}
                        />
                </div>
                    )}
            </div>
        </div>
    );
};

const SortableTechnologies = ({
    items,
    onDelete,
    onItemChange,
    classes,
    className,
    itemsLength,
    onSortEnd,
    hideSlider
}: Props & {
    itemsLength: number;
    onSortEnd: (props: { newIndex: any; oldIndex: any }) => any;
    hideSlider?: boolean;
}) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const itemsWithId = useMemo(() => items.map((item) => ({ ...item, id: item.name })), [items]);
    const handleDragEnd = useCallback(
        (event) => {
            const { active, over } = event;

            if (active.id !== over.id) {
                const oldItem = items.find(({ name }) => name === active.id);
                const newItem = items.find(({ name }) => name === over.id);
                const oldIndex = oldItem && items.indexOf(oldItem);
                const newIndex = newItem && items.indexOf(newItem);
                return onSortEnd({ oldIndex, newIndex });
            }
        },
        [items]
    );

    return (
        <div
            className={cn(
                classes?.container,
                'ds-pr-2 ds-h-full ds-scrollbar ds-overflow-auto !ds-z-[1301]',
                className
            )}
        >
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={itemsWithId} strategy={verticalListSortingStrategy}>
                    {itemsWithId.map((item, index) => (
                        <TechnologyRow
                            key={`selected_technology_row_${item.name}_${index}`}
                            onDelete={onDelete}
                            id={item.id}
                            onChange={onItemChange}
                            technologyIndex={index}
                            item={item}
                            itemsLength={itemsLength}
                            hideSlider={hideSlider}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
};

interface Props {
    items: Array<DevTechnology>;
    onChange: (newArrayValue: Array<DevTechnology>) => void;
    onDelete: (id: string) => void;
    className?: string;
    onItemChange: (technology: DevTechnology) => void;
    classes?: { container?: string };
    hideSlider?: boolean;
}

export const SelectedTechnologies: React.FC<Props> = ({
    items,
    onChange,
    onDelete,
    className,
    onItemChange,
    classes = {},
    hideSlider
}) => {
    const itemsLength = useMemo(() => items.length, [items]);

    const move = useCallback(
        ({ oldIndex, newIndex }) => {
            if (typeof onChange === 'function') {
                onChange(arrayMove(items, oldIndex, newIndex).map((data, index) => ({ ...data, index })));
            }
        },
        [items, onChange]
    );

    return (
        <SortableTechnologies
            className={className ?? ''}
            items={items}
            onSortEnd={move}
            onItemChange={onItemChange}
            onDelete={onDelete}
            itemsLength={itemsLength}
            onChange={onChange}
            classes={classes}
            hideSlider={hideSlider}
        />
    );
};
