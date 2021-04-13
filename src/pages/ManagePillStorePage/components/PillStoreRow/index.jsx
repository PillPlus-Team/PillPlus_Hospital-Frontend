import PillStoreRowDisplay from './PillStoreRowDisplay';
import PillStoreRowEditor from './PillStoreRowEditor';

const PillStoreRow = ({ index, pillStore, pillStores }) => {
    return (
        <>
            {!pillStore.editing && <PillStoreRowDisplay index={index} pillStore={pillStore} />}
            {pillStore.editing && <PillStoreRowEditor index={index} pillStore={pillStore} pillStores={pillStores} />}
        </>
    );
};

export default PillStoreRow;
