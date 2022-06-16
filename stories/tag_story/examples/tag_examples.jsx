import React, { useCallback } from 'react';

import { Tag, palette } from '../../../src';

import { TAG_POSSIBLE_SIZES } from '../helpers/tags_sizes';

const COLORS_DISABLED = {
    ...[...Object.keys(palette), ''].reduce((acc, color) => {
        const accCopy = acc;
        acc[color] = {
            color,
            children: color,
        };
        return accCopy;
    }, {}),
    disabled: {
        disabled: true,
        children: 'Disabled',
    },
};

const TagExamplesComponent = ({ onClick, onDelete }) => {
    return Object.entries(TAG_POSSIBLE_SIZES).map(([size, sizeLabel]) => (
        <div className="ds-my-2">
            {Object.entries(COLORS_DISABLED).map(([id, { children, ...otherProps }]) => (
                <Tag
                    key={`Tag_${size}_${id}`}
                    className="ds-m-1"
                    onClick={onClick}
                    onDelete={onDelete}
                    {...{ size }}
                    {...otherProps}
                >
                    {`${sizeLabel} `}
                    {children}
                </Tag>
            ))}
        </div>
    ));
};

export const TagExamples = TagExamplesComponent;
