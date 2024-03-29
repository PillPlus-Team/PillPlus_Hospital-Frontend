import { PILLS_FETCH, PILLS_SHOW, PILLS_ADD_TOGGLE, PILLS_ADD, PILLS_EDIT_TOGGLE, PILLS_UPDATE, PILLS_DELETE } from '../actions/types';

const initState = { list: [], adding: false };

const pillsReducer = (state = initState, action) => {
    switch (action.type) {
        case PILLS_FETCH:
            return { list: action.pills };

        case PILLS_SHOW: {
            let list = state.list;
            list = list.map((pill) => {
                if (action._idList.includes(pill._id)) {
                    return { ...pill, show: true };
                } else {
                    return { ...pill, show: false };
                }
            });

            return { ...state, list };
        }

        case PILLS_ADD_TOGGLE:
            return { ...state, adding: !state.adding };

        case PILLS_ADD: {
            let list = state.list;
            list.push(action.pill);
            return { list, adding: false };
        }

        case PILLS_EDIT_TOGGLE: {
            let list = state.list;
            list = list.map((pill) => {
                if (pill._id === action._id) {
                    return { ...pill, editing: !pill.editing };
                } else {
                    return pill;
                }
            });

            return { ...state, list };
        }

        case PILLS_UPDATE: {
            let list = state.list;
            list = list.map((pill) => {
                if (pill._id === action.pill._id) {
                    return {
                        ...action.pill,
                        editing: false,
                    };
                } else {
                    return pill;
                }
            });

            return { ...state, list };
        }

        case PILLS_DELETE: {
            let list = state.list;
            list = list.filter((pill) => pill._id !== action._id);

            return { ...state, list };
        }

        default:
            return state;
    }
};

export default pillsReducer;
