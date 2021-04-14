import AccountRowDisplay from './AccountRowDisplay';
import AccountRowEditor from './AccountRowEditor';

const AccountRow = ({ index, account, accounts, userInfo, roleList }) => {
    return (
        <>
            {!account.editing && <AccountRowDisplay index={index} account={account} userInfo={userInfo} />}
            {account.editing && <AccountRowEditor index={index} account={account} accounts={accounts} roleList={roleList} />}
        </>
    );
};

export default AccountRow;
