//👇 We create a “template” of how args map to rendering
import { TechnologiesPicker, TechnologiesPickerProps } from '../../src/technologies/technologies_picker';
import { technologies } from './technology_data';
import { useState } from 'react';
import { DevTechnology, Technology } from '../../src/technologies/technologies/technology';
import { Card } from '@mui/material';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const Template = (args) => {
    const [items, setItems] = useState<Array<DevTechnology>>([]);
    console.log({ items });
    return (
        <div style={{ height: '98vh' }}>
            <TechnologiesPicker
                {...args}
                selectedValues={items}
                onAddItem={(id) =>
                    setItems([...items, { name: id, value: 50, index: items.length, id: items.length + id }])
                }
                onDeleteItem={(id) => setItems(items.filter((item) => item.id !== id))}
                onArrayChange={(newArray) => setItems(newArray)}
                content={{
                    noResults: <Card>Pas de contenu</Card>,
                    additionalInformations: <Card>Info Supplémentaire</Card>,
                }}
            />
        </div>
    );
};

//👇 Each story then reuses that template
export const Picker = Template.bind({});
Picker.args = {
    technologies,
    translations: {
        checkboxLabel: 'Label Checkbox',
        deleteLabel: 'Supprimer',
    },
} as Partial<TechnologiesPickerProps>;
//👇 Each story then reuses that template
export const MobilePicker = Template.bind({});
MobilePicker.args = {
    technologies,
    isMobile: true,
    translations: {
        checkboxLabel: 'Label Checkbox',
        deleteLabel: 'Supprimer',
    },
} as Partial<TechnologiesPickerProps>;

export default {
    title: 'Picker',
    component: TechnologiesPicker,
    viewport: {
        //👇 The viewports you want to use
        viewports: INITIAL_VIEWPORTS,
    },
};
