import { useState } from 'react';

import AccountRowDisplay from './AccountRowDisplay';
import AccountRowEditor from './AccountRowEditor';

const AccountRow = ({ index, account, accounts }) => {
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
                    onCompleted={() => {
                        setIsEdit(false);
                    }}
                />
            )}
        </>
    );
};

export default AccountRow;
