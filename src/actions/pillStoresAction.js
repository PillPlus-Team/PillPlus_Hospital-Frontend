import {
    PILLSTORES_FETCH,
    PILLSTORES_SHOW,
    PILLSTORES_ADD_TOGGLE,
    PILLSTORES_ADD,
    PILLSTORES_EDIT_TOGGLE,
    PILLSTORES_UPDATE,
    PILLSTORES_DELETE,
} from './types';
import { USER_LOGOUT } from './types';

import { stringGenerate } from './ultis';

import { LoadingModal, DeleteAlertDialog, ImportantNotificationModal, Toast } from './swals';

import { API_URL } from '../config';

/* For Production */
export const pillStoresFetch = () => {
    return async (dispatch) => {
        try {
            const res = await fetch(API_URL + '/pillStore/all', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                const pillStores = await res.json();

                dispatch({ type: PILLSTORES_FETCH, pillStores: pillStores });
                dispatch(pillStoresFilter({ keyword: '' }));
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

export const pillStoresFilter = ({ keyword }) => {
    return (dispatch, getState) => {
        const { pillStores } = getState();

        let _idList = [];
        pillStores.list.map((pillStore) => {
            const keys = Object.keys(pillStore).filter((key) => key != '_id');
            for (let i = 0; i < keys.length; i++) {
                if (String(pillStore[keys[i]]).includes(keyword)) {
                    return _idList.push(pillStore._id);
                }
            }
        });

        dispatch({ type: PILLSTORES_SHOW, _idList: _idList });
    };
};

export const pillStoresAddToggle = () => {
    return {
        type: PILLSTORES_ADD_TOGGLE,
    };
};

export const pillStoresAdd = ({ name, pharmacy, location, email, phone }) => {
    return async (dispatch) => {
        LoadingModal.fire({ title: 'กำลังดำเนินการ ...' });
        LoadingModal.showLoading();

        const password = stringGenerate(6);

        try {
            const res = await fetch(API_URL + '/pillStore', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    pharmacy: pharmacy,
                    location: location,
                    email: email,
                    phone: phone,
                    password: password,
                }),
            });

            if (res.status === 200) {
                const pillStore = await res.json();

                dispatch({ type: PILLSTORES_ADD, pillStore: pillStore });
                dispatch(pillStoresFilter({ keyword: '' }));
                ImportantNotificationModal.fire({
                    title: 'สร้างบัญชีร้านขายยา สำเร็จ',
                    html:
                        `<br> ID ${pillStore.ID} : ${pillStore.name} <br>` +
                        `ชื่อร้าน <b>${pillStore.pharmacy}</b></p> <br>` +
                        `Email : ${pillStore.email} <br>` +
                        `รหัสผ่าน : <p class='text-red-500 inline-block'>${password}</p> <br><br>` +
                        `<p class='text-red-500'>รหัสผ่านสำหรับใช้งานชั่วคราว <br> โปรดทำการเปลี่ยนแปลงในภายหลัง</p> <br>`,
                    icon: 'success',
                });
            } else {
                throw res;
            }
        } catch (error) {
            if (error.status === 401) {
                dispatch({ type: USER_LOGOUT });
            } else {
                Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
                dispatch(pillStoresFetch());
            }
        }

        LoadingModal.close();
    };
};

export const pillStoresEditToggle = ({ _id }) => {
    return {
        type: PILLSTORES_EDIT_TOGGLE,
        _id: _id,
    };
};

export const pillStoresUpdate = ({ _id, name, pharmacy, location, email, phone }) => {
    return async (dispatch, getState) => {
        LoadingModal.fire({ title: 'กำลังดำเนินการ ...' });
        LoadingModal.showLoading();

        const { pillStores } = getState();
        const pillStore = pillStores.list.find((pillStore) => pillStore._id === _id);

        try {
            const res = await fetch(API_URL + `/pillStore/${_id}`, {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    pharmacy: pharmacy,
                    location: location,
                    email: email,
                    phone: phone,
                }),
            });

            if (res.status === 200) {
                const editedPillStore = await res.json();

                dispatch({ type: PILLSTORES_UPDATE, pillStore: { ...pillStore, ...editedPillStore } });
                Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
            } else {
                throw res;
            }
        } catch (error) {
            if (error.status === 401) {
                dispatch({ type: USER_LOGOUT });
            } else {
                Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
                dispatch(pillStoresFetch());
            }
        }

        LoadingModal.close();
    };
};

export const pillStoresDelete = ({ _id }) => {
    return (dispatch, getState) => {
        const { pillStores } = getState();
        const pillStore = pillStores.list.find((pillStore) => pillStore._id === _id);

        DeleteAlertDialog.fire({
            title: 'ยืนยันที่จะลบบัญชีร้านขายยา',
            html:
                `<br> ID ${pillStore.ID} : ${pillStore.name} <br><br>` +
                `ชื่อร้าน <b>${pillStore.pharmacy}</b> <br>` +
                `ที่อยู่ <b>${pillStore.location}</b> <br>`,
            icon: 'warning',
        }).then(async (result) => {
            if (result.isConfirmed) {
                LoadingModal.fire({ title: 'กำลังดำเนินการ ...' });
                LoadingModal.showLoading();

                try {
                    const res = await fetch(API_URL + `/pillStore/${_id}`, {
                        method: 'DELETE',
                        mode: 'cors',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (res.status === 200) {
                        dispatch({ type: PILLSTORES_DELETE, _id: _id });
                        Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
                    } else {
                        throw res;
                    }
                } catch (error) {
                    if (error.status === 401) {
                        dispatch({ type: USER_LOGOUT });
                    } else {
                        Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
                        dispatch(pillStoresFetch());
                    }
                }

                LoadingModal.close();
            }
        });
    };
};

/* For Dev */
// export const pillStoresFetch = () => {
//     return async (dispatch) => {
//         let pillStores = [
//             {
//                 _id: 10000001,
//                 ID: 10000001,
//                 name: 'พักตร์ภูมิ ตาแพร่',
//                 pharmacy: 'ยาอม ยาดม ยาหม่อง',
//                 location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                 email: 'phoom0529@gmail.com',
//                 phone: '0891234567',
//                 avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000002,
//                 ID: 10000002,
//                 name: 'พักตร์ภูมิ ตาแพร่',
//                 pharmacy: 'ยาพิษ bodyslam',
//                 location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                 email: 'phoom1477@gmail.com',
//                 phone: '0899997333',
//                 avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000003,
//                 ID: 10000003,
//                 name: 'พักตร์ภูมิ ตาแพร่',
//                 pharmacy: 'ยาดี ยาอี ยาไอซ์',
//                 location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                 email: 'phukphoomtaphrae@gmail.com',
//                 phone: '0891234765',
//                 avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000004,
//                 ID: 10000004,
//                 name: 'พักตร์ภูมิ ตาแพร่',
//                 pharmacy: 'ยาอม ยาดม ยาหม่อง',
//                 location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                 email: 'phoom0529@gmail.com',
//                 phone: '0891234567',
//                 avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000005,
//                 ID: 10000005,
//                 name: 'พักตร์ภูมิ ตาแพร่',
//                 pharmacy: 'ยาพิษ bodyslam',
//                 location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                 email: 'phoom1477@gmail.com',
//                 phone: '0899997333',
//                 avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000006,
//                 ID: 10000006,
//                 name: 'พักตร์ภูมิ ตาแพร่',
//                 pharmacy: 'ยาดี ยาอี ยาไอซ์',
//                 location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                 email: 'phukphoomtaphrae@gmail.com',
//                 phone: '0891234765',
//                 avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000007,
//                 ID: 10000007,
//                 name: 'พักตร์ภูมิ ตาแพร่',
//                 pharmacy: 'ยาอม ยาดม ยาหม่อง',
//                 location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                 email: 'phoom0529@gmail.com',
//                 phone: '0891234567',
//                 avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000008,
//                 ID: 10000008,
//                 name: 'พักตร์ภูมิ ตาแพร่',
//                 pharmacy: 'ยาพิษ bodyslam',
//                 location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                 email: 'phoom1477@gmail.com',
//                 phone: '0899997333',
//                 avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000009,
//                 ID: 10000009,
//                 name: 'พักตร์ภูมิ ตาแพร่',
//                 pharmacy: 'ยาดี ยาอี ยาไอซ์',
//                 location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                 email: 'phukphoomtaphrae@gmail.com',
//                 phone: '0891234765',
//                 avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//         ];

//         dispatch({ type: PILLSTORES_FETCH, pillStores: pillStores });
//         dispatch(pillStoresFilter({ keyword: '' }));
//     };
// };

// export const pillStoresFilter = ({ keyword }) => {
//     return async (dispatch, getState) => {
//         const { pillStores } = getState();

//         let _idList = [];
//         pillStores.list.map((pillStore) => {
//             const keys = Object.keys(pillStore).filter((key) => key != '_id');
//             for (let i = 0; i < keys.length; i++) {
//                 if (String(pillStore[keys[i]]).includes(keyword)) {
//                     return _idList.push(pillStore._id);
//                 }
//             }
//         });

//         dispatch({ type: PILLSTORES_SHOW, _idList: _idList });
//     };
// };

// export const pillStoresAddToggle = () => {
//     return {
//         type: PILLSTORES_ADD_TOGGLE,
//     };
// };

// export const pillStoresAdd = ({ name, pharmacy, location, email, phone }) => {
//     return async (dispatch) => {
//         const password = stringGenerate(6);

//         const pillStore = {
//             _id: Math.floor(Math.random() * 100000000),
//             ID: Math.floor(Math.random() * 100000000),
//             name,
//             pharmacy,
//             location,
//             email,
//             phone,
//         };

//         dispatch({ type: PILLSTORES_ADD, pillStore: pillStore });
//         dispatch(pillStoresFilter({ keyword: '' }));
//         ImportantNotificationModal.fire({
//             title: 'สร้างบัญชีร้านขายยา สำเร็จ',
//             html:
//                 `<br> ID ${pillStore.ID} : ${pillStore.name} <br>` +
//                 `ชื่อร้าน <b>${pillStore.pharmacy}</b></p> <br>` +
//                 `Email : ${pillStore.email} <br>` +
//                 `รหัสผ่าน : <p class='text-red-500 inline-block'>${password}</p> <br><br>` +
//                 `<p class='text-red-500'>รหัสผ่านสำหรับใช้งานชั่วคราว <br> โปรดทำการเปลี่ยนแปลงในภายหลัง</p> <br>`,
//             icon: 'success',
//         });
//     };
// };

// export const pillStoresEditToggle = ({ _id }) => {
//     return {
//         type: PILLSTORES_EDIT_TOGGLE,
//         _id: _id,
//     };
// };

// export const pillStoresUpdate = ({ _id, name, pharmacy, location, email, phone }) => {
//     return async (dispatch, getState) => {
//         const { pillStores } = getState();
//         const pillStore = pillStores.list.find((pillStore) => pillStore._id === _id);

//         dispatch({ type: PILLSTORES_UPDATE, pillStore: { ...pillStore, name, pharmacy, location, email, phone } });
//         Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
//     };
// };

// export const pillStoresDelete = ({ _id }) => {
//     return async (dispatch, getState) => {
//         const { pillStores } = getState();

//         const pillStore = pillStores.list.find((pillStore) => pillStore._id === _id);

//         DeleteAlertDialog.fire({
//             title: 'ยืนยันที่จะลบบัญชีร้านขายยา',
//             html:
//                 `<br> ID ${pillStore.ID} : ${pillStore.name} <br><br>` +
//                 `ชื่อร้าน <b>${pillStore.pharmacy}</b> <br>` +
//                 `ที่อยู่ <b>${pillStore.location}</b> <br>`,
//             icon: 'warning',
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 dispatch({ type: PILLSTORES_DELETE, _id: _id });
//                 Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
//             }
//         });
//     };
// };
