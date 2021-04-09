import { useDispatch } from 'react-redux';

import { pillStoresEditToggle, pillStoresDelete } from '../../../actions/pillStoresAction';

const PillStoreRowDisplay = ({ index, pillStore }) => {
    const dispatch = useDispatch();

    return (
        <tbody className="divide-y divide-gray-200">
            <tr>
                <td className="w-10 px-6 py-4 text-gray-500 pl-10">{index}</td>
                <td className="w-24 px-6 py-4 text-gray-500">{pillStore.ID}</td>
                <td className="w-36 px-6 py-4 text-gray-500">
                    <p className="break-words">{pillStore.name}</p>
                </td>
                <td className="w-36 px-6 py-4 text-gray-500">
                    <p className="break-words">{pillStore.phamacy}</p>
                </td>
                <td className="w-48 px-6 py-4 text-gray-500">
                    <p className="break-words">{pillStore.location}</p>
                </td>
                <td className="w-48 px-6 py-4 text-gray-500">
                    <p className="break-words">{pillStore.email}</p>
                </td>
                <td className="w-32 px-6 py-4 text-gray-500">{pillStore.phone}</td>

                <td className="w-20 px-6 py-4 whitespace-nowrap text-center font-medium">
                    <button
                        class="text-indigo-600 hover:text-indigo-900 hover:underline focus:outline-none"
                        type="button"
                        onClick={() => {
                            dispatch(pillStoresEditToggle({ ID: pillStore.ID }));
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
                            dispatch(pillStoresDelete({ ID: pillStore.ID }));
                        }}
                    >
                        ลบ
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default PillStoreRowDisplay;
