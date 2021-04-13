const PatientInfoMonitor = ({ patient }) => {
    return (
        <div className="flex w-96 h-96 bg-red-100 rounded-lg">
            <div className="flex flex-col w-96 h-96 bg-red-100 rounded-lg">
                <p>{patient.HN}</p>
                <p>{patient.name}</p>
                ...
                <p>{patient.queueNo}</p>
            </div>
        </div>
    );
};

export default PatientInfoMonitor;
