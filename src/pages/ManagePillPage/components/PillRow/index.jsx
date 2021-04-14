import PillRowDisplay from './PillRowDisplay';
import PillRowEditor from './PillRowEditor';

const PillRow = ({ index, pill, pills }) => {
    return (
        <>
            {!pill.editing && <PillRowDisplay index={index} pill={pill} />}
            {pill.editing && <PillRowEditor index={index} pill={pill} pills={pills} />}
        </>
    );
};

export default PillRow;
