const TableRowSlot = ({ children }) => {
    return (
        <div className="shadow-md overflow-hidden border-b rounded-lg">
            <table className="w-full min-w-full divide-y divide-gray-200">{children}</table>
        </div>
    );
};

export default TableRowSlot;
