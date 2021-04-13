import { useDispatch } from 'react-redux';

import { prescriptionsSelect } from '../../../../../actions/prescriptionsAction';

const QueueRowDisplay = ({ index, prescription, nowTimeStamp }) => {
    const dispatch = useDispatch();

    const elapsedTime = nowTimeStamp - prescription.startTime;
    const second = Math.floor((elapsedTime / 1000) % 60);
    const minute = Math.floor((elapsedTime / 1000 / 60) % 60);
    const hour = Math.floor(elapsedTime / 1000 / 60 / 24);

    return (
        <div
            className={`flex flex-row min-w-min border-b cursor-pointer hover:bg-gray-200 ${prescription.selected ? 'bg-gray-200' : ''}`}
            onClick={() => {
                dispatch(prescriptionsSelect({ ID: prescription.ID, selectedPrescription: prescription }));
            }}
        >
            <p className="w-20 px-6 py-3 text-center font-medium text-gray-500 ">{index}</p>
            <p className="w-32 px-6 py-3 text-left font-medium text-gray-500 ">{prescription.HN}</p>
            <p className="w-52 px-6 py-3 text-left font-medium text-gray-500 break-words">{prescription.name}</p>
            <p className="w-36 px-6 py-3 text-center font-medium text-gray-500 ">
                {hour.toString().padStart(2, '0')} : {minute.toString().padStart(2, '0')} : {second.toString().padStart(2, '0')}
            </p>
            <p className="w-32 px-6 py-3 text-center font-medium text-gray-500 tracking-wider">{prescription.queueNo}</p>
        </div>
    );
};

export default QueueRowDisplay;
