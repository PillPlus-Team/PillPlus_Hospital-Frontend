import {
    PILLSTORES_FETCH,
    PILLSTORES_SHOW,
    PILLSTORES_ADD_TOGGLE,
    PILLSTORES_ADD,
    PILLSTORES_EDIT_TOGGLE,
    PILLSTORES_UPDATE,
    PILLSTORES_DELETE,
} from '../actions/types';

const initState = { list: [], adding: false };

const pillStoresReducer = (state = initState, action) => {
    switch (action.type) {
        case PILLSTORES_FETCH:
            return { list: action.pillStores };

        case PILLSTORES_SHOW: {
            let list = state.list;
            list = list.map((pillStore) => {
                if (action._idList.includes(pillStore._id)) {
                    return { ...pillStore, show: true };
                } else {
                    return { ...pillStore, show: false };
                }
            });

            return { ...state, list };
        }

        case PILLSTORES_ADD_TOGGLE:
            return { ...state, adding: !state.adding };

        case PILLSTORES_ADD: {
            let list = state.list;
            list.push(action.pillStore);
            return { list, adding: false };
        }

        case PILLSTORES_EDIT_TOGGLE: {
            let list = state.list;
            list = list.map((pillStore) => {
                if (pillStore._id === action._id) {
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
                if (pillStore._id === action.pillStore._id) {
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
            list = list.filter((pillStore) => pillStore._id !== action._id);

            return { ...state, list };
        }

        default:
            return state;
    }
};

export default pillStoresReducer;
