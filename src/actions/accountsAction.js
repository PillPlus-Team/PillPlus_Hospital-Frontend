import { ACCOUNTS_FETCH, ACCOUNTS_ADD_TOGGLE, ACCOUNTS_ADD, ACCOUNTS_EDIT_TOGGLE, ACCOUNTS_DELETE, ACCOUNTS_UPDATE } from './types';

export const accountsFetch = () => {
    return async (dispatch) => {
        const accounts = [
            {
                ID: 10000001,
                name: 'พักตร์ภูมิ',
                surname: 'ตาแพร่',
                email: 'phoom0529@gmail.com',
                phone: '0899997333',
                role: 'Adminstrator',
                role_level: 0,
                createdBy: '-',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000002,
                name: 'พักตร์ภูมิ',
                surname: 'ตาแพร่',
                email: 'phoom1477@gmail.com',
                phone: '0899997222',
                role: 'Service',
                role_level: 1,
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
                role_level: 2,
                createdBy: '-',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000004,
                name: 'พักตร์ภูมิ',
                surname: 'ตาแพร่',
                email: 'phukphoomtaphrae@gmail.com',
                phone: '0899997123',
                role: 'Unknown',
                role_level: 10,
                createdBy: '-',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
        ];

        dispatch({ type: ACCOUNTS_FETCH, accounts: accounts });
    };
};

export const accountAddToggle = () => {
    return {
        type: ACCOUNTS_ADD_TOGGLE,
    };
};

export const accountsAdd = ({ name, surname, email, phone, role }) => {
    return async (dispatch, getState) => {
        const roleLevel = ['Adminstrator', 'Service', 'Cashier'];

        const account = {
            ID: Math.floor(Math.random() * 100000000),
            name,
            surname,
            phone,
            email,
            role,
            role_level: roleLevel.indexOf(role),
            avatarUrl: 'https://www.journalnetwork.org/assets/default-profile-54364fb08cf8b2a24e80ed8969012690.jpg',
        };

        dispatch({ type: ACCOUNTS_ADD, account: account });
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

        const roleLevel = ['Adminstrator', 'Service', 'Cashier'];

        dispatch({ type: ACCOUNTS_UPDATE, account: { ...account, name, surname, email, phone, role, role_level: roleLevel.indexOf(role) } });
    };
};

export const accountsDelete = ({ ID }) => {
    return async (dispatch) => {
        dispatch({ type: ACCOUNTS_DELETE, ID: ID });
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
//             const accounts = await res.json();
//             dispatch({ type: ACCOUNTS_FETCH, accounts: accounts });
//         }
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

//         const res = await fetch('/api/v1/addAccount', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 name,
//                 surname,
//                 email,
//                 phone,
//                 role,
//             }),
//         });

//         if (res.status === 200) {
//             const account = await res.json();
//             dispatch({ type: ACCOUNTS_ADD, account: account });
//         } else {
//             //Swal.fire (SweetAlert2) Here
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
//             const editedAccount = await res.json();
//             dispatch({ type: ACCOUNTS_UPDATE, account: { ...editedAccount } });
//         } else {
//             //Swal.fire (SweetAlert2) Here
//         }
//     };
// };

// export const accountsDelete = ({ ID }) => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/deleteAccount', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 ID,
//             }),
//         });

//         if (res.status === 200) {
//             dispatch({ type: ACCOUNTS_DELETE, ID: ID });
//         } else {
//             //Swal.fire (SweetAlert2) Here
//         }
//     };
// };
