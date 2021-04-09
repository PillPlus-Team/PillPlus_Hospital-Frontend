import { useDispatch } from 'react-redux';

import { accountsEditToggle, accountsDelete } from '../../../actions/accountsAction.js';

const AccountRowDisplay = ({ index, account }) => {
    const dispatch = useDispatch();

    return (
        <tbody className="divide-y divide-gray-200">
            <tr>
                <td className="w-10 px-6 py-4 text-gray-500 pl-10">{index}</td>
                <td className="w-24 px-6 py-4 text-gray-500">{account.ID}</td>
                <td className="w-28 px-6 py-4 text-gray-500">{account.name}</td>
                <td className="w-28 px-6 py-4 text-gray-500">{account.surname}</td>
                <td className="w-48 px-6 py-4 text-gray-500">
                    <p className="break-words">{account.email}</p>
                </td>
                <td className="w-40 px-6 py-4 text-gray-500">{account.phone}</td>
                <td className="w-40 px-6 py-4 text-gray-500">
                    <p>{account.role}</p>
                    <p className="text-gray-400 italic">ระดับ : {account.role_level}</p>
                </td>
                <td className="w-20 px-6 py-4 whitespace-nowrap text-center font-medium">
                    <button
                        class="text-indigo-600 hover:text-indigo-900 hover:underline focus:outline-none"
                        type="button"
                        onClick={() => {
                            dispatch(accountsEditToggle({ ID: account.ID }));
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
                            dispatch(accountsDelete({ ID: account.ID }));
                        }}
                    >
                        ลบ
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default AccountRowDisplay;
