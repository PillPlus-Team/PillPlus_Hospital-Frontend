import { PRESCRIPTIONS_FETCH, PRESCRIPTIONS_SELECT, PRESCRIPTIONS_SELECT_PILLSTORE, PRESCRIPTIONS_UPDATE_PILLSTORE } from '../actions/types';

const initState = { list: [], selectedPrescriptionID: null };

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

            return { ...state, list, selectedPrescriptionID: action.selectedPrescriptionID };

        case PRESCRIPTIONS_SELECT_PILLSTORE: {
            let list = state.list;
            list = list.map((prescription) => {
                if (prescription.ID === action.ID) {
                    return { ...prescription, pillStoreName: action.pillStoreName };
                } else {
                    return prescription;
                }
            });

            return { ...state, list };
        }

        case PRESCRIPTIONS_UPDATE_PILLSTORE: {
            let list = state.list;
            list = list.filter((prescription) => prescription.ID !== action.ID);

            return { ...state, list, selectedPrescriptionID: null };
        }

        default:
            return state;
    }
};

export default prescriptionsReducer;
