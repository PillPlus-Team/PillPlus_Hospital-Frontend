import { PRESCRIPTIONS_FETCH, PRESCRIPTIONS_SELECT, PRESCRIPTIONS_SELECT_PILLSTORE, PRESCRIPTIONS_UPDATE_PILLSTORE } from './types';

import { ConfirmDialog, Toast } from './swals';

export const prescriptionsFetch = () => {
    return async (dispatch) => {
        let prescriptions = [
            {
                ID: 10000001,
                hn: '10225463',
                name: 'นาย พักตร์ภูมิ ตาแพร่',
                startTime: 1618415601123,
                queueNo: 1,
                doctor: 'นพ.สมชาย เจริญรุ่งเรือง',
                pills: [],
            },
            {
                ID: 10000002,
                hn: '10225464',
                name: 'นาย พักตร์ภูมิ ตาแพร่',
                startTime: 1618415651123,
                queueNo: 2,
                doctor: 'นพ.สมชาย เจริญรุ่งเรือง',
                pills: [
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด' },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด' },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด' },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด' },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด' },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด' },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 100, unit: 'เม็ด' },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด' },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 50, unit: 'เม็ด' },
                ],
            },
            {
                ID: 10000003,
                hn: '10225465',
                name: 'นาย พักตร์ภูมิ ตาแพร่',
                startTime: 1618415661123,
                queueNo: 3,
                doctor: 'นพ.สมชาย เจริญรุ่งเรือง',
                pills: [{ name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด' }],
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
    };
};

export const prescriptionSelectPillStore = ({ ID, pillStoreID, pillStorePhamacy, pillStoreLocation }) => {
    return {
        type: PRESCRIPTIONS_SELECT_PILLSTORE,
        ID: ID,
        pillStoreID: pillStoreID,
        pillStorePhamacy: pillStorePhamacy,
        pillStoreLocation: pillStoreLocation,
    };
};

export const prescriptionsUpdatePillStore = ({ ID }) => {
    return async (dispatch, getState) => {
        const { prescriptions } = getState();

        const prescription = prescriptions.list.find((prescription) => prescription.ID === ID);

        ConfirmDialog.fire({
            title: 'ยืนยันสถานที่รับยา',
            html:
                `<br> HN ${prescription.hn} : ${prescription.name} <br><br>` +
                `รับยาที่ <b>${prescription.pillStorePhamacy}</b> <br>` +
                `ที่อยู่ <b>${prescription.pillStoreLocation}</b> <br>`,
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: PRESCRIPTIONS_UPDATE_PILLSTORE, ID: ID });
                Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success', timer: 1500 });
            }
        });
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

// export const prescriptionSelectPillStore = ({ ID, pillStoreID, pillStorePhamacy, pillStoreLocation }) => {
//     return {
//         type: PRESCRIPTIONS_SELECT_PILLSTORE,
//         ID: ID,
//         pillStoreID: pillStoreID,
//         pillStorePhamacy: pillStorePhamacy,
//         pillStoreLocation: pillStoreLocation
//     };
// };

// export const prescriptionsUpdatePillStore = ({ ID }) => {
//     return async (dispatch, getState) => {
//         const { prescriptions } = getState();

//         const prescription = prescriptions.list.find((prescription) => prescription.ID === ID);

//         ConfirmDialog.fire({
//             title: 'ยืนยันสถานที่รับยา',
//             html:
//                 `<br> HN ${prescription.hn} : ${prescription.name} <br><br>` +
//                 `รับยาที่ <b>${prescription.pillStorePhamacy}</b> <br>` +
//                 `ที่อยู่ <b>${prescription.pillStoreLocation}</b> <br>`,
//             icon: 'warning',
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 const res = await fetch('/api/v1/prescriptionAddLocation', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         ID,
//                         pillStoreID: prescription.pillStoreID,
//                     }),
//                 });

//                 if (res.status === 200) {
//                     dispatch({ type: PRESCRIPTIONS_UPDATE_PILLSTORE, ID: ID });
//                     Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success', timer: 1500 });
//                 } else {
//                     Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
//                 }
//             }
//         });
//     };
// };
