import {
    PRESCRIPTIONS_FETCH,
    PRESCRIPTIONS_FETCH_BY_IO,
    PRESCRIPTIONS_SELECT,
    PRESCRIPTIONS_SELECT_PILLSTORE,
    PRESCRIPTIONS_UPDATE_PILLSTORE,
} from './types';
import { USER_LOGOUT } from './types';

import { LoadingModal, ConfirmDialog, Toast } from './swals';

import { API_URL } from '../config';

/* For Production */
export const prescriptionsFetch = () => {
    return async (dispatch) => {
        try {
            const res = await fetch(API_URL + '/prescription', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                let prescriptions = await res.json();
                prescriptions = prescriptions.sort((element_1, element_2) => element_1.startTime - element_2.startTime);

                dispatch({ type: PRESCRIPTIONS_FETCH, prescriptions: prescriptions });
            } else {
                throw res;
            }
        } catch (error) {
            if (error.status === 401) {
                dispatch({ type: USER_LOGOUT });
            }
        }
    };
};

export const prescriptionsFetchByIO = () => {
    return async (dispatch) => {
        try {
            const res = await fetch(API_URL + '/prescription', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                let prescriptions = await res.json();
                prescriptions = prescriptions.sort((element_1, element_2) => element_1.startTime - element_2.startTime);

                dispatch({ type: PRESCRIPTIONS_FETCH_BY_IO, newPrescriptions: prescriptions });
            } else {
                throw res;
            }
        } catch (error) {
            if (error.status === 401) {
                dispatch({ type: USER_LOGOUT });
            }
        }
    };
};

export const prescriptionsSelect = ({ _id }) => {
    return {
        type: PRESCRIPTIONS_SELECT,
        _id: _id,
    };
};

export const prescriptionSelectPillStore = ({ _id, pillStoreID, pillStorePharmacy, pillStoreLocation }) => {
    return {
        type: PRESCRIPTIONS_SELECT_PILLSTORE,
        _id: _id,
        pillStoreID: pillStoreID,
        pillStorePharmacy: pillStorePharmacy,
        pillStoreLocation: pillStoreLocation,
    };
};

export const prescriptionsUpdatePillStore = ({ _id, onSuccess }) => {
    return (dispatch, getState) => {
        const { prescriptions } = getState();
        const prescription = prescriptions.list.find((prescription) => prescription._id === _id);

        ConfirmDialog.fire({
            title: 'ยืนยันสถานที่รับยา',
            html:
                `<br> HN ${prescription.hn} : ${prescription.name} <br><br>` +
                `รับยาที่ <b>${prescription.pillStorePharmacy}</b> <br>` +
                `ที่อยู่ <b>${prescription.pillStoreLocation}</b> <br>`,
            icon: 'warning',
        }).then(async (result) => {
            if (result.isConfirmed) {
                LoadingModal.fire({ title: 'กำลังดำเนินการ ...' });
                LoadingModal.showLoading();

                try {
                    const res = await fetch(API_URL + `/invoice/selectPillStore`, {
                        method: 'POST',
                        mode: 'cors',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            _id: _id,
                            pillStoreID: prescription.pillStoreID,
                        }),
                    });

                    if (res.status === 200) {
                        onSuccess();

                        dispatch({ type: PRESCRIPTIONS_UPDATE_PILLSTORE, _id: _id });
                        Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success', timer: 1500 });
                    } else {
                        throw res;
                    }
                } catch (error) {
                    if (error.status === 401) {
                        dispatch({ type: USER_LOGOUT });
                    } else {
                        Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
                        dispatch(prescriptionsFetch());
                    }
                }

                if (LoadingModal.isLoading()) {
                    LoadingModal.close();
                }
            }
        });
    };
};

/* For dev */
// export const prescriptionsFetch = () => {
//     return async (dispatch) => {
//         let prescriptions = [
//             {
//                 _id: 10000001,
//                 hn: '10225463',
//                 name: 'นาย พักตร์ภูมิ ตาแพร่',
//                 startTime: 1618415601123,
//                 queueNo: 1,
//                 doctor: 'นพ.สมชาย เจริญรุ่งเรือง',
//                 pills: [],
//             },
//             {
//                 _id: 10000002,
//                 hn: '10225464',
//                 name: 'นาย พักตร์ภูมิ ตาแพร่',
//                 startTime: 1618415651123,
//                 queueNo: 2,
//                 doctor: 'นพ.สมชาย เจริญรุ่งเรือง',
//                 pills: [
//                     { sn: '00000001', name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด' },
//                     { sn: '00000001', name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด' },
//                     { sn: '00000001', name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด' },
//                     { sn: '00000001', name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด' },
//                     { sn: '00000001', name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด' },
//                     { sn: '00000001', name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด' },
//                     { sn: '00000001', name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 100, unit: 'เม็ด' },
//                     { sn: '00000001', name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด' },
//                     { sn: '00000001', name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 50, unit: 'เม็ด' },
//                 ],
//             },
//             {
//                 _id: 10000003,
//                 hn: '10225465',
//                 name: 'นาย พักตร์ภูมิ ตาแพร่',
//                 startTime: 1618415661123,
//                 queueNo: 3,
//                 doctor: 'นพ.สมชาย เจริญรุ่งเรือง',
//                 pills: [{ sn: '00000001', name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด' }],
//             },
//         ];

//         prescriptions = prescriptions.sort((element_1, element_2) => element_1.startTime - element_2.startTime);
//         dispatch({ type: PRESCRIPTIONS_FETCH, prescriptions: prescriptions });
//     };
// };

// export const prescriptionsSelect = ({ _id }) => {
//     return {
//         type: PRESCRIPTIONS_SELECT,
//         _id: _id,
//     };
// };

// export const prescriptionSelectPillStore = ({ _id, pillStoreID, pillStorePharmacy, pillStoreLocation }) => {
//     return {
//         type: PRESCRIPTIONS_SELECT_PILLSTORE,
//         _id: _id,
//         pillStoreID: pillStoreID,
//         pillStorePharmacy: pillStorePharmacy,
//         pillStoreLocation: pillStoreLocation,
//     };
// };

// export const prescriptionsUpdatePillStore = ({ _id }) => {
//     return async (dispatch, getState) => {
//         const { prescriptions } = getState();

//         const prescription = prescriptions.list.find((prescription) => prescription._id === _id);

//         ConfirmDialog.fire({
//             title: 'ยืนยันสถานที่รับยา',
//             html:
//                 `<br> HN ${prescription.hn} : ${prescription.name} <br><br>` +
//                 `รับยาที่ <b>${prescription.pillStorePharmacy}</b> <br>` +
//                 `ที่อยู่ <b>${prescription.pillStoreLocation}</b> <br>`,
//             icon: 'warning',
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 dispatch({ type: PRESCRIPTIONS_UPDATE_PILLSTORE, _id: _id });
//                 Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success', timer: 1500 });
//             }
//         });
//     };
// };
