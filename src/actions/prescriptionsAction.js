import { PRESCRIPTIONS_FETCH, PRESCRIPTIONS_SELECT, PRESCRIPTIONS_ADD_PILLSTORE } from './types';

export const prescriptionsFetch = () => {
    return async (dispatch, getState) => {
        let prescriptions = [
            {
                ID: 10000001,
                HN: '10225463',
                name: 'พักตร์ภูมิ ตาแพร่',
                startTime: 1618338519728,

                queueNo: 1,
                pills: [],
            },
            {
                ID: 10000002,
                HN: '10225464',
                name: 'พักตร์ภูมิ ตาแพร่',
                startTime: 1618338719728,
                queueNo: 2,
                pills: [],
            },
            {
                ID: 10000003,
                HN: '10225465',
                name: 'พักตร์ภูมิ ตาแพร่',
                startTime: 1618338919728,
                queueNo: 3,
                pills: [],
            },
        ];

        prescriptions = prescriptions.sort((element_1, element_2) => element_1.startTime - element_2.startTime);
        dispatch({ type: PRESCRIPTIONS_FETCH, prescriptions: prescriptions });
    };
};

export const prescriptionsSelect = ({ ID, selectedPrescription }) => {
    return {
        type: PRESCRIPTIONS_SELECT,
        ID: ID,
        selectedPrescription: selectedPrescription,
    };
};

export const prescriptionsAddPillStore = ({ ID }) => {
    return {
        type: PRESCRIPTIONS_ADD_PILLSTORE,
        ID: ID,
    };
};

/* For Production */
// export const prescriptionsFetch = () => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/getPrescriptions', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (res.status === 200) {
//             let prescriptions = await res.json();
//             prescriptions = prescriptions.sort((element_1, element_2) => element_1.startTime - element_2.startTime);
//             dispatch({ type: PRESCRIPTIONS_FETCH, prescriptions: prescriptions });
//         }
//     };
// };

// export const prescriptionsSelect = ({ ID }) => {
//     return {
//         type: PRESCRIPTIONS_SELECT,
//         ID: ID,
//     };
// };

// export const prescriptionsAddPillStore = ({ ID, pillStoreID }) => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/prescriptionAddLocation', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 ID,
//                 pillStoreID,
//             }),
//         });

//         if (res.status === 200) {
//             dispatch({ type: PRESCRIPTIONS_ADD_PILLSTORE, ID: ID });
//         }
//     };
// };
