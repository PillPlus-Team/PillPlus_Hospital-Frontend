import { ACCOUNTS_FETCH, ACCOUNTS_SHOW, ACCOUNTS_ADD_TOGGLE, ACCOUNTS_ADD, ACCOUNTS_EDIT_TOGGLE, ACCOUNTS_DELETE, ACCOUNTS_UPDATE } from './types';
import { USER_LOGOUT } from './types';

import { roles, stringGenerate } from './ultis';

import { LoadingModal, DeleteAlertDialog, ImportantNotificationModal, Toast } from './swals';

import { API_URL } from '../config';

/* For Production */
export const accountsFetch = () => {
    return async (dispatch) => {
        try {
            const res = await fetch(API_URL + '/account/all', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                let accounts = await res.json();
                accounts = accounts.map((account) => {
                    return { ...account, roleLevel: roles.find((element) => element.role.includes(account.role)).roleLevel };
                });

                dispatch({ type: ACCOUNTS_FETCH, accounts: accounts });
                dispatch(accountsFilter({ keyword: '' }));
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

export const accountsFilter = ({ keyword }) => {
    return (dispatch, getState) => {
        const { accounts } = getState();

        let _idList = [];
        accounts.list.map((account) => {
            const keys = Object.keys(account).filter((key) => key != '_id');
            for (let i = 0; i < keys.length; i++) {
                if (String(account[keys[i]]).includes(keyword)) {
                    return _idList.push(account._id);
                }
            }
        });

        dispatch({ type: ACCOUNTS_SHOW, _idList: _idList });
    };
};

export const accountAddToggle = () => {
    return {
        type: ACCOUNTS_ADD_TOGGLE,
    };
};

export const accountsAdd = ({ name, surname, email, phone, role }) => {
    return async (dispatch) => {
        LoadingModal.fire({ title: 'กำลังดำเนินการ ...' });
        LoadingModal.showLoading();

        const password = stringGenerate(6);

        try {
            const res = await fetch(API_URL + '/account', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    surname: surname,
                    email: email,
                    phone: phone,
                    role: role,
                    password: password,
                }),
            });

            if (res.status === 200) {
                let account = await res.json();
                account = { ...account, roleLevel: roles.find((element) => element.role.includes(account.role)).roleLevel };

                dispatch({ type: ACCOUNTS_ADD, account: account });
                dispatch(accountsFilter({ keyword: '' }));
                ImportantNotificationModal.fire({
                    title: 'สร้างบัญชีผู้ใช้สำเร็จ',
                    html:
                        `<br> ${account.name} ${account.surname}<br>` +
                        `สิทธิ์ผู้ใช้ <b>${account.role}</b></p> <br><br>` +
                        `Email : ${account.email} <br>` +
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
                dispatch(accountsFetch());
            }
        }

        if (LoadingModal.isLoading()) {
            LoadingModal.close();
        }
    };
};

export const accountsEditToggle = ({ _id }) => {
    return {
        type: ACCOUNTS_EDIT_TOGGLE,
        _id: _id,
    };
};

export const accountUpdate = ({ _id, name, surname, email, phone, role }) => {
    return async (dispatch, getState) => {
        LoadingModal.fire({ title: 'กำลังดำเนินการ ...' });
        LoadingModal.showLoading();

        const { accounts } = getState();
        const account = accounts.list.find((account) => account._id === _id);

        try {
            const res = await fetch(API_URL + `/account/${_id}`, {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    surname,
                    email,
                    phone,
                    role,
                }),
            });

            if (res.status === 200) {
                let editedData = await res.json();
                editedData = { ...editedData, roleLevel: roles.find((element) => element.role.includes(editedData.role)).roleLevel };

                dispatch({ type: ACCOUNTS_UPDATE, account: { ...account, ...editedData } });
                Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
            } else {
                throw res;
            }
        } catch (error) {
            if (error.status === 401) {
                dispatch({ type: USER_LOGOUT });
            } else {
                Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
                dispatch(accountsFetch());
            }
        }

        if (LoadingModal.isLoading()) {
            LoadingModal.close();
        }
    };
};

export const accountsDelete = ({ _id }) => {
    return (dispatch, getState) => {
        const { accounts } = getState();
        const account = accounts.list.find((account) => account._id === _id);

        DeleteAlertDialog.fire({
            title: 'ยืนยันที่จะลบบัญชีผู้ใช้',
            html: `<br> ${account.name} ${account.surname} <br><br>` + `สิทธิ์ผู้ใช้ <b>${account.role}</b> <br>`,
            icon: 'warning',
        }).then(async (result) => {
            if (result.isConfirmed) {
                LoadingModal.fire({ title: 'กำลังดำเนินการ ...' });
                LoadingModal.showLoading();

                try {
                    const res = await fetch(API_URL + `/account/${_id}`, {
                        method: 'DELETE',
                        mode: 'cors',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (res.status === 200) {
                        dispatch({ type: ACCOUNTS_DELETE, _id: _id });
                        Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
                    } else {
                        throw res;
                    }
                } catch (error) {
                    if (error.status === 401) {
                        dispatch({ type: USER_LOGOUT });
                    } else {
                        Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
                        dispatch(accountsFetch());
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
// export const accountsFetch = () => {
//     return async (dispatch) => {
//         let accounts = [
//             {
//                 _id: 10000001,
//                 name: 'พักตร์ภูมิ',
//                 surname: 'ตาแพร่',
//                 email: 'phoom0529@gmail.com',
//                 phone: '0899997333',
//                 role: 'Administrator',
//                 avatarUri: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000002,
//                 name: 'พักตร์ภูมิ',
//                 surname: 'ตาแพร่',
//                 email: 'phoom1477@gmail.com',
//                 phone: '0899997222',
//                 role: 'Staff',
//                 avatarUri: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000003,
//                 name: 'พักตร์ภูมิ',
//                 surname: 'ตาแพร่',
//                 email: 'phoom1234@gmail.com',
//                 phone: '0899997444',
//                 role: 'Cashier',
//                 avatarUri: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000004,
//                 name: 'พักตร์ภูมิ',
//                 surname: 'ตาแพร่',
//                 email: 'phukphoomtaphrae@gmail.com',
//                 phone: '0899997123',
//                 role: 'Cashier',
//                 avatarUri: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000005,
//                 name: 'พักตร์ภูมิ',
//                 surname: 'ตาแพร่',
//                 email: 'phoom0529@gmail.com',
//                 phone: '0899997333',
//                 role: 'Administrator',
//                 avatarUri: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000006,
//                 name: 'พักตร์ภูมิ',
//                 surname: 'ตาแพร่',
//                 email: 'phoom1477@gmail.com',
//                 phone: '0899997222',
//                 role: 'Staff',
//                 avatarUri: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000007,
//                 name: 'พักตร์ภูมิ',
//                 surname: 'ตาแพร่',
//                 email: 'phoom1234@gmail.com',
//                 phone: '0899997444',
//                 role: 'Cashier',
//                 avatarUri: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000008,
//                 name: 'พักตร์ภูมิ',
//                 surname: 'ตาแพร่',
//                 email: 'phukphoomtaphrae@gmail.com',
//                 phone: '0899997123',
//                 role: 'Cashier',
//                 avatarUri: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000009,
//                 name: 'พักตร์ภูมิ',
//                 surname: 'ตาแพร่',
//                 email: 'phoom0529@gmail.com',
//                 phone: '0899997333',
//                 role: 'Administrator',
//                 avatarUri: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//         ];

//         accounts = accounts.map((account) => {
//             return { ...account, roleLevel: roles.find((element) => element.role.includes(account.role)).roleLevel };
//         });

//         dispatch({ type: ACCOUNTS_FETCH, accounts: accounts });
//         dispatch(accountsFilter({ keyword: '' }));
//     };
// };

// export const accountsFilter = ({ keyword }) => {
//     return async (dispatch, getState) => {
//         const { accounts } = getState();

//         let _idList = [];
//         accounts.list.map((account) => {
//             const keys = Object.keys(account).filter((key) => key != '_id');
//             for (let i = 0; i < keys.length; i++) {
//                 if (String(account[keys[i]]).includes(keyword)) {
//                     return _idList.push(account._id);
//                 }
//             }
//         });

//         dispatch({ type: ACCOUNTS_SHOW, _idList: _idList });
//     };
// };

// export const accountAddToggle = () => {
//     return {
//         type: ACCOUNTS_ADD_TOGGLE,
//     };
// };

// export const accountsAdd = ({ name, surname, email, phone, role }) => {
//     return async (dispatch, getState) => {
//         const password = stringGenerate(6);

//         const account = {
//             _id: Math.floor(Math.random() * 100000000),
//             name,
//             surname,
//             phone,
//             email,
//             role,
//             roleLevel: roles.find((element) => element.role.includes(role)).roleLevel,
//             avatarUri: 'https://www.journalnetwork.org/assets/default-profile-54364fb08cf8b2a24e80ed8969012690.jpg',
//         };

//         dispatch({ type: ACCOUNTS_ADD, account: account });
//         dispatch(accountsFilter({ keyword: '' }));
//         ImportantNotificationModal.fire({
//             title: 'สร้างบัญชีผู้ใช้ สำเร็จ',
//             html:
//                 `<br> ${account.name} ${account.surname}<br>` +
//                 `สิทธิ์ผู้ใช้ <b>${account.role}</b></p> <br><br>` +
//                 `Email : ${account.email} <br>` +
//                 `รหัสผ่าน : <p class='text-red-500 inline-block'>${password}</p> <br><br>` +
//                 `<p class='text-red-500'>รหัสผ่านสำหรับใช้งานชั่วคราว <br> โปรดทำการเปลี่ยนแปลงในภายหลัง</p> <br>`,
//             icon: 'success',
//         });
//     };
// };

// export const accountsEditToggle = ({ _id }) => {
//     return {
//         type: ACCOUNTS_EDIT_TOGGLE,
//         _id: _id,
//     };
// };

// export const accountUpdate = ({ _id, name, surname, email, phone, role }) => {
//     return async (dispatch, getState) => {
//         const { accounts } = getState();
//         const account = accounts.list.find((account) => account._id === _id);

//         dispatch({
//             type: ACCOUNTS_UPDATE,
//             account: { ...account, name, surname, email, phone, role, roleLevel: roles.find((element) => element.role.includes(role)).roleLevel },
//         });
//         Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
//     };
// };

// export const accountsDelete = ({ _id }) => {
//     return async (dispatch, getState) => {
//         const { accounts } = getState();

//         const account = accounts.list.find((account) => account._id === _id);

//         DeleteAlertDialog.fire({
//             title: 'ยืนยันที่จะลบบัญชีผู้ใช้',
//             html: `<br> ${account.name} ${account.surname} <br><br>` + `สิทธิ์ผู้ใช้ <b>${account.role}</b> <br>`,
//             icon: 'warning',
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 dispatch({ type: ACCOUNTS_DELETE, _id: _id });
//                 Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
//             }
//         });
//     };
// };
