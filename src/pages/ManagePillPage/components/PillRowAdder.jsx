import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { InputText, InputDropdown } from '../../../components';

import { pillsAddToggle, pillsAdd } from '../../../actions/pillsAction';

const PillRowAdder = ({ pills }) => {
    const dispatch = useDispatch();

    const [sn, setSn] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [type, setType] = useState();

    const [isValidSn, setIsValidSn] = useState(false);
    const [isValidName, setIsValidName] = useState(false);
    const [isValidDescription, setIsValidDescription] = useState(false);

    const [canSubmit, setCanSubmit] = useState(false);

    let snAlreadyUse = [];
    pills.map((pill) => {
        snAlreadyUse.push(pill.sn);
    });

    useEffect(() => {
        setCanSubmit(isValidSn && isValidName && isValidDescription);
    }, [isValidSn && isValidName && isValidDescription]);

    const submitHandler = () => {
        if (canSubmit) {
            dispatch(pillsAdd({ sn, name, description, price, type }));
        }
    };

    return (
        <tbody className="divide-y divide-gray-200">
            <tr>
                <td className="w-16 px-6 py-4 whitespace-nowrap text-gray-500"></td>
                <td className="w-36 px-6 py-4 whitespace-nowrap text-gray-500 ">
                    <InputText
                        id={`InputText-sn`}
                        name="sn"
                        type="text"
                        initValue={sn}
                        placeholder="SN 8 หลัก"
                        autoComplete="off"
                        required
                        minLength={8}
                        maxLength={8}
                        pattern="^[0-9]+$"
                        msgPatternError="ตัวเลข เท่านั้น"
                        dupList={snAlreadyUse}
                        msgDupError="SN ถูกใช้ไปแล้ว"
                        onValidChange={(state) => {
                            setIsValidSn(state);
                        }}
                        onValueChange={(state) => {
                            setSn(state);
                        }}
                    />
                </td>
                <td className="w-36 px-6 py-4 whitespace-nowrap text-gray-500">
                    <InputText
                        id={`InputText-name`}
                        name="name"
                        type="text"
                        initValue={name}
                        placeholder="ชื่อยา"
                        autoComplete="off"
                        required
                        minLength={1}
                        maxLength={30}
                        pattern="^[a-zA-Zก-๏0-9\s]+$"
                        msgPatternError="อังกฤษ/ไทย/ตัวเลข เท่านั้น"
                        onValidChange={(state) => {
                            setIsValidName(state);
                        }}
                        onValueChange={(state) => {
                            setName(state);
                        }}
                    />
                </td>
                <td className="w-48 px-6 py-4 whitespace-nowrap text-gray-500">
                    <InputText
                        id={`InputText-description`}
                        name="description"
                        type="text"
                        initValue={description}
                        placeholder="คำอธิบาย"
                        autoComplete="off"
                        required
                        minLength={1}
                        maxLength={50}
                        onValidChange={(state) => {
                            setIsValidDescription(state);
                        }}
                        onValueChange={(state) => {
                            setDescription(state);
                        }}
                    />
                </td>
                <td className="w-48 px-6 py-4 whitespace-nowrap text-gray-500">
                    {/* <InputText
                        id={`InputText-price`}
                        name="email"
                        type="number"
                        initValue={price}
                        placeholder="99.99"
                        autoComplete="off"
                        required
                        minLength={1}
                        maxLength={30}
                        pattern="^[a-zA-Zก-๏0-9\s]+$"
                        msgPatternError="อังกฤษ/ไทย/ตัวเลข เท่านั้น"
                        onValidChange={(state) => {
                            setIsValidPrice(state);
                        }}
                        onValueChange={(state) => {
                            setPrice(state);
                        }}
                    /> */}
                </td>
                <td className="w-32 px-6 py-4 whitespace-nowrap text-gray-500">
                    <InputDropdown
                        id={`InputDropdown-type`}
                        name="type"
                        optionList={['in', 'out']}
                        selectedIndex={['in', 'out'].indexOf(type)}
                        onValueChange={(state) => {
                            setType(state);
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
                        เพิ่ม
                    </button>
                </td>
                <td className="w-20 px-6 py-4 whitespace-nowrap text-center font-medium">
                    <button
                        className="text-gray-800 hover:text-gray-500 hover:underline focus:outline-none"
                        type="button"
                        onClick={() => {
                            dispatch(pillsAddToggle());
                        }}
                    >
                        ยกเลิก
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default PillRowAdder;
