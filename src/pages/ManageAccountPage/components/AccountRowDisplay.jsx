const AccountRowDisplay = ({ index, account }) => {
    const editHandler = () => {
        console.log('ID ' + account.ID + ' >> Edit Click!');
        /*
            Logic here!
        */
    };

    const deleteHandler = () => {
        console.log('ID ' + account.ID + ' >> Delete Click!');
        /*
            Logic here!
        */
    };

    return (
        <tbody class="bg-white divide-y divide-gray-200">
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500">{index}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500">{account.ID}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500">{account.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500">{account.surname}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500">{account.email}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500">{account.role}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500">{account.createdBy}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center font-medium">
                    <button class="text-indigo-600 hover:text-indigo-900 hover:underline focus:outline-none" type="button" onClick={editHandler}>
                        แก้ไข
                    </button>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center font-medium">
                    <button class="text-red-600 hover:text-red-900 hover:underline focus:outline-none" type="button" onClick={deleteHandler}>
                        ลบ
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default AccountRowDisplay;
