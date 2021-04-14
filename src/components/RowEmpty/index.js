const RowEmpty = ({ colSpan, text }) => {
    return (
        <thead className="text-md border-b-2 shadow-sm ">
            <tr>
                <th className="py-7 text-center font-medium text-gray-400 tracking-wider" scope="col" colSpan={colSpan}>
                    {text}
                </th>
            </tr>
        </thead>
    );
};

export default RowEmpty;
