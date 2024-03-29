import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { LoadingModal, Toast } from '../../../actions/swals';
import { prescriptionSelectPillStore } from '../../../actions/prescriptionsAction';

import { API_URL } from '../../../config';
import { USER_LOGOUT } from '../../../actions/types';

const PillStoreSelector = ({ selectedPrescription, socket }) => {
    const dispatch = useDispatch();

    const [availablePillStoreList, setAvailablePillStoreList] = useState(null);
    const [selectedPillStore, setSelectedPillStore] = useState(null);
    const [indexSelected, setIndexSelected] = useState(0);
    const [showOption, setShowOption] = useState(false);

    const [loading, setLoading] = useState(false);

    window.addEventListener('click', (event) => {
        if (document.getElementById('pillstore-selector') !== null) {
            if (!document.getElementById('pillstore-selector').contains(event.target)) {
                setShowOption(false);
            }
        }
    });

    const setPillStoreChoices = async () => {
        setLoading(true);

        LoadingModal.fire({ title: 'กำลังโหลด สถานที่รับยา ...' });
        LoadingModal.showLoading();

        try {
            const res = await fetch(API_URL + `/pillStore/available/${selectedPrescription._id}`, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                let availablePillStores = await res.json();
                availablePillStores = availablePillStores.filter((pillStore) => pillStore.status);
                setAvailablePillStoreList(availablePillStores);
            } else {
                throw res;
            }
        } catch (error) {
            if (error.status === 401) {
                dispatch({ type: USER_LOGOUT });
            } else {
                Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
                setAvailablePillStoreList(null);
            }
        }

        LoadingModal.close();

        setLoading(false);
    };

    const messageListener = (message) => {
        console.log(message);
        setPillStoreChoices();
    };

    useEffect(() => {
        setPillStoreChoices();

        socket.on('message', messageListener);

        /* componentWillUnmount*/
        return () => {
            socket.off('message', messageListener);
        };
    }, []);

    useEffect(() => {
        if (availablePillStoreList && availablePillStoreList.length !== 0) {
            setSelectedPillStore(availablePillStoreList[0]);
        } else {
            setSelectedPillStore(null);
        }
        setIndexSelected(0);
    }, [availablePillStoreList]);

    useEffect(() => {
        if (selectedPillStore) {
            dispatch(
                prescriptionSelectPillStore({
                    _id: selectedPrescription._id,
                    pillStoreID: selectedPillStore.ID,
                    pillStorePharmacy: selectedPillStore.pharmacy,
                    pillStoreLocation: selectedPillStore.location,
                })
            );
        }
    }, [selectedPillStore]);

    return (
        <div className="w-full relative" id="pillstore-selector">
            {!selectedPillStore && !loading && (
                <div class="relative w-full bg-white border-2 border-red-300 rounded-md shadow-sm pl-2 pr-10 py-2 text-left">
                    <div class="flex flex-col items-start w-full h-full">
                        <p class="font-bold ml-3 block truncate text-red-700 ">ไม่สามารถเลือกสถานที่รับยาได้</p>
                        <p class="font-normal ml-3 block truncate text-red-400 text-sm">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
                    </div>
                </div>
            )}
            {selectedPillStore && (
                <button
                    class="relative w-full bg-white border-2 border-gray-300 rounded-md shadow-sm pl-2 pr-10 py-2 text-left focus:outline-none focus:border-blue-500 hover:border-blue-500"
                    type="button"
                    onClick={() => {
                        setShowOption(!showOption);
                    }}
                >
                    <div class="flex flex-col items-start w-full h-full">
                        <span class="font-normal ml-3 block truncate">{selectedPillStore.pharmacy}</span>
                        <span class="font-normal ml-3 block truncate text-gray-500 text-sm">{selectedPillStore.location}</span>
                    </div>
                    <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                            class="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </button>
            )}

            {showOption && (
                <ul
                    class="z-50 absolute mt-1 w-full bg-white shadow-lg max-h-96 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                    role="listbox"
                >
                    {availablePillStoreList.map((pillStore, index) => {
                        return (
                            <li
                                className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-200"
                                id={`pillstore-selector-option-${index}`}
                                onClick={() => {
                                    setSelectedPillStore(pillStore);

                                    setIndexSelected(index);
                                    setShowOption(false);
                                }}
                            >
                                <div class="flex flex-col items-start">
                                    <span class="font-normal ml-3 block truncate">{pillStore.pharmacy}</span>
                                    <span class="font-normal ml-3 block truncate text-gray-500">{pillStore.location}</span>
                                </div>
                                {index === indexSelected && (
                                    <span class="text-green-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                        <svg
                                            class="h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default PillStoreSelector;
