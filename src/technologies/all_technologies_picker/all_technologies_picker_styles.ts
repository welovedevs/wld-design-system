import { createStyles, Theme } from '@material-ui/core/styles';
import { primary } from '../../styles';

type StylesKeys = 'container' | 'technologiesList';

export type Classes = {
    [key in StylesKeys]?: string;
};

export const styles = ({ spacing }: Theme) =>
    createStyles({
        container: {
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
        },
        textField: {
            minHeight: 60,
            minWidth: 400,
            marginBottom: spacing(3),
            '@media screen and (max-width: 500px)': {
                minWidth: 'unset',
            },
        },
        technologiesListWrapper: {
            width: '100%',
            overflow: 'auto',
        },
        technologiesList: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '@media screen and (max-width: 500px)': {
                justifyContent: 'center',
                marginLeft: 'unset',
            },
        },
        technologyItem: ({ isMobile }: { isMobile?: boolean }) => ({
            width: isMobile ? 60 : 80,
            maxWidth: isMobile ? 60 : 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: isMobile ? spacing(1) : spacing(1.5),
        }),
        technologyImageContainer: ({ isMobile }: { isMobile?: boolean }) => ({
            width: isMobile ? 60 : 80,
            maxWidth: isMobile ? 60 : 80,
            height: isMobile ? 60 : 80,
            maxHeight: isMobile ? 60 : 80,

            position: 'relative',
            padding: spacing(1.5),
            marginBottom: spacing(2),
            overflow: 'hidden',
        }),
        technologyImage: {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
        },
        typography: {
            textAlign: 'center',
            linebreak: 'anywhere',
        },
        selectedTechnologyLayer: {
            zIndex: 2,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: primary[500],
            color: 'white',
            textAlign: 'center',
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        checkboxButton: {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
        },
        checkbox: {
            minWidth: 24,
        },
    });
