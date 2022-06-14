//👇 We create a “template” of how args map to rendering
import { TechnologiesPicker, TechnologiesPickerProps } from '../../src/technologies/technologies_picker';
import { technologies } from './technology_data';
import { useState } from 'react';
import { DevTechnology, Technology } from '../../src/technologies/technologies/technology';
import { Card } from '../../src/card/card';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const content = {
    noResults: <Card>Pas de contenu</Card>,
    additionalInformations: <Card>Info Supplémentaire</Card>,
};
const Template = (args) => {
    const [items, setItems] = useState<Array<DevTechnology>>([
        { name: 'Akka', index: 0, value: 50, id: 1 },
        { name: 'Angular', index: 1, value: 50, id: 2 },
        { name: 'Drupal', index: 1, value: 50, id: 2 },
        { name: 'Erlang', index: 1, value: 50, id: 2 },
        { name: 'Git', index: 1, value: 50, id: 2 },
        { name: 'Gitlab', index: 1, value: 50, id: 2 },
        { name: 'Gradle', index: 1, value: 50, id: 2 },
        { name: 'Gulp', index: 1, value: 50, id: 2 },
        { name: 'Java', index: 1, value: 50, id: 2 },
        { name: 'Jeet', index: 1, value: 50, id: 2 }
    ]);
    console.log({ items });
    return (
        <div style={{ height: '95vh' }}>
            <TechnologiesPicker
                {...args}
                selectedValues={items}
                onAddItem={(id) => {
                    console.log('Item added');
                    setItems([...items, { name: id, value: 50, index: items.length, id: items.length + id }]);
                }}
                onDeleteItem={(name) => {
                    setItems(items.filter((item) => item.name !== name));
                }}
                onArrayChange={(newArray) => setItems(newArray)}
                onArrayItemChange={(item) => {
                    const itemIndex = items.findIndex(({ name }) => item.name === name);
                    items[itemIndex] = item;
                    setItems([...items]);
                }}
                content={content}
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
    title: 'Components/Picker',
    component: TechnologiesPicker,
    viewport: {
        //👇 The viewports you want to use
        viewports: INITIAL_VIEWPORTS,
    },
};
