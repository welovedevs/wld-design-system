import React, { useState } from 'react';

import { Typography } from '../../../src/typography/typography';

import { Select } from '../../../src/select/select';

import { MenuItem, Select as MuiSelect } from '@mui/material';

export const DefaultStory = ({}) => {
    const [value, setValue] = useState(null);
    return (
        <div>
            <Typography component="h1" variant="h1">
                Default behaviour
            </Typography>
            <Typography component="h4" variant="h4">
                {`Select value: ${value}`}
            </Typography>
            <Select size="regular" variant={"flat"} {...{ value }} onChange={(value) => setValue(value)}>
                <MenuItem value="allTime">{'Depuis le début'}</MenuItem>
                <MenuItem value="currentSeason">{'Saison actuelle'}</MenuItem>
            </Select>

            <Select size="small" variant={"flat"} {...{ value }} onChange={(value) => setValue(value)}>
                <MenuItem value="allTime">{'Depuis le début'}</MenuItem>
                <MenuItem value="currentSeason">{'Saison actuelle'}</MenuItem>
            </Select>

            <Select size="xs" variant={"flat"} {...{ value }} onChange={(value) => setValue(value)}>
                <MenuItem value="allTime">{'Depuis le début'}</MenuItem>
                <MenuItem value="currentSeason">{'Saison actuelle'}</MenuItem>
            </Select>

            <MuiSelect {...{ value }} onChange={(event) => setValue(event.target.value)}>
                <MenuItem value="allTime">{'Depuis le début'}</MenuItem>
                <MenuItem value="currentSeason">{'Saison actuelle'}</MenuItem>
            </MuiSelect>
        </div>
    );
};
