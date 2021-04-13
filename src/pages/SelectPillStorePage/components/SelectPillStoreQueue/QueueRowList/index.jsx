import { useState, useEffect } from 'react';

import QueueRowDisplay from './QueueRowDisplay';
import QueueRowEmpty from './QueueRowEmpty';

const QueueRowList = ({ prescriptions }) => {
    const [nowTimeStamp, setNowTimeStamp] = useState(Date.now());

    const isEmpty = prescriptions.length === 0;

    useEffect(() => {
        setTimeout(() => {
            setNowTimeStamp(Date.now());
        }, 1000);
    }, [nowTimeStamp]);

    return (
        <div className="flex flex-col">
            {isEmpty && <QueueRowEmpty />}
            
            {prescriptions.map((prescription, index) => {
                return <QueueRowDisplay index={index + 1} prescription={prescription} nowTimeStamp={nowTimeStamp} />;
            })}
        </div>
    );
};

export default QueueRowList;
