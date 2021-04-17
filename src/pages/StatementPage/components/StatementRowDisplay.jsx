const StatementRowDisplay = ({ index, statement }) => {
    return (
        <tbody className="divide-y divide-gray-200">
            <tr>
                <td className="w-10 px-6 py-4 text-gray-500 pl-10">{index}</td>
                <td className="w-24 px-6 py-4 text-gray-500">{statement.pillStoreID}</td>
                <td className="w-36 px-6 py-4 text-gray-500">
                    <p className="break-words">{statement.name}</p>
                </td>
                <td className="w-36 px-6 py-4 text-gray-500">
                    <p className="break-words">{statement.phamacy}</p>
                </td>
                <td className="w-48 px-6 py-4 text-gray-500">
                    <p className="break-words">{statement.location}</p>
                </td>
                <td className="w-48 px-6 py-4 text-gray-500">
                    <p className="break-words">{statement.email}</p>
                </td>
                <td className="w-32 px-6 py-4 text-gray-500">{statement.phone}</td>

                <td className="w-40 px-6 py-4 text-gray-500 text-center text-xl border-l-2 ">
                    {Number(statement.balance).toLocaleString('th-TH', {
                        style: 'currency',
                        currency: 'THB',
                        minimumFractionDigits: 2,
                    })}
                </td>
            </tr>
        </tbody>
    );
};

export default StatementRowDisplay;
