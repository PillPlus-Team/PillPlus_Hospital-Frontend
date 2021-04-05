import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { InputText, InputImageFile } from '../../../components';

import { userEditProfile } from '../../../actions/userActions';

const ProfileEditor = ({ userInfo, accounts, onCompleted }) => {
    const [avatarUrl, setAvatarUrl] = useState(userInfo.avatarUrl);
    const [name, setName] = useState(userInfo.name);
    const [surname, setSurname] = useState(userInfo.surname);
    const [email, setEmail] = useState(userInfo.email);

    const [isValidAvatarUrl, setIsValidAvatarUrl] = useState(true);
    const [isValidName, setIsValidName] = useState(true);
    const [isValidSurname, setIsValidSurname] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);

    const [canSubmit, setCanSubmit] = useState(false);

    const dispatch = useDispatch();

    let emailAlreadyUse = [];
    accounts.map((value) => {
        if (value.email !== userInfo.email) {
            emailAlreadyUse.push(value.email);
        }
    });

    useEffect(() => {
        setCanSubmit(isValidAvatarUrl && isValidName && isValidSurname && isValidEmail);
    }, [isValidAvatarUrl, isValidName, isValidSurname, isValidEmail]);

    const changePasswordHandler = () => {
        //for Debug
        console.log('Change Password Click!');

        /*
            Logic here!
        */
    };

    const submitHandler = () => {
        if (isValidAvatarUrl && isValidName && isValidSurname && isValidEmail) {
            //For Debug
            console.log({ avatarUrl, name, surname, email });

            dispatch(userEditProfile({ avatarUrl, name, surname, email }));
        }
        onCompleted();
    };

    return (
        <div className="flex flex-row min-w-max bg-white rounded-lg shadow-md">
            <InputImageFile
                className="ml-24 mt-24 rounded-lg"
                id="InputImageFile-avatar"
                name="avatar"
                accept="image/jpeg"
                limitSizeMB={250}
                initImageUrl={avatarUrl}
                onValidChange={(state) => {
                    setIsValidAvatarUrl(state);
                }}
                onValueChange={(state) => {
                    setAvatarUrl(state);
                }}
            />
            <table className="table-fixed w-96 ml-32 mt-24 text-lg">
                <tr>
                    <td className="font-bold w-32 min-w-max py-4">ID</td>
                    <td className="w-96">{userInfo.ID}</td>
                </tr>
                <tr>
                    <td className="font-bold w-32 min-w-min py-4">ชื่อ</td>
                    <td>
                        <InputText
                            id="InputText-name"
                            name="name"
                            type="text"
                            initValue={name}
                            placeholder="ชื่อ"
                            autoComplete="off"
                            required
                            minLength={1}
                            maxLength={30}
                            pattern="^[a-zA-Zก-๏\s]+$"
                            msgPatternError="อังกฤษ/ไทย เท่านั้น"
                            onValidChange={(state) => {
                                setIsValidName(state);
                            }}
                            onValueChange={(state) => {
                                setName(state);
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td className="font-bold w-32 min-w-min py-4">นามสกุล</td>
                    <td>
                        <InputText
                            id="InputText-surname"
                            name="surname"
                            type="text"
                            initValue={surname}
                            placeholder="นามสกุล"
                            autoComplete="off"
                            required
                            minLength={1}
                            maxLength={30}
                            pattern="^[a-zA-Zก-๏\s]+$"
                            msgPatternError="อังกฤษ/ไทย เท่านั้น"
                            onValidChange={(state) => {
                                setIsValidSurname(state);
                            }}
                            onValueChange={(state) => {
                                setSurname(state);
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td className="font-bold w-32 min-w-min py-4">Email</td>
                    <td>
                        <InputText
                            id="InputText-email"
                            name="email"
                            type="text"
                            initValue={email}
                            placeholder="goodboy@mail.com"
                            autoComplete="off"
                            required
                            minLength={1}
                            maxLength={30}
                            pattern="^[\w]+[\.\w-]*?@[\w]+(\.[\w]+)+$"
                            msgPatternError="Email ไม่ถูกต้อง"
                            dupList={emailAlreadyUse}
                            msgDupError="Email ถูกใช้ไปเเล้ว"
                            onValidChange={(state) => {
                                setIsValidEmail(state);
                            }}
                            onValueChange={(state) => {
                                setEmail(state);
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td className="font-bold w-32 min-w-min py-4">กลุ่มผู้ใช้</td>
                    <td>{userInfo.role}</td>
                </tr>
                <tr>
                    <td className="font-bold w-32 min-w-min py-4">สร้างโดย</td>
                    <td>{userInfo.createdBy}</td>
                </tr>
                <tr>
                    <td className="font-bold w-32 min-w-min py-4">รหัสผ่าน</td>
                    <td>
                        <button
                            className="w-52 p-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-800"
                            type="button"
                            onClick={changePasswordHandler}
                        >
                            เปลี่ยนรหัสผ่าน
                        </button>
                    </td>
                </tr>
            </table>
            <div className="flex flex-col justify-end items-end w-full mt-64 h-96">
                <div className="flex flex-row">
                    <button
                        className="w-24 mb-2 mr-2 p-2 bg-gray-500 text-white rounded-lg focus:outline-none hover:bg-gray-400"
                        type="button"
                        onClick={onCompleted}
                    >
                        ยกเลิก
                    </button>
                    <button
                        className={`w-24 mb-2 mr-2 p-2 text-white rounded-lg focus:outline-none  ${
                            canSubmit ? 'bg-blue-500 hover:bg-blue-800' : 'bg-gray-300 cursor-not-allowed'
                        }`}
                        type="button"
                        disabled={!canSubmit}
                        onClick={submitHandler}
                    >
                        ตกลง
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileEditor;
