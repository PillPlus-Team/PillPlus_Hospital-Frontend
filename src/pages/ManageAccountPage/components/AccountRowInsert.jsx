import { useState, useEffect } from 'react';

import { InputText, InputDropdown } from '../../../components';

const AccountRowInsert = ({ accounts, roles, onCompleted }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState();

    const [isValidName, setIsValidName] = useState(false);
    const [isValidSurname, setIsValidSurname] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidUsername, setIsValidUsername] = useState(false);

    const [canSubmit, setCanSubmit] = useState(false);

    let emailAlreadyUse = [];
    let usernameAlreadyUse = [];
    accounts.map((account) => {
        emailAlreadyUse.push(account.email);
        usernameAlreadyUse.push(account.username);
    });

    useEffect(() => {
        setCanSubmit(isValidName && isValidSurname && isValidEmail && isValidUsername);
    }, [isValidName, isValidSurname, isValidEmail, isValidUsername]);

    const submitHandler = () => {
        if (isValidName && isValidSurname && isValidEmail && isValidUsername) {
            //For Debug
            console.log({
                name,
                surname,
                email,
                username,
                role,
            });
        }

        /*
            Logic here!
        */
        onCompleted();
    };

    return (
        <tbody className="divide-y divide-gray-200">
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500"></td>
                <td className="px-6 py-2 whitespace-nowrap text-gray-500"></td>
                <td className="px-6 py-2 whitespace-nowrap text-gray-500 ">
                    <InputText
                        id="InputText-name-insert"
                        name="name"
                        type="text"
                        placeholder="ชื่อ"
                        autoComplete="off"
                        required
                        minLength={1}
                        maxLength={30}
                        pattern="^[a-zA-Zก-๏]+$"
                        msgPatternError="ตัวอักษร อังกฤษ/ไทย เท่านั้น"
                        onValidChange={(state) => {
                            setIsValidName(state);
                        }}
                        onValueChange={(state) => {
                            setName(state);
                        }}
                    />
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-gray-500">
                    <InputText
                        id="InputText-surname-insert"
                        name="surname"
                        type="text"
                        placeholder="นามสกุล"
                        autoComplete="off"
                        required
                        minLength={1}
                        maxLength={30}
                        pattern="^[a-zA-Zก-๏]+$"
                        msgPatternError="ตัวอักษร อังกฤษ/ไทย เท่านั้น"
                        onValidChange={(state) => {
                            setIsValidSurname(state);
                        }}
                        onValueChange={(state) => {
                            setSurname(state);
                        }}
                    />
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-gray-500">
                    <InputText
                        id="InputText-email-insert"
                        name="email"
                        type="text"
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
                <td className="px-6 py-2 whitespace-nowrap text-gray-500">
                    <InputText
                        id="InputText-username-insert"
                        name="username"
                        type="text"
                        placeholder="ชื่อผู้ใช้"
                        autoComplete="off"
                        required
                        minLength={1}
                        maxLength={30}
                        pattern="^[a-zA-Z0-9]+$"
                        msgPatternError="ตัวอักษร อังกฤษ/ตัวเลข เท่านั้น"
                        dupList={usernameAlreadyUse}
                        msgDupError="Username ถูกไปใช้เเล้ว"
                        onValidChange={(state) => {
                            setIsValidUsername(state);
                        }}
                        onValueChange={(state) => {
                            setUsername(state);
                        }}
                    />
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-gray-500">
                    <InputDropdown
                        id={`InputDropdown-role-insert`}
                        name="role"
                        optionList={roles}
                        onValueChange={(state) => {
                            setRole(state);
                        }}
                    />
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-center font-medium">
                    <button
                        className={`focus:outline-none ${
                            canSubmit ? 'text-green-600 hover:text-green-900 hover:underline' : 'text-gray-400 cursor-not-allowed'
                        }`}
                        type="bitton"
                        onClick={submitHandler}
                        disabled={!canSubmit}
                    >
                        เพิ่ม
                    </button>
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-center font-medium">
                    <button className="text-gray-800 hover:text-gray-500 hover:underline focus:outline-none" type="button" onClick={onCompleted}>
                        ยกเลิก
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default AccountRowInsert;
