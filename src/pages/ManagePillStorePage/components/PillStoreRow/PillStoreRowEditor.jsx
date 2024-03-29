import { useDispatch } from 'react-redux';
import { useState, useMemo } from 'react';

import { InputText } from '../../../../components';

import { pillStoresEditToggle, pillStoresUpdate } from '../../../../actions/pillStoresAction';

const PillStoreRowEditor = ({ index, pillStore, pillStores }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState(pillStore.name);
    const [pharmacy, setPharmacy] = useState(pillStore.pharmacy);
    const [location, setLocation] = useState(pillStore.location);
    const [email, setEmail] = useState(pillStore.email);
    const [phone, setPhone] = useState(pillStore.phone);

    const [isValidName, setIsValidName] = useState(true);
    const [isValidPharmacy, setIsValidPharmacy] = useState(true);
    const [isValidLocation, setIsValidLocation] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPhone, setIsValidPhone] = useState(true);

    const canSubmit = useMemo(() => {
        return isValidName && isValidPharmacy && isValidLocation && isValidEmail && isValidPhone;
    }, [isValidName, isValidPharmacy, isValidLocation, isValidEmail, isValidPhone]);

    let emailAlreadyUse = [];
    let phoneAlreadyUse = [];
    pillStores.map((value) => {
        if (value.email !== pillStore.email) {
            emailAlreadyUse.push(value.email);
        }
        if (value.phone !== pillStore.phone) {
            phoneAlreadyUse.push(value.phone);
        }
    });

    const submitHandler = () => {
        if (canSubmit) {
            dispatch(pillStoresUpdate({ _id: pillStore._id, name, pharmacy, location, email, phone }));
        }
    };

    return (
        <tbody className="divide-y divide-gray-200">
            <tr>
                <td className="w-10 px-6 py-4 whitespace-nowrap text-gray-500 pl-10">{index}</td>
                <td className="w-24 px-6 py-4 whitespace-nowrap text-gray-500">{pillStore.ID}</td>
                <td className="w-36 px-6 py-4 whitespace-nowrap text-gray-500 ">
                    <InputText
                        id={`InputText-name-${index}`}
                        name="name"
                        type="text"
                        initValue={name}
                        placeholder="ชื่อ-นามสกุุล"
                        autoComplete="off"
                        required
                        minLength={1}
                        maxLength={30}
                        pattern="^[a-zA-Zก-๏\s\.]+$"
                        msgPatternError="อังกฤษ/ไทย/. เท่านั้น"
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
                        id={`InputText-pharmacy-${index}`}
                        name="pharmacy"
                        type="text"
                        initValue={pharmacy}
                        placeholder="ชื่อร้าน"
                        autoComplete="off"
                        required
                        minLength={1}
                        maxLength={50}
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
                <td className="w-48 px-6 py-4 whitespace-nowrap text-gray-500">
                    <InputText
                        id={`InputText-location-${index}`}
                        name="location"
                        type="text"
                        initValue={location}
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
                <td className="w-32 px-6 py-4 whitespace-nowrap text-gray-500">
                    <InputText
                        id={`InputText-phone-${index}`}
                        name="phone"
                        type="text"
                        initValue={phone}
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
                <td className="w-32 px-6 py-2 whitespace-nowrap text-center font-medium">
                    {!pillStore.activated && (
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-600">Not Activated</span>
                    )}
                    {pillStore.activated && (
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-600">Activated</span>
                    )}
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
                            dispatch(pillStoresEditToggle({ _id: pillStore._id }));
                        }}
                    >
                        ยกเลิก
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default PillStoreRowEditor;
