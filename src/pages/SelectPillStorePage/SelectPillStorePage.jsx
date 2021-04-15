import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { PageLayout, PatientQueue } from '../../components';

import PillStoreSelector from './components/PillStoreSelector';
import PrescriptionInfoMonitor from './components/PrescriptionInfoMonitor';

import { prescriptionsFetch, prescriptionsSelect, prescriptionsUpdatePillStore } from '../../actions/prescriptionsAction';

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
                    <div className="h-176">
                        <PatientQueue
                            patientQueueList={prescriptions.list}
                            onSelected={(selectedIndex) => {
                                dispatch(prescriptionsSelect({ ID: prescriptions.list[selectedIndex].ID }));
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col ml-14 ">
                    <div className="min-w-min">
                        <p className="text-3xl border-l-4 pl-4 mb-4">เลือกสถานที่รับยา</p>
                        {!selectedPrescription && (
                            <div className="flex justify-center items-center w-160 h-20 bg-white shadow-md rounded-lg">
                                <p className="font-medium text-gray-400 tracking-wider">โปรดเลือกผู้ป่วย</p>
                            </div>
                        )}
                        {selectedPrescription && (
                            <div className="flex items-center w-160 h-20 p-2 bg-white shadow-md rounded-lg">
                                {/*Hack react-life-cycle */}
                                {prescriptions.list.map((prescription) => {
                                    return prescription.selected && <PillStoreSelector selectedPrescriptionID={selectedPrescription.ID} />;
                                })}
                            </div>
                        )}
                    </div>
                    <div className="min-w-min mt-10">
                        <p className="text-3xl border-l-4 pl-4 mb-4">ข้อมูลผู้ป่วย</p>
                        {!selectedPrescription && (
                            <div className="flex justify-center items-center w-160 h-112 bg-white shadow-md rounded-lg">
                                <p className="font-medium text-gray-400 tracking-wider">โปรดเลือกผู้ป่วย</p>
                            </div>
                        )}
                        {selectedPrescription && (
                            <div className="flex w-160 h-112">
                                <PrescriptionInfoMonitor prescription={selectedPrescription} />
                            </div>
                        )}
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
