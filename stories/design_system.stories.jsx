import React from 'react';

import { withKnobs } from "@storybook/addon-knobs";

import AutoCompleteStory from './autocomplete_story/autocomplete_story';
import BannerStory from './banner_story/banner_story';
import ButtonStory from './button_story/button_story';
import CardStory from './card_story/card_story';
import CheckboxStory from './checkbox_story/checkbox_story';
import PopperCardStory from './popper_card_story/popper_card_story';
import ProgressBarStory from './progress_bar_story/progress_bar_story';
import SliderStory from './slider_story/slider_story';
import SwitchStory from './switch_story/switch_story';
import TagStory from './tag_story/tag_story';
import TextFieldStory from './text_field_story/text_field_story';
import TooltipStory from './tooltip_story/tooltip_story';
import TypographyStory from './typography_story/typography_story';

export default {
  title: 'Design System',
  decorators: [withKnobs]
};

export const AutoComplete = () => <AutoCompleteStory />;
export const Banner = () => <BannerStory />;
export const Button = () => <ButtonStory />;
export const Card = () => <CardStory />;
export const Checkbox = () => <CheckboxStory />;
export const PopperCard = () => <PopperCardStory />;
export const ProgressBar = () => <ProgressBarStory />;
export const Slider = () => <SliderStory />;
export const Switch = () => <SwitchStory />;
export const Tag = () => <TagStory />;
export const TextField = () => <TextFieldStory />;
export const Tooltip = () => <TooltipStory />;
export const Typography = () => <TypographyStory />;
