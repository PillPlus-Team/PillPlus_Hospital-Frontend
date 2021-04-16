import { USER_LOGIN, USER_EDIT_PROFILE_TOGGLE, USER_UPDATE_PROFILE, USER_LOGOUT } from './types';

import { menuListFetch } from './menuListActions';
import { roleListFetch } from './roleListActions';

import { roles } from './ultis';

export const userLogin = ({ email, password, history }) => {
    return async (dispatch) => {
        let user = {
            ID: 62010609,
            name: 'พักตร์ภูมิ',
            surname: 'ตาแพร่',
            email: 'phoom0529@gmail.com',
            phone: '0931425177',
            role: 'Super Adminstrator',
            avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
        };

        user = { ...user, roleLevel: roles.find((element) => element.role.includes(user.role)).roleLevel };
        dispatch({ type: USER_LOGIN, user: { ...user } });
        dispatch(menuListFetch());
        dispatch(roleListFetch());
        history.push('/home');
    };
};

export const userEditProfileToggle = () => {
    return {
        type: USER_EDIT_PROFILE_TOGGLE,
    };
};

export const userUpdateProfile = ({ avatarUrl, name, surname, email, phone }) => {
    return async (dispatch, getState) => {
        const { user } = getState();
        dispatch({ type: USER_UPDATE_PROFILE, user: { ...user, avatarUrl, name, surname, email, phone } });
    };
};

export const userLogout = ({ history }) => {
    return async (dispatch) => {
        dispatch({ type: USER_LOGOUT });
        history.push('/login');
    };
};

/* For Production */
// export const userLogin = ({ email, password, history }) => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email,
//                 password,
//             }),
//         });

//         if (res.status == 200) {
//             const user = await res.json();
//             dispatch({ type: USER_LOGIN, user: { ...user, roleLevel: roles.find((element) => element.role.includes(user.role)).roleLevel } });
//             dispatch(menuListFetch());
//             dispatch(roleListFetch());
//             history.push('/home');
//         } else {
//             //Swal.fire (SweetAlert2) Here
//         }
//     };
// };

// export const userEditProfileToggle = () => {
//     return {
//         type: USER_EDIT_PROFILE_TOGGLE,
//     };
// };

// export const userUpdateProfile = ({ avatarUrl, name, surname, email, phone }) => {
//     return async (dispatch, getState) => {
//         const { user } = getState();

//         let updateAvatarUrl;
//         if (avatarUrl === user.avatarUrl) {
//             updateAvatarUrl = '';
//         } else {
//             updateAvatarUrl = avatarUrl;
//         }

//         const res = await fetch('/api/v1/editProfile', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 avatarUrl: updateAvatarUrl,
//                 name,
//                 surname,
//                 email,
//                 phone,
//             }),
//         });

//         if (res.status == 200) {
//             const editedUser = await res.json();
//             dispatch({ type: USER_UPDATE_PROFILE, user: { ...editedUser } });
//         } else {
//             // Swal.fire (SweetAlert2) Here
//         }
//     };
// };

// export const userLogout = ({ history }) => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/logout', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (res.status == 200) {
//             dispatch({ type: USER_LOGOUT });
//             history.push('/login');
//         }
//     };
// };
