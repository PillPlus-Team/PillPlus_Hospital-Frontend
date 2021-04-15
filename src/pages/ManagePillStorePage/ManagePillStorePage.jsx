import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { PageLayout, TableRowSlot, RowEmpty, SearchBar } from '../../components';

import PillStoreRowTitle from './components/PillStoreRowTitle';
import PillStoreRow from './components/PillStoreRow';
import PillStoreRowAdder from './components/PillStoreRowAdder';

import { pillStoresFetch, pillStoresAddToggle } from '../../actions/pillStoresAction';

const ManagePillStorePage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const pillStores = useSelector((state) => state.pillStores);

    const [pillStoresFiltered, setPillStoresFiltered] = useState(pillStores.list);

    const isEmpty = pillStoresFiltered.length === 0;

    useEffect(() => {
        dispatch(pillStoresFetch());
    }, []);

    return (
        <PageLayout pageTitle="จัดการบัญชีร้านขายยา" userInfo={user} menuList={menuList}>
            <div className="relative">
                <div className="flex w-full justify-end absolute -top-14">
                    <SearchBar
                        onSearchClick={(keyword) => {
                            if (keyword) {
                                setPillStoresFiltered(
                                    pillStores.list.filter((element) => {
                                        const keys = Object.keys(element);
                                        for (let i = 0; i < keys.length; i++) {
                                            if (String(element[keys[i]]).includes(keyword)) {
                                                return true;
                                            }
                                        }
                                        return false;
                                    })
                                );
                            } else {
                                setPillStoresFiltered(pillStores.list);
                            }
                        }}
                    />
                </div>
                <TableRowSlot>
                    <PillStoreRowTitle />
                    {isEmpty && !pillStores.adding && <RowEmpty colSpan="9" text="ไม่มีข้อมูล" />}

                    {pillStoresFiltered.map((pillStore, index) => {
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
            </div>
        </PageLayout>
    );
};

export default ManagePillStorePage;
