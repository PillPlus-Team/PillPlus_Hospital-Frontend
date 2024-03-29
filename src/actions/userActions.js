import { USER_LOGIN, USER_EDIT_PROFILE_TOGGLE, USER_UPDATE_PROFILE, USER_LOGOUT } from './types';

import { menuListFetch } from './menuListActions';
import { roleListFetch } from './roleListActions';
import { accountsFetch } from './accountsAction';

import { roles } from './ultis';

import { LoadingModal, ConfirmDialog, ChaningModal, Toast } from './swals';

import { API_URL } from '../config';

/* For Production */
export const userLogin = ({ email, password }) => {
    return async (dispatch) => {
        try {
            const res = await fetch(API_URL + '/auth/login', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (res.status === 200) {
                const user = await res.json();

                dispatch({
                    type: USER_LOGIN,
                    user: { ...user, roleLevel: roles.find((element) => element.role.includes(user.role)).roleLevel },
                });
                dispatch(menuListFetch());
                dispatch(roleListFetch());
            } else {
                throw res;
            }
        } catch (error) {
            if (error.status === 403) {
                Toast.fire({
                    title: 'อีเมล หรือ รหัสผ่าน ไม่ถูกต้อง',
                    icon: 'error',
                });
            } else {
                Toast.fire({
                    title: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
                    text: 'กรุณาติดต่อผู้ดูแลระบบ',
                    icon: 'error',
                });
            }
        }
    };
};

export const userEditProfileToggle = () => {
    return {
        type: USER_EDIT_PROFILE_TOGGLE,
    };
};

export const userUpdateProfile = ({ avatarUri, name, surname, email, phone }) => {
    return async (dispatch, getState) => {
        LoadingModal.fire({ title: 'กำลังดำเนินการ ...' });
        LoadingModal.showLoading();

        const { user } = getState();

        let newAvatarUri = user.avatarUri;
        if (avatarUri !== user.avatarUri) {
            try {
                let blob = await fetch(avatarUri).then((result) => result.blob());

                let formData = new FormData();
                formData.append('avatar', blob);

                const res = await fetch(API_URL + '/picture/avatar', {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    body: formData,
                });

                if (res.status === 200) {
                    newAvatarUri = await res.json().then((result) => result.data.avatarUri);

                    Toast.fire({ title: 'อัพโหลดรูปโปรไฟล์ สำเร็จ', icon: 'success' });
                } else {
                    throw res;
                }
            } catch (error) {
                Toast.fire({ title: 'ไม่สามารถอัพโหลดรูปโปรไฟล์ได้', icon: 'error' });
            }
        }

        try {
            const res = await fetch(API_URL + '/auth/updateProfile', {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    avatarUri: newAvatarUri,
                    name: name,
                    surname: surname,
                    email: email,
                    phone: phone,
                }),
            });

            let editedData;
            if (res.status === 200) {
                editedData = { ...(await res.json()) };
                dispatch({ type: USER_UPDATE_PROFILE, user: { ...user, ...editedData } });

                Toast.fire({ title: 'บันทึกข้อมูล สำเร็จ', icon: 'success' });
            } else {
                throw res;
            }
        } catch (error) {
            if (error.status === 401) {
                dispatch({ type: USER_LOGOUT });
            } else {
                Toast.fire({ title: 'ไม่สามารถ บันทึกข้อมูลได้', icon: 'error' });
            }
        }

        if (LoadingModal.isLoading()) {
            LoadingModal.close();
        }

        dispatch(accountsFetch());
    };
};

export const userChangePassword = () => {
    return () => {
        ChaningModal.mixin({
            progressSteps: ['1', '2'],
        })
            .queue([
                {
                    title: 'รหัสผ่านเดิม',
                    html:
                        '<p>โปรดกรอก รหัสผ่านเดิมของท่าน</p>' +
                        '<input id="old-password" class="swal2-input" type="password" placeholder="รหัสผ่าน" autocomplete="off">',
                    preConfirm: () => {
                        if (!document.getElementById('old-password').value) {
                            ChaningModal.showValidationMessage('กรุณากรอกรหัสผ่าน');
                        } else {
                            return document.getElementById('old-password').value;
                        }
                    },
                    confirmButtonText: 'ถัดไป',
                    cancelButtonText: 'ยกเลิก',
                },
                {
                    title: 'ป้อนรหัสผ่านใหม่',
                    html:
                        '<p>โปรดกรอก รหัสผ่านที่ท่านต้องการ</p>' +
                        '<input id="new-password-1" class="swal2-input" type="password" placeholder="รหัสผ่านใหม่" autocomplete="off">' +
                        '<input id="new-password-2" class="swal2-input" type="password" placeholder="รหัสผ่านใหม่ (อีกครั้ง)" autocomplete="off">',
                    preConfirm: () => {
                        if (!document.getElementById('new-password-1').value || !document.getElementById('new-password-2').value) {
                            ChaningModal.showValidationMessage('กรุณากรอกข้อมูลให้ครบ');
                        } else if (document.getElementById('new-password-1').value !== document.getElementById('new-password-2').value) {
                            ChaningModal.showValidationMessage('กรุณากรอกรหัสผ่านใหม่ ให้ตรงกัน');
                        } else if (
                            document.getElementById('new-password-1').value.length < 6 ||
                            document.getElementById('new-password-2').value.length < 6
                        ) {
                            ChaningModal.showValidationMessage('รหัสผ่านใหม่ ต้องมีความยาวไม่ต่ำกว่า 6 ตัวอักษร');
                        } else {
                            return [document.getElementById('new-password-1').value, document.getElementById('new-password-2').value];
                        }
                    },
                    confirmButtonText: 'ยืนยัน',
                    cancelButtonText: 'ยกเลิก',
                },
            ])
            .then(async (result) => {
                const password = result.value[0];
                const newPassword = result.value[1][0];
                const reNewPassword = result.value[1][1];

                try {
                    const res = await fetch(API_URL + '/auth/resetPassword', {
                        method: 'PUT',
                        mode: 'cors',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            password: password,
                            newPassword: newPassword,
                            reNewPassword: reNewPassword,
                        }),
                    });

                    if (res.status === 200) {
                        Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
                    } else {
                        throw res;
                    }
                } catch (error) {
                    Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
                }
            });
    };
};

export const userLogout = () => {
    return (dispatch) => {
        ConfirmDialog.fire({
            title: 'ออกจากระบบ ?',
            text: 'ท่านกำลังออกจากระบบ',
            icon: 'warning',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(API_URL + '/auth/logout', {
                        method: 'GET',
                        mode: 'cors',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (res.status === 200) {
                        dispatch({ type: USER_LOGOUT });
                    } else {
                        throw res;
                    }
                } catch (error) {
                    Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
                }
            }
        });
    };
};

export const userForgotPassword = ({ email }) => {
    return (dispatch) => {
        /* Action for reset password here! */

        Toast.fire({ title: 'กรุณาทำการยืนยันใน Email ของท่าน', text: 'ส่งลิ้งยืนยัน ไปยัง Email ของท่านแล้ว', icon: 'success' });
    };
};

/* For dev */
// export const userLogin = ({ email, password, history }) => {
//     return async (dispatch) => {
//         let user = {
//             name: 'พักตร์ภูมิ',
//             surname: 'ตาแพร่',
//             email: 'phoom0529@gmail.com',
//             phone: '0931425177',
//             role: 'Super Administrator',
//             avatarUri: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//         };

//         user = { ...user, roleLevel: roles.find((element) => element.role.includes(user.role)).roleLevel };
//         dispatch({ type: USER_LOGIN, user: { ...user } });
//         dispatch(menuListFetch());
//         dispatch(roleListFetch());
//         history.push('/home');
//     };
// };

// export const userEditProfileToggle = () => {
//     return {
//         type: USER_EDIT_PROFILE_TOGGLE,
//     };
// };

// export const userUpdateProfile = ({ avatarUri, name, surname, email, phone }) => {
//     return async (dispatch, getState) => {
//         const { user } = getState();
//         dispatch({ type: USER_UPDATE_PROFILE, user: { ...user, avatarUri, name, surname, email, phone } });
//         dispatch(accountsFetch());
//         Toast.fire({ title: 'บันทึกข้อมูล สำเร็จ', icon: 'success' });
//     };
// };

// export const userChangePassword = () => {
//     return async () => {
//         ChaningModal.mixin({
//             progressSteps: ['1', '2'],
//         })
//             .queue([
//                 {
//                     title: 'รหัสผ่านเดิม',
//                     html:
//                         '<p>โปรดกรอก รหัสผ่านเดิมของท่าน</p>' +
//                         '<input id="old-password" class="swal2-input" type="password" placeholder="รหัสผ่าน" autocomplete="off">',
//                     preConfirm: () => {
//                         if (!document.getElementById('old-password').value) {
//                             ChaningModal.showValidationMessage('กรุณากรอกรหัสผ่าน');
//                         } else {
//                             return document.getElementById('old-password').value;
//                         }
//                     },
//                     confirmButtonText: 'ถัดไป',
//                     cancelButtonText: 'ยกเลิก',
//                 },
//                 {
//                     title: 'ป้อนรหัสผ่านใหม่',
//                     html:
//                         '<p>โปรดกรอก รหัสผ่านที่ท่านต้องการ</p>' +
//                         '<input id="new-password-1" class="swal2-input" type="password" placeholder="รหัสผ่านใหม่" autocomplete="off">' +
//                         '<input id="new-password-2" class="swal2-input" type="password" placeholder="รหัสผ่านใหม่ (อีกครั้ง)" autocomplete="off">',
//                     preConfirm: () => {
//                         if (!document.getElementById('new-password-1').value || !document.getElementById('new-password-2').value) {
//                             ChaningModal.showValidationMessage('กรุณากรอกข้อมูลให้ครบ');
//                         } else if (document.getElementById('new-password-1').value !== document.getElementById('new-password-2').value) {
//                             ChaningModal.showValidationMessage('กรุณากรอกรหัสผ่านใหม่ ให้ตรงกัน');
//                         } else if (
//                             document.getElementById('new-password-1').value.length < 6 ||
//                             document.getElementById('new-password-2').value.length < 6
//                         ) {
//                             ChaningModal.showValidationMessage('รหัสผ่านใหม่ ต้องมีความยาวมากกว่า 6 ตัวอักษร');
//                         } else {
//                             return [document.getElementById('new-password-1').value, document.getElementById('new-password-2').value];
//                         }
//                     },
//                     confirmButtonText: 'ยืนยัน',
//                     cancelButtonText: 'ยกเลิก',
//                 },
//             ])
//             .then((result) => {
//                 try {
//                     const password = result.value[0];
//                     const newPassword = result.value[1][0];
//                     const reNewPassword = result.value[1][1];

//                     if (password && newPassword && reNewPassword) {
//                         Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
//                     }
//                 } catch (error) {}
//             });
//     };
// };

// export const userLogout = ({ history }) => {
//     return async (dispatch) => {
//         ConfirmDialog.fire({
//             title: 'ออกจากระบบ ?',
//             text: 'ท่านกำลังออกจากระบบ',
//             icon: 'warning',
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 dispatch({ type: USER_LOGOUT });
//                 history.push('/login');
//             }
//         });
//     };
// };
