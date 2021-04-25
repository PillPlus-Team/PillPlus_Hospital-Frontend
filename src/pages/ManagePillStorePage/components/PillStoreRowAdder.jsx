import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { InputText } from '../../../components';

import { pillStoresAddToggle, pillStoresAdd } from '../../../actions/pillStoresAction';

const PillStoreRowAdder = ({ pillStores }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [pharmacy, setPharmacy] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState('');

    const [isValidName, setIsValidName] = useState(false);
    const [isValidPharmacy, setIsValidPharmacy] = useState(false);
    const [isValidLocation, setIsValidLocation] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPhone, setIsValidPhone] = useState(false);

    const [canSubmit, setCanSubmit] = useState(false);

    let emailAlreadyUse = [];
    let phoneAlreadyUse = [];
    pillStores.map((pillStore) => {
        emailAlreadyUse.push(pillStore.email);
        phoneAlreadyUse.push(pillStore.phone);
    });

    useEffect(() => {
        setCanSubmit(isValidName && isValidPharmacy && isValidLocation && isValidEmail && isValidPhone);
    }, [isValidName && isValidPharmacy && isValidLocation && isValidEmail && isValidPhone]);

    const submitHandler = () => {
        if (canSubmit) {
            dispatch(pillStoresAdd({ name, pharmacy, location, email, phone }));
        }
    };

    return (
        <tbody className="divide-y divide-gray-200">
            <tr>
                <td className="w-10 px-6 py-4 whitespace-nowrap text-gray-500"></td>
                <td className="w-24 px-6 py-4 whitespace-nowrap text-gray-500"></td>
                <td className="w-36 px-6 py-2 whitespace-nowrap text-gray-500 ">
                    <InputText
                        id="InputText-name-adder"
                        name="name"
                        type="text"
                        placeholder="ชื่อ-นามสกุล"
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
                <td className="w-36 px-6 py-2 whitespace-nowrap text-gray-500">
                    <InputText
                        id="InputText-pharmacy-adder"
                        name="pharmacy"
                        type="text"
                        placeholder="ชื่อร้าน"
                        autoComplete="off"
                        required
                        minLength={1}
                        maxLength={30}
                        pattern="^[a-zA-Zก-๏0-9\s]+$"
                        msgPatternError="อังกฤษ/ไทย/ตัวเลข เท่านั้น"
                        onValidChange={(state) => {
                            setIsValidPharmacy(state);
                        }}
                        onValueChange={(state) => {
                            setPharmacy(state);
                        }}
                    />
                </td>
                <td className="w-48 px-6 py-2 whitespace-nowrap text-gray-500">
                    <InputText
                        id="InputText-location-adder"
                        name="location"
                        type="text"
                        placeholder="ที่อยู่"
                        autoComplete="off"
                        required
                        minLength={1}
                        maxLength={100}
                        onValidChange={(state) => {
                            setIsValidLocation(state);
                        }}
                        onValueChange={(state) => {
                            setLocation(state);
                        }}
                    />
                </td>
                <td className="w-48 px-6 py-2 whitespace-nowrap text-gray-500">
                    <InputText
                        id="InputText-email-adder"
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
                <td className="w-32 px-6 py-2 whitespace-nowrap text-gray-500">
                    <InputText
                        id="InputText-phone-adder"
                        name="phone"
                        type="text"
                        placeholder="0912345678"
                        autoComplete="off"
                        required
                        minLength={9}
                        maxLength={10}
                        pattern="^[0-9]+$"
                        msgPatternError="ตัวเลข เท่านั้น"
                        dupList={phoneAlreadyUse}
                        msgDupError="เบอร์ติดต่อ ถูกไปใช้เเล้ว"
                        onValidChange={(state) => {
                            setIsValidPhone(state);
                        }}
                        onValueChange={(state) => {
                            setPhone(state);
                        }}
                    />
                </td>
                <td className="w-20 px-6 py-2 whitespace-nowrap text-center font-medium">
                    <button
                        className={`focus:outline-none ${
                            canSubmit ? 'text-green-600 hover:text-green-900 hover:underline' : 'text-gray-400 cursor-not-allowed'
                        }`}
                        type="button"
                        onClick={submitHandler}
                        disabled={!canSubmit}
                    >
                        เพิ่ม
                    </button>
                </td>
                <td className="w-20 px-6 py-2 whitespace-nowrap text-center font-medium">
                    <button
                        className="text-gray-800 hover:text-gray-500 hover:underline focus:outline-none"
                        type="button"
                        onClick={() => {
                            dispatch(pillStoresAddToggle());
                        }}
                    >
                        ยกเลิก
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default PillStoreRowAdder;
