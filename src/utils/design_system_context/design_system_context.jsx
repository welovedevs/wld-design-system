import React, { createContext, useState } from 'react';

import { initialState } from './design_system_provider_context_state';

/*
  Hello there!
  This is the Design system's context.
  It contains quite a bit of important informations for our components to works
  as expected together.
*/

// TODO: SPLIT IT. https://github.com/facebook/react/issues/15156#issuecomment-474590693
export const DesignSystemContext = createContext({});

export const DesignSystemProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
    return (
        <DesignSystemContext.Provider
            value={{
                ...state,
                setState,
            }}
        >
            {children}
        </DesignSystemContext.Provider>
    );
};
