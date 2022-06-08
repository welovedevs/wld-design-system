import { Typography } from '../../src/typography/typography';
import { VariantStyles } from '../../src';
import palette from '../../src/styles/palette';

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Components/Typography',
    component: Typography,
};

const Template = (args) => {
    return (
        <>
            {[...Object.keys(palette), 'default'].map((paletteColor) => (
                <Typography component="div" color={paletteColor as any} {...args}>
                    {args.variant} / {paletteColor} : The quick brown fox jumps over the lazy dog
                </Typography>
            ))}
        </>
    );
};

export const wld = Template.bind({});
export const h1 = Template.bind({});
export const h2 = Template.bind({});
export const h3 = Template.bind({});
export const h4 = Template.bind({});
export const h5 = Template.bind({});
export const h6 = Template.bind({});
export const body1 = Template.bind({});
export const body2 = Template.bind({});
export const body3 = Template.bind({});
export const tag = Template.bind({});
export const button = Template.bind({});
export const helper = Template.bind({});
export const label = Template.bind({});
export const wld1 = Template.bind({});
export const wld2 = Template.bind({});
export const wld3 = Template.bind({});
export const wld4 = Template.bind({});
export const wld5 = Template.bind({});
export const wld6 = Template.bind({});

wld.args = {
    variant: 'wld',
};
h1.args = {
    variant: 'h1',
};
h2.args = {
    variant: 'h2',
};
h3.args = {
    variant: 'h3',
};
h4.args = {
    variant: 'h4',
};
h5.args = {
    variant: 'h5',
};
h6.args = {
    variant: 'h6',
};
body1.args = {
    variant: 'body1',
};
body2.args = {
    variant: 'body2',
};
body3.args = {
    variant: 'body3',
};
tag.args = {
    variant: 'tag',
};
button.args = {
    variant: 'button',
};
helper.args = {
    variant: 'helper',
};
label.args = {
    variant: 'label',
};
wld1.args = {
    variant: 'wld1',
};
wld2.args = {
    variant: 'wld2',
};
wld3.args = {
    variant: 'wld3',
};
wld4.args = {
    variant: 'wld4',
};
wld5.args = {
    variant: 'wld5',
};
wld6.args = {
    variant: 'wld6',
};
