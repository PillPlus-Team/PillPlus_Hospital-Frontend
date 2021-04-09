import {
    PILLSTORES_FETCH,
    PILLSTORES_ADD_TOGGLE,
    PILLSTORES_ADD,
    PILLSTORES_EDIT_TOGGLE,
    PILLSTORES_UPDATE,
    PILLSTORES_DELETE,
} from '../actions/types';

const initState = { list: [] };

const pillStoresReducer = (state = initState, action) => {
    switch (action.type) {
        case PILLSTORES_FETCH:
            return { list: action.pillStores };

        case PILLSTORES_ADD_TOGGLE:
            return { ...state, adding: !state.adding };

        case PILLSTORES_ADD: {
            let list = state.list;
            list.push(action.pillStore);
            return { list, adding: false };
        }

        case PILLSTORES_EDIT_TOGGLE: {
            let list = state.list;
            list = list.map((account) => {
                if (pillStore.ID === action.ID) {
                    return { ...pillStore, editing: !pillStore.editing };
                } else {
                    return pillStore;
                }
            });

            return { ...state, list };
        }

        case PILLSTORES_UPDATE: {
            let list = state.list;
            list = list.map((pillStore) => {
                if (pillStore.ID === action.pillStore.ID) {
                    return {
                        ...action.pillStore,
                        editing: false,
                    };
                } else {
                    return pillStore;
                }
            });

            return { ...state, list };
        }

        case PILLSTORES_DELETE: {
            let list = state.list;
            list = list.filter((pillStore) => pillStore.ID !== action.ID);

            return { ...state, list };
        }

        default:
            return state;
    }
};

export default pillStoresReducer;
