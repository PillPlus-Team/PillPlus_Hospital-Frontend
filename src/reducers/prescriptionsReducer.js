import { PRESCRIPTIONS_FETCH, PRESCRIPTIONS_SELECT, PRESCRIPTIONS_ADD_PILLSTORE } from '../actions/types';

const initState = { list: [], selectedPrescription: null };

const prescriptionsReducer = (state = initState, action) => {
    switch (action.type) {
        case PRESCRIPTIONS_FETCH:
            return { list: action.prescriptions };

        case PRESCRIPTIONS_SELECT:
            let list = state.list;
            list = list.map((prescription) => {
                if (prescription.ID === action.ID) {
                    return { ...prescription, selected: true };
                } else {
                    return { ...prescription, selected: false };
                }
            });

            return { ...state, list, selectedPrescription: action.selectedPrescription };

        case PRESCRIPTIONS_ADD_PILLSTORE: {
            let list = state.list;
            list = list.filter((prescription) => prescription.ID !== action.ID);

            return { ...state, list };
        }

        default:
            return state;
    }
};

export default prescriptionsReducer;
