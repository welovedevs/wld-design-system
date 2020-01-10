import React from 'react';

import AutoCompleteStory from './autocomplete_story/autocomplete_story';
import BannerStory from './banner_story/banner_story';
import ButtonStory from './button_story/button_story';
import CardStory from './card_story/card_story';
import CheckboxStory from './checkbox_story/checkbox_story';

export default {
  title: 'Design System',
};

export const AutoComplete = () => <AutoCompleteStory />;
export const Banner = () => <BannerStory />;
export const Button = () => <ButtonStory />;
export const Card = () => <CardStory />;
export const Checkbox = () => <CheckboxStory />;
