import { ACCOUNTS_FETCH, ACCOUNTS_SHOW, ACCOUNTS_ADD_TOGGLE, ACCOUNTS_ADD, ACCOUNTS_EDIT_TOGGLE, ACCOUNTS_DELETE, ACCOUNTS_UPDATE } from './types';

import { roles, stringGenerate } from './ultis';

import { DeleteAlertDialog, ImportantNotificationModal, Toast } from './swals';

export const accountsFetch = () => {
    return async (dispatch) => {
        let accounts = [
            {
                ID: 10000001,
                name: 'พักตร์ภูมิ',
                surname: 'ตาแพร่',
                email: 'phoom0529@gmail.com',
                phone: '0899997333',
                role: 'Adminstrator',
                createdBy: '-',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000002,
                name: 'พักตร์ภูมิ',
                surname: 'ตาแพร่',
                email: 'phoom1477@gmail.com',
                phone: '0899997222',
                role: 'Staff',
                createdBy: '-',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000003,
                name: 'พักตร์ภูมิ',
                surname: 'ตาแพร่',
                email: 'phoom1234@gmail.com',
                phone: '0899997444',
                role: 'Cashier',
                createdBy: '-',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000004,
                name: 'พักตร์ภูมิ',
                surname: 'ตาแพร่',
                email: 'phukphoomtaphrae@gmail.com',
                phone: '0899997123',
                role: 'Cashier',
                createdBy: '-',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000005,
                name: 'พักตร์ภูมิ',
                surname: 'ตาแพร่',
                email: 'phoom0529@gmail.com',
                phone: '0899997333',
                role: 'Adminstrator',
                createdBy: '-',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000006,
                name: 'พักตร์ภูมิ',
                surname: 'ตาแพร่',
                email: 'phoom1477@gmail.com',
                phone: '0899997222',
                role: 'Staff',
                createdBy: '-',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000007,
                name: 'พักตร์ภูมิ',
                surname: 'ตาแพร่',
                email: 'phoom1234@gmail.com',
                phone: '0899997444',
                role: 'Cashier',
                createdBy: '-',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000008,
                name: 'พักตร์ภูมิ',
                surname: 'ตาแพร่',
                email: 'phukphoomtaphrae@gmail.com',
                phone: '0899997123',
                role: 'Cashier',
                createdBy: '-',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000009,
                name: 'พักตร์ภูมิ',
                surname: 'ตาแพร่',
                email: 'phoom0529@gmail.com',
                phone: '0899997333',
                role: 'Adminstrator',
                createdBy: '-',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
        ];

        accounts = accounts.map((account) => {
            return { ...account, roleLevel: roles.find((element) => element.role.includes(account.role)).roleLevel };
        });

        dispatch({ type: ACCOUNTS_FETCH, accounts: accounts });
        dispatch(accountsFilter({ keyword: '' }));
    };
};

export const accountsFilter = ({ keyword }) => {
    return async (dispatch, getState) => {
        const { accounts } = getState();

        let IDList = [];
        accounts.list.map((account) => {
            const keys = Object.keys(account);
            for (let i = 0; i < keys.length; i++) {
                if (String(account[keys[i]]).includes(keyword)) {
                    return IDList.push(account.ID);
                }
            }
        });

        dispatch({ type: ACCOUNTS_SHOW, IDList: IDList });
    };
};

export const accountAddToggle = () => {
    return {
        type: ACCOUNTS_ADD_TOGGLE,
    };
};

export const accountsAdd = ({ name, surname, email, phone, role }) => {
    return async (dispatch, getState) => {
        const password = stringGenerate(10);

        const account = {
            ID: Math.floor(Math.random() * 100000000),
            name,
            surname,
            phone,
            email,
            role,
            roleLevel: roles.find((element) => element.role.includes(role)).roleLevel,
            avatarUrl: 'https://www.journalnetwork.org/assets/default-profile-54364fb08cf8b2a24e80ed8969012690.jpg',
        };

        dispatch({ type: ACCOUNTS_ADD, account: account });
        dispatch(accountsFilter({ keyword: '' }));
        ImportantNotificationModal.fire({
            title: 'สร้างบัญชีผู้ใช้ สำเร็จ',
            html:
                `<br> ID ${account.ID} : ${account.name} ${account.surname}<br>` +
                `สิทธิ์ผู้ใช้ <b>${account.role}</b></p> <br><br>` +
                `Email : ${account.email} <br>` +
                `รหัสผ่าน : <p class='text-red-500 inline-block'>${password}</p> <br><br>` +
                `<p class='text-red-500'>รหัสผ่านสำหรับใช้งานชั่วคราว <br> โปรดทำการเปลี่ยนแปลงในภายหลัง</p> <br>`,
            icon: 'success',
        });
    };
};

export const accountsEditToggle = ({ ID }) => {
    return {
        type: ACCOUNTS_EDIT_TOGGLE,
        ID: ID,
    };
};

export const accountUpdate = ({ ID, name, surname, email, phone, role }) => {
    return async (dispatch, getState) => {
        const { accounts } = getState();
        const account = accounts.list.find((account) => account.ID === ID);

        dispatch({
            type: ACCOUNTS_UPDATE,
            account: { ...account, name, surname, email, phone, role, roleLevel: roles.find((element) => element.role.includes(role)).roleLevel },
        });
        Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
    };
};

export const accountsDelete = ({ ID }) => {
    return async (dispatch, getState) => {
        const { accounts } = getState();

        const account = accounts.list.find((account) => account.ID === ID);

        DeleteAlertDialog.fire({
            title: 'ยืนยันที่จะลบบัญชีผู้ใช้',
            html: `<br> ID ${account.ID} : ${account.name} ${account.surname} <br><br>` + `สิทธิ์ผู้ใช้ <b>${account.role}</b> <br>`,
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: ACCOUNTS_DELETE, ID: ID });
                Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
            }
        });
    };
};

/* For Production */
// export const accountsFetch = () => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/getAccounts', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (res.status === 200) {
//             let accounts = await res.json();
//             accounts = accounts.map((account) => {
//                 return { ...account, roleLevel: roles.find((element) => element.role.includes(account.role)).roleLevel };
//             });
//             dispatch({ type: ACCOUNTS_FETCH, accounts: accounts });
//             dispatch(accountsFilter({keyword:''}));
//         }
//     };
// };

// export const accountsFilter = ({ keyword }) => {
//     return async (dispatch, getState) => {
//         const { accounts } = getState();

//         let IDList = [];
//         accounts.list.map((account) => {
//             const keys = Object.keys(account);
//             for (let i = 0; i < keys.length; i++) {
//                 if (String(account[keys[i]]).includes(keyword)) {
//                     return IDList.push(account.ID);
//                 }
//             }
//         });

//         dispatch({ type: ACCOUNTS_SHOW, IDList: IDList });
//     };
// };

// export const accountAddToggle = () => {
//     return {
//         type: ACCOUNTS_ADD_TOGGLE,
//     };
// };

// export const accountsAdd = ({ name, surname, email, phone, role }) => {
//     return async (dispatch, getState) => {
//         const { user } = getState();

//         const password = stringGenerate(10);
//         const res = await fetch('/api/v1/addAccount', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 password,
//                 name,
//                 surname,
//                 email,
//                 phone,
//                 role,
//             }),
//         });

//         if (res.status === 200) {
//             let account = await res.json();
//             account = { ...account, roleLevel: roles.find((element) => element.role.includes(account.role)).roleLevel };
//             dispatch({ type: ACCOUNTS_ADD, account: account });
//             dispatch(accountsFilter({ keyword: '' }));
//             ImportantNotificationModal.fire({
//                 title: 'สร้างบัญชีผู้ใช้สำเร็จ',
//                 html:
//                     `<br> ID ${account.ID} : ${account.name} ${account.surname}<br>` +
//                     `สิทธิ์ผู้ใช้ <b>${account.role}</b></p> <br><br>` +
//                     `Email : ${account.email} <br>` +
//                     `รหัสผ่าน : <p class='text-red-500 inline-block'>${password}</p> <br><br>` +
//                     `<p class='text-red-500'>รหัสผ่านสำหรับใช้งานชั่วคราว <br> โปรดทำการเปลี่ยนแปลงในภายหลัง</p> <br>`,
//                 icon: 'success',
//             });
//         } else {
//             Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
//             dispatch(accountsFetch());
//         }
//     };
// };

// export const accountsEditToggle = ({ ID }) => {
//     return {
//         type: ACCOUNTS_EDIT_TOGGLE,
//         ID: ID,
//     };
// };

// export const accountUpdate = ({ ID, name, surname, email, phone, role }) => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/editAccount', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 ID,
//                 name,
//                 surname,
//                 email,
//                 phone,
//                 role,
//             }),
//         });

//         if (res.status === 200) {
//             let editedAccount = await res.json();
//             editedAccount = { ...editedAccount, roleLevel: roles.find((element) => element.role.includes(editedAccount.role)).roleLevel };
//             dispatch({ type: ACCOUNTS_UPDATE, account: { ...editedAccount } });
//             Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
//         } else {
//             Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
//             dispatch(accountsFetch());
//         }
//     };
// };

// export const accountsDelete = ({ ID }) => {
//     return async (dispatch, getState) => {
//         const { accounts } = getState();

//         const account = accounts.list.find((account) => account.ID === ID);

//         DeleteAlertDialog.fire({
//             title: 'ยืนยันที่จะลบบัญชีผู้ใช้',
//             html: `<br> ID ${account.ID} : ${account.name} ${account.surname} <br><br>` + `สิทธิ์ผู้ใช้ <b>${account.role}</b> <br>`,
//             icon: 'warning',
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 const res = await fetch('/api/v1/deleteAccount', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         ID,
//                     }),
//                 });
//                 if (res.status === 200) {
//                     dispatch({ type: ACCOUNTS_DELETE, ID: ID });
//                     Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
//                 } else {
//                     Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
//                     dispatch(accountsFetch());
//                 }
//             }
//         });
//     };
// };
