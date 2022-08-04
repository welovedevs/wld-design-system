import React, { useCallback, useContext, useMemo } from 'react';

// @ts-ignore
import cn from 'classnames';
import { arrayMove, SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

import last from 'lodash/last';
import { DevTechnology } from '../technologies/technology';
import { TechnologiesPickerContext } from '../technologies_picker_context';
import { Card, Slider, Tooltip, Typography } from '../../index';
import { TrashIcon } from '../../assets/icons/trash';
import { MoveIcon } from '../../assets/icons/move';

const TechnologyRow = SortableElement(
    ({
        item,
        onDelete: onRemove,
        onChange,
        itemsLength,
        technologyIndex,
    }: {
        id: string;
        item: DevTechnology;
        onDelete: (name: string) => void;
        onChange: (id: DevTechnology) => void;
        technologyIndex: number;
        itemsLength: number;
    }) => {
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
                className={'ds flex ds-flex ds-items-center ds-w-full ds-p-0 ds-my-2 ds-relative ds-z-[1400]'}
                style={{ zIndex: itemsLength - technologyIndex }}
            >
                <DragHandle />
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
                </div>
            </div>
        );
    }
);

const SortableTechnologies = SortableContainer(
    ({
        items,
        onDelete,
        onItemChange,
        classes,
        className,
        itemsLength,
    }: Props & {
        itemsLength: number;
    }) => {
        return (
            <div className={cn(classes?.container, 'ds-pr-2 ds-h-full ds-scrollbar ds-overflow-auto', className)}>
                {items.map((item, index) => (
                    <TechnologyRow
                        key={`selected_technology_row_${item.name}_${index}`}
                        onDelete={onDelete}
                        id={item.name}
                        onChange={onItemChange}
                        technologyIndex={index}
                        index={index}
                        item={item}
                        itemsLength={itemsLength}
                    />
                ))}
            </div>
        );
    }
);

const DragHandle = SortableHandle(() => (
    <button className="ds-flex" type="button">
        <MoveIcon className="ds-w-2.5 ds-h-2.5" />
    </button>
));

interface Props {
    items: Array<DevTechnology>;
    onChange: (newArrayValue: Array<DevTechnology>) => void;
    onDelete: (id: string) => void;
    className?: string;
    onItemChange: (technology: DevTechnology) => void;
    classes?: { container?: string };
}
export const SelectedTechnologies: React.FC<Props> = ({
    items,
    onChange,
    onDelete,
    className,
    onItemChange,
    classes = {},
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
            lockToContainerEdges
            className={className ?? ''}
            helperClass={'!ds-z-[1301]'}
            items={items}
            onSortEnd={move}
            distance={20}
            useDragHandle
            lockAxis="y"
            onItemChange={onItemChange}
            onDelete={onDelete}
            itemsLength={itemsLength}
            onChange={onChange}
            classes={classes}
        />
    );
};
