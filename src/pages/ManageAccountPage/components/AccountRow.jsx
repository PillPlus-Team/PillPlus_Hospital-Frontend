import AccountRowDisplay from './AccountRowDisplay';
import AccountRowEditor from './AccountRowEditor';

const AccountRow = ({ index, account, accounts, roles }) => {
    return (
        <>
            {!account.editing && (
                <AccountRowDisplay
                    index={index}
                    account={account}
                />
            )}
            {account.editing && (
                <AccountRowEditor
                    index={index}
                    account={account}
                    accounts={accounts}
                    roles={roles}
                />
            )}
        </>
    );
};

export default AccountRow;
