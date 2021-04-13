import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { PageLayout, PatientInfoMonitor } from '../../components';

import SelectPillStoreQueue from './components/SelectPillStoreQueue';
import PillStoreSelector from './components/PillStoreSelector';

const QUEUELIST = [
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 1 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 2 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 3 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 4 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 5 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 3 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 7 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 4 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 1 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 2 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 3 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 1 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 2 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 3 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 4 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 1 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 2 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 3 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 4 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 1 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 2 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 3 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 1 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 2 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 3 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 4 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 1 },
    { HN: 12345678, name: 'พักตร์ภูมิ ตาแพร่', startTime: 1618338519728, queueNo: 2 },
];

const SelectPillStorePage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);

    useEffect(() => {}, []);

    return (
        <PageLayout userInfo={user} menuList={menuList}>
            <div className="flex flex-row justify-between w-full h-full ">
                <div className="min-w-min">
                    <p className="text-3xl border-l-4 pl-4 mb-4">ลำดับ</p>
                    <SelectPillStoreQueue patientQueueList={QUEUELIST} />
                </div>
                <div className="flex flex-col ml-14 ">
                    <div className="min-w-min">
                        <p className="text-3xl border-l-4 pl-4 mb-4">เลือกสถานที่รับยา</p>
                        <PillStoreSelector />
                    </div>
                    <div className="min-w-min mt-10">
                        <p className="text-3xl border-l-4 pl-4 mb-4">ข้อมูลผู้ป่วย</p>
                        <PatientInfoMonitor patient={QUEUELIST[0]} />
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};
export default SelectPillStorePage;
