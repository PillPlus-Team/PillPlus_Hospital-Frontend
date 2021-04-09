import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { InputText, InputDropdown } from '../../../components';

import { accountsEditToggle, accountUpdate } from '../../../actions/accountsAction.js';

const AccountRowEditor = ({ index, account, accounts, roles }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState(account.name);
    const [surname, setSurname] = useState(account.surname);
    const [email, setEmail] = useState(account.email);
    const [username, setUsername] = useState(account.username);
    const [role, setRole] = useState(account.role);

    const [isValidName, setIsValidName] = useState(true);
    const [isValidSurname, setIsValidSurname] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidUsername, setIsValidUsername] = useState(true);

    const [canSubmit, setCanSubmit] = useState(true);

    let emailAlreadyUse = [];
    let usernameAlreadyUse = [];
    accounts.map((value) => {
        if (value.email !== account.email) {
            emailAlreadyUse.push(value.email);
        }
        if (value.username !== account.username) {
            usernameAlreadyUse.push(value.username);
        }
    });

    useEffect(() => {
        setCanSubmit(isValidName && isValidSurname && isValidEmail && isValidUsername);
    }, [isValidName, isValidSurname, isValidEmail, isValidUsername]);

    const submitHandler = () => {
        if (canSubmit) {
            dispatch(accountUpdate({ ID: account.ID, name, surname, email, username, role }));
        }
    };

    return (
        <tbody className="divide-y divide-gray-200">
            <tr>
                <td className="w-16 px-6 py-4 whitespace-nowrap text-gray-500 pl-10">{index}</td>
                <td className="w-32 px-6 py-4 whitespace-nowrap text-gray-500">{account.ID}</td>
                <td className="w-36 px-6 py-4 whitespace-nowrap text-gray-500">
                    <InputText
                        id={`InputText-name-${index}`}
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
                <td className="w-36 px-6 py-4 whitespace-nowrap text-gray-500">
                    <InputText
                        id={`InputText-surname-${index}`}
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
                <td className="w-48 px-6 py-4 whitespace-nowrap text-gray-500">
                    <InputText
                        id={`InputText-email-${index}`}
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
                <td className="w-40 px-6 py-4 whitespace-nowrap text-gray-500">
                    <InputText
                        id={`InputText-username-${index}`}
                        name="username"
                        type="text"
                        initValue={username}
                        placeholder="ชื่อผู้ใช้"
                        autoComplete="off"
                        required
                        minLength={1}
                        maxLength={30}
                        pattern="^[a-zA-Z0-9]+$"
                        msgPatternError="อังกฤษ/ตัวเลข เท่านั้น"
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
                <td className="w-40 px-6 py-4 whitespace-nowrap text-gray-500">
                    <InputDropdown
                        id={`InputDropdown-role-${index}`}
                        name="role"
                        optionList={roles}
                        selectedIndex={roles.indexOf(role)}
                        onValueChange={(state) => {
                            setRole(state);
                        }}
                    />
                </td>
                <td className="w-20 px-6 py-4 whitespace-nowrap text-center font-medium">
                    <button
                        className={`focus:outline-none ${
                            canSubmit ? 'text-green-600 hover:text-green-900 hover:underline' : 'text-gray-400 cursor-not-allowed'
                        }`}
                        type="button"
                        onClick={submitHandler}
                        disabled={!canSubmit}
                    >
                        บันทึก
                    </button>
                </td>
                <td className="w-20 px-6 py-4 whitespace-nowrap text-center font-medium">
                    <button
                        className="text-gray-800 hover:text-gray-500 hover:underline focus:outline-none"
                        type="button"
                        onClick={() => {
                            dispatch(accountsEditToggle({ ID: account.ID }));
                        }}
                    >
                        ยกเลิก
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default AccountRowEditor;
