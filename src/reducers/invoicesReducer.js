import { INVOICES_FETCH, INVOICES_SELECT, INVOICES_PAY } from '../actions/types';

const initState = { list: [], selectedInvoice_id: null };

const invoicesReducer = (state = initState, action) => {
    switch (action.type) {
        case INVOICES_FETCH:
            return { list: action.invoices };

        case INVOICES_SELECT: {
            let list = state.list;
            list = list.map((invoice) => {
                if (invoice._id === action._id) {
                    return { ...invoice, selected: true };
                } else {
                    return { ...invoice, selected: false };
                }
            });

            return { ...state, list, selectedInvoice_id: action._id };
        }

        case INVOICES_PAY: {
            let list = state.list;
            list = list.filter((invoice) => invoice._id !== action._id);

            return { ...state, list, selectedInvoice_id: null };
        }

        default:
            return state;
    }
};

export default invoicesReducer;
