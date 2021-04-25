import { PILLS_FETCH, PILLS_SHOW, PILLS_ADD_TOGGLE, PILLS_ADD, PILLS_EDIT_TOGGLE, PILLS_UPDATE, PILLS_DELETE } from './types';

import { LoadingModal, DeleteAlertDialog, Toast } from './swals';

import { API_URL } from '../config';

/* For Production */
export const pillsFetch = () => {
    return async (dispatch) => {
        const res = await fetch(API_URL + '/pill/all', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status === 200) {
            const pills = await res.json();

            dispatch({ type: PILLS_FETCH, pills: pills });
            dispatch(pillsFilter({ keyword: '' }));
        }
    };
};

export const pillsFilter = ({ keyword }) => {
    return async (dispatch, getState) => {
        const { pills } = getState();

        let _idList = [];
        pills.list.map((pill) => {
            const keys = Object.keys(pill).filter((key) => key != '_id');
            for (let i = 0; i < keys.length; i++) {
                if (String(pill[keys[i]]).includes(keyword)) {
                    return _idList.push(pill._id);
                }
            }
        });

        dispatch({ type: PILLS_SHOW, _idList: _idList });
    };
};

export const pillsAddToggle = () => {
    return {
        type: PILLS_ADD_TOGGLE,
    };
};

export const pillsAdd = ({ sn, name, description, unit, price, type }) => {
    return async (dispatch) => {
        LoadingModal.fire({ title: 'กำลังดำเนินการ ...' });
        LoadingModal.showLoading();

        const res = await fetch(API_URL + '/pill', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sn: sn,
                name: name,
                description: description,
                unit: unit,
                price: price,
                type: type,
            }),
        });

        if (res.status === 200) {
            const pill = await res.json();

            dispatch({ type: PILLS_ADD, pill: pill });
            dispatch(pillsFilter({ keyword: '' }));
            Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
        } else {
            Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
            dispatch(pillsFetch());
        }
    };
};

export const pillsEditToggle = ({ _id }) => {
    return {
        type: PILLS_EDIT_TOGGLE,
        _id: _id,
    };
};

export const pillsUpdate = ({ _id, sn, name, description, unit, price, type }) => {
    return async (dispatch, getState) => {
        LoadingModal.fire({ title: 'กำลังดำเนินการ ...' });
        LoadingModal.showLoading();

        const { pills } = getState();
        const pill = pills.list.find((pill) => pill._id === _id);

        const res = await fetch(API_URL + `/pill/${_id}`, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sn: sn,
                name: name,
                description: description,
                unit: unit,
                price: price,
                type: type,
            }),
        });

        if (res.status === 200) {
            const editedPill = await res.json();

            dispatch({ type: PILLS_UPDATE, pill: { ...pill, ...editedPill } });
            Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
        } else {
            Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
            dispatch(pillsFetch());
        }
    };
};

export const pillsDelete = ({ _id }) => {
    return async (dispatch, getState) => {
        const { pills } = getState();
        const pill = pills.list.find((pill) => pill._id === _id);

        DeleteAlertDialog.fire({
            title: 'ยืนยันที่จะลบข้อมูลยา',
            html: `<br> SN ${pill.sn} <br><br>` + `ชื่อยา : <b>${pill.name}</b> <br>`,
            icon: 'warning',
        }).then(async (result) => {
            if (result.isConfirmed) {
                LoadingModal.fire({ title: 'กำลังดำเนินการ ...' });
                LoadingModal.showLoading();

                const res = await fetch(API_URL + `/pill/${_id}`, {
                    method: 'DELETE',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (res.status === 200) {
                    dispatch({ type: PILLS_DELETE, _id: _id });
                    Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
                } else {
                    Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
                    dispatch(pillsFetch());
                }
            }
        });
    };
};

/* For Dev */
// export const pillsFetch = () => {
//     return async (dispatch) => {
//         let pills = [
//             {
//                 _id: 10000001,
//                 sn: '10225463',
//                 name: 'ยา A',
//                 description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น',
//                 unit: 'เม็ด',
//                 price: 150.0,
//                 type: 'ED',
//             },
//             {
//                 _id: 10000002,
//                 sn: '10225480',
//                 name: 'ยา B',
//                 description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น',
//                 unit: 'ขวด',
//                 price: 159.0,
//                 type: 'NED',
//             },
//             {
//                 _id: 10000003,
//                 sn: '10225888',
//                 name: 'ยา C',
//                 description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น',
//                 unit: 'เม็ด',
//                 price: 12.0,
//                 type: 'ED',
//             },
//             {
//                 _id: 10000004,
//                 sn: '10225463',
//                 name: 'ยา A',
//                 description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น',
//                 unit: 'เม็ด',
//                 price: 150.0,
//                 type: 'ED',
//             },
//             {
//                 _id: 10000005,
//                 sn: '10225480',
//                 name: 'ยา B',
//                 description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น',
//                 unit: 'ขวด',
//                 price: 159.0,
//                 type: 'NED',
//             },
//             {
//                 _id: 10000006,
//                 sn: '10225888',
//                 name: 'ยา C',
//                 description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น',
//                 unit: 'เม็ด',
//                 price: 12.0,
//                 type: 'ED',
//             },
//             {
//                 _id: 10000007,
//                 sn: '10225463',
//                 name: 'ยา A',
//                 description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น',
//                 unit: 'เม็ด',
//                 price: 150.0,
//                 type: 'ED',
//             },
//             {
//                 _id: 10000008,
//                 sn: '10225480',
//                 name: 'ยา B',
//                 description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น',
//                 unit: 'ขวด',
//                 price: 159.0,
//                 type: 'NED',
//             },
//             {
//                 _id: 10000009,
//                 sn: '10225888',
//                 name: 'ยา C',
//                 description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น',
//                 unit: 'เม็ด',
//                 price: 12.0,
//                 type: 'ED',
//             },
//         ];

//         dispatch({ type: PILLS_FETCH, pills: pills });
//         dispatch(pillsFilter({ keyword: '' }));
//     };
// };

// export const pillsFilter = ({ keyword }) => {
//     return async (dispatch, getState) => {
//         const { pills } = getState();

//         let _idList = [];
//         pills.list.map((pill) => {
//             const keys = Object.keys(pill).filter((key) => key != '_id');
//             for (let i = 0; i < keys.length; i++) {
//                 if (String(pill[keys[i]]).includes(keyword)) {
//                     return _idList.push(pill._id);
//                 }
//             }
//         });

//         dispatch({ type: PILLS_SHOW, _idList: _idList });
//     };
// };

// export const pillsAddToggle = () => {
//     return {
//         type: PILLS_ADD_TOGGLE,
//     };
// };

// export const pillsAdd = ({ sn, name, description, unit, price, type }) => {
//     return async (dispatch) => {
//         const pill = {
//             _id: Math.floor(Math.random() * 100000000),
//             sn,
//             name,
//             description,
//             unit,
//             price,
//             type,
//         };

//         dispatch({ type: PILLS_ADD, pill: pill });
//         dispatch(pillsFilter({ keyword: '' }));
//         Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
//     };
// };

// export const pillsEditToggle = ({ _id }) => {
//     return {
//         type: PILLS_EDIT_TOGGLE,
//         _id: _id,
//     };
// };

// export const pillsUpdate = ({ _id, sn, name, description, unit, price, type }) => {
//     return async (dispatch, getState) => {
//         const { pills } = getState();
//         const pill = pills.list.find((pill) => pill._id === _id);

//         dispatch({ type: PILLS_UPDATE, pill: { ...pill, sn, name, description, unit, price, type } });
//         Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
//     };
// };

// export const pillsDelete = ({ _id }) => {
//     return async (dispatch, getState) => {
//         const { pills } = getState();

//         const pill = pills.list.find((pill) => pill._id === _id);

//         DeleteAlertDialog.fire({
//             title: 'ยืนยันที่จะลบข้อมูลยา',
//             html: `<br> SN ${pill.sn} <br><br>` + `ชื่อยา : <b>${pill.name}</b> <br>`,
//             icon: 'warning',
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 dispatch({ type: PILLS_DELETE, _id: _id });
//                 Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
//             }
//         });
//     };
// };
