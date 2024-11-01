import { createDraftSafeSelector } from '@reduxjs/toolkit';

const appData = createDraftSafeSelector(
    (state: { APP: GApp }) => state.APP,
    (state: GApp) => ({
        ...state
    })
);

const appSelectors = {
    appData
};

export { appSelectors };
