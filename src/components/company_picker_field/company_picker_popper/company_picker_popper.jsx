import React from 'react';

import injectSheet from 'react-jss';
import { connectStateResults } from 'react-instantsearch-dom';

import { useMediaQuery } from '@material-ui/core';

import { List } from '../../list/list';
import { ListItem } from '../../list_item/list_item';
import { Typography } from '../../typography/typography';
import { PopperCard } from '../../popper_card/popper_card';
import { FilestackImageComponent } from '../../../../utils/images/FilestackImage';

import styles from './company_picker_popper_styles';

const CompanyPickerPopperComponent = connectStateResults(
    ({ searchResults, onSelect, companiesToHide, onClose, classes, isMobile, ...props }) => {
        if (!searchResults || !searchResults.hits || !searchResults.hits.length) {
            return null;
        }
        return (
            <PopperCard
                customClasses={{
                    popper: classes.popper,
                    container: classes.container
                }}
                popperProps={{
                    placement: isMobile ? 'top' : 'right',
                    modifiers: {
                        preventOverflow: {
                            boundariesElement: 'viewport'
                        }
                    }
                }}
                {...props}
            >
                <List className={classes.list}>
                    {searchResults.hits
                        .filter(hit => hit.description && !(companiesToHide && companiesToHide.includes(hit.id)))
                        .map(({ id, description }) => (
                            <ListItem
                                key={`blacklist_search_item_${id}`}
                                className={classes.listItem}
                                onClick={() => {
                                    if (typeof onSelect === 'function') {
                                        onSelect(id);
                                    }
                                    if (typeof onClose === 'function') {
                                        onClose();
                                    }
                                }}
                                button
                            >
                                {description.profilePic && description.profilePic.handle && (
                                    <div className={classes.avatar}>
                                        <FilestackImageComponent
                                            className={classes.image}
                                            additionalTasks="resize=width:150"
                                            quality={90}
                                            handle={description.profilePic.handle}
                                            alt={description.companyName}
                                        />
                                    </div>
                                )}
                                <Typography color="dark">{description.companyName}</Typography>
                            </ListItem>
                        ))}
                </List>
            </PopperCard>
        );
    },
    (prevProps, nextProps) => {
        if (prevProps.searchResults && nextProps.searchResults) {
            const prevIDs = prevProps.searchResults.hits.map(hit => hit.id);
            const nextIDS = nextProps.searchResults.hits.map(hit => hit.id);
            return (
                prevIDs.join() === nextIDS.join() && prevProps.searchResults.nbHits === nextProps.searchResults.nbHits
            );
        }
        return false;
    }
);

const WithIsMobileCompanyPickerPopperComponent = props => {
    const isMobile = useMediaQuery('(max-width: 650px)');
    return <CompanyPickerPopperComponent {...props} {...{ isMobile }} />;
};

export const CompanyPickerPopper = injectSheet(styles)(WithIsMobileCompanyPickerPopperComponent);
