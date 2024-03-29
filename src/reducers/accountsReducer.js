import {
    ACCOUNTS_FETCH,
    ACCOUNTS_SHOW,
    ACCOUNTS_ADD_TOGGLE,
    ACCOUNTS_ADD,
    ACCOUNTS_EDIT_TOGGLE,
    ACCOUNTS_UPDATE,
    ACCOUNTS_DELETE,
} from '../actions/types';

const initState = { list: [], adding: false };

const accountsReducer = (state = initState, action) => {
    switch (action.type) {
        case ACCOUNTS_FETCH:
            return { list: action.accounts };

        case ACCOUNTS_SHOW: {
            let list = state.list;
            list = list.map((account) => {
                if (action._idList.includes(account._id)) {
                    return { ...account, show: true };
                } else {
                    return { ...account, show: false };
                }
            });

            return { ...state, list };
        }

        case ACCOUNTS_ADD_TOGGLE:
            return { ...state, adding: !state.adding };

        case ACCOUNTS_ADD: {
            let list = state.list;
            list.push(action.account);
            return { list, adding: false };
        }

        case ACCOUNTS_EDIT_TOGGLE: {
            let list = state.list;
            list = list.map((account) => {
                if (account._id === action._id) {
                    return { ...account, editing: !account.editing };
                } else {
                    return account;
                }
            });

            return { ...state, list };
        }

        case ACCOUNTS_UPDATE: {
            let list = state.list;
            list = list.map((account) => {
                if (account._id === action.account._id) {
                    return {
                        ...action.account,
                        editing: false,
                    };
                } else {
                    return account;
                }
            });

            return { ...state, list };
        }

        case ACCOUNTS_DELETE: {
            let list = state.list;
            list = list.filter((account) => account._id !== action._id);

            return { ...state, list };
        }

        default:
            return state;
    }
};

export default accountsReducer;
