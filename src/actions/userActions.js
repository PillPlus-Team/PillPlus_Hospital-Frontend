import { USER_LOGIN, USER_EDIT_PROFILE, USER_LOGOUT } from './types';

export const userLogin = ({ username, password, history }) => {
    return async (dispatch) => {
        /*For Production
        const user = await fetch('/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (res.status == 200) {
            dispatch({ type: USER_LOGIN, payload: { ...user } });
            history.push('/home')
        }
        else{ 
            // Swal.fire (SweetAlert2) Here
        }
        */

        const USERINFO = {
            ID: 1234567890,
            name: 'พักตร์ภูมิ',
            surname: 'ตาแพร่',
            username: 'phoom0529',
            email: 'phoom0529@gmail.com',
            role: 'Adminstrator',
            role_level: 0,
            createdBy: '-',
            avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
        };
        dispatch({ type: USER_LOGIN, payload: { ...USERINFO } });
        history.push('/home')
    };
};

export const userEditProfile = ({ name, surname, email }) => {
    return async (dispatch, getState) => {
        const res = await fetch('/api/v1/editProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                surname,
                email,
            }),
        });

        if (res.status == 200) {
            const { user } = getState();
            dispatch({ type: USER_EDIT_PROFILE, payload: { ...user, name, surname, email } });
        }
    };
};

export const userLogout = () => {
    return async (dispatch) => {
        const res = await fetch('/api/v1/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status == 200) {
            dispatch({ type: USER_LOGOUT });
        }
    };
};
