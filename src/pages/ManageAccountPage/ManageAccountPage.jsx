import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { PageLayout, TableRowSlot } from '../../components';

import AccountRowTitle from './components/AccountRowTitle';
import AccountRowEmpty from './components/AccountRowEmpty';
import AccountRow from './components/AccountRow';
import AccountRowAdder from './components/AccountRowAdder';

import { accountsFetch, accountAddToggle } from '../../actions/accountsAction';

/*MOCKDATA*/
import { ROLES } from '../mock-data';

const ManageAccountPage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const accounts = useSelector((state) => state.accounts);

    const isEmpty = accounts.list.length === 0;

    useEffect(() => {
        dispatch(accountsFetch());
    }, []);

    return (
        <PageLayout pageTitle="จัดการบัญชีผู้ใช้" userInfo={user} menuList={menuList}>
            <TableRowSlot>
                <AccountRowTitle />
                {isEmpty && !accounts.adding && <AccountRowEmpty />}

                {accounts.list.map((account, index) => {
                    return <AccountRow index={index + 1} account={account} accounts={accounts.list} roles={ROLES} />;
                })}

                {accounts.adding && <AccountRowAdder accounts={accounts.list} roles={ROLES} />}
            </TableRowSlot>

            {!accounts.adding && (
                <button
                    className="w-24 mt-4 p-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-800"
                    type="button"
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
