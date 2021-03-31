const AccountRowDisplay = ({ index, account }) => {
    const editHandler = () => {
        //For Debug 
        console.log('ID ' + account.ID + ' >> Edit Click!');

        /*
            Logic here!
        */
    };

    const deleteHandler = () => {
        //For Debug 
        console.log('ID ' + account.ID + ' >> Delete Click!');

        /*
            Logic here!
        */
    };

    return (
        <tbody class="bg-white divide-y divide-gray-200">
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500 pl-10">{index}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500">{account.ID}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500">{account.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500">{account.surname}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500">{account.email}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500">{account.username}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                    <p>{account.role}</p>
                    <p className="text-gray-400 italic">ระดับ : {account.role_level}</p>
                </td>
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
