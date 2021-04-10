import { useDispatch } from 'react-redux';

import { pillsEditToggle, pillsDelete } from '../../../actions/pillsAction';

const PillRowDisplay = ({ index, pill }) => {
    const dispatch = useDispatch();

    return (
        <tbody className="divide-y divide-gray-200">
            <tr>
                <td className="w-10 px-6 py-4 text-gray-500 pl-10">{index}</td>
                <td className="w-24 px-6 py-4 text-gray-500">{pill.sn}</td>
                <td className="w-36 px-6 py-4 text-gray-500">
                    <p className="break-words">{pill.name}</p>
                </td>
                <td className="w-36 px-6 py-4 text-gray-500">
                    <p className="break-words">{pill.description}</p>
                </td>
                <td className="w-48 px-6 py-4 text-gray-500">{Number(pill.price).toFixed(2)}</td>
                <td className="w-48 px-6 py-4 text-gray-500">{pill.type}</td>

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
