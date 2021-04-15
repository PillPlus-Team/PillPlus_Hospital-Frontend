import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { PageLayout, TableRowSlot, RowEmpty, SearchBar } from '../../components';

import PillRowTitle from './components/PillRowTitle';
import PillRow from './components/PillRow';
import PillRowAdder from './components/PillRowAdder';

import { pillsFetch, pillsAddToggle } from '../../actions/pillsAction';

const ManagePillPage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const pills = useSelector((state) => state.pills);

    const [pillsFiltered, setPillsFiltered] = useState(pills.list);

    const isEmpty = pillsFiltered.length === 0;

    useEffect(() => {
        dispatch(pillsFetch());
    }, []);

    return (
        <PageLayout pageTitle="จัดการข้อมูลยา" userInfo={user} menuList={menuList}>
            <div className="relative">
                <div className="flex w-full justify-end absolute -top-14">
                    <SearchBar
                        onSearchClick={(keyword) => {
                            if (keyword) {
                                setPillsFiltered(
                                    pills.list.filter((element) => {
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
                                setPillsFiltered(pills.list);
                            }
                        }}
                    />
                </div>
                <TableRowSlot>
                    <PillRowTitle />
                    {isEmpty && !pills.adding && <RowEmpty colSpan="9" text="ไม่มีข้อมูล" />}

                    {pillsFiltered.map((pill, index) => {
                        return <PillRow index={index + 1} pill={pill} pills={pills.list} />;
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
