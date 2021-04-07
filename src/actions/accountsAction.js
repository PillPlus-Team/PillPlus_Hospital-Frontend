import { ACCOUNTS_FETCH, ACCOUNTS_ADD_TOGGLE, ACCOUNTS_ADD, ACCOUNTS_EDIT_TOGGLE, ACCOUNTS_DELETE, ACCOUNTS_UPDATE } from './types';

export const accountsFetch = () => {
    return async (dispatch) => {
        const accounts = [
            {
                ID: 10000001,
                name: 'พักตร์ภูมิ',
                surname: 'ตาแพร่',
                username: 'phoom0529',
                email: 'phoom0529@gmail.com',
                role: 'Adminstrator',
                role_level: 0,
                createdBy: '-',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000002,
                name: 'พักตร์ภูมิ',
                surname: 'ตาแพร่',
                username: 'phoom1477',
                email: 'phoom1477@gmail.com',
                role: 'Service',
                role_level: 1,
                createdBy: '-',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000003,
                name: 'พักตร์ภูมิ',
                surname: 'ตาแพร่',
                username: 'phoom1234',
                email: 'phoom1234@gmail.com',
                role: 'Cashier',
                role_level: 2,
                createdBy: '-',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000004,
                name: 'พักตร์ภูมิ',
                surname: 'ตาแพร่',
                username: 'phoom007',
                email: 'phukphoomtaphrae@gmail.com',
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

export const accountsAdd = ({ name, surname, email, username, role }) => {
    return async (dispatch, getState) => {
        const { user } = getState();

        const account = {
            ID: Math.floor(Math.random() * 100000000),
            name,
            surname,
            username,
            email,
            role,
            createdBy: user.ID,
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

export const accountUpdate = ({ ID, name, surname, email, username, role }) => {
    return async (dispatch, getState) => {
        const { accounts } = getState();
        const account = accounts.list.find((account) => account.ID == ID);
        dispatch({ type: ACCOUNTS_UPDATE, account: { ...account, name, surname, email, username, role } });
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

// export const accountsAdd = ({ name, surname, email, username, role }) => {
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
//                 username,
//                 createdBy:user.ID,
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

// export const accountUpdate = ({ ID, name, surname, email, username, role }) => {
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
//                 username,
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
