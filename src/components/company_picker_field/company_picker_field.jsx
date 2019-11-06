import React, { useCallback, useEffect, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';

import injectSheet from 'react-jss';
import { injectIntl } from 'react-intl';
import { Configure, InstantSearch } from 'react-instantsearch-dom';

import { TextField } from '../text_field/text_field';
import { CompanyPickerPopper } from './company_picker_popper/company_picker_popper';

import styles from './company_picker_field_styles';
import translations from './company_picker_field_translations';

const CompanyPickerFieldComponent = ({ intl: { formatMessage }, onSelect, textFieldProps, companiesToHide }) => {
    const inputReference = useRef();
    const inputElement = useRef();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const handleInputChange = useCallback(
        event => {
            if (!event) {
                return;
            }
            const { value } = event.target;
            setQuery(value);
            if (value.length > 2) {
                setOpen(true);
            } else if (open) {
                setOpen(false);
            }
        },
        [open]
    );
    useEffect(() => {
        inputElement.current = findDOMNode(inputReference.current);
    }, []);
    return (
        <>
            <TextField
                containerRef={inputReference}
                placeholder={formatMessage(translations.textFieldPlaceHolder)}
                value={query}
                onChange={handleInputChange}
                {...textFieldProps}
            />
            <InstantSearch
                appId={process.env.ALGOLIA_ID}
                apiKey={process.env.ALGOLIA_PUBLIC_KEY}
                indexName="public_companies_preview"
            >
                <Configure {...{ query }} />
                <CompanyPickerPopper
                    {...{ open, onSelect, companiesToHide }}
                    onClose={() => setOpen(false)}
                    anchorElement={inputElement.current}
                />
            </InstantSearch>
        </>
    );
};

export const CompanyPickerField = injectIntl(injectSheet(styles)(CompanyPickerFieldComponent));
