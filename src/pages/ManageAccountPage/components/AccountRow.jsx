import { useState } from 'react';

import AccountRowDisplay from './AccountRowDisplay';
import AccountRowEditor from './AccountRowEditor';

const AccountRow = ({ index, account, accounts, roles }) => {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <>
            {!isEdit && (
                <AccountRowDisplay
                    index={index}
                    account={account}
                    onEditClick={() => {
                        setIsEdit(true);
                    }}
                />
            )}
            {isEdit && (
                <AccountRowEditor
                    index={index}
                    account={account}
                    accounts={accounts}
                    roles={roles}
                    onCompleted={() => {
                        setIsEdit(false);
                    }}
                />
            )}
        </>
    );
};

export default AccountRow;
