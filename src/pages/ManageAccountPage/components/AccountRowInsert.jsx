import { useState } from 'react';

const AccountRowInsert = ({ onCompleted }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');

    const submitHandler = () => {
        console.log('Submit Click!');
        /*
            Logic here!
        */
        onCompleted();
    };

    return (
        <tbody class="bg-gray-100 divide-y divide-gray-200">
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500"></td>
                <td class="px-6 py-2 whitespace-nowrap text-gray-500"></td>
                <td class="px-6 py-2 whitespace-nowrap text-gray-500">
                    <input
                        className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                        placeholder="ชื่อ"
                        autoComplete="off"
                        required
                    />
                </td>
                <td class="px-6 py-2 whitespace-nowrap text-gray-500">
                    <input
                        className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        name="surname"
                        type="text"
                        value={surname}
                        onChange={(event) => {
                            setSurname(event.target.value);
                        }}
                        placeholder="นามสกุล"
                        autoComplete="off"
                        required
                    />
                </td>
                <td class="px-6 py-2 whitespace-nowrap text-gray-500">
                    <input
                        className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        placeholder="goodboy@mail.com"
                        autoComplete="off"
                        required
                    />
                </td>
                <td class="px-6 py-2 whitespace-nowrap text-gray-500">role - [dropdown]</td>
                <td class="px-6 py-2 whitespace-nowrap text-gray-500"></td>
                <td class="px-6 py-2 whitespace-nowrap text-center font-medium">
                    <button class="text-green-600 hover:text-green-900 hover:underline focus:outline-none" type="bitton" onClick={submitHandler}>
                        เพิ่ม
                    </button>
                </td>
                <td class="px-6 py-2 whitespace-nowrap text-center font-medium">
                    <button class="text-gray-600 hover:text-gray-900 hover:underline focus:outline-none" type="button" onClick={onCompleted}>
                        ยกเลิก
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default AccountRowInsert;
