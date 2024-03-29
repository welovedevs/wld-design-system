import { createStyles, Theme } from '@material-ui/core/styles';
import { withCustomVerticalScrollbar } from '../../styles';
import { dark, danger } from '../../styles/palettes';

type StylesKeys = '';

export type Classes = {
    [key in StylesKeys]?: string;
};

export const styles = ({ spacing }: Theme) =>
    createStyles({
        container: {
            paddingRight: spacing(6),
            height: '100%',
            overflowY: 'auto',
            ...(withCustomVerticalScrollbar() as any),
        },
        listItem: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: 0,
            margin: spacing(4, 0),
            position: 'relative',
            zIndex: 1400,
        },
        logo: {
            width: 50,
            height: 50,
            padding: spacing(1),
            margin: spacing(0, 3, 0),
        },
        logoImage: {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
        },
        dragHandleButton: {
            display: 'flex',
        },
        dragHandle: {
            width: 24,
            height: 24,
        },
        divider: {
            margin: spacing(0, 2),
            height: 50,
            width: 1,
            backgroundColor: dark[50],
        },
        removeButton: {
            display: 'flex',
        },
        removeIcon: {
            fill: danger[500],
        },
        textWrapper: {
            flex: 1,
        },
        trash: {
            fill: danger[500],
            width: 24,
            height: 24,
        },
        sliderValueContainer: {
            display: 'flex',
            alignItems: 'center',
            marginTop: spacing(1),
        },
        sliderValue: {
            marginRight: spacing(2),
            width: spacing(5),
            marginBottom: 0,
        },
        slider: {
            flex: 1,
            zIndex: 1,
        },
        popper: {
            zIndex: 130200,
        },
        bolden: {
            fontWeight: 500,
        },
        sortableHelper: {
            zIndex: '1301 !important' as any,
        },
    });
