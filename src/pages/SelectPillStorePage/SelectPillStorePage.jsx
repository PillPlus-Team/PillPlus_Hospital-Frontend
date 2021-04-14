import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { PageLayout, PatientInfoMonitor } from '../../components';

import PrescriptionQueue from './components/PrescriptionQueue';
import PillStoreSelector from './components/PillStoreSelector';

import { prescriptionsFetch, prescriptionsUpdatePillStore } from '../../actions/prescriptionsAction';

const SelectPillStorePage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const prescriptions = useSelector((state) => state.prescriptions);

    const selectedPrescription = prescriptions.list.find((element) => element.ID === prescriptions.selectedPrescriptionID);

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
                        <PatientInfoMonitor patient={selectedPrescription} />
                    </div>
                    <button
                        className={`w-52 p-2 mt-5 ml-auto  text-white rounded-lg focus:outline-none ${
                            selectedPrescription ? 'bg-blue-500 hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed '
                        }`}
                        type="button"
                        disabled={!selectedPrescription}
                        onClick={() => {
                            dispatch(prescriptionsUpdatePillStore({ ID: prescriptions.selectedPrescriptionID }));
                        }}
                    >
                        ยันยันสถานที่รับยา
                    </button>
                </div>
            </div>
        </PageLayout>
    );
};
export default SelectPillStorePage;
