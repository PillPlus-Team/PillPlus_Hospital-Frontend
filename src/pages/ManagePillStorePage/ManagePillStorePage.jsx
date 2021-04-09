import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { PageLayout, TableRowSlot } from '../../components';

import PillStoreRowTitle from './components/PillStoreRowTitle';
import PillStoreRowEmpty from './components/PillStoreRowEmpty';
import PillStoreRow from './components/PillStoreRow';
import PillStoreRowAdder from './components/PillStoreRowAdder';

import { pillStoresFetch, pillStoresAddToggle } from '../../actions/pillStoresAction';

const ManagePillStorePage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const pillStores = useSelector((state) => state.pillStores);

    const isEmpty = pillStores.list.length === 0;

    useEffect(() => {
        dispatch(pillStoresFetch());
    }, []);

    return (
        <PageLayout pageTitle="จัดการบัญชีร้านขายยา" userInfo={user} menuList={menuList}>
            <TableRowSlot>
                <PillStoreRowTitle />
                {isEmpty && !pillStores.adding && <PillStoreRowEmpty />}

                {pillStores.list.map((pillStore, index) => {
                    return <PillStoreRow index={index + 1} pillStore={pillStore} pillStores={pillStores.list} />;
                })}

                {pillStores.adding && <PillStoreRowAdder pillStores={pillStores.list} />}
            </TableRowSlot>

            {!pillStores.adding && (
                <button
                    className="w-24 mt-4 p-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-800"
                    type="button"
                    onClick={() => {
                        dispatch(pillStoresAddToggle());
                    }}
                >
                    เพิ่ม
                </button>
            )}
        </PageLayout>
    );
};

export default ManagePillStorePage;
