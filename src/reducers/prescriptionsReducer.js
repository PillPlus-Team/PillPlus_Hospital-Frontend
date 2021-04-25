import { PRESCRIPTIONS_FETCH, PRESCRIPTIONS_SELECT, PRESCRIPTIONS_SELECT_PILLSTORE, PRESCRIPTIONS_UPDATE_PILLSTORE } from '../actions/types';

const initState = { list: [], selectedPrescription_id: null };

const prescriptionsReducer = (state = initState, action) => {
    switch (action.type) {
        case PRESCRIPTIONS_FETCH:
            return { list: action.prescriptions };

        case PRESCRIPTIONS_SELECT: {
            let list = state.list;
            list = list.map((prescription) => {
                if (prescription._id === action._id) {
                    return { ...prescription, selected: true };
                } else {
                    return { ...prescription, selected: false };
                }
            });

            return { ...state, list, selectedPrescription_id: action._id };
        }
        
        case PRESCRIPTIONS_SELECT_PILLSTORE: {
            let list = state.list;
            list = list.map((prescription) => {
                if (prescription._id === action._id) {
                    return {
                        ...prescription,
                        pillStoreID: action.pillStoreID,
                        pillStorePharmacy: action.pillStorePharmacy,
                        pillStoreLocation: action.pillStoreLocation,
                    };
                } else {
                    return prescription;
                }
            });

            return { ...state, list };
        }

        case PRESCRIPTIONS_UPDATE_PILLSTORE: {
            let list = state.list;
            list = list.filter((prescription) => prescription._id !== action._id);

            return { ...state, list, selectedPrescription_id: null };
        }

        default:
            return state;
    }
};

export default prescriptionsReducer;
