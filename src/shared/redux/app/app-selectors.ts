import { createDraftSafeSelector } from '@reduxjs/toolkit';

const appData = createDraftSafeSelector(
    (state: { APP: GApp }) => state.APP,
    (state) => ({
        ...state
    })
);

const appSelectors = {
    appData
};

export { appSelectors };
