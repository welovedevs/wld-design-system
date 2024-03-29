import React, { useCallback, useContext, useMemo } from 'react';

// @ts-ignore
import cn from 'classnames';
import { arrayMove, SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

import { styles } from './selected_technologies_styles';
import last from 'lodash/last';
import { makeStyles } from '@material-ui/core/styles';
import { Classes } from '../technologies_picker_styles';
import { DevTechnology } from '../technologies/technology';
import { TechnologiesPickerContext } from '../technologies_picker_context';
import { Card, List, Slider, Tooltip, Typography } from '../../index';
import { TrashIcon } from '../../assets/icons/trash';
import { MoveIcon } from '../../assets/icons/move';

const useStyles = makeStyles(styles);

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
        const classes = useStyles();
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


        return (
            <li className={classes.listItem} style={{ zIndex: itemsLength - technologyIndex }}>
                <DragHandle classes={classes} />
                <div className={classes.divider} />
                <Tooltip title={translations.deleteLabel}>
                    <button className={classes.removeButton} type="button" onClick={() => onRemove(item.name)}>
                        <TrashIcon className={classes.removeIcon} />
                    </button>
                </Tooltip>
                <div className={classes.divider} />
                <Card className={classes.logo}>
                    <img className={classes.logoImage} alt={item.name} src={imgUrl} />
                </Card>
                <div className={classes.textWrapper}>
                    <Typography color="dark" variant="label">
                        {item.name}
                    </Typography>
                    <div className={classes.sliderValueContainer}>
                        <Typography
                            classes={{
                                container: classes.sliderValue,
                            }}
                            color="dark"
                            variant="label"
                        >
                            <span className={classes.bolden}>{item.value}</span>%
                        </Typography>
                        <Slider
                            color="primary"
                            name={`skill_value_${item.name}`}
                            value={item.value}
                            onChange={sliderChange}
                            min={0}
                            max={100}
                            step={5}
                            debounce={50}
                            classes={{ container: classes.slider }}
                            popperCardProps={{
                                classes: {
                                    popper: classes.popper,
                                },
                            }}
                        />
                    </div>
                </div>
            </li>
        );
    }
);

const SortableTechnologies = SortableContainer(
    ({
        items,
        onDelete,
        onItemChange,
        classes: receivedClasses,
        className,
        itemsLength,
    }: Props & {
        itemsLength: number;
    }) => {
        const classes = useStyles({ classes: receivedClasses });

        return (
            <List className={cn(classes.container, className)}>
                {items.map((item, index) => (
                    <TechnologyRow
                        key={`selected_technology_row_${item.name}`}
                        onDelete={onDelete}
                        id={item.name}
                        onChange={onItemChange}
                        technologyIndex={index}
                        index={index}
                        item={item}
                        itemsLength={itemsLength}
                    />
                ))}
            </List>
        );
    }
);

const DragHandle = SortableHandle(({ classes }: { classes: any }) => (
    <button className={classes.dragHandleButton} type="button">
        <MoveIcon className={classes.dragHandle} />
    </button>
));

interface Props {
    items: Array<DevTechnology>;
    onChange: (newArrayValue: Array<DevTechnology>) => void;
    onDelete: (id: string) => void;
    className?: string;
    onItemChange: (technology: DevTechnology) => void;
    classes?: Classes;
}
const SelectedTechnologiesComponent: React.FC<Props> = ({
    items,
    onChange,
    onDelete,
    className,
    onItemChange,
    classes: receivedClasses = {},
}) => {
    const classes = useStyles({ classes: receivedClasses });

    const itemsLength = useMemo(() => items.length, [items]);

    const move = useCallback(
        ({ oldIndex, newIndex }) => {
            onChange(arrayMove(items, oldIndex, newIndex).map((data, index) => ({ ...data, index })));
        },
        [items, onChange]
    );

    return (
        <SortableTechnologies
            lockToContainerEdges
            className={className}
            helperClass={classes.sortableHelper}
            items={items}
            onSortEnd={move}
            distance={20}
            useDragHandle
            lockAxis="y"
            onItemChange={onItemChange}
            onDelete={onDelete}
            itemsLength={itemsLength}
            onChange={onChange}
            classes={receivedClasses}
        />
    );
};

export const SelectedTechnologies = SelectedTechnologiesComponent;
