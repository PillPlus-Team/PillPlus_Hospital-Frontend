import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { PageLayout, TableRowSlot } from '../../components';

import AccountRowTitle from './components/AccountRowTitle';
import AccountRow from './components/AccountRow';
import AccountRowInsert from './components/AccountRowInsert';

import { accountsFetch, accountAddToggle } from '../../actions/accountsAction';

/*MOCKDATA*/
import { ROLES } from '../mock-data';

const ManageAccountPage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const accounts = useSelector((state) => state.accounts);

    useEffect(() => {
        dispatch(accountsFetch());
    }, []);

    return (
        <PageLayout pageTitle="จัดการบัญชีผู้ใช้" userInfo={user} menuList={menuList}>
            <TableRowSlot>
                <AccountRowTitle />

                {accounts.list.map((account, index) => {
                    return <AccountRow index={index + 1} account={account} accounts={accounts.list} roles={ROLES} />;
                })}

                {accounts.adding && <AccountRowInsert accounts={accounts.list} roles={ROLES} />}
            </TableRowSlot>

            {!accounts.adding && (
                <button
                    className="w-24 mt-4 p-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-800"
                    onClick={() => {
                        dispatch(accountAddToggle());
                    }}
                >
                    เพิ่ม
                </button>
            )}
        </PageLayout>
    );
};

export default ManageAccountPage;
