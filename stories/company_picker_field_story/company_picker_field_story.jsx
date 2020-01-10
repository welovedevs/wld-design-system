import React from 'react';

import { array } from '@storybook/addon-knobs';

import { CompanyPickerField } from '../../src/components/company_picker_field/company_picker_field';

const CompanyPickerFieldStory = () => {
    const companiesToHide = array('Companies to hide', ['0p0FBbUXdFSGdsprrDIu0mbfZEc2']);
    return <CompanyPickerField {...{ companiesToHide }} />;
};

export default CompanyPickerFieldStory;
