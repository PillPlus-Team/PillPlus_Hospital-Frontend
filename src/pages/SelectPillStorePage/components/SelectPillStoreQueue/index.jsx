import QueueRowTitle from './QueueRowTitle';
import QueueRowList from './QueueRowList';

const SelectPillStoreQueue = ({ patientQueueList = [] }) => {
    return (
        <div className="flex flex-col h-5/6">
            <div className="bg-white shadow-md border-b-2 rounded-t-lg">
                <QueueRowTitle />
            </div>
            <div className="bg-white shadow-md border-b rounded-b-lg overflow-y-auto ">
                <QueueRowList patientQueueList={patientQueueList} />
            </div>
        </div>
    );
};

export default SelectPillStoreQueue;
