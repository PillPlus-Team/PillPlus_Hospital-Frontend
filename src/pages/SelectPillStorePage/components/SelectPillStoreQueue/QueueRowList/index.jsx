import { useState, useEffect } from 'react';

import QueueRowDisplay from './QueueRowDisplay';
import QueueRowEmpty from './QueueRowEmpty';

const QueueRowList = ({ patientQueueList }) => {
    const [nowTimeStamp, setNowTimeStamp] = useState(Date.now());

    const isEmpty = patientQueueList.length === 0;

    useEffect(() => {
        setTimeout(() => {
            setNowTimeStamp(Date.now());
        }, 1000);
    }, [nowTimeStamp]);

    return (
        <div className="flex flex-col">
            {patientQueueList.map((patient, index) => {
                return <QueueRowDisplay index={index + 1} patient={patient} nowTimeStamp={nowTimeStamp} />;
            })}
            {isEmpty && <QueueRowEmpty />}
        </div>
    );
};

export default QueueRowList;
