import { useState, useEffect } from 'react';

import PrescriptionQueueDisplay from './PrescriptionQueueDisplay';
import PrescriptionQueueEmpty from './PrescriptionQueueEmpty';

const PrescriptionQueueList = ({ prescriptions }) => {
    const [nowTimeStamp, setNowTimeStamp] = useState(Date.now());

    const isEmpty = prescriptions.length === 0;

    useEffect(() => {
        setTimeout(() => {
            setNowTimeStamp(Date.now());
        }, 1000);
    }, [nowTimeStamp]);

    return (
        <div className="flex flex-col">
            {isEmpty && <PrescriptionQueueEmpty />}
            
            {prescriptions.map((prescription, index) => {
                return <PrescriptionQueueDisplay index={index + 1} prescription={prescription} nowTimeStamp={nowTimeStamp} />;
            })}
        </div>
    );
};

export default PrescriptionQueueList;
