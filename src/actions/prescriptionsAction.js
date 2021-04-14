import { PRESCRIPTIONS_FETCH, PRESCRIPTIONS_SELECT, PRESCRIPTIONS_SELECT_PILLSTORE, PRESCRIPTIONS_UPDATE_PILLSTORE } from './types';

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
                pills: [
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', unit: 'เม็ด', amount: 10 },
                    { name: 'ยา B', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', unit: 'ขวด', amount: 2 },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', unit: 'เม็ด', amount: 10 },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', unit: 'เม็ด', amount: 10 },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', unit: 'เม็ด', amount: 10 },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', unit: 'เม็ด', amount: 10 },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', unit: 'เม็ด', amount: 10 },
                ],
            },
            {
                ID: 10000003,
                HN: '10225465',
                name: 'พักตร์ภูมิ ตาแพร่',
                startTime: 1618338919728,
                queueNo: 3,
                pills: [{ name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', unit: 'เม็ด', amount: 10 }],
            },
        ];

        prescriptions = prescriptions.sort((element_1, element_2) => element_1.startTime - element_2.startTime);
        dispatch({ type: PRESCRIPTIONS_FETCH, prescriptions: prescriptions });
    };
};

export const prescriptionsSelect = ({ ID }) => {
    return {
        type: PRESCRIPTIONS_SELECT,
        ID: ID,
        selectedPrescriptionID: ID,
    };
};

export const prescriptionSelectPillStore = ({ ID, pillStoreID, pillStoreName }) => {
    return {
        type: PRESCRIPTIONS_SELECT_PILLSTORE,
        ID: ID,
        pillStoreID: pillStoreID,
        pillStoreName: pillStoreName,
    };
};

export const prescriptionsUpdatePillStore = ({ ID }) => {
    return {
        type: PRESCRIPTIONS_UPDATE_PILLSTORE,
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

// export const prescriptionsSelect = ({ ID, selectedPrescriptionID }) => {
//     return {
//         type: PRESCRIPTIONS_SELECT,
//         ID: ID,
//         selectedPrescriptionID: selectedPrescriptionID,
//     };
// };

// export const prescriptionSelectPillStore = ({ ID, pillStoreID, pillStoreName }) => {
//     return {
//         type: PRESCRIPTIONS_SELECT_PILLSTORE,
//         ID: ID,
//         pillStoreID: pillStoreID,
//         pillStoreName: pillStoreName,
//     };
// };

// export const prescriptionsUpdatePillStore = ({ ID }) => {
//     return async (dispatch, getState) => {
//         const { prescriptions } = getState();

//         const prescription = prescriptions.list.find((element) => element.ID === ID);

//         const res = await fetch('/api/v1/prescriptionAddLocation', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 ID,
//                 pillStoreID: prescription.pillStoreID,
//             }),
//         });

//         if (res.status === 200) {
//             dispatch({ type: PRESCRIPTIONS_UPDATE_PILLSTORE, ID: ID });
//         }else {
//             //Swal.fire (SweetAlert2) Here
//         }
//     };
// };
