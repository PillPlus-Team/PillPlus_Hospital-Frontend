import { PILLSTORES_FETCH, PILLSTORES_ADD_TOGGLE, PILLSTORES_ADD, PILLSTORES_EDIT_TOGGLE, PILLSTORES_UPDATE, PILLSTORES_DELETE } from './types';

export const pillStoresFetch = () => {
    return async (dispatch) => {
        const pillStores = [
            {
                ID: 10000001,
                name: 'พักตร์ภูมิ ตาแพร่',
                phamacy: 'ยาอม ยาดม ยาหม่อง',
                location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                email: 'phoom0529@gmail.com',
                phone: '0891234567',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000002,
                name: 'พักตร์ภูมิ ตาแพร่',
                phamacy: 'ยาพิษ bodyslam',
                location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                email: 'phoom1477@gmail.com',
                phone: '0899997333',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000003,
                name: 'พักตร์ภูมิ ตาแพร่',
                phamacy: 'ยาดี ยาอี ยาไอซ์',
                location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                email: 'phukphoomtaphrae@gmail.com',
                phone: '0891234765',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
        ];

        dispatch({ type: PILLSTORES_FETCH, pillStores: pillStores });
    };
};

export const pillStoresAddToggle = () => {
    return {
        type: PILLSTORES_ADD_TOGGLE,
    };
};

export const pillStoresAdd = ({ name, phamacy, location, email, phone }) => {
    return async (dispatch) => {
        const pillStore = {
            ID: Math.floor(Math.random() * 100000000),
            name,
            phamacy,
            location,
            email,
            phone,
        };

        dispatch({ type: PILLSTORES_ADD, pillStore: pillStore });
    };
};

export const pillStoresEditToggle = ({ ID }) => {
    return {
        type: PILLSTORES_EDIT_TOGGLE,
        ID: ID,
    };
};

export const pillStoresUpdate = ({ ID, name, phamacy, location, email, phone }) => {
    return async (dispatch, getState) => {
        const { pillStores } = getState();
        const pillStore = pillStores.list.find((pillStore) => pillStore.ID === ID);
        dispatch({ type: PILLSTORES_UPDATE, pillStore: { ...pillStore, name, phamacy, location, email, phone } });
    };
};

export const pillStoresDelete = ({ ID }) => {
    return async (dispatch) => {
        dispatch({ type: PILLSTORES_DELETE, ID: ID });
    };
};

/* For Production */
// export const pillStoresFetch = () => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/getPillStores', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (res.status === 200) {
//             const pillStores = await res.json();
//             dispatch({ type: PILLSTORES_FETCH, pillStores: pillStores });
//         }
//     };
// };

// export const pillStoresAddToggle = () => {
//     return {
//         type: PILLSTORES_ADD_TOGGLE,
//     };
// };

// export const pillStoresAdd = ({ name, phamacy, location, email, phone }) => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/addPillStore', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ name, phamacy, location, email, phone }),
//         });

//         if (res.status === 200) {
//             const pillStore = await res.json();
//             dispatch({ type: PILLSTORES_ADD, pillStore: pillStore });
//         } else {
//             //Swal.fire (SweetAlert2) Here
//         }
//     };
// };

// export const pillStoresEditToggle = ({ ID }) => {
//     return {
//         type: PILLSTORES_EDIT_TOGGLE,
//         ID: ID,
//     };
// };

// export const pillStoresUpdate = ({ ID, name, phamacy, location, email, phone }) => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/editPillStore', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ ID, name, phamacy, location, email, phone }),
//         });

//         if (res.status === 200) {
//             const editedPillStore = await res.json();
//             dispatch({ type: PILLSTORES_UPDATE, pillStore: { ...editedPillStore } });
//         } else {
//             //Swal.fire (SweetAlert2) Here
//         }
//     };
// };

// export const pillStoresDelete = ({ ID }) => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/deletePillStore', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 ID,
//             }),
//         });

//         if (res.status === 200) {
//             dispatch({ type: PILLSTORES_DELETE, ID: ID });
//         } else {
//             //Swal.fire (SweetAlert2) Here
//         }
//     };
// };
