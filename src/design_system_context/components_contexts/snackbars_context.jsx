import React, { createContext, useCallback, useContext } from 'react';

import { DesignSystemContext } from '../design_system_context';

export const SnackbarsContext = createContext({});

export const SnackbarsProvider = ({ children }) => {
    const {
        components: { snackbars },
        setState,
        ...state
    } = useContext(DesignSystemContext);
    const setSnackbars = useCallback(newSnackbars =>
        setState({
            ...state,
            setState,
            components: {
                snackbars: newSnackbars
            }
        }));
    return (
        <SnackbarsContext.Provider
            value={{
                snackbars,
                setSnackbars
            }}
        >
            {children}
        </SnackbarsContext.Provider>
    );
};
