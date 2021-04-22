import { useDispatch } from 'react-redux';

import { pillsEditToggle, pillsDelete } from '../../../../actions/pillsAction';

const PillRowDisplay = ({ index, pill }) => {
    const dispatch = useDispatch();

    return (
        <tbody className="divide-y divide-gray-200">
            <tr>
                <td className="w-10 px-6 py-4 text-gray-500 pl-10">{index}</td>
                <td className="w-32 px-6 py-4 text-gray-500">{pill.sn}</td>
                <td className="w-52 px-6 py-4 text-gray-500">
                    <p className="break-words">{pill.name}</p>
                </td>
                <td className="w-64 px-6 py-4 text-gray-500">
                    <p className="break-words">
                        {pill.description.split('\n').map((subString) => {
                            return (
                                <>
                                    {subString}
                                    <br />
                                </>
                            );
                        })}
                    </p>
                </td>
                <td className="w-36 px-6 py-4 text-gray-500">{pill.unit}</td>
                <td className="w-36 px-6 py-4 text-gray-500">
                    <p className="break-words">
                        {Number(pill.price).toLocaleString('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 2 })}
                    </p>
                </td>
                <td className="w-32 px-6 py-4 text-gray-500">{pill.type}</td>

                <td className="w-20 px-6 py-4 whitespace-nowrap text-center font-medium">
                    <button
                        class="text-indigo-600 hover:text-indigo-900 hover:underline focus:outline-none"
                        type="button"
                        onClick={() => {
                            dispatch(pillsEditToggle({ ID: pill.ID }));
                        }}
                    >
                        แก้ไข
                    </button>
                </td>
                <td className="w-20 px-6 py-4 whitespace-nowrap text-center font-medium">
                    <button
                        className="text-red-600 hover:text-red-900 hover:underline focus:outline-none"
                        type="button"
                        onClick={() => {
                            dispatch(pillsDelete({ ID: pill.ID }));
                        }}
                    >
                        ลบ
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default PillRowDisplay;
