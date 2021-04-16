import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { PageLayout, TableRowSlot, RowEmpty, SearchBar } from '../../components';

import PillRowTitle from './components/PillRowTitle';
import PillRow from './components/PillRow';
import PillRowAdder from './components/PillRowAdder';

import { pillsFetch, pillsFilter, pillsAddToggle } from '../../actions/pillsAction';

const ManagePillPage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const pills = useSelector((state) => state.pills);

    let pillsFilteredID = pills.list.map((pill) => {
        if (pill.show) {
            return pill.ID;
        }
    });
    pillsFilteredID = pillsFilteredID.filter((ID) => ID != null);

    const isEmpty = pillsFilteredID.length === 0;

    useEffect(() => {
        dispatch(pillsFetch());
    }, []);

    return (
        <PageLayout pageTitle="จัดการข้อมูลยา" userInfo={user} menuList={menuList}>
            <div className="relative">
                <div className="flex w-full justify-end absolute -top-14">
                    <SearchBar
                        onSearchClick={(keyword) => {
                            dispatch(pillsFilter({ keyword: keyword }));
                        }}
                    />
                </div>
                <TableRowSlot>
                    <PillRowTitle />
                    {isEmpty && !pills.adding && <RowEmpty colSpan="9" text="ไม่มีข้อมูล" />}

                    {pills.list.map((pill) => {
                        return <>{pill.show && <PillRow index={pillsFilteredID.indexOf(pill.ID) + 1} pill={pill} pills={pills.list} />}</>;
                    })}

                    {pills.adding && <PillRowAdder pills={pills.list} />}
                </TableRowSlot>

                {!pills.adding && (
                    <button
                        className="w-24 mt-4 p-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-800"
                        type="button"
                        onClick={() => {
                            dispatch(pillsAddToggle());
                        }}
                    >
                        เพิ่ม
                    </button>
                )}
            </div>
        </PageLayout>
    );
};

export default ManagePillPage;
