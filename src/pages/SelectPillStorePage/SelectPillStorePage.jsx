import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { PageLayout, PatientInfoMonitor } from '../../components';

import PrescriptionQueue from './components/PrescriptionQueue';
import PillStoreSelector from './components/PillStoreSelector';

import { prescriptionsFetch } from '../../actions/prescriptionsAction';

const SelectPillStorePage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const prescriptions = useSelector((state) => state.prescriptions);

    useEffect(() => {
        dispatch(prescriptionsFetch());
    }, []);

    return (
        <PageLayout userInfo={user} menuList={menuList}>
            <div className="flex flex-row justify-between w-full h-full">
                <div className="min-w-min">
                    <p className="text-3xl border-l-4 pl-4 mb-4">ลำดับ</p>
                    <PrescriptionQueue prescriptions={prescriptions.list} />
                </div>
                <div className="flex flex-col ml-14 ">
                    <div className="min-w-min">
                        <p className="text-3xl border-l-4 pl-4 mb-4">เลือกสถานที่รับยา</p>
                        <PillStoreSelector />
                    </div>
                    <div className="min-w-min mt-10">
                        <p className="text-3xl border-l-4 pl-4 mb-4">ข้อมูลผู้ป่วย</p>
                        <PatientInfoMonitor patient={prescriptions.selectedPrescription} />
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};
export default SelectPillStorePage;
