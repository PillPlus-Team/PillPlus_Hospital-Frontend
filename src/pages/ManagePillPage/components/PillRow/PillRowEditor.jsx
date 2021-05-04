import { useDispatch } from 'react-redux';
import { useState, useMemo } from 'react';

import { InputText, InputNumber, InputDropdown, InputTextarea } from '../../../../components';

import { pillsEditToggle, pillsUpdate } from '../../../../actions/pillsAction';

const PillRowEditor = ({ index, pill, pills }) => {
    const dispatch = useDispatch();

    const [sn, setSn] = useState(pill.sn);
    const [name, setName] = useState(pill.name);
    const [description, setDescription] = useState(pill.description);
    const [unit, setUnit] = useState(pill.unit);
    const [price, setPrice] = useState(pill.price);
    const [type, setType] = useState(pill.type);

    const [isValidSn, setIsValidSn] = useState(true);
    const [isValidName, setIsValidName] = useState(true);
    const [isValidDescription, setIsValidDescription] = useState(true);
    const [isValidUnit, setIsValidUnit] = useState(true);
    const [isValidPrice, setIsValidPrice] = useState(true);

    const canSubmit = useMemo(() => {
        return isValidSn && isValidName && isValidDescription && isValidUnit && isValidPrice;
    }, [isValidSn, isValidName, isValidDescription, isValidUnit, isValidPrice]);

    let snAlreadyUse = [];
    pills.map((value) => {
        if (value.sn !== pill.sn) {
            snAlreadyUse.push(value.email);
        }
    });

    const submitHandler = () => {
        if (canSubmit) {
            dispatch(pillsUpdate({ _id: pill._id, sn, name, description, unit, price, type }));
        }
    };

    return (
        <tbody className="divide-y divide-gray-200">
            <tr>
                <td className="w-10 px-6 py-4 whitespace-nowrap text-gray-500 pl-10 align-top">{index}</td>
                <td className="w-32 px-6 py-4 whitespace-nowrap text-gray-500 align-top">
                    <InputText
                        id={`InputText-sn-${index}`}
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
                <td className="w-52 px-6 py-4 whitespace-nowrap text-gray-500 align-top">
                    <InputText
                        id={`InputText-name-${index}`}
                        name="name"
                        type="text"
                        initValue={name}
                        placeholder="ชื่อยา"
                        autoComplete="off"
                        required
                        minLength={1}
                        maxLength={50}
                        onValidChange={(state) => {
                            setIsValidName(state);
                        }}
                        onValueChange={(state) => {
                            setName(state);
                        }}
                    />
                </td>
                <td className="w-64 px-6 py-4 whitespace-nowrap text-gray-500 align-top">
                    <InputTextarea
                        id={`InputText-description-${index}`}
                        name="description"
                        initValue={description}
                        placeholder="คำอธิบาย"
                        required
                        maxLength={100}
                        onValidChange={(state) => {
                            setIsValidDescription(state);
                        }}
                        onValueChange={(state) => {
                            setDescription(state);
                        }}
                    />
                </td>
                <td className="w-36 px-6 py-4 whitespace-nowrap text-gray-500 align-top">
                    <InputText
                        id={`InputText-unit-${index}`}
                        name="unit"
                        type="text"
                        initValue={unit}
                        placeholder="หน่วย"
                        autoComplete="off"
                        pattern="^[a-zA-Zก-๏\s]+$"
                        msgPatternError="อังกฤษ/ไทย เท่านั้น"
                        required
                        minLength={1}
                        maxLength={30}
                        onValidChange={(state) => {
                            setIsValidUnit(state);
                        }}
                        onValueChange={(state) => {
                            setUnit(state);
                        }}
                    />
                </td>
                <td className="w-36 px-6 py-4 whitespace-nowrap text-gray-500 align-top">
                    <InputNumber
                        id={`InputNumber-price-${index}`}
                        name="price"
                        initValue={price}
                        min="0"
                        placeholder="ราคาต่อหน่วย"
                        required
                        onValidChange={(state) => {
                            setIsValidPrice(state);
                        }}
                        onValueChange={(state) => {
                            setPrice(state);
                        }}
                    />
                </td>
                <td className="w-32 px-6 py-4 whitespace-nowrap text-gray-500 align-top">
                    <InputDropdown
                        id={`InputDropdown-type-${index}`}
                        name="type"
                        optionList={['ED', 'NED']}
                        selectedIndex={['ED', 'NED'].indexOf(type)}
                        onValueChange={(state) => {
                            setType(state);
                        }}
                    />
                </td>
                <td className="w-20 px-6 py-4 whitespace-nowrap text-center font-medium align-top">
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
                <td className="w-20 px-6 py-4 whitespace-nowrap text-center font-medium align-top">
                    <button
                        className="text-gray-800 hover:text-gray-500 hover:underline focus:outline-none"
                        type="button"
                        onClick={() => {
                            dispatch(pillsEditToggle({ _id: pill._id }));
                        }}
                    >
                        ยกเลิก
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default PillRowEditor;
