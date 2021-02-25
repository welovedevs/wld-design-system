import React from 'react';
import {ListItem} from '../../src'

export const ListItemStory = () => {
    const array = ['Valentin', 'Vincent', 'Clément']

    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
            {array.map(name => <ListItem>{name}</ListItem>)}
        </div>
    )
}
